import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Receipt, 
  Target, 
  Settings, 
  PiggyBank 
} from 'lucide-react';

type Page = 'dashboard' | 'members' | 'transactions' | 'goals' | 'settings';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  closeSidebar?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentPage, 
  setCurrentPage,
  closeSidebar
}) => {
  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
    if (closeSidebar) {
      closeSidebar();
    }
  };

  const navigationItems = [
    { name: 'Inicio', icon: LayoutDashboard, page: 'dashboard' as Page },
    { name: 'Miembros de la Familia', icon: Users, page: 'members' as Page },
    { name: 'Transacciones', icon: Receipt, page: 'transactions' as Page },
    { name: 'Metas de Ahorro', icon: Target, page: 'goals' as Page },
  ];

  return (
    <div className="h-0 flex-1 flex flex-col bg-white border-r border-gray-200">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <PiggyBank className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-semibold text-gray-900">Fondo Familiar</span>
        </div>
        <nav className="mt-8 flex-1 px-2 space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.page)}
              className={`${
                currentPage === item.page
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full transition-all duration-150`}
            >
              <item.icon 
                className={`${
                  currentPage === item.page ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                } mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-150`} 
              />
              {item.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">Familia Smith</p>
            <p className="text-xs font-medium text-gray-400">Fondo iniciado: Ene 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};