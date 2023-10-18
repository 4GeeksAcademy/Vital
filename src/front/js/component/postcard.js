import React from "react";
import "../../styles/postcard.css";
const Postcard = () => {
  return (
    <>
      <div className="postcards d-flex justify-content-center col-4">
        <div className="bg-vital-gray d-flex  flex-column rounded-5">
          <div className="circle-avatar align-self-center mt-3 bg-vital-orange rounded-circle"></div>
          <h4 className="fs-6 text-vital-white mt-3">Workout</h4>
          <p className="text-vital-white p-3">
            Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.
          </p>
          <div>
            <span className="text-vital-white mb-3" type="submit">
              <h5>Fulanito de tal</h5>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Postcard;
