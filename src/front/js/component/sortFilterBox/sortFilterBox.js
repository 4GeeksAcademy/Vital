import React, { useState } from "react";
import "./sortFilterBox.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const SortFilterBox = ({ setSearch, setSort, setFilter }) => {
  const [inputFilter, setInputFilter] = useState("");
  const [inputSearch, setInputSearch] = useState("");

  const handleSelect = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setSort(e.target.value);
  };
  const handleFilter = (e) => {
    e.preventDefault();
    console.log(inputFilter);
    setFilter(inputFilter);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(inputSearch);
    setSearch(inputSearch);
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
            style={{ height: "45px", width: "80px" }}
            onChange={handleSelect}
          >
            <option defaultValue="">Sort</option>
            <option value="asc">Ascendent </option>
            <option value="desc">Descendent </option>
          </select>

          <input
            type="filter"
            value={inputFilter}
            placeholder="Filter"
            className="filter-input rounded-pill px-3 mx-3"
            style={{ height: "45px" }}
            onChange={(e) => setInputFilter(e.target.value)}
          />
          <input
            type="button"
            value="Filter"
            className="filter-button btn btn-vital-orange text-vital-white rounded-pill mx-3"
            onClick={handleFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default SortFilterBox;
