import express from "express";
import * as taskController from "./task-controller";

export const taskRouter = express.Router();

taskRouter
.post('/bulk/', taskController.createMany)
.put('/bulk', taskController.updateMany)
.patch('/bulk', taskController.updateMany)
.delete('/bulk', taskController.removeMany);

taskRouter
  .get("/", taskController.get)
  .post("/", taskController.create)
  .put("/:id", taskController.update)
  .patch("/:id", taskController.update)
  .delete("/:id", taskController.remove);