export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'open' | 'done';
  dueDate?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  dueDate?: string;
  category?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: 'open' | 'done';
  dueDate?: string | null;
  category?: string | null;
}

export interface TaskFilters {
  status?: 'open' | 'done';
  category?: string;
  search?: string;
  sortBy?: 'createdAt' | 'dueDate' | 'title';
  sortOrder?: 'asc' | 'desc';
}
