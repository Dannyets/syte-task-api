import { mongoClient } from "../../clients";

const TASK_COLLECTION_NAME = "tasks";

export const get = (ids?: string[]) =>
  ids
    ? mongoClient.getMany(TASK_COLLECTION_NAME, ids)
    : mongoClient.get(TASK_COLLECTION_NAME);

export const create = (task) => mongoClient.create(TASK_COLLECTION_NAME, task);

export const createMany = (tasks) =>
  mongoClient.insertMany(TASK_COLLECTION_NAME, tasks);

export const update = (task) =>
  mongoClient.updateOne(TASK_COLLECTION_NAME, task);

export const updateMany = (tasks) =>
  mongoClient.updateMany(TASK_COLLECTION_NAME, tasks);

export const patch = (id, task) =>
  mongoClient.updateOne(TASK_COLLECTION_NAME, { ...task, _id: id });

export const remove = (id) => mongoClient.remove(TASK_COLLECTION_NAME, id);

export const removeMany = (ids) => mongoClient.removeMany(TASK_COLLECTION_NAME, ids);
