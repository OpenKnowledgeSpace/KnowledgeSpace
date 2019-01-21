import {ENTITY_UPDATE, ENTITY_FOUND, ENTITY_LOADED} from './entityConstants'

export const updateHash = hash => ({
  type: ENTITY_UPDATE,
  hash
})

export const loadEntity = entity => ({
  type: ENTITY_FOUND,
  entity
})
