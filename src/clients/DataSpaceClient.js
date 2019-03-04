import {toString, head, isNull, omitBy, isEmpty, isArray, has, keys, map, flatten} from 'lodash'
import {DATASPACE_SOURCES} from 'features/dataSpace/dataSpaceConstants'
import {esclient} from './ESClient'
import {filterBuilder} from './utils'

const queryString = (labels) => {
  if ( labels.length > 1 ) {
   return labels.map( label => `(${label})` ).join(' OR ');
  } else {
   return head(labels);
  }
}

export const queryAllByEntity = ({labels}) => {
  if (isNull(labels)) {
    return {}
  }
  
  const query = queryString(labels)

  const body = {
    size: 0,
    query: {
      query_string: {query}
    },
    aggs: {
      sources: {
        terms: {
          field: '_index',
          size: 20
        }
      }
    }
  }

  const request = esclient.search({
    index: '*',
    type: 'dataSpace',
    body
  }).then(response => response.aggregations.sources.buckets)
  return request
}

const aggParameters = fields => {
  const aggs = {}
  Object.keys(fields).forEach(field => {
    aggs[field] = {terms: {field}}
  })
  return aggs
}

export const querySourceByEntity = ({source, entity, page = 0, q = '', filters = {}}) => {
  const {labels} = entity;
  const aggs = aggParameters(DATASPACE_SOURCES[source].aggs)
  const query = queryString(labels)

  if (isNull(labels)) {
    return {}
  }
  const body = {aggs,
    query: {
      bool: {
        must: {query_string: {query}}
      }
    }
  }

  // Now set pagination
  body.size = 25 
  body.from = page * 25


  const filterFields = omitBy(filters, isEmpty)
  if (!isEmpty(filterFields)) {
    body.query.bool.filter = filterBuilder(filterFields)
  }

  const request = esclient.search({
    index: source,
    type: 'dataSpace',
    body
  }).then(response => ({
    results: response.hits,
    facets: response.aggregations,
    page, q, filters
  }))
  return request
}
