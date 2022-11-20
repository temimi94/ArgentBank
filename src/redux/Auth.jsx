import axios from "axios";
import jwt_decode from "jwt-decode";

export const token = localStorage.getItem("token");

axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
const URL = "http://localhost:3001/api/v1/user"
export const updateProfil = (profile) =>
  axios.put(`${URL}/profile`, profile, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

export const handleLogOut = () =>
  axios.post(`${URL}/logout`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

//vérification du Token
export default function isMyTokenValid() {
  if (localStorage.getItem("token")) {
    const decodedToken = jwt_decode(localStorage.getItem("token"));
    const dateNow = new Date();
    if (decodedToken.exp > dateNow / 1000) {
      return true;
    } else {
      localStorage.clear();
      window.location = "/";
    }
  }
}
