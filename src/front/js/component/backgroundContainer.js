import React from "react";
import "../../styles/bodypart-exercises.css";
import { motion } from "framer-motion"

const BackgroundContainer = ({ title, description, image }) => {
  
  return (
    <section
      className="container-fluid image-part-background"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="container w-50 h-100 d-flex justify-content-center align-items-center" >
        <div className="title">
          <motion.h1 className="text-vital-orange text-center fw-bold"
            initial={{ x: -100, }}
            animate={{ x: 0, }}
            transition={{ duration: 1 }}
          >{title}</motion.h1>
          <motion.p className="text-vital-white text-center pb-5"
          initial={{ x: 100, }}
          animate={{ x: 0, }}
          transition={{ duration: 1 }}
          >{description}</motion.p>
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
