import { expect } from "chai";

export const compareTasks = (task1, task2, includeId?: boolean) => {
  const striptTask1 = stripToCompare(task1);
  const striptTask2 = stripToCompare(task2);
  expect(striptTask1).to.eql(striptTask2);
};

export const stripToCompare = (task, includeId?: boolean) => {
  let { __id, _id, ...rest } = task;

  if (includeId) {
    rest._id = _id;
  }
  return rest;
};
