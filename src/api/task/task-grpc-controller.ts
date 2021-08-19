import * as taskGrpcController from "./task-service";

export const get = async (message, callback) => {
  try {
    const { request } = message;
    const { ids } = request;
    const tasks = await taskGrpcController.get(ids);
    return callback(null, { tasks });
  } catch (err) {
    return callback(err, null);
  }
};

export const create = async (message, callback) => {
  try {
    const { request: task } = message;
    const newTask = await taskGrpcController.create(task);
    return callback(null, { task: newTask });
  } catch (err) {
    return callback(err, null);
  }
};

export const update = async (message, callback) => {
  try {
    const { request } = message;
    const task = request;
    await taskGrpcController.update(task);
    const { _id } = task;
    return callback(null, { message: `Updated task: ${_id} successfully` });
  } catch (err) {
    return callback(err, null);
  }
};

export const remove = async (message, callback) => {
  try {
    const { request } = message;
    const { id } = request;
    await taskGrpcController.remove(id);
    return callback(null, { message: `Deleted task: ${id} successfully` });
  } catch (err) {
    return callback(err, null);
  }
};

export const createMany = async (message, callback) => {
  try {
    const { request } = message;
    const { tasks } = request;
    const newTasks = await taskGrpcController.createMany(tasks);
    return callback(null, { tasks: newTasks });
  } catch (err) {
    return callback(err, null);
  }
};

export const updateMany = async (message, callback) => {
  try {
    const { request } = message;
    const { tasks } = request;
    await taskGrpcController.updateMany(tasks);
    const ids = tasks.map((t) => t._id).join(",");
    return callback(null, { message: `Updated tasks: ${ids} successfully.` });
  } catch (err) {
    return callback(err, null);
  }
};

export const removeMany = async (message, callback) => {
  try {
    const { request } = message;
    const { ids } = request;
    await taskGrpcController.removeMany(ids);
    return callback(null, { message: `Removed tasks: ${ids} successfully.` });
  } catch (err) {
    return callback(err, null);
  }
};
