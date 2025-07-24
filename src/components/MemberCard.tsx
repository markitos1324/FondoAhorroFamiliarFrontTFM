import React from 'react';
import { FamilyMember } from '../types';
import { User } from 'lucide-react';

interface MemberCardProps {
  member: FamilyMember;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const joinedDate = new Date(member.joinedDate);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(joinedDate);

 return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            {member.avatar ? (
              <img src={member.avatar} alt={member.name} className="h-12 w-12 object-cover" />
            ) : (
              <User className="h-6 w-6 text-gray-500" />
            )}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
            <div className="flex items-center mt-1">
              <span 
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  member.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}
              >
                {member.role === 'admin' ? 'Administrador' : 'Miembro'}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                Se unió el {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3 flex justify-between">
        <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
          Ver aportes
        </button>
        <button className="text-sm font-medium text-gray-500 hover:text-gray-700">
          Editar
        </button>
      </div>
    </div>
  );
};