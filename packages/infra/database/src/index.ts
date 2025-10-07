import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { mkdir } from 'fs/promises';
import { dirname } from 'path';
import { randomUUID } from 'crypto';

// ========== Types ==========

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

export interface CreateTaskDto {
  title: string;
  description?: string;
  dueDate?: string;
  category?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: 'open' | 'done';
  dueDate?: string | null;
  category?: string | null;
}

export interface DatabaseSchema {
  tasks: Task[];
  _meta: {
    version: string;
    createdAt: string;
  };
}

export interface TaskFilters {
  status?: 'open' | 'done';
  category?: string;
  search?: string;
}

export interface TaskSort {
  sortBy?: 'createdAt' | 'dueDate' | 'title';
  sortOrder?: 'asc' | 'desc';
}

// ========== Database Class ==========

export class Database {
  private db!: Low<DatabaseSchema>;
  private dbPath: string;
  private initialized = false;

  constructor(dbPath = './data/db.json') {
    this.dbPath = dbPath;
  }

  /**
   * Initialize the database
   * Creates parent directories if needed
   */
  async init(): Promise<void> {
    if (this.initialized) {
      return;
    }

    // Create parent directories
    await mkdir(dirname(this.dbPath), { recursive: true });

    // Initialize lowdb
    const adapter = new JSONFile<DatabaseSchema>(this.dbPath);
    this.db = new Low(adapter, this.getDefaultData());
    await this.db.read();

    // Initialize with default data if empty
    if (!this.db.data) {
      this.db.data = this.getDefaultData();
      await this.db.write();
    }

    this.initialized = true;
  }

  private getDefaultData(): DatabaseSchema {
    return {
      tasks: [],
      _meta: {
        version: '1.0.0',
        createdAt: new Date().toISOString(),
      },
    };
  }

  private ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error('Database not initialized. Call init() first.');
    }
  }

  // ========== Task CRUD Operations ==========

  /**
   * Get all tasks with optional filtering and sorting
   */
  async getTasks(filters?: TaskFilters, sort?: TaskSort): Promise<Task[]> {
    this.ensureInitialized();
    await this.db.read();

    let tasks = [...this.db.data.tasks];

    // Apply filters
    if (filters) {
      if (filters.status) {
        tasks = tasks.filter((t) => t.status === filters.status);
      }
      if (filters.category) {
        tasks = tasks.filter((t) => t.category === filters.category);
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        tasks = tasks.filter(
          (t) =>
            t.title.toLowerCase().includes(searchLower) ||
            t.description?.toLowerCase().includes(searchLower)
        );
      }
    }

    // Apply sorting
    if (sort?.sortBy) {
      const { sortBy, sortOrder = 'desc' } = sort;
      tasks.sort((a, b) => {
        let aVal: string | undefined;
        let bVal: string | undefined;

        if (sortBy === 'createdAt') {
          aVal = a.createdAt;
          bVal = b.createdAt;
        } else if (sortBy === 'dueDate') {
          aVal = a.dueDate;
          bVal = b.dueDate;
        } else if (sortBy === 'title') {
          aVal = a.title;
          bVal = b.title;
        }

        // Handle undefined values (push to end)
        if (!aVal && !bVal) return 0;
        if (!aVal) return 1;
        if (!bVal) return -1;

        const comparison = aVal.localeCompare(bVal);
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    return tasks;
  }

  /**
   * Get a task by ID
   */
  async getTaskById(id: string): Promise<Task | null> {
    this.ensureInitialized();
    await this.db.read();

    const task = this.db.data.tasks.find((t) => t.id === id);
    return task || null;
  }

  /**
   * Create a new task
   */
  async createTask(data: CreateTaskDto): Promise<Task> {
    this.ensureInitialized();
    await this.db.read();

    const now = new Date().toISOString();
    const task: Task = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      status: 'open',
      dueDate: data.dueDate,
      category: data.category,
      createdAt: now,
      updatedAt: now,
    };

    this.db.data.tasks.push(task);
    await this.db.write();

    return task;
  }

  /**
   * Update a task
   */
  async updateTask(id: string, data: UpdateTaskDto): Promise<Task> {
    this.ensureInitialized();
    await this.db.read();

    const task = this.db.data.tasks.find((t) => t.id === id);
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    // Update fields
    if (data.title !== undefined) task.title = data.title;
    if (data.description !== undefined) task.description = data.description;
    if (data.status !== undefined) task.status = data.status;

    // Handle nullable fields
    if (data.dueDate !== undefined) {
      task.dueDate = data.dueDate === null ? undefined : data.dueDate;
    }
    if (data.category !== undefined) {
      task.category = data.category === null ? undefined : data.category;
    }

    task.updatedAt = new Date().toISOString();

    await this.db.write();
    return task;
  }

  /**
   * Delete a task
   */
  async deleteTask(id: string): Promise<void> {
    this.ensureInitialized();
    await this.db.read();

    const index = this.db.data.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error(`Task with id ${id} not found`);
    }

    this.db.data.tasks.splice(index, 1);
    await this.db.write();
  }

  /**
   * Get task count (for total in list response)
   */
  async getTaskCount(filters?: TaskFilters): Promise<number> {
    const tasks = await this.getTasks(filters);
    return tasks.length;
  }
}

// ========== Singleton Export ==========

export const db = new Database();
