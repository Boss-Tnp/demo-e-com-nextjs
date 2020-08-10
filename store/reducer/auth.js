import * as actionTypes from "./../action/actionTypes";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

const initialState = {
  token: null,
  userId: null,
  role: null,
};

const setToken = (oldState, action) => {
  // localStorage.setItem("token", action.token);
  // localStorage.setItem("userId", action.userId);
  Cookies.set("token", action.token);

  const payload = jwt.decode(action.token);
  return {
    ...oldState,
    token: action.token,
    userId: action.userId,
    role: payload.role,
  };
};

const removeToken = (oldState, action) => {
  // localStorage.removeItem("token");
  // localStorage.removeItem("userId");
  Cookies.remove("token");

  return {
    ...oldState,
    token: null,
    userId: null,
    role: null,
  };
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return setToken(state, action);
    case actionTypes.REMOVE_TOKEN:
      return removeToken(state, action);
    default:
      return state;
  }
};

export default authReducer;
