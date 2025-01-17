import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import productReducer from "./products/productSlice";
import userReducer from "./user/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// config for persistance
const persisteConfig = {
  key: "root",
  storage,
};
// combine all reducers to one
const combinedReducers = combineReducers({
  cart: cartReducer,
  product: productReducer,
  user: userReducer,
});
// persist the reducers
const persistReducers = persistReducer(persisteConfig, combinedReducers);
// configure the store
const store = configureStore({
  reducer: persistReducers,
});
// persist the store
const persisStore = persistStore(store);

export { store, persisStore };
