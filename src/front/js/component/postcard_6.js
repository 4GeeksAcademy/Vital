import React from "react";
import "../../styles/postcard_6.css";
const Postcard_6 = (props) => {
  return (
    <>
      <div className="postcards d-flex justify-content-center mt-5 col-sm-12 col-md-8 col-4">
        <div className="description bg-vital-gray  d-flex  flex-column rounded-5">
          <div className="circle-avatar-arnold align-self-center mt-3 rounded-circle" ></div>
          <h4 className="text-vital-white mt-3">{props.name}</h4>
          <p className=" text-vital-white p-3">
            {props.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default Postcard_6;