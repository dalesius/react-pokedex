import React from "react";
import "./search_bar.css";

function SearchBar(props) {
  const filterText = props.filtertext;
  console.log(filterText);
  return (
    <div className="row">
      <div className="col-sm-12">
        <form className="searchBar">
          <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={(e) => props.onInputChange(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
