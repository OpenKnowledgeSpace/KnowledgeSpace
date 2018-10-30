import {createReducer} from "common/utils/reducerUtils";
import { SEARCH_INITIALIZED, SEARCH_SUBMITTED, SEARCH_RESULTS_RECEIVED, SEARCH_PAGINATED, SEARCH_RESULTS_PAGINATED } from './searchConstants';
import {concat} from 'lodash';

const initialState = {
  results: { hits: [] }, 
  facets: {},
  params: { filters: {}, page: 1 }
};

export function startSearch() {
  return initialState;  
}

export function submitSearch( state= {}, payload ) {
  return { ...state, ...payload } 
}

export function paginateSearch( state= {}, payload ) {
  return { ...state, ...payload } 
}

export function appendResults( state= {}, payload ) { 
  const hits = concat(state.results.hits, payload.results.hits); 
  const results = { ...state, ...payload };
  results.results.hits = hits;
  return results;
}


export function loadResults( state= {}, payload ) {
  return { ...state, ...payload } 
}

export default createReducer(initialState, {
  [SEARCH_INITIALIZED] : startSearch,
  [SEARCH_SUBMITTED]: submitSearch,
  [SEARCH_RESULTS_RECEIVED]: loadResults,
  [SEARCH_PAGINATED] : paginateSearch,
  [SEARCH_RESULTS_PAGINATED] : appendResults
})
