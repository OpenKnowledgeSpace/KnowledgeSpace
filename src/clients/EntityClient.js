import {toString, omitBy, isEmpty, has, map, flatten} from 'lodash'
import {esclient} from './ESClient'
import {filterBuilder, combineAggsAndFilters} from './utils'

const ENTITY_RESULTS_PER_PAGE = 25

export const findBySlug = slug => {
  if (typeof slug === 'undefined') {
    return {}
  }
  return esclient.get({
    index: 'scigraph',
    type: 'entities',
    id: slug
  }).then(response => response._source)
}

const aggsParams = () => (
  {
    aggs: {
      category: {
        terms: {
          field: 'category'
        }
      }
    }
  }
)

// Pass a string that gets added to an ES query
const queryBuilder = query => {
  return (
    {
      bool: {
        must: {
          multi_match: {
            query,
            fields: [ 'title^99', 'labels^10', 'definitions.text', 'synonyms^8', 'abbreviations^8']
          }
        },
      }
    }
  )
}

export const search = ({page = 1, q = '', filters = {}}) => {
  // Start with the aggs we alway use.
  const body = aggsParams()

  // Now set pagination
  const start = (Number(page) - 1) * ENTITY_RESULTS_PER_PAGE
  body.from = start
  body.size = ENTITY_RESULTS_PER_PAGE

  // Add a query if there's a q param
  if (!isEmpty(toString(q))) {
    body.query = queryBuilder(q)
  }

  const queryFilters = omitBy(filters, isEmpty)
  if (!isEmpty(queryFilters)) {
    if (!has(body, 'query.bool')) {
      body.query = {bool: {}}
    }
    body.query.bool.filter = filterBuilder(queryFilters)
  }

  return esclient.search({
    index: 'scigraph',
    type: 'entities',
    body
  }).then(response => ({
    results: response.hits,
    facets: combineAggsAndFilters(response.aggregations, filters),
    page,
    q,
    filters
  })
  )
}
