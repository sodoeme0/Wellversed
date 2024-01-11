import React from "react";

const TeamMember = ({ name, role, image }) => {
  return (
    <div className="member">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <h4>{role}</h4>
    </div>
  );
};

export default TeamMember;
