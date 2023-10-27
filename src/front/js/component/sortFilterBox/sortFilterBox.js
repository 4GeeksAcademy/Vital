import React from "react";
import "./sortFilterBox.css";

const SortFilterBox = ({
  sort,
  setSort,
  filter,
  setFilter,
  search,
  setSearch,
}) => {
  return (
    <div className="container-fluid bg-vital-black">
      <div className="container pt-5 bg-vital-black d-flex justify-content-around">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            className="search-input rounded-pill px-3 mx-3"
            style={{ height: "45px" }}
          />
          <input
            type="submit"
            value="Search"
            className="search-button btn btn-vital-orange text-vital-white rounded-pill mx-3"
          />
        </div>
        <div className="sort-filter-container d-flex">
          <select
            className="form-select form-select-sm rounded-pill px-3 mx-3"
            aria-label=".form-select-sm example" style={{ height: "45px", width: "80px" }}
          >
            <option defaultValue="">Sort</option>
            <option value="1">Ascendent </option>
            <option value="2">Descendent </option>
            
          </select>
          {/* <input
            type="select"
            placeholder="Sort"
            className="sort-input rounded-pill px-3 mx-3"
            style={{ height: "45px" }}
  />*/}
          <input
            type="filter"
            placeholder="Filter"
            className="filter-input rounded-pill px-3 mx-3"
            style={{ height: "45px" }}
          />
          <input
            type="submit"
            value="Filter"
            className="filter-button btn btn-vital-orange text-vital-white rounded-pill mx-3"
          />
        </div>
      </div>
    </div>
  );
};

export default SortFilterBox;
