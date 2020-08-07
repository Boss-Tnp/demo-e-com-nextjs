import { combineReducers } from "redux";
import cartReducer from "./cart";
import authReducer from "./auth";
import productsReducer from "./products";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// const rootPersistConfig = {
//   key: "root",
//   storage: storage,
// };

// const authPersistConfig = {
//   key: "auth",
//   storage: storage,
// };

// const rootReducer = combineReducers({
//   cartReducer,
//   authReducer: persistReducer(authPersistConfig, authReducer),
//   productsReducer,
// });

export default combineReducers({
  cartReducer,
  authReducer,
  productsReducer,
});

// export default persistReducer(rootPersistConfig, rootReducer);
