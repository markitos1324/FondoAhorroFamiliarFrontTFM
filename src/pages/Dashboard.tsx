import React from 'react';
import { StatCard } from '../components/StatCard';
import { TransactionItem } from '../components/TransactionItem';
import { GoalCard } from '../components/GoalCard';
//import { ChartCard } from '../components/ChartCard';
import { 
  DollarSign, 
  TrendingUp, 
  Wallet, 
  Calendar
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { getLastDayOfCurrentMonth } from '../helpers/helpers';
import { SavingsGoal } from '../types';

export const Dashboard: React.FC = () => {
  const transactions = useSelector((state: any) => state.transactionsReducer);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Resumen</h2>
          
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-6">
            <StatCard
              title="Saldo Total"
              value={`$${transactions.statistics.saldo}`}
              description="Saldo actual del fondo"
              icon={DollarSign}
              color="bg-blue-600"
            />
            <StatCard
              title="Aportes Mensuales"
              value={`$${transactions.monthstatistics.totalIncome}`}
              description="Depósitos de este mes"
              icon={TrendingUp}
              color="bg-green-600"
            />
            <StatCard
              title="Retiros Mensuales"
              value={`$${transactions.monthstatistics.totalExpense}`}
              description="Gastos de este mes"
              icon={Wallet}
              color="bg-red-600"
            />
            <StatCard
              title="Próximo Aporte"
              value={getLastDayOfCurrentMonth()}
              description=""
              icon={Calendar}
              color="bg-indigo-600"
            />
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-4">Transacciones Recientes</h2>
          
          <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
            <div className="px-4 py-5 sm:p-6">
              {transactions.transactions?.transactionsCurrentMonth?.length > 0 ? (
                <div className="space-y-1">
                  {transactions.transactions.transactionsCurrentMonth.slice(0,9).map((transaction: any) => (
                    <TransactionItem 
                      key={transaction.id} 
                      transaction={transaction} 
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No hay transacciones recientes
                </p>
              )}
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <button className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-150">
                  Ver todas las transacciones
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Metas de Ahorro</h2>
          
          <div className="space-y-6 mb-6">
            {transactions.plans.plansStatistics.slice(0, 2).map((plan: SavingsGoal) => (
              <GoalCard key={plan.planId} goal={plan} />
            ))}
          </div>

{/*           
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Actividad del Fondo</h2>
          <ChartCard 
            title="Flujo de Caja Mensual" 
            subtitle="Depósitos vs retiros de los últimos 6 meses"
          >
            <div className="h-64 flex items-center justify-center">
              <div className="space-y-4 w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-sm text-gray-600">Depósitos</span>
                  </div>
                  <div className="flex items-center">
                    <span className="h-3 w-3 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-sm text-gray-600">Retiros</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-6 gap-2">
                  {['Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr'].map((month) => (
                    <div key={month} className="flex flex-col items-center">
                      <div className="h-40 w-full flex flex-col justify-end space-y-1">
                        <div 
                          className="w-full bg-green-500 rounded-t"
                          style={{ height: `${30 + Math.random() * 70}%` }}
                        ></div>
                        <div 
                          className="w-full bg-red-500 rounded-t"
                          style={{ height: `${20 + Math.random() * 30}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-2">{month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ChartCard> */}
        </div>
      </div>
    </div>
  );
};