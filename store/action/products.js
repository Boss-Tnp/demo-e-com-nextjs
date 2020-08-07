import * as actionTypes from "./actionTypes";

export const getProducts = (action) => {
  return {
    type: actionTypes.GET_PRODUCTS,
    active: action.active,
  };
};

export const setProducts = (products) => {
  return {
    type: actionTypes.SET_PRODUCTS,
    products: products,
  };
};

export const setProduct = (product) => {
  return {
    type: actionTypes.SET_PRODUCT,
    product: product,
  };
};

export const deleteProduct = (productId) => {
  return {
    type: actionTypes.DELETE_PRODUCT,
    productId: productId,
  };
};

export const addProduct = (product) => {
  return {
    type: actionTypes.ADD_PRODUCT,
    product: product,
  };
};

export const setAdminSelectedProduct = (product) => {
  return {
    type: actionTypes.SET_ADMIN_SELECTED_PRODUCT,
    product: product,
  };
};
