import { Router } from 'express';
import { createTaskHandler, getTasksHandler, getTaskHandler, updateTaskHandler, deleteTaskHandler } from '../handlers/tasks.js';

export const tasksRouter: Router = Router();

tasksRouter.get('/', getTasksHandler);
tasksRouter.post('/', createTaskHandler);
tasksRouter.get('/:id', getTaskHandler);
tasksRouter.put('/:id', updateTaskHandler);
tasksRouter.delete('/:id', deleteTaskHandler);
