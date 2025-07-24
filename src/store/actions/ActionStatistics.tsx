import axios from "axios";
import urlConfig from "../constant/urls_config.json";
import { GET_STATISTICS, GET_PLAN_STATISTICS, GET_MONTHLY_STATISTICS, GET_MONTHLY_PLAN_STATISTICS } from "../constant/Constant";
import { getTotalsByType } from "../../helpers/helpers";

export const getStatistics = (token: string) => async (dispatch: any) => {
  let headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await axios.get(`${urlConfig.urlTransactions}/estadisticas-generales`, { headers });
    dispatch({
      type: GET_STATISTICS,
      payload: { data: res.data, status: res.status },
    });
  } catch (error: any) {
    dispatch({
      type: GET_STATISTICS,
      payload: { status: "failed" },
    });
  }
};

export const getPlanStatistics = (token: string, planId: number) => async (dispatch: any) => {
  let headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await axios.get(`${urlConfig.urlPlans}/${planId}/estadisticas`, { headers });
    dispatch({
      type: GET_PLAN_STATISTICS,
      payload: { data: res.data, status: res.status },
    });
  } catch (error: any) {
    dispatch({
      type: GET_PLAN_STATISTICS,
      payload: { status: "failed" },
    });
  }
};

export const getMonthlyStatistics = (token: string, from: string, to: string) => async (dispatch: any) => {
  let headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await axios.get(`${urlConfig.urlTransactions}?desde=${from}&hasta=${to}`, { headers });
    const totals = getTotalsByType(res.data);
    dispatch({
      type: GET_MONTHLY_STATISTICS,
      payload: { data: totals, status: res.status },
    });
  } catch (error: any) {
    dispatch({
      type: GET_MONTHLY_STATISTICS,
      payload: { status: "failed" },
    });
  }
};

export const getMonthlyPlanStatistics = (token: string, planId: number) => async (dispatch: any) => {
  let headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await axios.get(`${urlConfig.urlPlans}/${planId}/estadisticas-mensuales`, { headers });
    dispatch({
      type: GET_MONTHLY_PLAN_STATISTICS,
      payload: { data: res.data, status: res.status },
    });
  } catch (error: any) {
    dispatch({
      type: GET_MONTHLY_PLAN_STATISTICS,
      payload: { status: "failed" },
    });
  }
};
