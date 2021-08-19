import { expect } from "chai";
import { taskApiHttpClient } from "../clients";
import { compareUtils } from '../utils';

describe("Tasks Api Http Tests", function (){
  this.timeout(5000);

  it("should get tasks", async () => {
    const res = await taskApiHttpClient.getTasks();
    const { tasks } = res.body;
    const actual = Array.isArray(tasks);
    expect(actual).to.be.true;
  });

  it("should create task", async () => {
    const task = {
      name: "Danny2",
      status: "IN_PROGRESS",
    };

    const res = await taskApiHttpClient.createTask(task);
    const { task: newTask } = res.body;
    const { _id } = newTask;
    expect(_id).to.not.be.undefined;
    compareUtils.compareTasks(newTask, task);
  });

  it("should create & update task", async () => {
    const task = {
      name: "Danny",
      status: "IN_PROGRESS",
    };
    const createRes = await taskApiHttpClient.createTask(task);
    const { task: actual } = createRes.body as any;
    const { _id } = actual;
    expect(_id).to.not.be.undefined;
    compareUtils.compareTasks(actual, task);

    const updatedTask = {
      name: 'UpdatedDanny',
      _id,
      status: 'COMPLETED'
    };
    const updatedRes = await taskApiHttpClient.updateTask(_id, updatedTask);
    const { message } = updatedRes.body as any;
    expect(message).to.eql(`Updated task: ${_id} successfully`);

    const res = await taskApiHttpClient.getTasks([_id]);
    const { tasks } = res.body as any;
    const [dbUpdatedTask] = tasks;
    compareUtils.compareTasks(dbUpdatedTask, updatedTask, true); 
  });

  it("should create & delete task", async () => {
    const task = {
      name: "Danny",
      status: "IN_PROGRESS",
    };
    const createRes = await taskApiHttpClient.createTask(task);
    const { task: actual } = createRes.body as any;
    const { _id } = actual;
    expect(_id).to.not.be.undefined;
    compareUtils.compareTasks(actual, task);

    const updatedRes = await taskApiHttpClient.removeTask(_id);
    const { message } = updatedRes.body as any;
    expect(message).to.eql(`Deleted task: ${_id} successfully`);

    const res = await taskApiHttpClient.getTasks([_id]);
    const { tasks } = res.body as any;
    expect(tasks.length).to.eql(0); 
  });
});
