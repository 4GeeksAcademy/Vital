import React, { useState } from "react";
import "./sortFilterBox.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const SortFilterBox = ({ setSearch, setSort }) => {
  const [inputFilter, setInputFilter] = useState("");
  const [inputSearch, setInputSearch] = useState("");

  const handleSelect = (e) => {
    e.preventDefault();
    setSort(e.target.value);
  };  
  const handleSearch = (e) => {
    e.preventDefault();    
    setSearch(inputSearch);
    setInputSearch("");
  };

  return (
    <div className="container-fluid bg-vital-black">
      <div className="container pt-5 bg-vital-black d-flex justify-content-around">
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
      </div>
    </div>
  );
};

export default SortFilterBox;
