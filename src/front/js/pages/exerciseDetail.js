import React, { useEffect, useState } from "react";
import gif from "../../img/exercise.gif";
import "../../styles/exercise-detail.css";
import { scrollToTop } from "../function/scrollToTop";
import { useFetch } from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { details } from "../constants/constants";
import { getStructuredMessage } from "../function/returnExcerciseDescription";
import Loading from "../component/loading/loading.js";
//import { objectIA } from "../constants/constants";

const ExerciseDetail = () => {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const exercise = details.name;
  const numWords = 15;
  const keyWords = details.keyWords;

  const url = `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`;
  const urlIA = "https://api.openai.com/v1/chat/completions";
  const optionsIA = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Write a exercise description for a given exercise that is around  ${numWords} words and given keywords}`,
        },
        {
          role: "user",
          content:
            `exercise: ${exercise} numWords: ${numWords} keyWords: ${keyWords}`,
        },
      ],
      temperature: 0.8,
      max_tokens: 20,       
    }),
  };

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "89971d01c0msh1690c1d9906070dp1cb205jsnac087ad4de35",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const data = details;
  const objectIA = useFetch(urlIA, optionsIA);

  objectIA.data && console.log(objectIA.data.choices[0].message.content);

  //const { data, error, loading } = useFetch(url, options);

  description && console.log(description);
  const title = data.name[0].toUpperCase() + data.name.slice(1);
  return (
    <div className="d-flex justify-content-center">
      {objectIA.loading ? (
        <Loading />
      ) : (
        <div className="container-fluid p-0 d-flex flex-column bg-vital-gray">
          <div className="container d-flex flex-column bg-vital-gray p-3 vh-25">
            <h1 className="text-vital-orange title-exercise fw-bold">
              {title}
            </h1>
            <h3 className="body-part text-vital-white">{data.bodyPart}</h3>
          </div>
          <div className="container-fluid p-0 d-flex bg-vital-black">
            <div className="container d-flex flex-row flex-wrap bg-vital-black p-3">
              <div className="col-6">
                <div className="bg-vital-orange rounded-4 m-3 p-3 col-10">
                  <span className="text-vital-white fs-6 fw-bold">
                    Target:{" "}
                  </span>
                  <span className="text-vital-white fs-6">{data.target}</span>
                  <br />
                  <span className="text-vital-white fs-6 fw-bold">
                    Secondary muscles:{" "}
                  </span>
                  <span className="text-vital-white fs-6">
                    {data.secondaryMuscles.map((muscle, index) => {
                      return <span key={index}>{muscle} </span>;
                    })}
                  </span>
                </div>
                <div className="bg-vital-black  p-3 col-12">
                  <div className="d-flex flex-column justify-content-between ">
                    <h5 className="text-vital-orange mb-4">
                      What equiment do you need?
                    </h5>
                    <div className="d-flex flex-row col-9 justify-content-between">
                      <button className="btn btn-vital-gray rounded-pill">
                        {data.equipment}
                      </button>
                    </div>
                  </div>
                  <div className="d-flex flex-column pt-4 justify-content-between ">
                    <h6 className="text-vital-orange mb-2">Description</h6>
                    <p className="d-flex flex-row col-12 text-vital-white justify-content-between">
                      {objectIA.data && objectIA.data.choices[0].message.content}
                    </p>
                  </div>
                  <div className="d-flex flex-column pt-4 justify-content-between ">
                    <h6 className="text-vital-orange mb-2">Intructions</h6>

                    <ul className="text-vital-white">
                      {data &&
                        data.instructions.map((instruction, index) => {
                          return <li key={index}>{instruction}</li>;
                        })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="wrap-gif bg-vital-white d-flex justify-content-center align-items-center rounded-5 mx-auto mt-5 h-75">
                <img
                  className="img-fluid"
                  src={data.gifUrl}
                  alt="gif exercise"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// async function  generateDescription (exercise, numWords, keyWords) {
//   const res = await fetch("../function/returnExcerciseDescription", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       exercise,
//       numWords,
//       keyWords,
//     }),
//   });

//   const data = await res.json();
//   console.log(data);
//   setDescription(data.Description.trim());
// };

export default ExerciseDetail;
