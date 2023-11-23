import React, { useState } from "react";
import "./sortFilterBox.css";
import { getRoutines } from "../../function/returnExcerciseDescription";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';



const SortFilterBox = ({ setSearch, setSort }) => {
  const [inputFilter, setInputFilter] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [routine, setRoutine] = useState("");
  const {bodypart} = useParams();


  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "89971d01c0msh1690c1d9906070dp1cb205jsnac087ad4de35",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  const handleSelect = (e) => {
    e.preventDefault();
    setSort(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(inputSearch);
    setInputSearch("");
  };

  const handleRoutine = async (e) => {
    e.preventDefault();     
    const response = await getRoutines(bodypart, 4);  
    new string = response.split
    setRoutine(response.choices[0].message.content) 
    toast.success('Routine Generated successfully', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: "🚀",
      theme: "dark",
  });
  }

  return (
    <div className="container-fluid bg-vital-black">
      <div className="container py-3 bg-vital-black d-flex justify-content-around">
        <div className="search-container">
          <input
            type="text"
            value={inputSearch}
            placeholder="Search"
            className="search-input rounded-pill px-3 mx-3"
            style={{ height: "45px" }}
            onChange={(e) => setInputSearch(e.target.value)}
          />
          <input
            type="button"
            value="Search"
            className="search-button btn btn-vital-orange text-vital-white rounded-pill mx-3"
            onClick={handleSearch}
          />
        </div>
        <div className="sort-filter-container d-flex">
          <select
            className="form-select form-select-sm rounded-pill px-3 mx-3"
            aria-label=".form-select-sm example"
            style={{ height: "45px", width: "150px" }}
            onChange={handleSelect}
          >
            <option defaultValue="">Sort</option>
            <option value="asc">Ascendent </option>
            <option value="desc">Descendent </option>
          </select>
        </div>
        <div className="filter-container d-flex">
        <input
            type="button"
            value="Suggest Routine"
            className="search-button btn btn-vital-orange text-vital-white rounded-pill mx-3"
            onClick={(e) => handleRoutine(e)}
          />
        </div>
        <div className="filter-container d-flex">
        <input
            type="button"
            value="See Routine Routine"
            className="search-button btn btn-vital-orange text-vital-white rounded-pill mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal"            
          />
        </div>
      </div>
      <div className="modal fade bg-vital-gray" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-black">
                        <div className="modal-header border-bottom border-vital-orange">
                            <h1 className="modal-title fs-5 text-vital-orange" id="exampleModal2Label">Routine</h1>
                            <button type="button" className="btn-close rounded-pill" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body bg-vital-black">
                            <form>
                               <ul className="list-group list-group-flush">
                                <p className="text-vital-orange">
                                {routine}  
                                </p>    
                                </ul>          
                            </form>
                        </div>
                        <div className="modal-footer border-top border-vital-orange">
                            <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Close</button>                           
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"

            />
    </div>
  );
};

export default SortFilterBox;
