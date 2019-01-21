import {toString, omitBy, isEmpty, has, map, flatten, merge} from 'lodash'
import {esclient} from './ESClient'
import {filterBuilder} from './utils'

const LITERATURE_RESULTS_PER_PAGE = 25

const aggsParams = () => (
  {
    aggs: {
      pub_type: {
        terms: {
          field: 'pub_type'
        }
      },
      'journal.title': {
        terms: {
          field: 'journal.title'
        }
      }
    }
  }
)
// Pass a string that gets added to an ES query
const queryBuilder = query => {
  return ({multi_match: {
    query,
    fields: ['labels^10', 'definitions', 'synonyms^8', 'abbreviations^8']
  }
  }
  )
}

export const queryLiteratureByHash = ({hash, page = 1, q, filters = {}}) => {
  // Start with the aggs we alway use.
  const body = aggsParams()
  body.query = {bool: {}}
  // Now set pagination
  const start = (Number(page) - 1) * LITERATURE_RESULTS_PER_PAGE
  body.from = start
  body.size = LITERATURE_RESULTS_PER_PAGE

  // In literature, we should be able to filter using the hash.
  if (!isEmpty(hash)) {
    body.query.bool.must = [{
      nested: {
        path: 'text_mined_entities.nlp',
        query: {
          query_string: {
            query: hash,
            fields: [
              'text_mined_entities.nlp.tagged_entities_grouped.*.reference'
            ]
          }
        }
      }
    }]
  }

  // Add a query if there's a q param
  if (!isEmpty(toString(q))) {
    body.query.bool.should = [queryBuilder(q)]
  }

  const queryFilters = omitBy(filters, isEmpty)
  if (!isEmpty(queryFilters)) {
    body.query.bool.filter = filterBuilder(queryFilters)
  }

  return esclient.search({
    index: 'pubmed-19',
    type: 'publication',
    body
  }).then(response => ({
    results: response.hits,
    facets: response.aggregations,
    page, q, filters
  }))
}
