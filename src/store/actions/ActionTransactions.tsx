import axios from "axios";
import urlConfig from "../constant/urls_config.json";
import {
  GET_TRANSACTIONS,
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
  GET_TRANSACTIONS_FILTERED,
} from "../constant/Constant";

// 1. Listar transacciones
export const getTransactions = (token: string) => async (dispatch: any) => {
  let headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await axios.get(urlConfig.urlTransactions, { headers });
    dispatch({
      type: GET_TRANSACTIONS,
      payload: { data: res.data, status: res.status },
    });
  } catch (error: any) {
    dispatch({
      type: GET_TRANSACTIONS,
      payload: { status: "failed" },
    });
  }
};

// 2. Create transaction
export const createTransaction = (token: string, body: any) => async (dispatch: any) => {
  let headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await axios.post(urlConfig.urlTransactions, body, { headers });
    dispatch({
      type: CREATE_TRANSACTION,
      payload: { data: res.data, status: res.status },
    });
  } catch (error: any) {
    dispatch({
      type: CREATE_TRANSACTION,
      payload: { status: "failed" },
    });
  }
};

// 3. Update transaction
export const updateTransaction = (token: string, id: number, body: any) => async (dispatch: any) => {
  let headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await axios.put(`${urlConfig.urlTransactions}/${id}`, body, { headers });
    dispatch({
      type: UPDATE_TRANSACTION,
      payload: { data: res.data, status: res.status },
    });
  } catch (error: any) {
    dispatch({
      type: UPDATE_TRANSACTION,
      payload: { status: "failed" },
    });
  }
};

// 4. Delete transaction
export const deleteTransaction = (token: string, id: number) => async (dispatch: any) => {
  let headers = { Authorization: `Bearer ${token}` };
  try {
    await axios.delete(`${urlConfig.urlTransactions}/${id}`, { headers });
    dispatch({
      type: DELETE_TRANSACTION,
      payload: { id, status: 200 },
    });
  } catch (error: any) {
    dispatch({
      type: DELETE_TRANSACTION,
      payload: { status: "failed" },
    });
  }
};

// 5. Filter transactions by date range
export const filterTransactionsByDate = (token: string, from: string, to: string) => async (dispatch: any) => {
  let headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await axios.get(`${urlConfig.urlTransactions}?desde=${from}&hasta=${to}`, { headers });
    dispatch({
      type: GET_TRANSACTIONS_FILTERED,
      payload: { data: res.data, status: res.status },
    });
  } catch (error: any) {
    dispatch({
      type: GET_TRANSACTIONS_FILTERED,
      payload: { status: "failed" },
    });
  }
};

// 6. Create transaction in a plan
export const createTransactionInPlan = (token: string, body: any) => async (dispatch: any) => {
  let headers = { Authorization: `Bearer ${token}` };
  try {
    // The backend expects planAhorroId in the body
    const res = await axios.post(urlConfig.urlTransactions, body, { headers });
    dispatch({
      type: CREATE_TRANSACTION,
      payload: { data: res.data, status: res.status },
    });
  } catch (error: any) {
    dispatch({
      type: CREATE_TRANSACTION,
      payload: { status: "failed" },
    });
  }
};