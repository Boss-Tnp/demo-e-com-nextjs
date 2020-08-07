import * as actionTypes from "./actionTypes";

export const setCartNo = (cartNo) => {
  return {
    type: actionTypes.SET_CART_NO,
    cartNo: cartNo,
  };
};

export const increaseCartNo = () => {
  return {
    type: actionTypes.INCREASE_CART_NO,
  };
};

export const decreaseCartNo = () => {
  return {
    type: actionTypes.DECREASE_CART_NO,
  };
};
