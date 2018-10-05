import React, {Component} from "react";

const WikiPage = (props) => { 
  return(
    <span>Looking for { props.match.params.curie } </span>
   );
}

export default WikiPage;
