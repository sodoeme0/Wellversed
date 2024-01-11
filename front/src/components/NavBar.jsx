// Import React hooks, components, css
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import "./NavBar.css";
import Home from "./homeComponents/Home";
import Contact from "./contactComponents/Contact";
import LoginOrg from "./loginComponents/LoginOrg";
import LoginUser from "./loginComponents/LoginUser";
import SignUpOrg from "./signUpComponents/SignUpOrg";
import SignUpUser from "./signUpComponents/SignUpUser";
import Schedule from "./scheduleComponents/schedule";
import Orgpf from "./profileComponents/Orgpf";
import Userpf from "./profileComponents/Userpf";
import Footer from "./Footer";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

function NavBar() {
  const [profLink, setProfLink] = useState("");
  const [schedLink, setSchedLink] = useState("");

  // State to toggle navbar links
  const [showLinks, setShowLinks] = useState(false);
  //Set up to only show sigin in if not logged in
  //TALK TO BACKEND TEAM ABOUT SETTING UP TOKENS FOR THIS
  const [isLoggedIn, setLogSign] = useState();
  const status = useAuth();

  useEffect(() => {
    //console.log(isLoggedIn)
    if (status.roles.length > 0) {
      setLogSign(
        <div className="signout-section">
          <button className="signout-button" onClick={signOut}>
            Sign Out
            {/* Additional components or icons */}
          </button>
        </div>
      );

      if (status.roles[0] == "organization") {
        setProfLink(<Link to="/orgpf">My Profile</Link>);
      } else {
        setProfLink(<Link to="/userpf">My Profile</Link>);
        setSchedLink(
          <li>
            <Link to="/schedule">Schedule</Link>
          </li>
        );
      }
    } else {
      setLogSign(
        <div className="signin-section">
          <Link to="/loginorg" className="signin-link">
            {/* <Link to="/loginuser" className="signin-link"> */}
            Sign In
            <FaUserCircle className="signin-icon" />
          </Link>
        </div>
      );
    }
  }, [status]);

  const signOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Function to toggle links
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <Router>
      <div className="header">
        <nav className="nav">
          <div className="nav-header">
            <h1>
              <Link to="/">WellVer$ed</Link>
              <FaBars className="menu-icon" onClick={toggleLinks} />
            </h1>
          </div>
          <div className={`links ${showLinks ? "show" : ""}`} id="links">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>{profLink}</li>
              {schedLink}
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>{isLoggedIn}</li>
            </ul>
          </div>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add Myles' components */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/loginuser" element={<LoginUser />} />
        <Route path="/loginorg" element={<LoginOrg />} />
        <Route path="/signupuser" element={<SignUpUser />} />
        <Route path="/signuporg" element={<SignUpOrg />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/orgpf" element={<Orgpf />} />
        <Route path="/userpf" element={<Userpf />} />
      </Routes>
      <Footer />
    </Router>
  );
}
// Hello, I am a new comment
export default NavBar;
