import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const date = transaction.fecha;

  return (
    <div className="py-4 flex items-center justify-between hover:bg-gray-50 px-2 rounded-lg transition-colors duration-150">
      <div className="flex items-center space-x-4">
        <div className={`p-2 rounded-full ${transaction.tipo === 'INGRESO' ? 'bg-green-100' : 'bg-red-100'}`}>
          {transaction.tipo === 'INGRESO' ? (
            <ArrowUpRight className="h-5 w-5 text-green-600" />
          ) : (
            <ArrowDownLeft className="h-5 w-5 text-red-600" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            {transaction.descripcion}
          </p>
          <div className="flex items-center mt-1">
            <p className="text-xs text-gray-500 mr-2">
              {date}
            </p>
            <div className="flex items-center">
              <span 
                className="inline-block h-2 w-2 rounded-full mr-1"
                //style={{ backgroundColor: category?.color || '#9CA3AF' }}
              />
              <p className="text-xs text-gray-500">{transaction.frecuencia}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className={`text-sm font-medium ${
          transaction.tipo === 'INGRESO' ? 'text-green-600' : 'text-red-600'
        }`}>
          {transaction.tipo === 'INGRESO' ? '+' : '-'}${transaction.monto.toFixed(2)}
        </p>
        <p className="text-xs text-gray-500 mt-1">By {transaction.userEmail || 'Unknown member'}</p>
      </div>
    </div>
  );
};