import React, {Component} from "react";
import { isArray, keys, has } from 'lodash';

import DataSpaceSource  from './DataSpaceSource'

const DataSpaceCategory = ({label,sources,doc_count}) => {
  return(
    <li>{label} -- {doc_count} documents found.
      <ul>
        { sources.map(source => <DataSpaceSource key={source.id} source={source} /> ) } 
      </ul>
    </li>
  )
};

export default DataSpaceCategory;
