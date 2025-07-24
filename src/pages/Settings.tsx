import React from 'react';
import { ChevronRight } from 'lucide-react';

export const Settings: React.FC = () => {
  const settingsSections = [
    {
      title: 'General',
      items: [
        { name: 'Nombre del Fondo', value: 'Fondo Familiar Smith', editable: true },
        { name: 'Fondo Creado', value: '15 de enero de 2023', editable: false },
        { name: 'Moneda Predeterminada', value: 'USD ($)', editable: true },
      ],
    },
    {
      title: 'Notificaciones',
      items: [
        { name: 'Notificaciones por correo', value: 'Activadas', editable: true },
        { name: 'Recordatorios de aportes', value: 'Semanal', editable: true },
        { name: 'Alertas de logro de metas', value: 'Activadas', editable: true },
      ],
    },
    {
      title: 'Reglas de Aporte',
      items: [
        { name: 'Aporte mínimo', value: '$50.00', editable: true },
        { name: 'Penalización por atraso', value: 'Ninguna', editable: true },
        { name: 'Revisión de solicitud de retiro', value: 'Requerida', editable: true },
      ],
    },
    {
      title: 'Categorías de Gastos',
      items: [
        { name: 'Gestionar categorías', value: '6 categorías', editable: true },
        { name: 'Categoría predeterminada', value: 'Sin categorizar', editable: true },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Configuración</h1>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden divide-y divide-gray-200 mb-8">
        {settingsSections.map((section) => (
          <div key={section.title}>
            <div className="px-4 py-5 sm:px-6 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900">{section.title}</h2>
            </div>
            <div className="border-t border-gray-200 divide-y divide-gray-200">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.value}</p>
                    </div>
                    {item.editable && (
                      <button className="ml-4 flex items-center text-sm text-blue-600 hover:text-blue-500 transition-colors duration-150">
                        Editar
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-900">Gestión de Datos</h2>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-md font-medium text-gray-900">Exportar datos del fondo</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Descarga una exportación completa de los datos de tu fondo, incluyendo todas las transacciones, miembros y metas.</p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Exportar como CSV
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h2 className="text-lg font-medium text-red-600">Zona de Peligro</h2>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-md font-medium text-gray-900">Restablecer Fondo</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Restablece permanentemente todos los datos del fondo. Esta acción no se puede deshacer.
            </p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Restablecer Fondo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};