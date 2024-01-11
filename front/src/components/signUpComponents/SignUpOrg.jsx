import React, { useState } from "react";
import "./SignUp.css";
import CheckboxInput from "./CheckboxInput";
import TextInput from "./TextInput";
import useApi from "../../hooks/useApi";
const SignUpOrg = () => {
  const [formData, setFormData] = useState({
    email: "",
    agreeNewsletter: false,
    organizationType: "", // Added organizationType field
    about: "", // Added about field
    causes: [], // Added causes field as an array
    interests: [], // Added interests field as an array
    ref_name: "",
    ref_phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const api = useApi()

  const isValidPhone = (phone) => {
    const phonePattern = /^\(\d{3}\)\s\d{3}-\d{4}$/;
    return phonePattern.test(phone);
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.email ||
      !formData.organization ||
      !formData.ref_name ||
      !formData.ref_phone ||
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

    if (!isValidPhone(formData.ref_phone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    fetch(`${api}/organization/signup`, {
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
          window.location.href = "/loginorg";
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
      email: "",
      agreeNewsletter: false,
      organization: "",
      ref_phone: "",
      ref_name: "",
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
          id="ref_name"
          name="ref_name"
          label="Name"
          type="text"
          placeholder="Reference name"
          value={formData.ref_name}
          onChange={handleInputChange}
        />

        <TextInput
          id="ref_phone"
          name="ref_phone"
          label="Phone"
          type="tel"
          placeholder="(000) 000-0000"
          value={formData.ref_phone}
          onChange={handleInputChange}
        />


        <TextInput
          id="about"
          name="about"
          label="About"
          type="text"
          placeholder="Tell us about the organization"
          value={formData.about}
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

export default SignUpOrg;
