import {takeLatest} from 'redux-saga/effects';
import {updateEntity} from 'features/entity/entitySaga';
import {aggregateDataSpace} from 'features/dataSpaceAggs/dataSpaceAggsSaga';

import {submitSearch, paginateSearch} from 'features/search/searchSaga';

import {ENTITY_UPDATE, ENTITY_FOUND} from 'features/entity/entityConstants';
import {SEARCH_SUBMITTED,
        SEARCH_RESULTS_RECEIVED,
        SEARCH_PAGINATED 
      } from 'features/search/searchConstants';

// Watches for ENTITY_UPDATE action type asynchronously
export function* watchEntity() {
  yield takeLatest(ENTITY_UPDATE, updateEntity);
}

// Weatches for the ENTITY_FOUND action and triggers a dataspace search.
export function* watchEntityFound() {
  yield takeLatest(ENTITY_FOUND, aggregateDataSpace);
}

// Watches for SEARCH_SUBMITTED action type asynchronously
export function* watchSearch() {
  yield takeLatest(SEARCH_SUBMITTED, submitSearch);
}

// Watches for  action type asynchronously
export function* watchPaginate() {
  yield takeLatest(SEARCH_PAGINATED, paginateSearch);
}
