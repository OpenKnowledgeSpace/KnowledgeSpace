import React, {Component} from "react";
import Entity from 'features/entity/Entity';


const EntityPage = (props) => { 
  return(
    <Entity curie={props.match.params.curie}  />
   );
}

export default EntityPage;
