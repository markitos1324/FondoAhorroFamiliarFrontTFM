import React, { useEffect, useState } from 'react';
import { TransactionItem } from '../components/TransactionItem';
import { Search, Plus } from 'lucide-react';
import Swal from 'sweetalert2';
import { showTransactionForm } from '../helpers/showDepositForm';
import { useSelector, useDispatch } from 'react-redux';
import { createTransaction, getTransactions } from '../store/actions/ActionTransactions';
import { Transaction } from '../types';


export const Transactions: React.FC = () => {

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'INGRESO' | 'GASTO'>('all');
  const [filterFrequency, setFilterFrequency] = useState<string>('all');

  const token = useSelector((state: any) => state.loginReducer.token);
  const completeDeposit = useSelector((state: any) => state.transactionsReducer.completeTransaction);
  const transactions = useSelector((state: any) => state.transactionsReducer.transactions);
  
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [hasShownDeposit, setHasShownDeposit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

 
  useEffect(() => {
    if (token) {
      // @ts-ignore
      dispatch(getTransactions(token));
    }
  }, [token, dispatch]);

 
  useEffect(() => {
    if (transactions && Array.isArray(transactions.allTransactions)) {
      setAllTransactions(transactions.allTransactions);
    } else if (Array.isArray(transactions.allTransactions)) {
      setAllTransactions(transactions.allTransactions);
    }
  }, [transactions]);

  useEffect(() => {
    if (hasShownDeposit && completeDeposit && completeDeposit.status === 201) {
      Swal.fire('Depósito creado', 'El depósito ha sido registrado.', 'success');
      setHasShownDeposit(false);
      // Refrescar la lista de transacciones
      if (token) {
        // @ts-ignore
        dispatch(getTransactions(token));
      }
    }
  }, [completeDeposit, hasShownDeposit, token, dispatch]);

    const filteredTransactions = allTransactions
    .filter(transaction  => 
      transaction.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(transaction => 
      filterType === 'all' ? true : transaction.tipo === filterType
    )
    .filter(transaction => 
      filterFrequency === 'all' ? true : transaction.frecuencia === filterFrequency
    )
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  // PAGINACIÓN
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Resetear página al filtrar
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType/*, filterCategory*/]);

  
  const handleDepositClick = () => {
    showTransactionForm((data) => {
      // @ts-ignore
      dispatch(createTransaction(token, data));
      setHasShownDeposit(true);
    }, 'INGRESO');
  };

  const handleWithdrawClick = () => {
    showTransactionForm((data) => {
      // @ts-ignore
      dispatch(createTransaction(token, data));
      setHasShownDeposit(true);
    }, 'GASTO');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Transacciones</h1>
        <div className="flex space-x-2">
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
            onClick={handleDepositClick}
          >
            <Plus className="h-4 w-4 mr-2" />
            Depositar
          </button>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
            onClick={handleWithdrawClick}
          >
            <Plus className="h-4 w-4 mr-2" />
            Retirar
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                  placeholder="Buscar transacciones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
              >
                <option value="all">Todos los tipos</option>
                <option value="INGRESO">Solo depósitos</option>
                <option value="GASTO">Solo retiros</option>
              </select>

              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filterFrequency}
                onChange={(e) => setFilterFrequency(e.target.value)}
              >
                <option value="all">Todas las frecuencias</option>
                <option value="DIARIA">Diaria</option>
                <option value="SEMANAL">Semanal</option>
                <option value="MENSUAL">Mensual</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {paginatedTransactions.length > 0 ? (
            paginatedTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500">No se encontraron transacciones.</p>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <button
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a{' '}
                <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredTransactions.length)}</span> de{' '}
                <span className="font-medium">{filteredTransactions.length}</span> transacciones
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Paginación">
                <button
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <span className="sr-only">Anterior</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  {currentPage}
                </span>
                <button
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <span className="sr-only">Siguiente</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
      );
};