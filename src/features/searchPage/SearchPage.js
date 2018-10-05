import React, {Component} from "react";
import queryString  from 'query-string';

const SearchPage = (props) => { 
  const parsed = queryString.parse(props.location.search); 
  return(
    <span>Searching for { JSON.stringify(parsed) } </span>
   );
}

export default SearchPage;
