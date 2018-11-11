import React from "react";
import { Link } from "react-router-dom";
import { keys, isEmpty, isString, isArray, get, join } from 'lodash';

import { DATASPACE_SOURCES } from '../dataSpaceConstants';

export const DataSpaceResultsHeader = ({source}) => {
  if ( isEmpty(source) ) { return(<tr></tr>) } 
  const {columns} = DATASPACE_SOURCES[source];
  return(
    <tr>
      { keys(columns).map( col => <th key={col}>{columns[col]}</th> ) } 
    </tr>
  );
};

const DataSpaceResultsCell = ({data}) => {
   if (isEmpty(data)) {
    return(<td></td>)
   } else if (isString(data)) {
    return(<td>{data}</td>)
   } else if (isArray(data)) {
    return(<td>{join(data, '; ')}</td>)
   } else {
    return(<td></td>)
   }
}

export const DataSpaceResultsRow = ({result, source}) => {
  if ( isEmpty(source) || isEmpty(result) ) { return(<tr></tr>) } 
  const {columns} = DATASPACE_SOURCES[source];
  const {_source} = result; 
  const cols = keys(columns); 
  return(
    <tr>
      {cols.map( col => <DataSpaceResultsCell key={col} data={get(_source, col)} />)}
    </tr>
  );
};
