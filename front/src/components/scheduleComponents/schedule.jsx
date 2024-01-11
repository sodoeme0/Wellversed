import React from "react";
// import '../css/user.css';
import "./schedule.css";
import Mainschedule from "./mainschedule";

const Schedule = () => {
  return (
    <div className="schedule-Page">
      {/* <div className="Header">
        <h1>Well-Ver$ed Education</h1>
      </div> */}

      <section className="hero-image"></section>

      <section className="volunteer-schedule">
        <h2 className="contact-header">Open Volunteer Opportunities</h2>
      </section>

      <section className="schedule">
        <Mainschedule />
      </section>
    </div>
  );
};

export default Schedule;
