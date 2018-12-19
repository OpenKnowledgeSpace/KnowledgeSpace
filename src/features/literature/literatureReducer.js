import {createReducer} from 'common/utils/reducerUtils'
import {mapValues, concat} from 'lodash'
import {LITERATURE_SEARCH_SUBMITTED, LITERATURE_RESULTS_FOUND, LITERATURE_SEARCH_RESULTS_PAGINATED} from './literatureConstants'

const initialState = {
  results: {hits: []},
  facets: {},
  filters: {},
  page: 1
}

export function loadLiterature(state = {}, payload) {
  const {page, results, filters, facets} = payload
  state.results = results
  state.filters = mapValues(filters, v => new Set(v))
  state.page = page || 1
  state.facets = facets
  return {...state}
}

export function appendResults(state = {}, payload) {
  const hits = concat(state.results.hits, payload.results.hits)
  state.results.hits = hits
  state.page = payload.page
  return {...state}
}

export default createReducer(initialState, {
  [LITERATURE_RESULTS_FOUND]: loadLiterature,
  [LITERATURE_SEARCH_RESULTS_PAGINATED]: appendResults
})
