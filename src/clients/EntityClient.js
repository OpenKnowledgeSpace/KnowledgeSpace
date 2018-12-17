import {toString, omitBy, isEmpty, has, map, flatten} from "lodash";
import {esclient} from "./ESClient";
import {filterBuilder, combineAggsAndFilters } from './utils';


const ENTITY_RESULTS_PER_PAGE = 25;

export const findByCurie = (params) => {
  if ( typeof params == 'undefined' ) { 
    return {};
  }
  
  return esclient.get({
    index: 'knowledgespace',
    type: 'entities',
    id: params
  }).then( response => response._source );

}


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
        },
        filter: {
          term: { deprecated: false } 
        }
      }
    }
  )
}


export const search = ({page=1, q='', filters={}}) => {
  // start with the aggs we alway use. 
  const body = aggsParams(); 

  // now set pagination
  const start = ( Number(page) - 1 ) * ENTITY_RESULTS_PER_PAGE;
  body.from = start;
  body.size = ENTITY_RESULTS_PER_PAGE;

  // add a query if there's a q param
  if ( !isEmpty(toString(q)) ) {
    body.query = queryBuilder(q); 
  }
 
  const queryFilters = omitBy(filters, isEmpty);
  if ( !isEmpty(queryFilters) ) {
    if ( !has(body, 'query.bool')  ) { body.query = { bool: {}}; }
    body.query.bool.filter = filterBuilder(queryFilters); 
  }

  return esclient.search({
    index: 'knowledgespace',
    type: 'entities',
    body
  }).then( response => ({
      results: response.hits,
      facets: combineAggsAndFilters(response.aggregations,filters),
      page,
      q,
      filters 
  })
  );
}
