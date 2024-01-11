import React from "react";


// components
import Calendar from "./Calendar"
// css
import "./user.css";
import "./calendar.css";

// icons
import { FaHeart } from "react-icons/fa";
import { FaGift } from "react-icons/fa";
import { FaHouseDamage } from "react-icons/fa";
import { FaSeedling } from "react-icons/fa";
import { FaSyringe } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
const Userpf = () => {


  const [vol, setVol] = useState({name:'', email:'', about:""});
  const [data] = useState(useAuth());
  const api = useApi()
  useEffect(() => {
    fetch(`${api}/volunteer/volunteer/${data.email}`, {
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
        
        if (status != 200) {
          alert(data.message);
          return;
        }
        setVol(data[0])
      })
      .catch((error) => {
        //console.error("Error fetching: ", error);
      });
  }, [data]);



  return (
    <div className="User-Page">
      {/* <div className="Header">
<h1>Well-Ver$ed Education</h1>
</div>
<div className="Profile-Header">
<h2 className="Profile-Header-Text">Your Profile</h2>
</div> */}
      <div className="User-info">
        <img src="/photos/vol2.png" alt="user profile pic" className="profile-image"></img>
        <br />
        <h3>{vol.name}</h3>
        <p>Software Engineer</p>
        <br />
        <p>Email: {vol.email}</p>

        <br />

        <div className="volunteer-info">
          <p>Joined date: 8/1/2023</p>
          <p>hours worked: 100</p>
        </div>

        <br />

        <div className="About">
          <h2 className="about-header">About Me</h2>

          <div className="about-info">
            <p class="about-info-text">
              {vol.about}
            </p>
          </div>
        </div>
      </div>

      <div className="Main-section">
        <br />
        <h2 className="prof-name">Hi, {vol.name}!</h2>
        <br />
        <br />

        <div className="causes-and-interests">
          <h3>Your Causes</h3>
          <br />
          <p>
            {" "}
            <FaHeart className="icon" /> Health and Medical
          </p>

          <p>
            {" "}
            <FaGift className="icon" /> Donation{" "}
          </p>

          <p>
            <FaHouseDamage className="icon" /> Disaster Relief{" "}
          </p>
          <p>
            <FaHandHoldingHeart className="icon" /> Community Support{" "}
          </p>
          <p>
            {" "}
            <FaSeedling className="icon" /> Urban Farming{" "}
          </p>
          <p>
            {" "}
            <FaSyringe className="icon" /> Healthcare Access{" "}
          </p>
          <p>
            {" "}
            <FaMoneyBillWave className="icon" /> Philanthropy{" "}
          </p>

          <br />

          <button className="btn-main">Add more</button>
          <br />

          <br />
          <h3>Your Interests</h3>

          <br />
          <p>
            {" "}
            <FaCode className="icon" /> Programming
          </p>
          <p>
            {" "}
            <FaGithubSquare className="icon" /> Github{" "}
          </p>

          <p>
            {" "}
            <FaHome className="icon" /> Affordable Housing{" "}
          </p>
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

      <div className="calendar">
        <h2>Your Schedule</h2>
        <br />
        <br />
        <Calendar vol={vol} />

        {/* <Link to="/volunteerSchedule"> */}
        <Link to="/schedule"
        style={{
          textDecoration: 'none',
          padding: '10px',
          background: 'rgb(148, 13, 13)',
          color: 'white',
          borderRadius: '30px',
          border: 'none',
          cursor: 'pointer',
          width: '30%',
          textAlign: 'center'
          }}
        >Go To Full Schedule</Link>
        
        {/* </Link> */}
      </div>
    </div>
  ); 
};

export default Userpf;
