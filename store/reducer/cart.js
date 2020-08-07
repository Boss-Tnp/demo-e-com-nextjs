import * as actionTypes from "../action/actionTypes";

const initialState = {
  cartNo: 0,
};

const setCartNo = (oldState, action) => {
  return {
    ...oldState,
    cartNo: action.cartNo,
  };
};

const increaseCartNo = (oldState, action) => {
  return {
    ...oldState,
    cartNo: oldState.cartNo + 1,
  };
};

const decreaseCartNo = (oldState, action) => {
  return {
    ...oldState,
    cartNo: oldState.cartNo - 1,
  };
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CART_NO:
      return setCartNo(state, action);
    case actionTypes.INCREASE_CART_NO:
      return increaseCartNo(state, action);
    case actionTypes.DECREASE_CART_NO:
      return decreaseCartNo(state, action);
    default:
      return state;
  }
};

export default cartReducer;
