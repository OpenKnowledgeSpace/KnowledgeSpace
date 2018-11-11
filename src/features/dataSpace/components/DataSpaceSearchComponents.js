import React from "react";
import { Link } from "react-router-dom";
import { keys, isEmpty, isString, isArray, get, join } from 'lodash';

import { DATASPACE_SOURCES } from '../dataSpaceConstants';


export const DataSpaceFilters = ({aggregations, handleClick}) => {
  return(
    <ul>
      { aggregations.map( agg => <DataSpaceFilter handleClick={handleClick} 
                                    key={agg.field} field={agg.field}
                                    selected={agg.selected} 
                                    label={agg.label} buckets={agg.buckets} /> )}
    </ul>
     
  )
};

const DataSpaceFilter = ({handleClick, field, label, buckets, selected}) => {
  return(
    <li>
      {label} 
      <DataSpaceBuckets buckets={buckets} selected={selected} field={field} handleClick={handleClick} /> 
    </li>
  );
};

const DataSpaceBuckets = ({buckets, field, handleClick, selected}) => {
  return(
    <ul>
      { buckets.map( (bucket, i) => <li key={i} data-field={field}
                                        data-value={bucket.key}
                                        onClick={handleClick}>
                                          { selected.has(bucket.key) && '✓' } 
                                          {bucket.key} - {bucket.doc_count}
                                        </li>
      )}
    </ul>
  )
};
