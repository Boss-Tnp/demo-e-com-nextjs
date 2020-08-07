import * as actionTypes from "./../action/actionTypes";
import jwt from "jsonwebtoken";

const initialState = {
  token: null,
  userId: null,
  role: null,
};

const setToken = (oldState, action) => {
  // localStorage.setItem("token", action.token);
  // localStorage.setItem("userId", action.userId);

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
