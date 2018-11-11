import {createReducer} from "common/utils/reducerUtils";
import {  DS_ENTITY_UPDATE, 
          DS_ENTITY_FOUND, 
          DS_RESULTS_FOUND 
        } from './dataSpaceConstants';

import { mapValues } from 'lodash';

const initialState = { page: 1 };

export function updateEntityAndSource( state = {}, {curie, source} ) {
  return {curie,source, page: 1} 
}

export function loadEntity( state = {}, {source} ) {
  state.source = source; 
  return { ...state } 
}

export function loadDataSpace( state = {}, payload ) {
  const { page, results, filters = {} } = payload; 
  state.results = results;
  state.filters = mapValues( filters, v => new Set(v) );
  state.page = page || 1;
  return {...state};
}


export default createReducer(initialState, {
  [DS_ENTITY_UPDATE] : updateEntityAndSource, 
  [DS_ENTITY_FOUND] : loadEntity,
  [DS_RESULTS_FOUND]: loadDataSpace
})
