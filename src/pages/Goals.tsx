import React, { useState, useEffect } from 'react';
import { GoalCard } from '../components/GoalCard';
import { Plus } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { createPlan, getPlans, getPlanStatistics } from '../store/actions/ActionPlans';
import { showPlanForm } from '../helpers/showDepositForm';
import Swal from 'sweetalert2';
import { SavingsGoal } from '../types';

export const Goals: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.loginReducer.token);
  const plansStatistics = useSelector((state: any) => state.transactionsReducer.plans?.plansStatistics);
  const plansList = useSelector((state: any) => state.transactionsReducer.plans?.planList);
  const createdPlan = useSelector((state: any) => state.transactionsReducer.plans?.createdPlan);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [hasShownPlan, setHasShownPlan] = useState(false);

  const filteredPlans = plansStatistics.filter((plan: any) =>
    plan.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPlans.length / itemsPerPage);
  const paginatedPlans = filteredPlans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Cuando la lista de planes cambia, obtener estadísticas de cada plan
  useEffect(() => {
    if (Array.isArray(plansList) && plansList.length > 0 && token) {
      plansList.forEach((plan: any) => {
        if (plan.id) {
          // @ts-ignore
          dispatch(getPlanStatistics(token, plan.id));
        }
      });
    }
  }, [plansList, token, dispatch]);

  useEffect(() => {
    if (hasShownPlan && createdPlan && createdPlan.status === 201) {
      Swal.fire('Plan creado', 'El plan ha sido registrado.', 'success');
      setHasShownPlan(false);
      // Refrescar la lista de transacciones
      if (token) {
        // @ts-ignore
        dispatch(getPlans(token));
        // @ts-ignore
      }
    }
  }, [createdPlan, hasShownPlan, token, dispatch]);

  const handleCreatePlanClick = () => {
      showPlanForm((data) => {
       // Aquí puedes despachar la acción para crear el plan
       // @ts-ignore
      dispatch(createPlan(token, data));
      setHasShownPlan(true);

      });
    };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Metas de Ahorro</h1>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
          onClick={handleCreatePlanClick}
        >
          <Plus className="h-4 w-4 mr-2" />
          Crear Meta
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2"
          placeholder="Buscar metas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedPlans.map((plan: SavingsGoal) => (          
          <GoalCard key={plan.planId || plan.nombre} goal={plan} />
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontraron metas que coincidan con tu búsqueda.</p>
          <p className="mt-1 text-sm text-gray-400">Intenta con otro término o crea una nueva meta.</p>
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-6">
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
                <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredPlans.length)}</span> de{' '}
                <span className="font-medium">{filteredPlans.length}</span> metas
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
                  {/* ...svg... */}
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
                  {/* ...svg... */}
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};