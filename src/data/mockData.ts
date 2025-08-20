import { FamilyMember, Transaction, SavingsGoal, ExpenseCategory, RecurringContribution } from '../types';

export const mockFamilyMembers: FamilyMember[] = [
  {
    id: '1',
    email: 'John Smith',
    role: 'admin',
    joinedDate: '2023-01-15',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '2',
    email: 'Maria Smith',
    role: 'admin',
    joinedDate: '2023-01-15',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '3',
    email: 'David Smith',
    role: 'member',
    joinedDate: '2023-03-10',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '4',
    email: 'Sofía Smith',
    role: 'member',
    joinedDate: '2023-05-22',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 500,
    type: 'deposit',
    description: 'Aporte mensual',
    date: '2025-04-01T10:30:00',
    memberId: '1',
    category: 'Aporte regular'
  },
  {
    id: '2',
    amount: 300,
    type: 'deposit',
    description: 'Aporte mensual',
    date: '2025-04-01T14:45:00',
    memberId: '2',
    category: 'Aporte regular'
  },
  {
    id: '3',
    amount: 100,
    type: 'deposit',
    description: 'Ahorro extra',
    date: '2025-04-05T09:15:00',
    memberId: '3',
    category: 'Aporte extra'
  },
  {
    id: '4',
    amount: 150,
    type: 'deposit',
    description: 'Ahorro regalo de cumpleaños',
    date: '2025-04-10T16:20:00',
    memberId: '4',
    category: 'Regalo'
  },
  {
    id: '5',
    amount: 200,
    type: 'withdrawal',
    description: 'Reparación de auto por emergencia',
    date: '2025-04-15T11:00:00',
    memberId: '1',
    category: 'Emergencia'
  },
  {
    id: '6',
    amount: 50,
    type: 'deposit',
    description: 'Aporte por bono',
    date: '2025-04-20T13:40:00',
    memberId: '3',
    category: 'Bono'
  },
  {
    id: '7',
    amount: 350,
    type: 'withdrawal',
    description: 'Compra de electrodoméstico',
    date: '2025-04-22T15:10:00',
    memberId: '2',
    category: 'Gasto planificado'
  }
];

export const mockSavingsGoals: SavingsGoal[] = [
  {
    id: '1',
    title: 'Vacaciones Familiares',
    targetAmount: 3000,
    currentAmount: 1750,
    deadline: '2025-12-31',
    description: 'Viaje de verano a la playa',
    color: '#0891B2'
  },
  {
    id: '2',
    title: 'Refrigerador Nuevo',
    targetAmount: 1200,
    currentAmount: 800,
    deadline: '2025-08-15',
    description: 'Reemplazar electrodoméstico de cocina viejo',
    color: '#4338CA'
  },
  {
    id: '3',
    title: 'Fondo de Emergencia',
    targetAmount: 5000,
    currentAmount: 2500,
    description: 'Para gastos inesperados',
    color: '#B45309'
  }
];

export const mockExpenseCategories: ExpenseCategory[] = [
  { id: '1', name: 'Aporte regular', color: '#2563EB' },
  { id: '2', name: 'Aporte extra', color: '#0D9488' },
  { id: '3', name: 'Regalo', color: '#EAB308' },
  { id: '4', name: 'Bono', color: '#059669' },
  { id: '5', name: 'Emergencia', color: '#DC2626' },
  { id: '6', name: 'Gasto planificado', color: '#9333EA' }
];

export const mockRecurringContributions: RecurringContribution[] = [
  {
    id: '1',
    memberId: '1',
    amount: 500,
    frequency: 'mensual',
    startDate: '2025-01-01',
    active: true
  },
  {
    id: '2',
    memberId: '2',
    amount: 300,
    frequency: 'mensual',
    startDate: '2025-01-01',
    active: true
  },
  {
    id: '3',
    memberId: '3',
    amount: 100,
    frequency: 'quincenal',
    startDate: '2025-02-15',
    active: true
  },
  {
    id: '4',
    memberId: '4',
    amount: 75,
    frequency: 'semanal',
    startDate: '2025-03-01',
    active: false
  }
];