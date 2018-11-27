import {createReducer} from "common/utils/reducerUtils";
import {  DS_ENTITY_UPDATE, 
          DS_ENTITY_FOUND, 
          DS_RESULTS_FOUND, 
          DS_SEARCH_RESULTS_PAGINATED
        } from './dataSpaceConstants';

import { mapValues, concat } from 'lodash';

const initialState = {
  results: { hits: [] }, 
  facets: {},
  filters: {},
  page: 1
}

export function updateEntityAndSource( state = {}, {curie, source} ) {
  state.source = source;
  state.curie = curie;
  return {...state} 
}

export function loadEntity( state = {}, {source} ) {
  state.source = source; 
  return { ...state } 
}

export function loadDataSpace( state = {}, payload ) {
  const { page, results, filters, facets } = payload; 
  state.results = results;
  state.filters = mapValues( filters, v => new Set(v) );
  state.page = page || 1;
  state.facets = facets; 
  return {...state};
}

export function appendResults( state= {}, payload ) { 
  const hits = concat(state.results.hits, payload.results.hits); 
  state.results.hits = hits; 
  state.page = payload.page; 
  return {...state};
}

export default createReducer(initialState, {
  [DS_ENTITY_UPDATE] : updateEntityAndSource, 
  [DS_ENTITY_FOUND] : loadEntity,
  [DS_RESULTS_FOUND]: loadDataSpace,
  [DS_SEARCH_RESULTS_PAGINATED] : appendResults
})
