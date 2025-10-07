import { useState } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Checkbox } from '../common/Checkbox';
import { Button } from '../common/Button';
import type { Task } from '@/types';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: string, status: 'open' | 'done') => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ task, onToggleStatus, onDelete }: TaskItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCheckboxChange = () => {
    const newStatus = task.status === 'open' ? 'done' : 'open';
    onToggleStatus(task.id, newStatus);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    try {
      return format(new Date(dateString), 'dd.MM.yyyy HH:mm', { locale: de });
    } catch {
      return null;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.status === 'done'}
          onChange={handleCheckboxChange}
          className="mt-1"
        />

        <div className="flex-1 min-w-0">
          <div
            className="cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <h3
              className={`text-lg font-medium ${
                task.status === 'done' ? 'line-through text-gray-500' : 'text-gray-900'
              }`}
            >
              {task.title}
            </h3>

            {task.category && (
              <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded">
                {task.category}
              </span>
            )}

            {task.dueDate && (
              <p className="mt-1 text-sm text-gray-600">
                Fällig: {formatDate(task.dueDate)}
              </p>
            )}
          </div>

          {isExpanded && task.description && (
            <p className="mt-2 text-gray-700 whitespace-pre-wrap">{task.description}</p>
          )}

          {isExpanded && (
            <p className="mt-2 text-xs text-gray-500">
              Erstellt: {formatDate(task.createdAt)}
            </p>
          )}
        </div>

        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(task.id)}
        >
          Löschen
        </Button>
      </div>
    </div>
  );
};
