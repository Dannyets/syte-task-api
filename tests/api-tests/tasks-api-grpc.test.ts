import { expect } from "chai";
import { taskApiGrpcClient } from "../clients";
import { startGrpcServer } from "../../src/grpc-server";
import { initMongoClient } from "../../src/clients";
import { compareUtils } from '../utils';

const { MONGO_HOST, MONGO_DB_NAME } = process.env;

describe("Tasks Api GRPC Tests", function(){
  this.timeout(20000);

  before(async () => {
    await initMongoClient(MONGO_DB_NAME, MONGO_HOST);
    await startGrpcServer();
  });

  it("should get tasks", async () => {
    const res = await taskApiGrpcClient.getTasks();
    const { tasks } = res as any;
    const actual = Array.isArray(tasks);
    expect(actual).to.be.true;
  });

  it("should create task", async () => {
    const task = {
      name: "Danny",
      status: "IN_PROGRESS",
    };

    const res = await taskApiGrpcClient.createTask(task);
    const { task: newTask } = res as any;
    const { _id } = newTask;
    expect(_id).to.not.be.undefined;
    compareUtils.compareTasks(newTask, task);
  });

  it("should create & update task", async () => {
    const task = {
      name: "Danny",
      status: "IN_PROGRESS",
    };
    const createRes = await taskApiGrpcClient.createTask(task);
    const { task: newTask } = createRes as any;
    const { _id } = newTask;
    expect(_id).to.not.be.undefined;
    compareUtils.compareTasks(newTask, task);

    const updatedTask = {
      name: 'UpdatedDanny',
      _id,
      status: 'COMPLETED'
    };
    const updatedRes = await taskApiGrpcClient.updateTask(updatedTask);
    const { message } = updatedRes as any;
    expect(message).to.eql(`Updated task: ${_id} successfully`);

    const res = await taskApiGrpcClient.getTasks([_id]);
    const { tasks } = res as any;
    const [dbUpdatedTask] = tasks;
    compareUtils.compareTasks(dbUpdatedTask, updatedTask, true); 
  });

  it("should create & delete task", async () => {
    const task = {
      name: "Danny",
      status: "IN_PROGRESS",
    };
    const createRes = await taskApiGrpcClient.createTask(task);
    const { task: newTask } = createRes as any;
    const { _id } = newTask as any;
    expect(_id).to.not.be.undefined;
    compareUtils.compareTasks(newTask, task);

    const removeRes = await taskApiGrpcClient.removeTask(_id);
    const { message } = removeRes as any;
    expect(message).to.eql(`Deleted task: ${_id} successfully`);

    const res = await taskApiGrpcClient.getTasks([_id]);
    const { tasks } = res as any;
    expect(tasks?.length).to.eql(0);
  });
});