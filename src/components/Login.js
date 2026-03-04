import React from "react";

const Login = () => {
  const handleLogin = () => {
    // Add login logic here
    console.log("Login clicked");
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
