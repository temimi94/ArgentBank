import { Navigate } from "react-router-dom";
import React from "react";
import "./login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/authSlice";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import Header from "../../components/Header/Header";

export default function Login() {
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);

  const URL = `http://localhost:3001/api/v1/user/${
    isLogin ? "login" : "signup"
  }`;

  const updateProfile = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const toggleAuthModelHandle = () => {
    setIsLogin((prevState) => !prevState);
  };

  function creatAccount() {
    return (
      <>
        <div className="input-wrapper">
          <label htmlFor="firstName">FirstName</label>
          <input
            onChange={updateProfile}
            value={data.firstName || ""}
            type="firstName"
            name="firstName"
            id="firstName"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="lastName">lastName</label>
          <input
            onChange={updateProfile}
            value={data.lastName || ""}
            type="lastName"
            name="lastName"
            id="lastName"
          />
        </div>
      </>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // reload page
    try {
      const { data: response } = await axios.post(URL, data);
      dispatch(logIn({ ...data, token: response.body.token }));

      localStorage.setItem("token", response.body.token);
      setRedirect(true);

      setLoader(true);
    } catch (error) {
      if (!error.response) {
        setErrMsg("No Server Response");
        console.log("erreur");
      }
    }
  };

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
          <i className="fa fa-user-circle sign-in-icon"></i>
          <p>{isLogin ? "Sign In" : "Creat Account"}</p>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">E-mail</label>
              <input
                onChange={updateProfile}
                value={data.email || ""}
                type="email"
                name="email"
                id="username"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                onChange={updateProfile}
                value={data.password || ""}
                type="password"
                name="password"
                id="password"
              />
            </div>
            {!isLogin && creatAccount()}

            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <div className="button">
              <button className="sign-in-button" type="submit">
                {loader && <Loader />}
                {isLogin ? "Sign In" : "Creat Account"}
              </button>
              <p onClick={toggleAuthModelHandle}>
                {isLogin ? "Creat Account" : "Sign In"}
              </p>
            </div>
          </form>
          {redirect && <Navigate to="/profile" />}
        </section>
      </main>
    </>
  );
}
