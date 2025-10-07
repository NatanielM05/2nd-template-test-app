import { useState } from 'react';
import { Card } from '@/components/common/Card';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskFilters } from '@/components/tasks/TaskFilters';
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from '@/hooks/useTasks';
import type { TaskFilters as TaskFiltersType } from '@/types';

export const TasksPage = () => {
  const [filters, setFilters] = useState<TaskFiltersType>({
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const { data, isLoading, error } = useTasks(filters);
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const handleCreateTask = async (taskData: any) => {
    try {
      // Convert datetime-local to ISO string
      if (taskData.dueDate) {
        taskData.dueDate = new Date(taskData.dueDate).toISOString();
      }
      await createTask.mutateAsync(taskData);
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const handleToggleStatus = async (id: string, status: 'open' | 'done') => {
    try {
      await updateTask.mutateAsync({ id, payload: { status } });
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (window.confirm('Möchtest du diese Aufgabe wirklich löschen?')) {
      try {
        await deleteTask.mutateAsync(id);
      } catch (err) {
        console.error('Failed to delete task:', err);
      }
    }
  };

  const openTasks = data?.tasks.filter((t) => t.status === 'open') || [];
  const doneTasks = data?.tasks.filter((t) => t.status === 'done') || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">ToDo App</h1>
          <p className="text-gray-600">
            Verwalte deine Aufgaben effizient und übersichtlich
          </p>
        </header>

        <div className="space-y-6">
          {/* Task Form */}
          <Card>
            <h2 className="text-xl font-semibold mb-4">Neue Aufgabe</h2>
            <TaskForm onSubmit={handleCreateTask} isLoading={createTask.isPending} />
          </Card>

          {/* Filters */}
          <TaskFilters filters={filters} onFilterChange={setFilters} />

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="text-center">
              <p className="text-3xl font-bold text-primary-600">{data?.total || 0}</p>
              <p className="text-sm text-gray-600">Gesamt</p>
            </Card>
            <Card className="text-center">
              <p className="text-3xl font-bold text-yellow-600">{openTasks.length}</p>
              <p className="text-sm text-gray-600">Offen</p>
            </Card>
            <Card className="text-center">
              <p className="text-3xl font-bold text-green-600">{doneTasks.length}</p>
              <p className="text-sm text-gray-600">Erledigt</p>
            </Card>
          </div>

          {/* Task List */}
          <div>
            {isLoading && (
              <Card>
                <p className="text-center text-gray-500">Lade Aufgaben...</p>
              </Card>
            )}

            {error && (
              <Card>
                <p className="text-center text-red-600">
                  Fehler beim Laden der Aufgaben: {error.message}
                </p>
              </Card>
            )}

            {data && (
              <TaskList
                tasks={data.tasks}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDeleteTask}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
