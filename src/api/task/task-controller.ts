import * as taskService from './task-service';
import { parseIds } from '../../utils';

export const get = async (req, res, next) => {
    try {
        const { query } = req;
        const { ids } = query;
        const taskIds = parseIds(ids);
        const tasks = await taskService.get(taskIds);
        return res.status(200).json({ tasks });
    } catch (err) {
        return next(err);
    }
}

export const create = async (req, res, next) => {
    try {
        const { body } = req
        const task = await taskService.create(body);
        return res.status(201).json({ task });
    } catch (err) {
        return next(err);
    }
}

export const update = async (req, res, next) => {
    try {
        const { body, params } = req;
        const { id } = params;
        const task = { ...body, _id: id };
        await taskService.update(task);
        return res.status(200).json({ message: `Updated task: ${id} successfully` });
    } catch (err) {
        return next(err);
    }
}

export const remove = async (req, res, next) => {
    try {
        const { params } = req;
        const { id } = params;
        await taskService.remove(id);
        return res.status(200).send({ message: `Deleted task: ${id} successfully` });
    } catch (err) {
        return next(err);
    }
}

export const createMany = async (req, res, next) => {
    try {
        const { body } = req;
        const tasks = await taskService.createMany(body);
        return res.status(200).json({ tasks });
    } catch (err) {
        return next(err);
    }
}

export const updateMany = async (req, res, next) => {
    try {
        const { body: tasks } = req;
        await taskService.updateMany(tasks);
        const ids = tasks.map(t => t._id).join(',');
        return res.status(200).json({ message: `Updated tasks: ${ids} successfully.` });
    } catch (err) {
        return next(err);
    }
}

export const removeMany = async (req, res, next) => {
    try {
        const { query } = req;
        const { ids } = query;
        const taskIds = parseIds(ids);
        await taskService.removeMany(taskIds);
        return res.status(200).json({ message: `Deleted tasks: ${ids} successfully.` });
    } catch (err) {
        return next(err);
    }
}