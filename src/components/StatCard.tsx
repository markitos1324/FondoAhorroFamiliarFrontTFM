import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  trend?: {
    value: number;
    label: string;
  };
  icon: LucideIcon;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  trend,
  icon: Icon,
  color,
}) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-200 hover:shadow-md">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3 ${color}`}>
            <Icon className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd>
                <div className="text-lg font-semibold text-gray-900">{value}</div>
              </dd>
              {description && (
                <dd className="mt-1 text-sm text-gray-500">{description}</dd>
              )}
            </dl>
          </div>
        </div>
      </div>
      {trend && (
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm">
            <span
              className={`font-medium ${
                trend.value >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>{' '}
            <span className="text-gray-500">{trend.label}</span>
          </div>
        </div>
      )}
    </div>
  );
};