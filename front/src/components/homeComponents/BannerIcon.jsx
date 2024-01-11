import React from "react";
import { Link } from "react-router-dom";

const BannerIcon = ({ to, icon, title, description }) => {
  return (
    <Link to={to} className="banner-icon">
      {icon}
      <h4>{title}</h4>
      <p>{description}</p>
    </Link>
  );
};

export default BannerIcon;
