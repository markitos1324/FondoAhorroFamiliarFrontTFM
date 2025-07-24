import { CHANGE_PASSWORD, LOGIN_APP, LOGOUT_APP } from "../constant/Constant";
const dataStayAlive = {
  data: [],
};
export default function stayAliveReducer(state = dataStayAlive, action: any) {
  switch (action.type) {
    case LOGIN_APP:
      return {
        ...state,
        token: action.payload.data,
        status: action.payload.status
      };
    case LOGOUT_APP:
      //console.log('logout', action.payload)
      return { ...state, login: undefined };
    case CHANGE_PASSWORD:
      return{...state, changePassword: action.payload}
    default:
      return state;
  }
}
