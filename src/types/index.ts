export interface FamilyMember {
  id: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'member';
  joinedDate: string;
}

export interface Transaction {
  id: string;
  monto: number;
  tipo: 'INGRESO' | 'GASTO';
  descripcion: string;
  fecha: string;
  userEmail: string;
  frecuencia?: string;
}

export interface SavingsGoal {
  planId: number;
  nombre: string;
  meta: number;
  saldo: number;
  deadline?: string;
  description?: string;
  color?: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface RecurringContribution {
  id: string;
  memberId: string;
  amount: number;
  frequency: 'semanal' | 'quincenal' | 'mensual';
  startDate: string;
  active: boolean;
}