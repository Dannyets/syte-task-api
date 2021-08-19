import { client } from "./grpc-client";

export const getTasks = async (ids?: string[]) => {
  return executeRequest('listTasks', { ids });
};

export const createTask = async (task) => {
  return executeRequest('createTask', task);
};

export const updateTask = async (task) => {
  return executeRequest('updateTask', task);
};

export const removeTask = async (id) => {
  return executeRequest('removeTask', { id });
};

export const createTasks = async (tasks) => {
  return executeRequest('createTasks', tasks);
};

export const updateTasks = async (tasks) => {
  return executeRequest('updateTasks', tasks);
};

export const removeTasks = async (ids: string[]) => {
  return executeRequest('removeTasks', { ids });
};


const executeRequest = async (endpoint, params) => {
  return new Promise((resolve, reject) => {
    client[endpoint](params, (err, res) => {
      if (err) {
        return reject(err);
      }

      return resolve(res);
    });
  });
};
