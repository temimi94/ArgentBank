import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export  const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Créer un store : configureStore crée une redux data