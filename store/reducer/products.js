import * as actionTypes from "../action/actionTypes";

const initialState = {
  products: [],
  activeProducts: [],
  adminSelectedProduct: undefined,
};

const getProducts = (state, action) => {
  return state.products;
};

const setProducts = (state, products) => {
  return {
    ...state,
    products: products,
    activeProducts: products.filter((product) => product.active),
  };
};

const setProduct = (state, product) => {
  const updatedProducts = state.products.map((prd) => {
    if (prd._id === product._id) {
      prd = product;
    }
    return prd;
  });
  return {
    ...state,
    products: updatedProducts,
  };
};

const deleteProduct = (state, productId) => {
  const updatedProducts = state.products.filter((prd) => {
    return prd._id !== productId;
  });

  return {
    ...state,
    products: updatedProducts,
  };
};

const addProduct = (state, product) => {
  const updatedProducts = [...state.products];
  updatedProducts.push(product);
  return {
    ...state,
    products: updatedProducts,
  };
};

const setAdminSelectedProduct = (state, product) => {
  return {
    ...state,
    adminSelectedProduct: product,
  };
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS:
      return getProducts(state, action);
    case actionTypes.SET_PRODUCTS:
      return setProducts(state, action.products);
    case actionTypes.SET_PRODUCT:
      return setProduct(state, action.product);
    case actionTypes.DELETE_PRODUCT:
      return deleteProduct(state, action.productId);
    case actionTypes.ADD_PRODUCT:
      return addProduct(state, action.product);
    case actionTypes.SET_ADMIN_SELECTED_PRODUCT:
      return setAdminSelectedProduct(state, action.product);
    default:
      return state;
  }
};

export default productsReducer;
