import { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Members } from './pages/Members';
import { Transactions } from './pages/Transactions';
import { Goals } from './pages/Goals';
import { Settings } from './pages/Settings';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentMonthRange } from "./helpers/helpers";
import { getMonthlyStatistics, getStatistics } from './store/actions/ActionStatistics';
import { filterTransactionsByDate } from './store/actions/ActionTransactions';
import { getPlans } from './store/actions/ActionPlans';

type Page = 'login' | 'dashboard' | 'members' | 'transactions' | 'goals' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.loginReducer.token);

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login setCurrentPage={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard />;
      case 'members':
        return <Members />;
      case 'transactions':
        return <Transactions />;
      case 'goals':
        return <Goals />;
      case 'settings':
        return <Settings />;
      default:
        return <Login setCurrentPage={setCurrentPage} />;
    }
  };

    useEffect(() => {
      if (!token) return;
      // @ts-ignore
      dispatch(getStatistics(token));
      const { from, to } = getCurrentMonthRange();
      // @ts-ignore
      dispatch(getMonthlyStatistics(token, from, to));
      // @ts-ignore
      dispatch(filterTransactionsByDate(token, from, to));
      // @ts-ignore
      dispatch(getPlans(token));
    }, [token]);

  // Si la página es login, solo renderiza el login, sin layout
  if (currentPage === 'login') {
    return renderPage();
  }
  // Si no, renderiza el layout completo
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} fixed inset-0 z-40 lg:hidden`}>
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" 
          onClick={() => setSidebarOpen(false)}
        />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} closeSidebar={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;