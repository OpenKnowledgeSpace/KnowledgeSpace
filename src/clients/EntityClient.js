import {toString, omitBy, isEmpty, has, map, flatten} from "lodash";
import {esclient} from "./ESClient";
import {filterBuilder } from './utils';

export const findByEntity = (params) => {
  if ( typeof params == 'undefined' ) { 
    return {};
  }
  
  return esclient.get({
    index: 'knowledgespace',
    type: 'entities',
    id: params
  }).then( response => response._source );

}

let request;

const aggsParams = () => (
  { 
    aggs: {
      categories: { 
        terms: { 
          field: 'categories'
        }
      }
    }
  }
)

// Pass a string that gets added to an ES query
const queryBuilder = (query) => {
  return(
    {
      bool: {
        must: {
          multi_match: {
            query,
            fields: ["labels^10", "definitions", "synonyms^8", "abbreviations^8"]
          }
        }
      }
    }
  )
}


export const search = (params = {}) => {
  // start with the aggs we alway use. 
  const body = aggsParams(); 

  // now set pagination
  const start = ( Number(params.page) - 1 ) * 10;
  body.from = start;

  // add a query if there's a q param
  if ( toString(params.q).length > 0 ) {
    body.query = queryBuilder(params.q); 
  }
 
  const filters = omitBy(params.filters, isEmpty);
  if ( !isEmpty(filters) ) {
    if ( !has(body, 'query.bool')  ) { body.query = { bool: {}}; }
    body.query.bool.filter = filterBuilder(filters); 
  }

  request = esclient.search({
    index: 'knowledgespace',
    type: 'entities',
    body
  }).then( response => ({
    results: response.hits,
    facets: response.aggregations,
    params: params 
  }));
  return request;
}
