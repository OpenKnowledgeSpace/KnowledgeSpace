import {createReducer} from "common/utils/reducerUtils";
import { ENTITY_UPDATE, ENTITY_LOADED } from './wikiPageConstants';

const initialState = {
  title: "The is a test!",
  description: "A dummy record" 
};

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
