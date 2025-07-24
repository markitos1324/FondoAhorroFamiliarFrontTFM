import axios from "axios";
import urlConfig from "../constant/urls_config.json";
import { GET_PLANS, CREATE_PLAN, UPDATE_PLAN, DELETE_PLAN, ADD_USER_TO_PLAN, REMOVE_USER_FROM_PLAN, GET_PLAN_STATISTICS } from "../constant/Constant";

export const getPlans = (token: string) => async (dispatch: any) => {
  let headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await axios.get(urlConfig.urlPlans, { headers });
    const plans = res.data;
    dispatch({
      type: GET_PLANS,
      payload: { data: plans, status: res.status },
    });

    // Fetch statistics for each plan and dispatch
    if (Array.isArray(plans)) {
      for (const plan of plans) {
        if (plan.id) {
          // Dispatch the thunk to fetch and store statistics for each plan
          
          await dispatch(getPlanStatistics(token, plan.id));
        }
      }
    }
  } catch (error: any) {
    dispatch({
      type: GET_PLANS,
      payload: { status: "failed" },
    });
  }
};

export const createPlan = (token: string, body: any) => async (dispatch: any) => {
  let headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await axios.post(urlConfig.urlPlans, body, { headers });
    dispatch({
      type: CREATE_PLAN,
      payload: { data: res.data, status: res.status },
    });
  } catch (error: any) {
    dispatch({
      type: CREATE_PLAN,
      payload: { status: "failed" },
    });
  }
};

export const updatePlan = (token: string, id: number, body: any) => async (dispatch: any) => {
  let headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await axios.put(`${urlConfig.urlPlans}/${id}`, body, { headers });
    dispatch({
      type: UPDATE_PLAN,
      payload: { data: res.data, status: res.status },
    });
  } catch (error: any) {
    dispatch({
      type: UPDATE_PLAN,
      payload: { status: "failed" },
    });
  }
};

export const deletePlan = (token: string, id: number) => async (dispatch: any) => {
  let headers = { Authorization: `Bearer ${token}` };
  try {
    await axios.delete(`${urlConfig.urlPlans}/${id}`, { headers });
    dispatch({
      type: DELETE_PLAN,
      payload: { id, status: 200 },
    });
  } catch (error: any) {
    dispatch({
      type: DELETE_PLAN,
      payload: { status: "failed" },
    });
  }
};

export const addUserToPlan = (token: string, planId: number, email: string) => async (dispatch: any) => {
  let headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await axios.post(`${urlConfig.urlUsersPlans}/${planId}?email=${encodeURIComponent(email)}`, {}, { headers });
    dispatch({
      type: ADD_USER_TO_PLAN,
      payload: { data: res.data, status: res.status },
    });
  } catch (error: any) {
    dispatch({
      type: ADD_USER_TO_PLAN,
      payload: { status: "failed" },
    });
  }
};

export const removeUserFromPlan = (token: string, planId: number, userId: number) => async (dispatch: any) => {
  let headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await axios.delete(`${urlConfig.urlUsersPlans}/${planId}/desasociar-transaccion/${userId}`, { headers });
    dispatch({
      type: REMOVE_USER_FROM_PLAN,
      payload: { data: res.data, status: res.status },
    });
  } catch (error: any) {
    dispatch({
      type: REMOVE_USER_FROM_PLAN,
      payload: { status: "failed" },
    });
  }
};

export const getPlanStatistics = (token: string, planId: string) => async (dispatch: any) => {
  let headers = { Authorization: `Bearer ${token}` };
  try {
    // Adjust the URL as per your backend endpoint for plan statistics
    const res = await axios.get(`${urlConfig.urlPlans}/${planId}/estadisticas`, { headers });
    dispatch({
      type: GET_PLAN_STATISTICS,
      payload: {data: res.data },
    });
  } catch (error: any) {
    dispatch({
      type: GET_PLAN_STATISTICS,
      payload: { planId, status: "failed" },
    });
  }
};
