import React, { useState } from 'react';
import { MemberCard } from '../components/MemberCard';
import { mockFamilyMembers } from '../data/mockData';
import { Plus, Search } from 'lucide-react';

export const Members: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = mockFamilyMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
 return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Miembros de la Familia</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Miembro
        </button>
      </div>

      <div className="mb-6">
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
            placeholder="Buscar miembros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontraron miembros que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  );
};