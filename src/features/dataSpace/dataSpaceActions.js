import {  DS_ENTITY_UPDATE,
          DS_SEARCH_PAGINATED, 
          DS_ENTITY_FOUND,
          DS_FILTER } from './dataSpaceConstants';

export const updateCurieAndSource = ({curie, source}) => ({
  type: DS_ENTITY_UPDATE,
  payload: {curie, source }
});


export const updateFilters = ({filters, entity, source, page = 1}) => {
  const payload = { source, entity, filters, page };
  return ({
    type: DS_FILTER,
    payload
  })
};
