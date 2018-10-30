import React, {Component} from "react";
import { isArray, keys, has } from 'lodash';

const DataSpaceSource = ({source}) => {
  const { label, doc_count, description, id } = source; 
  return(
    <li>{label} -- { doc_count}</li>
  )
};

export default DataSpaceSource;
