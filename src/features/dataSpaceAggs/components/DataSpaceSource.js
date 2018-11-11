import React, {Component} from "react";
import { isArray, keys, has } from 'lodash';
import { Link } from "react-router-dom";

const DataSpaceSource = ({source, entity}) => {
  const {label, doc_count, description, id } = source; 
  const {curie} = entity; 
  return(
    <li><Link to={`/wiki/${curie}/dataspace/${id}`}>{label} -- {doc_count} records found</Link></li>
  )
};

export default DataSpaceSource;
