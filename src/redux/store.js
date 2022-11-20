import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export  const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

store.subscribe(() => {
  console.log("Nouveau state:");
  console.log(store.getState());
});
