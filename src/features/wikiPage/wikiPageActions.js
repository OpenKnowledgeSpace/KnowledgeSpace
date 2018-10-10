import { ENTITY_UPDATE, ENTITY_LOADED } from './wikiPageConstants';

export const updateEntity = (curie) => ({
  type: ENTITY_UPDATE,
  curie
});

export const loadEntity = (entity) => ({
  type: ENTITY_LOADED,
  entity
});
