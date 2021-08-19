import express from "express";
import { taskRouter } from "../api/task";

export const router = express.Router();

router.use('/task', taskRouter);
