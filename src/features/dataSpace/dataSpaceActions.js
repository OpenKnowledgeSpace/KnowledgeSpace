import {DS_ENTITY_UPDATE,
  DS_SEARCH_PAGINATED,
  DS_ENTITY_FOUND,
  DS_SEARCH_SUBMITTED} from './dataSpaceConstants'

export const updateEntityAndSource = ({hash, source}) => ({
  type: DS_ENTITY_UPDATE,
  payload: {hash, source}
})

export const paginateSearch = query => ({
  type: DS_SEARCH_PAGINATED,
  payload: query
})

export const submitSearch = query => ({
  type: DS_SEARCH_SUBMITTED,
  payload: query
})
