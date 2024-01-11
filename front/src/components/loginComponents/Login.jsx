import React, { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Login.css";
import TextInput from "../signUpComponents/TextInput";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    agree: false,
  });

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!formData.username || !formData.password) {
      alert("Please fill out all required fields.");
      return;
    }

    // Add validation to check username and password in database
    // if (username is not a match || password is not a match) {
    //   alert("Inccorect username or password. Please try again");
    //   return;
    // }

    // If all validations pass, you can proceed with submission
    // Replace with (log-in pass or tokens? and) link to homepage
    alert("Logged in successfully!");
  };

  return (
    <div className="main-login">
      <div className="content">
        <div className="headings">
          <h1 className="contact-header">Log In</h1>
          <div className="border-container">
            <div className="border"></div>
          </div>
          <h2 className="signin-blurb">
            No account?{" "}
            <Link to="/signup" className="signup-link">
              Sign up here
            </Link>
          </h2>
        </div>
        <div className="img-container">
          <FaUserFriends className="login-icon" />
        </div>

        <form onSubmit={handleFormSubmit}>
          <TextInput
            id="username"
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
          />

          <TextInput
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <Link to="/" className="forgot-blurb">
            Forgot your username or password?
          </Link>

          <div className="submit-container">
            <input type="submit" className="submit" value="Log In" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
