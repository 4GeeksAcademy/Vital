import React from "react";
import "../../styles/bodypart-exercises.css";

const BackgroundContainer = ({ title, description, image }) => {
  return (
    <section
      className="container-fluid image-part-background"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="container w-50 h-100 d-flex justify-content-center align-items-center">
        <div className="title">
          <h1 className="text-vital-orange text-center fw-bold">{title}</h1>
          <p className="text-vital-white text-center pb-5">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default BackgroundContainer;

//Lower arms

// Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
//               accumsan odio ut mi aliquam volutpat. Nam tincidunt quam vitae
//               massa suscipit placerat.
