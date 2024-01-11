import React from "react";

const ResourceCard = ({ name, imageSrc, alt, info }) => {
  return (
    <div className="resource">
      <img src={imageSrc} alt={alt} />
      <h2>{name}</h2>
      <p className="info">{info}</p>
    </div>
  );
};

export default ResourceCard;
