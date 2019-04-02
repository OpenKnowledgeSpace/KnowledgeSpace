import {toString, omitBy, isEmpty, has, map, flatten} from 'lodash'
import {esclient} from './ESClient'
import {filterBuilder, combineAggsAndFilters} from './utils'

export const search = ({q = ''}) => {

  const body = { 
    'suggest': {
      'suggestions': {
        'prefix': q,
        'completion': {
          'field': 'suggestions',
          'skip_duplicates': true
        }
      } 
    } 
   }

  return esclient.search({
    index: 'scigraph',
    type: 'entities',
    body
  }).then(response => {
    const suggestions = flatten(response.suggest.suggestions.map(suggestion => {
      return suggestion.options.map( o => ({ name: o.text, slug: o._id }))
    }));
    return { q, suggestions }
  })
}
