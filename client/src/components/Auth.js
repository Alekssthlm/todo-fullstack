import React, { useState } from "react";
import { useCookies } from "react-cookie";

export default function Auth() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  function viewLogin(status) {
    setError(null);
    setIsLogIn(status);
  }

  async function handleSubmit(e, endpoint) {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_SERVERURL}/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);

      window.location.reload();
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <div className="auth-left-part">
          <div>

          <h1>Welcome back!</h1>
         <p>Let's get things done <br /> today.</p>
          </div>
        </div>
        <div className="auth-right-part">
          <form>
            <h2>{isLogIn ? "Sign in" : "Sign up to get started!"}</h2>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              />
            {!isLogIn && (
              <input
              type="password"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              />
              )}
          <div className="submit-container">
            <input
              type="submit"
              className="submit-auth"
              onClick={(e) => handleSubmit(e, isLogIn ? "login" : "signup")}
              />
              </div>
            {error && <p>{error}</p>}
          </form>
          <div className="auth-options">
            <button
              onClick={() => viewLogin(false)}
              style={{
                backgroundColor: !isLogIn
                  ? "rgb(255, 255, 255)"
                  : "rgb(188, 188, 188)",
              }}
            >
              Sign Up
            </button>
            <button
              onClick={() => viewLogin(true)}
              style={{
                backgroundColor: isLogIn
                  ? "rgb(255, 255, 255)"
                  : "rgb(188, 188, 188)",
              }}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
