import {toString, omitBy, isEmpty, isArray, has, map, flatten} from "lodash";
import {esclient} from "./ESClient";

export const queryAllByEntity = (entity) => {
  if ( !has(entity, 'labels') ) { 
    return {};
  }

  let term;
  if ( isArray(entity.labels) && !isEmpty(entity.labels) ) {
    term = entity.labels[0];
  } else {
    return {};
  }

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
    type: 'dataspace', 
    body
  }).then( response => response.aggregations.sources.buckets );
  return request;

}
