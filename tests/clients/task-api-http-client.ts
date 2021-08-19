import { app } from "../../src/app";
import request from "supertest";

const TASKS_API_URL = "/api/task";

export const getTasks = async (ids?: string[]) => {
  const queryString = ids ? `?ids=${ids.join(',')}` : ''
  return await request(app).get(`${TASKS_API_URL}${queryString}`).send().expect(200);
};

export const createTask = async (task) => {
  return await request(app).post(TASKS_API_URL).send(task).expect(201);
};

export const updateTask = async (id, task) => {
  return await request(app)
    .put(`${TASKS_API_URL}/${id}`)
    .send(task)
    .expect(200);
};

export const patchTask = async (id, task) => {
  return await request(app)
    .patch(`${TASKS_API_URL}/${id}`)
    .send(task)
    .expect(200);
};

export const removeTask = async (id) => {
  return await request(app).delete(`${TASKS_API_URL}/${id}`).send().expect(200);
};
