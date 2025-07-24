import React, { useEffect, useState } from 'react';
import { ProgressBar } from './ProgressBar';
import { SavingsGoal } from '../types';
import Swal from 'sweetalert2';
import { getPlans } from '../store/actions/ActionPlans';
import { showTransactionInPlanForm } from '../helpers/showDepositForm';
import { useDispatch, useSelector } from 'react-redux';
import { createTransactionInPlan } from '../store/actions/ActionTransactions';

interface GoalCardProps {
  goal: SavingsGoal;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {

  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.loginReducer.token);
  const completeTransaction = useSelector((state: any) => state.transactionsReducer.completeTransaction);
  const [hasShownTransaction, setHasShownTransaction] = useState(false);
  const percentComplete = Math.round((goal.saldo / goal.meta) * 100);
  const remaining = goal.meta - goal.saldo;
  let deadline = '';
  if (goal.deadline) {
    const date = new Date(goal.deadline);
    deadline = new Intl.DateTimeFormat('es-ES', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  }
  
  const handleCreatePlanClick = () => {
    showTransactionInPlanForm((data) => {
    // @ts-ignore
    dispatch(createTransactionInPlan(token, data));
    setHasShownTransaction(true);
    console.log('Contribuir a meta:', data);
  }, goal.planId, goal.nombre)
  };

  useEffect(() => {
    if (hasShownTransaction && completeTransaction && completeTransaction.status === 201) {
      Swal.fire('Contribución realizada', 'La transacción ha sido registrada.', 'success');
      setHasShownTransaction(false);
      if (token) {
        // @ts-ignore
        dispatch(getPlans(token));
      }
    }
  }, [completeTransaction, hasShownTransaction, token, dispatch]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900">{goal.nombre}</h3>
          <span 
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            style={{ 
              backgroundColor: `${goal.color}20`, 
              color: goal.color 
            }}
          >
            {percentComplete}% Completado
          </span>
        </div>
        
        {goal.description && (
          <p className="mt-1 text-sm text-gray-500">{goal.description}</p>
        )}
        
        <div className="mt-4 space-y-4">
          <ProgressBar 
            value={goal.saldo} 
            max={goal.meta} 
            color={goal.color || 'bg-blue-600'}
            height="h-3"
            showValue={false}
          />
          
          <div className="flex justify-between text-sm">
            <div>
              <span className="text-gray-500">Actual: </span>
              <span className="font-medium text-gray-900">
                ${goal.saldo.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Meta: </span>
              <span className="font-medium text-gray-900">
                ${goal.meta.toFixed(2)}
              </span>
            </div>
          </div>
          
          <div className="flex justify-between text-sm">
            <div>
              <span className="text-gray-500">Restante: </span>
              <span className="font-medium text-gray-900">
                ${remaining.toFixed(2)}
              </span>
            </div>
            {deadline && (
              <div>
                <span className="text-gray-500">Fecha límite: </span>
                <span className="font-medium text-gray-900">{deadline}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <button
          className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-150"
          onClick={handleCreatePlanClick}
        >
          Contribuir a esta meta
        </button>
      </div>
    </div>
  );
};