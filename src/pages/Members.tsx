import React, { useEffect, useState } from 'react';
import { MemberCard } from '../components/MemberCard';
import { mockFamilyMembers } from '../data/mockData';
import { Plus, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addMember, clear, getMembers } from '../store/actions/ActionMembers';
import { FamilyMember } from '../types';
import { showAddMember } from '../helpers/showDepositForm';
import Swal from 'sweetalert2';

export const Members: React.FC = () => {
    const dispatch = useDispatch();
  
  const [searchTerm, setSearchTerm] = useState('');
  const token = useSelector((state: any) => state.loginReducer.token);
  const members = useSelector((state: any) => state.transactionsReducer.members);
  const addMemberResponse = useSelector((state: any) => state.transactionsReducer.addMember);
  
  useEffect(() => {
    // @ts-ignore
    dispatch(getMembers(token));
  }, []);

  useEffect(() => {
    console.log(addMemberResponse);
    
    if (addMemberResponse && addMemberResponse === "Usuario no existe.") {
      Swal.fire('Miembro no encontrado', 'El miembro no ha sido agregado.', 'error');
      
    // @ts-ignore
      dispatch(clear());
    }else if (addMemberResponse && addMemberResponse.rol) {
      Swal.fire('Miembro agregado', 'El miembro ha sido agregado.', 'success');
    // @ts-ignore
      dispatch(clear());
    }
  }, [addMemberResponse]);

  const filteredMembers = members.filter((member: FamilyMember) => 
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

    const handleAddMember = () => {
        showAddMember((data) => {
         // Aquí puedes despachar la acción para crear el plan
         // @ts-ignore
        dispatch(addMember(token, data.email, data.rol));
        //setHasShownPlan(true);
  
        });
      };
  
 return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Miembros de la Familia</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
          onClick={() => handleAddMember()}>
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
        {
          filteredMembers.map((member:FamilyMember) => (
            <MemberCard key={member.email} member={member} />
          ))
        }
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontraron miembros que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  );
};