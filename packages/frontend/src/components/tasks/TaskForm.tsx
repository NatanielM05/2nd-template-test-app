import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import type { CreateTaskRequest } from '@/types';

const taskSchema = z.object({
  title: z.string().min(1, 'Titel ist erforderlich').max(200, 'Titel darf maximal 200 Zeichen haben'),
  description: z.string().max(2000, 'Beschreibung darf maximal 2000 Zeichen haben').optional(),
  dueDate: z.string().optional(),
  category: z.string().max(50, 'Kategorie darf maximal 50 Zeichen haben').optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  onSubmit: (data: CreateTaskRequest) => void;
  isLoading?: boolean;
}

export const TaskForm = ({ onSubmit, isLoading }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const handleFormSubmit = (data: TaskFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        {...register('title')}
        placeholder="Neue Aufgabe hinzufügen..."
        error={errors.title?.message}
        autoFocus
      />

      <textarea
        {...register('description')}
        placeholder="Beschreibung (optional)"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
        rows={3}
      />
      {errors.description && (
        <p className="text-sm text-red-600">{errors.description.message}</p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Input
          {...register('dueDate')}
          type="datetime-local"
          label="Fälligkeitsdatum"
          error={errors.dueDate?.message}
        />

        <Input
          {...register('category')}
          placeholder="Kategorie"
          label="Kategorie"
          error={errors.category?.message}
        />
      </div>

      <Button type="submit" isLoading={isLoading} className="w-full">
        Aufgabe hinzufügen
      </Button>
    </form>
  );
};
