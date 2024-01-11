import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <footer>
        <section className="footer-section" id="footer-s1">
          <ul className="social-icons">
            <li>
              <Link to="https://www.facebook.com/">
                <img src="photos/iconfb.png" alt="Facebook Icon" className="socialbutton" />
              </Link>
            </li>

            <li>
              <Link to="https://www.instagram.com/">
                <img src="photos/iconinsta.png" alt="Instagram Icon" className="socialbutton" />
              </Link>
            </li>

            <li>
              <Link to="https://www.snapchat.com/">
                <img src="photos/iconsnap.png" alt="Snapchat Icon" className="socialbutton" />
              </Link>
            </li>

            <li>
              <Link to="https://www.twitter.com/">
                <img src="photos/icontwit.png" alt="Twitter Icon" className="socialbutton" />
              </Link>
            </li>
          </ul>
        </section>
        <section className="footer-section" id="footer-s2">
          <h5 className="section-title">COMPANY INFO</h5>
          <ul className="section-list">
            <li>
              <Link to="#">About Us</Link>
            </li>
            <li>
              <Link to="#">Social Responsibility</Link>
            </li>
            <li>
              <Link to="#">Get Involved</Link>
            </li>
          </ul>
        </section>
        <section className="footer-section" id="footer-s3">
          <h5 className="section-title">SUPPORT</h5>
          <ul className="section-list">
            <li>
              <Link to="#">Customer Support</Link>
            </li>
            <li>
              <Link to="#">Testimonials</Link>
            </li>
            <li>
              <Link to="#">Terms & Conditions</Link>
            </li>
          </ul>
        </section>
        <section className="footer-section" id="footer-s4">
          &copy; 2023 WellVer$ed. All Rights Reserved.
        </section>
      </footer>
    </div>
  );
};

export default Footer;
