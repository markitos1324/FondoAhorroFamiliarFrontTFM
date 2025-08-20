import React from 'react';
import { FamilyMember } from '../types';
import { mockFamilyMembers } from '../data/mockData';
import { User } from 'lucide-react';

interface MemberCardProps {
  member: FamilyMember;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member }) => {

 return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            {member.avatar ? (
              <img src={getRandomAvatar()} alt={member.email} className="h-12 w-12 object-cover" />
            ) : (
              <User className="h-6 w-6 text-gray-500" />
            )}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{member.email}</h3>
            <div className="flex items-center mt-1">
              <span 
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  member.rol === 'ADMIN' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}
              >
                {member.rol === 'COLABORADOR' ? 'Administrador' : 'Miembro'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function getRandomAvatar() {
  const randomIndex = Math.floor(Math.random() * mockFamilyMembers.length);
  console.log("🚀 ~ getRandomAvatar ~ randomIndex:", randomIndex)
  return mockFamilyMembers[randomIndex].avatar;
}