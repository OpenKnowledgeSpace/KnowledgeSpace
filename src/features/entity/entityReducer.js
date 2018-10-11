import {createReducer} from "common/utils/reducerUtils";
import { ENTITY_UPDATE, ENTITY_LOADED } from './entityConstants';

const initialState = {};

export function updateEntity( state = {} ) {
  return initialState;  
}

export function loadEntity( state = {}, payload ) {
  return { ...state, ...payload } 
}


export default createReducer(initialState, {
  [ENTITY_UPDATE] : updateEntity, 
  [ENTITY_LOADED] : loadEntity
})
