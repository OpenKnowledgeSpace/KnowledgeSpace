import React, {Component} from "react";

const SearchBox = ({onChange}) => (
  <div>
    Search: <input onChange={onChange} /> 
  </div>
);

export default SearchBox;
