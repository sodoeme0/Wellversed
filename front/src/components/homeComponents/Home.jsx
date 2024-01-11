import React from "react";
import BannerIcon from "./BannerIcon";
import ResourceCard from "./ResourceCard";
import "./Home.css";
import { FaCalendar, FaDollarSign, FaUser } from "react-icons/fa";

const HomePage = () => {
  return (
    <>
      <section className="hero">
        <div className="overlay"></div>
        <div className="content">
          <h1 className="hero-title">WellVer$ed Education</h1>
          <p className="hero-blurb">
            At Wells Fargo, we believe in the power of education and community support to transform
            lives. Our new platform, WellVer$ed Education, is dedicated to fostering financial
            empowerment and brighter futures for all. With free tailored financial literacy classes
            for schools, libraries, and community centers, individuals gain crucial skills for
            informed financial decisions, opening doors to new opportunities. We go beyond
            education, connecting participants with essential resources for economic stability, from
            affordable housing to loan guidance. Together, we can create a stronger, more resilient
            community where financial knowledge acts as a catalyst for change.
          </p>
        </div>
      </section>
      <section className="banner">
        <h2>Follow three simple steps to grow your community's financial wellness</h2>
        <div className="banner-icons">
          <BannerIcon
            to="/signup"
            icon={<FaUser className="icons" idName="signup-icon" />}
            title="Create an account"
            description="Click here to go to our signup page and create an account. It can take up to 72 hours to verify your organization."
          />
          <BannerIcon
            to="/schedule"
            icon={<FaCalendar className="icons" idName="calendar-icon" />}
            title="Schedule a class"
            description="Look over our available class times and topics and choose the one that best fits your organization's needs."
          />
          <BannerIcon
            to="/profile"
            icon={<FaDollarSign className="icons" idName="money-icon" />}
            title="Get Well-Versed"
            description="Enjoy the free education your organization receives and utilize Wells Fargo's abundant financial resources."
          />
        </div>
      </section>
      <section className="resources-section">
        <h3 className="resources-title">Our Financial Resources</h3>
        <hr classname="divider"></hr>
        <div className="resource-container">
          <ResourceCard
            className="card"
            name="Reduce debt. Build credit. Enjoy life."
            imageSrc="../photos/ResourceCard1.avif"
            alt="Happy family with mom pouring milk"
            info="Discover four steps that may help you reduce debt and strengthen your credit, giving you financial confidence and peace of mind."
          />
          <ResourceCard
            className="card"
            name="Important documents for the homebuying process"
            imageSrc="../photos/ResourceCard2.avif"
            alt="Hands holding documents"
            info="This 11-item checklist will help you gather the numerous documents you will need throughout your homebuying journey."
          />
          <ResourceCard
            className="card"
            name="Housing nonprofits helping renters in crisis"
            imageSrc="../photos/ResourceCard3.avif"
            alt="Happy family eating breakfast"
            info="Browse housing nonprofits supported by the Wells Fargo Foundation that are helping many renters in a financial crunch since Covid."
          />
          <ResourceCard
            className="card"
            name="Four moves to help maximize your tax refund"
            imageSrc="../photos/ResourceCard4.avif"
            alt="Woman on her computer"
            info="Sandy McPeak, senior financial advisor at Wells Fargo Advisors, shares four strategies for putting your tax return to work for you. "
          />
        </div>
      </section>
    </>
  );
};

export default HomePage;
