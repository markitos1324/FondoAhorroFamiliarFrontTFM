import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Abrir menú lateral</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Fondo Familiar de Ahorro
          </h1>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <button
            type="button"
            className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="sr-only">Ver notificaciones</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Menú de perfil */}
          <div className="ml-3 relative">
            <div>
              <button
                type="button"
                className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="sr-only">Abrir menú de usuario</span>
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <User className="h-5 w-5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};