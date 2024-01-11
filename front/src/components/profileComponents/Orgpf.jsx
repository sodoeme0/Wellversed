import React from "react";

// import components

// import css
import "./user.css";

// import icons
import { FaGift } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";
import Courselist from "./courselist";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
const Orgpf = () => {
  const [data] = useState(useAuth());
  const api = useApi()
  const [org, setOrg] = useState({
    name: "",
    email: "",
    ref: { name: "", phone: "" },
    about:""
  });
  const [schedule, setSchedule] = useState({
    date: "",
    course: { name: "" },
    status: "",
    volunteer: { name: " ", email: " " },
  });
  useEffect(() => {
    fetch(`${api}/organization/organization/${data.email}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json().then((data) => ({
          status: response.status,
          data: data,
        }));
      })
      .then((result) => {
        const { status, data } = result;

        if (status !== 200) {
          alert(data.message);
          return;
        }

        setOrg(data[0]);
      });
  }, [data]);

  return (
    // user info section
    <div className="User-Page">
      <div className="User-info">
        <img
          src="/photos/company.jpeg"
          alt="user profile pic"
          className="profile-image"
        ></img>
        <br />
        <h3>{org?.name}</h3>
        <p>Non-Profit Organization</p>
        <br />
        <p>Representative: {org?.ref.name}</p>
        <p>Contact: {org?.ref.phone}</p>

        <br />

        <br />

        <div className="About">
          <h2>About Us</h2>

          <div className="about-info">
            <p class="about-info-text">
            {org?.about}
            </p>
          </div>
        </div>
      </div>

      {/* main info section of profile */}

      <div className="Main-section">
        <br />
        <h2 className="prof-name">Hi, {org?.name}</h2>
        <br />
        <br />

        <div className="causes-and-interests">
          <h3>Our Causes</h3>
          <br />
          <p>
            {" "}
            <FaGift className="icon" /> Donation{" "}
          </p>
          <p>
            <FaHandHoldingHeart className="icon" /> Community Support{" "}
          </p>
          <p>
            {" "}
            <FaMoneyBillWave className="icon" /> Philanthropy{" "}
          </p>
          <br />
          <button className="btn-main">Add more</button>
          <br />
          <br />
          <h3>Our Interests</h3>
          <br />
          <p>
            <FaHandHoldingHeart className="icon" /> Community Support{" "}
          </p>
          <p>
            {" "}
            <FaMoneyBillWave className="icon" /> Financial Literacy{" "}
          </p>
          <br />
          <button className="btn-main">Add more</button>
        </div>
      </div>

      {/* course section of profile */}

      <div className="calendar">
        <Courselist schedule={schedule} org={org} />
      </div>
    </div>
  );
};

export default Orgpf;
