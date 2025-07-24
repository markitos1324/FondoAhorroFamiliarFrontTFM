import React from 'react';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        )}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
};