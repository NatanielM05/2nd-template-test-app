import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be at most 200 characters'),
  description: z.string().max(2000, 'Description must be at most 2000 characters').optional(),
  dueDate: z.string().datetime('Invalid date format').optional(),
  category: z.string().max(50, 'Category must be at most 50 characters').optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty').max(200, 'Title must be at most 200 characters').optional(),
  description: z.string().max(2000, 'Description must be at most 2000 characters').optional(),
  status: z.enum(['open', 'done']).optional(),
  dueDate: z.string().datetime('Invalid date format').nullable().optional(),
  category: z.string().max(50, 'Category must be at most 50 characters').nullable().optional(),
});

export const taskFiltersSchema = z.object({
  status: z.enum(['open', 'done']).optional(),
  category: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['createdAt', 'dueDate', 'title']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type TaskFiltersInput = z.infer<typeof taskFiltersSchema>;
