import React, { useState, useEffect } from "react";
import "./Contact.css";
import TeamMember from "./TeamMember";
import FormGroup from "./FormGroup";

const Contact = () => {
  const [contactFormData, setContactFormData] = useState({
    name: "",
    phone: "",
    email: "",
    reason: "",
    comment: "",
  });

  const [showTeam, setShowTeam] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 767) {
      setShowTeam(true);
    }
  }, []);

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setContactFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();

    if (!contactFormData.name || !contactFormData.reason || !contactFormData.comment) {
      alert("Please fill out all required fields.");
      return;
    }

    if (!isValidPhone(contactFormData.phone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (!isValidEmail(contactFormData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Form submission logic for email
    const emailSubject = "Contact Form Submission";
    const emailBody = `Name: ${contactFormData.name}\nEmail: ${contactFormData.email}\nPhone: ${contactFormData.phone}\nReason: ${contactFormData.reason}\nComment: ${contactFormData.comment}`;
    const emailLink = `mailto:amoyamen44@gmail.com?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = emailLink;

    setContactFormData({
      name: "",
      email: "",
      phone: "",
      reason: "",
      comment: "",
    });
  };

  const isValidPhone = (phone) => {
    const phonePattern = /^\(\d{3}\)\s\d{3}-\d{4}$/;
    return phonePattern.test(phone);
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const toggleTeamVisibility = () => {
    setShowTeam(!showTeam);
  };

  return (
    <>
      <h1 className="contact-header">Contact Us</h1>
      <hr className="team-divider" />
      <h2 className="team-header" onClick={toggleTeamVisibility}>
        Meet the Team
      </h2>
      {showTeam && (
        <div className="team-container">
          <TeamMember
            name="Success Odoemena"
            role="Chief Executive Officer"
            image="../photos/Success.jpeg"
          />
          <TeamMember
            name="Aubrey M. Trotter"
            role="Community Engagement Director"
            image="../photos/Aubrey.jpeg"
          />
          <TeamMember
            name="Kevin M. Torres"
            role="Chief Financial Officer"
            image="../photos/Kevin.jpeg"
          />
          <TeamMember
            name="Myles Kelly"
            role="Chief Strategy Officer"
            image="../photos/Myles.jpeg"
          />
          <TeamMember
            name="D'Andre Derr"
            role="Director of Operations"
            image="../photos/DAndre.jpeg"
          />
        </div>
      )}
      <hr className="team-divider" />
      <h5>
        Please fill out the form below to get in contact with a member of our team. Typical response
        is 1 to 3 business days.
      </h5>
      <form onSubmit={handleContactSubmit}>
        <FormGroup
          label="Name"
          id="name"
          name="name"
          type="text"
          placeholder="Your Name"
          value={contactFormData.name}
          onChange={handleContactChange}
          required
        />
        <FormGroup
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="email@example.com"
          value={contactFormData.email}
          onChange={handleContactChange}
          required
        />
        <FormGroup
          className="input"
          label="Phone"
          id="phone"
          name="phone"
          type="tel"
          placeholder="(000) 000-0000"
          value={contactFormData.phone}
          onChange={handleContactChange}
          required
        />
        <FormGroup
          label="Reason"
          id="reason"
          name="reason"
          type="text"
          placeholder="Reason for contact..."
          value={contactFormData.reason}
          onChange={handleContactChange}
          required
        />
        <FormGroup
          label="Comment"
          id="comment"
          name="comment"
          type="text"
          placeholder="Your comment here..."
          value={contactFormData.comment}
          onChange={handleContactChange}
          required
        />
        <div className="submit-container">
          <input type="submit" className="submit" value="Submit" />
        </div>
      </form>
    </>
  );
};

export default Contact;
