import React, { useState } from "react";
import axios from "axios";

// Get all API urls
import * as url from "../../helpers/urlHelper";

// Get current ecosystem slug
import { ecosystemSlug } from "../../config/config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error

    let requestURL =
      url.API_BASE_URL + url.API_LOGIN + `?ecosystemslug=${ecosystemSlug}`;

    console.log(requestURL);

    try {
      const response = await axios.post(requestURL, {
        email,
        password,
      });

      console.log("login response", response);

      if (response.status) {
        localStorage.setItem("token", response.data?.token);
        localStorage.setItem("userInfo", JSON.stringify(response.data?.data));

        window.location.reload();
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card" style={{ width: "30rem", padding: "2rem" }}>
        <h1 className="text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
