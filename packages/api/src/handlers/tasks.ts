import { Request, Response, NextFunction } from 'express';
import { db } from '@app/database';
import { createTaskSchema, updateTaskSchema, taskFiltersSchema } from '../schemas/task.schema.js';
import { NotFoundError } from '../middleware/error-handler.js';

/**
 * GET /api/v1/tasks
 * List all tasks with optional filtering and sorting
 */
export async function getTasksHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Validate query parameters
    const filters = taskFiltersSchema.parse(req.query);

    // Extract sorting parameters
    const { sortBy, sortOrder, ...taskFilters } = filters;

    // Get tasks from database
    const tasks = await db.getTasks(taskFilters, { sortBy, sortOrder });
    const total = tasks.length;

    res.json({ tasks, total });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/tasks
 * Create a new task
 */
export async function createTaskHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Validate request body
    const data = createTaskSchema.parse(req.body);

    // Create task
    const task = await db.createTask(data);

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/tasks/:id
 * Get a task by ID
 */
export async function getTaskHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;

    const task = await db.getTaskById(id);

    if (!task) {
      throw new NotFoundError('Task not found');
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/v1/tasks/:id
 * Update a task
 */
export async function updateTaskHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;

    // Validate request body
    const data = updateTaskSchema.parse(req.body);

    // Ensure task exists
    const existingTask = await db.getTaskById(id);
    if (!existingTask) {
      throw new NotFoundError('Task not found');
    }

    // Update task
    const task = await db.updateTask(id, data);

    res.json(task);
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/v1/tasks/:id
 * Delete a task
 */
export async function deleteTaskHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;

    // Ensure task exists
    const existingTask = await db.getTaskById(id);
    if (!existingTask) {
      throw new NotFoundError('Task not found');
    }

    // Delete task
    await db.deleteTask(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
