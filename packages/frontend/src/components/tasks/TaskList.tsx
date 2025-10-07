import { TaskItem } from './TaskItem';
import type { Task } from '@/types';

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (id: string, status: 'open' | 'done') => void;
  onDelete: (id: string) => void;
}

export const TaskList = ({ tasks, onToggleStatus, onDelete }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">Keine Aufgaben vorhanden</p>
        <p className="text-sm mt-2">Füge deine erste Aufgabe hinzu!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
