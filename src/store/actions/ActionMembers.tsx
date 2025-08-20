import axios from "axios";
import urlConfig from "../constant/urls_config.json";
import { GET_MEMBERS, ADD_MEMBER, CLEAR } from "../constant/Constant";
import { getTotalsByType } from "../../helpers/helpers";

export const getMembers = (token: string) => async (dispatch: any) => {
  let headers = { Authorization: `Bearer ${token}` };
  let body = {
    "targetMethod": "GET"
  }
  try {
    const res = await axios.post(`${urlConfig.urlMembers}/1/roles`, body, { headers });
    dispatch({
      type: GET_MEMBERS,
      payload: { data: res.data, status: res.status },
    });
  } catch (error: any) {
    dispatch({
      type: GET_MEMBERS,
      payload: { status: "failed" },
    });
  }
};

export const addMember = (token: string, email: string, rol: string ) => async (dispatch: any) => {
  let headers = { Authorization: `Bearer ${token}` };
  let body = {
    "targetMethod": "POST",
    "body": {
      "email": email,
      "rol": rol 
    }
  }
  try {
    const res = await axios.post(`${urlConfig.urlMembers}/1/roles`, body, { headers });
    console.log("🚀 ~ addMember ~ res:", res)
    dispatch({
      type: ADD_MEMBER,
      payload: { data: res.data, status: res.status },
    });
  } catch (error: any) {
        console.log("🚀 ~ addMember ~ res:", error.response.data)

    dispatch({
      type: ADD_MEMBER,
      payload: { status: "failed", data: error.response.data },
    });
  }
};

export const clear = ( ) => async (dispatch: any) => {
    dispatch({
      type: CLEAR,
      payload: { data: "" },
    });
};
