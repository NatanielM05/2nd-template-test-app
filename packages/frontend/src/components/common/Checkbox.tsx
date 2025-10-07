import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className="flex items-center cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          className={clsx(
            'w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500',
            className
          )}
          {...props}
        />
        {label && <span className="ml-2 text-gray-700">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
