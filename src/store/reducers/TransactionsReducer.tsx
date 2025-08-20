import { Members } from "../../pages/Members";
import { SavingsGoal } from "../../types";
import { addMember } from "../actions/ActionMembers";
import { GET_TRANSACTIONS, GET_STATISTICS, GET_MONTHLY_STATISTICS, GET_PLANS, GET_PLAN_STATISTICS, GET_TRANSACTIONS_FILTERED, CREATE_TRANSACTION, CREATE_PLAN, GET_MEMBERS, ADD_MEMBER, CLEAR } from "../constant/Constant";

const initialState = {
  transactions: {},
  statistics: [],
  monthstatistics: [],
  members: [],
  addMember: {},
  plans: {
    plansStatistics: [],
  },
  data: [],
};

export default function transactionsReducer(state = initialState, action: any) {
  switch (action.type) {
    // TRANSACTIONS
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          allTransactions: action.payload.data
        }
      };
    case GET_TRANSACTIONS_FILTERED:
      return {
        ...state,
        transactions:  {
          ...state.transactions,
          transactionsCurrentMonth: action.payload.data
        }
      };
    case CREATE_TRANSACTION:
      return {
        ...state,
        completeTransaction: action.payload
      };
    // STATISTICS
    case GET_STATISTICS:
      return {
        ...state,
        statistics: action.payload.data,
      };
    case GET_MONTHLY_STATISTICS:
      return {
        ...state,
        monthstatistics: action.payload.data,
      };
    // PLANS
    case GET_PLANS:
      return {
        ...state,
        plans: {
          ...state.plans,
          planList: action.payload.data,
          plansStatistics: [], // Clear statistics when plans list is refreshed
        },
      };
    case GET_PLAN_STATISTICS:
      // Replace or update statistics for the specific plan
      const updatedStats = [
        ...state.plans.plansStatistics.filter((stat:SavingsGoal) => stat.planId !== action.payload.data.planId),
        action.payload.data
      ];
      return {
        ...state,
        plans: {
          ...state.plans,
          plansStatistics: updatedStats,
        },
      };
    case CREATE_PLAN:
      return {
        ...state,
        plans: {
          ...state.plans,
          createdPlan: action.payload
        }
      };

      // Miembros
    case GET_MEMBERS:
      return {
        ...state,
        members: action.payload.data
      };
      case ADD_MEMBER:
      return {
        ...state, 
        addMember: action.payload.data
      };
      case CLEAR:
      return {
        ...state,
        addMember: {}
      };
    default:
      return state;
  }
}