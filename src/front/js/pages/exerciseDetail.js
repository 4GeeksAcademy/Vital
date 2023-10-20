import React from "react";
import gif from "../../img/exercise.gif";
import "../../styles/exercise-detail.css";

const ExerciseDetail = () => {
  return (
    <div className="container-fluid p-0 d-flex flex-column bg-vital-gray">
      <div className="container d-flex flex-column bg-vital-gray p-3 vh-25">
        <h1 className="text-vital-orange title-exercise fw-bold">
          Exercise name
        </h1>
        <h3 className="body-part text-vital-white">Body part</h3>
      </div>
      <div className="container-fluid p-0 d-flex bg-vital-black">
        <div className="container d-flex flex-row flex-wrap bg-vital-black p-3">
          <div className="col-6">
            <div className="bg-vital-orange rounded-4 m-3 p-3 col-10">
              <span className="text-vital-white fs-6 fw-bold">Target: </span>
              <span className="text-vital-white fs-6">equis musculo</span>
              <br />
              <span className="text-vital-white fs-6 fw-bold">
                Secondary muscles:{" "}
              </span>
              <span className="text-vital-white fs-6">
                musculo 1, musculo 2, musculo 3
              </span>
            </div>
            <div className="bg-vital-black  p-3 col-12">
              <div className="d-flex flex-column justify-content-between ">
                <h5 className="text-vital-orange mb-4">
                  What equiment do you need?
                </h5>
                <div className="d-flex flex-row col-9 justify-content-between">
                  <button className="btn btn-vital-gray rounded-pill">
                    Mancuernas
                  </button>
                  <button className="btn btn-vital-gray rounded-pill">
                    Barra
                  </button>
                  <button className="btn btn-vital-gray rounded-pill">
                    Otra cosa
                  </button>
                </div>
              </div>
              <div className="d-flex flex-column pt-4 justify-content-between ">
                <h6 className="text-vital-orange mb-2">Description</h6>
                <p className="d-flex flex-row col-12 text-vital-white justify-content-between">
                  Generaremos un texto en ChatGPT a partir de las instrucciones.
                  Quisque placerat metus risus, a suscipit tortor pulvinar id.
                  Etiam sed tellus mauris. Duis quis risus placerat, ornare
                  ligula ut, fermentum augue. Phasellus faucibus eros vel lacus
                  dapibus, nec imperdiet ligula lacinia.
                </p>
              </div>
              <div className="d-flex flex-column pt-4 justify-content-between ">
                <h6 className="text-vital-orange mb-2">Intructions</h6>
                <p className="d-flex flex-row col-12 text-vital-white justify-content-between">
                  Quisque placerat metus risus, a suscipit tortor pulvinar id.
                  Etiam sed tellus mauris. Duis quis risus placerat, ornare
                  ligula ut, fermentum augue. Phasellus faucibus eros vel lacus
                  dapibus, nec imperdiet ligula lacinia. Proin aliquam tellus
                  vel dignissim elementum. Suspendisse eu facilisis urna.
                  Phasellus lobortis felis nec nibh placerat sodales. Phasellus
                  vehicula congue sem. Nullam dictum luctus nisi.
                </p>
              </div>
            </div>
          </div>
          <div className="wrap-gif mx-auto h-100 col-6">
            <img className="img-fluid rounded-3 " src={gif} alt="gif exercise"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;
