import React, { useState } from "react";
import "./SignUp.css";
import CheckboxInput from "./CheckboxInput";
import TextInput from "./TextInput";
import useAuth from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
const SignUpUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    about:''
  });

  const api = useApi()

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
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

    fetch(`${api}/volunteer/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        if (data.message) {
          // Show a success message to the user
          alert(data.message);
          // Redirect or perform other actions after successful sign-up
          window.location.href = "/loginuser";
        } else {
          // Show an error message to the user
          alert("Sign-up failed. Please check your input.");
        }
      })
      .catch((error) => {
        console.error("Error fetching: ", error);
      });

    // Reset the form fields
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    });
    // // If all validations pass, you can proceed with form submission
    // alert("You have successfully created your organization's account!");
    // window.location.href = "/loginorg";
    // // Add user to database (ASK BACKEND TEAM)
    // // Navigate user to homepage

    // // Reset the form fields
    // setFormData({
    //   email: "",
    //   agreeNewsletter: false,
    //   organization: "",
    //   userName: "",
    //   password: "",
    //   confirmPassword: "",
    //   agreeTerms: false,
    // });
  };

  //   // If all validations pass, you can proceed with form submission
  //   alert("You have successfully created your account!");
  //   window.location.href = "/loginuser";
  //   // Add user to database (ASK BACKEND TEAM)

  //   // Reset the form fields
  //   setFormData({
  //     name: "",
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //     agreeTerms: false,
  //   });
  // };

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
          To book classes, get involved, receive our newsletter and much more,
          sign up for a free account
        </h2>
      </div>

      <form onSubmit={handleFormSubmit}>
        <TextInput
          id="name"
          name="name"
          label="Name"
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <TextInput
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="email@example.com"
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextInput
          id="about"
          name="about"
          label="About"
          type="text"
          placeholder="Tell us about yourself"
          value={formData.about}
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

export default SignUpUser;
