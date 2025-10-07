import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export interface ApiError extends Error {
  statusCode?: number;
  details?: unknown;
}

export function errorHandler(
  err: ApiError | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Error:', err);

  // Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'ValidationError',
      message: 'Invalid request data',
      details: err.errors,
    });
    return;
  }

  // Custom API errors
  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected error occurred';

  res.status(statusCode).json({
    error: err.name || 'InternalServerError',
    message,
    details: err.details,
  });
}

export class NotFoundError extends Error implements ApiError {
  statusCode = 404;
  constructor(message: string) {
    super(message);
    this.name = 'NotFound';
  }
}

export class BadRequestError extends Error implements ApiError {
  statusCode = 400;
  constructor(message: string, public details?: unknown) {
    super(message);
    this.name = 'BadRequest';
  }
}
