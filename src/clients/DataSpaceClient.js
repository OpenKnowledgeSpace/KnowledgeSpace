import {toString, isNull, omitBy, isEmpty, isArray, has, keys, map, flatten} from "lodash";
import {esclient} from "./ESClient";
import {filterBuilder } from './utils';

import { DATASPACE_SOURCES } from 'features/dataSpace/dataSpaceConstants';

export const entityLabels = (entity) => {
  if ( !has(entity, 'labels') ) { 
    return null;
  }

  let term;
  if ( isArray(entity.labels) && !isEmpty(entity.labels) ) {
    return entity.labels[0];
  } else {
    return null;
  }
}

export const queryAllByEntity = (entity) => {
  const term = entityLabels(entity);
  if ( isNull(term) ) { return {}; } 
  const body = { 
                  'size': 0, 
                  'query': {
                    'query_string':
                      { 'query': term } 
                  },
                  'aggs': {
                    'sources': {
                      'terms': { 
                        'field': '_index' ,
                        'size': 20
                      }
                    } 
                  }
                };

  const request = esclient.search({
    index: '*',
    type: 'dataSpace', 
    body
  }).then( response => response.aggregations.sources.buckets );
  return request;
}

const aggParameters = (fields) => {
  const aggs = {}; 
  Object.keys(fields).forEach(field => { 
    aggs[field] = {terms: { field: field }};
  })
  return aggs
}


export const querySourceByEntity = ({source, entity, page = 1, q= '', filters = {}}) => {
  
  const term = entityLabels(entity);
  const aggs  = aggParameters(DATASPACE_SOURCES[source].aggs); 
  if ( isNull(term) ) { return {}; } 
  const body = {  aggs, 
                  query: {
                    bool: {
                      must: { query_string: {  query: term } } 
                    } 
                  },
                };
  
  // now set pagination
  body.from  = ( page - 1 ) * 10;
 
  const filterFields = omitBy(filters, isEmpty);
  if ( !isEmpty(filterFields) ) {
    body.query.bool.filter = filterBuilder(filterFields); 
  }

  const request = esclient.search({
    index: source,
    type: 'dataSpace', 
    body
  }).then( response => ({
    results: response.hits,
    facets: response.aggregations,
    page, q, filters 
  }));
  return request;
}
