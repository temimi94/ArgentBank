import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  token: "",
  firstName: "",
  lastName: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
    },

    logOut: (state) => {
      state.email = null;
      state.token = null;
    },
    updateProfil: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    changeProfil: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

export const { logIn, logOut, updateProfil, changeProfil } = authSlice.actions;
export default authSlice.reducer;
export const selectUser = (state) => state.auth.email;
export const selectToken = (state) => state.auth.token;
export const selectFirstName = (state) => state.auth.firstName;
export const selectLastName = (state) => state.auth.lastName;
