import {SEARCH_INITIALIZED, 
        SEARCH_SUBMITTED,
        SEARCH_RESULTS_RECEIVED,
        SEARCH_PAGINATED } from './searchConstants';

export const initializeSearch = () => ({
  type: SEARCH_INITIALIZED, 
});

export const paginateSearch = (query) => ({
  type: SEARCH_PAGINATED,
  query
});

export const submitSearch = (query) => ({
  type: SEARCH_SUBMITTED,
  query
});

export const updateResults = (results) => ({
  type: SEARCH_RESULTS_RECEIVED,
  results
});
