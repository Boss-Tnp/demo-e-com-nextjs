import * as actionTypes from "./actionTypes";

export const setToken = (token, userId) => {
  return {
    type: actionTypes.SET_TOKEN,
    token: token,
    userId: userId,
  };
};

export const removeToken = () => {
  return {
    type: actionTypes.REMOVE_TOKEN,
  };
};
