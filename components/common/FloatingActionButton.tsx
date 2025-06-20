
import React from 'react';

interface FloatingActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  tooltip?: string;
  colorClass?: string; // e.g., 'bg-blue-600 hover:bg-blue-700'
  size?: 'sm' | 'md' | 'lg';
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  tooltip,
  colorClass = 'bg-red-600 hover:bg-red-700',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'p-2 w-10 h-10 text-sm', // Smaller icon, smaller button
    md: 'p-3 w-14 h-14 text-base', // Default
    lg: 'p-4 w-16 h-16 text-lg', // Larger icon, larger button
  };

  return (
    <button
      title={tooltip}
      className={`fixed rounded-full text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ring-opacity-50 transition-all duration-150 ease-in-out group ${colorClass} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon}
      {tooltip && (
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {tooltip}
        </span>
      )}
    </button>
  );
};
