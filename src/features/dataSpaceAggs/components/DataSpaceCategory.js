import React, {Component} from "react";
import { isArray, keys, has } from 'lodash';

import DataSpaceSource  from './DataSpaceSource'

const DataSpaceCategory = ({label,sources,doc_count, entity}) => {
  return(
    <li>{label} -- {doc_count} records found.
      <ul>
        { sources.map(source => <DataSpaceSource entity={entity} key={source.id} source={source} /> ) } 
      </ul>
    </li>
  )
};

export default DataSpaceCategory;
