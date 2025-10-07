import { Input } from '../common/Input';
import { Button } from '../common/Button';
import type { TaskFilters as TaskFiltersType } from '@/types';

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onFilterChange: (filters: TaskFiltersType) => void;
}

export const TaskFilters = ({ filters, onFilterChange }: TaskFiltersProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <div className="flex gap-2">
        <Button
          variant={filters.status === undefined ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onFilterChange({ ...filters, status: undefined })}
        >
          Alle
        </Button>
        <Button
          variant={filters.status === 'open' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onFilterChange({ ...filters, status: 'open' })}
        >
          Offen
        </Button>
        <Button
          variant={filters.status === 'done' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onFilterChange({ ...filters, status: 'done' })}
        >
          Erledigt
        </Button>
      </div>

      <Input
        placeholder="Aufgaben durchsuchen..."
        value={filters.search || ''}
        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
      />

      <div className="flex gap-2">
        <select
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={filters.sortBy || 'createdAt'}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              sortBy: e.target.value as TaskFiltersType['sortBy'],
            })
          }
        >
          <option value="createdAt">Erstellungsdatum</option>
          <option value="dueDate">Fälligkeitsdatum</option>
          <option value="title">Titel</option>
        </select>

        <select
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={filters.sortOrder || 'desc'}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              sortOrder: e.target.value as TaskFiltersType['sortOrder'],
            })
          }
        >
          <option value="asc">Aufsteigend</option>
          <option value="desc">Absteigend</option>
        </select>
      </div>
    </div>
  );
};
