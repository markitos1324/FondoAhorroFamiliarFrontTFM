import axios from "axios";
import urlConfig from "../constant/urls_config.json";
import { CHANGE_PASSWORD, LOGIN_APP, LOGOUT_APP } from "../constant/Constant";

export const logoutApp = () => {
  return {
    type: LOGOUT_APP,
    payload: { status: "" },
  };
};

export const loginApp = (email: String, password: String) => async (dispatch: any) => {
  let body = {
    email,
    password,
  };
  try {
    const res = await axios.post(urlConfig.urlLogin, body);
    console.log("🚀 ~ loginApp ~ res:", res)
    // console.log("MI RESPONSE TOKEN", res);
    //   let list = res.data;
    if (res.status === 200) {
      dispatch({
        type: LOGIN_APP,
        payload: { data: res.data.token, status: res.status },
      });
    } else {
      dispatch({
        type: LOGIN_APP,
        payload: { status: "failed" },
      });
    }
  } catch (error) {
    console.log("Err Login App");
    console.log(error);
    dispatch({
      type: LOGIN_APP,
      payload: { status: "failed" },
    });
  }
};