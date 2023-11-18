import React, { useEffect, useContext } from "react";
import Map from "../component/map";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { motion } from "framer-motion"


const GymMap = () => {
  return (
    <>  
        <div className="d-flex justify-content-center align-items-center">
          <Map />
        </div>     
    </>
  );
};

export default GymMap;
