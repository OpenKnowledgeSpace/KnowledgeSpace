import {toString, isNull, omitBy, isEmpty, isArray, has, keys, map, flatten} from 'lodash'
import {DATASPACE_SOURCES} from 'features/dataSpace/dataSpaceConstants'
import {esclient} from './ESClient'
import {filterBuilder} from './utils'

export const queryAllByEntity = ({label}) => {
  if (isNull(label)) {
    return {}
  }
  const body = {
    size: 0,
    query: {
      query_string: {query: label}
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
  const {label} = entity;
  const aggs = aggParameters(DATASPACE_SOURCES[source].aggs)
  
  if (isNull(label)) {
    return {}
  }
  const body = {aggs,
    query: {
      bool: {
        must: {query_string: {query: label}}
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
