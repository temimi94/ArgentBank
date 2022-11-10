import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  password: null,
  token: null,
  firstName: null,
  lastName: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.accessToken;
    },
    logOut: (state) => {
      state.email = null;
      state.token = null;
    },
    updateProfile: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

export const { logIn, logOut, updateProfile } = authSlice.actions;
export default authSlice.reducer;
export const selectUser = (state) => state.auth.email;
export const selectToken = (state) => state.auth.token;
export const selectFirstName = (state) => state.auth.firstName;
export const selectLastName = (state) => state.auth.lastName;

/*
Créez une tranche :
1. Utilisez createSlice pour créer une tranche.
2. Chaque tranche contient des réducteurs et des actions, permettant une encapsulation modulaire.
3. Toutes les opérations connexes sont effectuées indépendamment dans un seul fichier.
Propriétés principales :
(1) name : sera défini sur le préfixe de l’action par défaut lorsque l’action est appelée
(2) initialState : La valeur initiale des données d’état
(3) Réducteurs: utilisez l’affectation pour modifier les données sans renvoyer de nouvelles données d’état à chaque fois. 
Les propriétés sont automatiquement exportées en tant qu’action
*/
