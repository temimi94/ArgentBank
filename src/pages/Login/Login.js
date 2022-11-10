import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "./login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/authSlice";
import axios from "axios";

const LOGIN_URL = "http://localhost:3001/api/v1/user/login";

export default function Login() {
  const navigate = useNavigate;
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
  });

  const updateProfile = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // reload page
    try {
      const { data: response } = await axios.post(LOGIN_URL, data);

      dispatch(logIn({ ...data, token: response.body.token }));

      navigate("/profil");

      console.log("bon");
    } catch (error) {
      if (!error.response) {
        setErrMsg("No Server Response");
        console.log("erreur");
      }
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              onChange={updateProfile}
              value={data.email}
              type="email"
              name="email"
              id="username"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              onChange={updateProfile}
              value={data.password}
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember">Remember me</label>
          </div>
        </form>
        <p className="signup-link">
          <Link to="/signup">Don't have an account?</Link>
        </p>
        <br />
        <button type="submit" className="sign-in-button">
          Sign Up
        </button>
      </section>
    </main>
  );
}
