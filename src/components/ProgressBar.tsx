import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  label?: string;
  showValue?: boolean;
  height?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  color = 'bg-blue-600',
  label,
  showValue = true,
  height = 'h-2',
}) => {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showValue && (
            <span className="text-sm font-medium text-gray-500">
              {percentage}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${height}`}>
        <div
          className={`${color} rounded-full ${height} transition-all duration-500 ease-in-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};