import React, { useState,useEffect } from "react";
import { Row, Col, Typography, Input, Button, message } from "antd";
import "./login.css";
import { loginCheck } from "../api";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      const username = sessionStorage.getItem("username");
      navigate(`/dashboard?username=${username}`);
    }
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginCheck(formData);
      message.success("Login Successful");
      sessionStorage.setItem("isLoggedIn", "true");
      navigate(`/dashboard?username=${formData.username}`);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error("Please enter the correct password.");
      } else if (error.response && error.response.status === 404) {
        message.error("Username not found. Please register to continue.");
      } else {
        message.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <section className="login-main">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <Input.Password
            className="inputpassword"
              type="password"
              name="password"
              placeholder="Password"
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <div className="register-link">
            <p>
              Dont have an account?
              <a href="/register" >
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
