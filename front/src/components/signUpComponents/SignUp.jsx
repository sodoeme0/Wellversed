import React, { useState } from "react";
import "./SignUp.css";
import CheckboxInput from "./CheckboxInput";
import TextInput from "./TextInput";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    agreeNewsletter: false,
    organization: "",
    userName: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.email ||
      !formData.organization ||
      !formData.userName ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.agreeTerms
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // If all validations pass, you can proceed with form submission
    alert("Form submitted successfully!");
    // Add user to database (ASK BACKEND TEAM)
    // Navigate user to homepage

    // Reset the form fields
    setFormData({
      email: "",
      agreeNewsletter: false,
      organization: "",
      userName: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    });
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="content">
      <div className="headings">
        <h1 className="contact-header">Create Your Account</h1>
        <hr className="header-divider"></hr>
        <div className="border-container">
          <div className="border"></div>
        </div>
        <h2 className="signup-blurb">
          To book classes, get involved, receive our newsletter and much more, sign up for a free
          account
        </h2>
      </div>

      <form onSubmit={handleFormSubmit}>
        <TextInput
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="email@example.com"
          value={formData.email}
          onChange={handleInputChange}
        />

        <CheckboxInput
          id="agreeNewsletter"
          name="agreeNewsletter"
          label="Receive our weekly newsletter via email"
          checked={formData.agreeNewsletter}
          onChange={handleInputChange}
        />

        <TextInput
          id="organization"
          name="organization"
          label="Organization"
          type="text"
          placeholder="Organization"
          value={formData.organization}
          onChange={handleInputChange}
        />

        <TextInput
          id="username"
          name="userName"
          label="Username"
          type="text"
          placeholder="Username"
          value={formData.userName}
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

        <TextInput
          id="confirm-password"
          name="confirmPassword"
          label="Confirm"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />

        <CheckboxInput
          id="agreeTerms"
          name="agreeTerms"
          label="I agree to the terms and conditions."
          checked={formData.agreeTerms}
          onChange={handleInputChange}
        />

        <div className="submit-container">
          <input type="submit" className="submit" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
