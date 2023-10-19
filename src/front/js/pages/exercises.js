import React, { useEffect } from "react";
import { useFetch, useState } from "../hooks/useFetch";

export const Exercises = () => {
  const bodyPart = "chest";
  const url = "https://exercisedb.p.rapidapi.com/exercises";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "89971d01c0msh1690c1d9906070dp1cb205jsnac087ad4de35",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  const { data, error, loading } = useFetch(url, options);
  console.log(data);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Exercises</h1>
          <div className="row">
            <div className="col-12">
              <ul>
                {data &&
                  data.map((item, index) => {
                    return (
                      <li key={index}>
                        {item.name}
                        {item.instructions}
                        <img src={item.gifUrl} />
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
