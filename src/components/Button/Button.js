import React, { useState } from "react";

export function ButtonAuth() {
  const toggleAuthModelHandle = () => {
    setIsLogin((prevState) => !prevState);
  };
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <button className="sign-in-button" type="submit">
        {isLogin ? "Sign In" : "Creat Account"}
      </button>
      <p onClick={toggleAuthModelHandle}>
        {isLogin ? "Creat Account" : "Sign In"}
      </p>
    </>
  );
}





