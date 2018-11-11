import {takeLatest} from 'redux-saga/effects';

import {updateEntity} from 'features/entity/entitySaga';
import {aggregateDataSpace} from 'features/dataSpaceAggs/dataSpaceAggsSaga';
import {updateEntityAndSearchDS, searchDSByEntity } from 'features/dataSpace/dataSpaceSaga';

import {submitSearch, paginateSearch} from 'features/search/searchSaga';

import {ENTITY_UPDATE, ENTITY_FOUND} from 'features/entity/entityConstants';
import {SEARCH_SUBMITTED,
        SEARCH_RESULTS_RECEIVED,
        SEARCH_PAGINATED 
      } from 'features/search/searchConstants';

import {DS_ENTITY_UPDATE, DS_ENTITY_FOUND, DS_FILTER} from 'features/dataSpace/dataSpaceConstants';

// Watches for ENTITY_UPDATE action type asynchronously
export function* watchEntity() {
  yield takeLatest(ENTITY_UPDATE, updateEntity);
}

// Weatches for the ENTITY_FOUND action and triggers a dataspace search.
export function* watchEntityFound() {
  yield takeLatest(ENTITY_FOUND, aggregateDataSpace);
}

// Watches for DS_ENTITY_UPDATE action type asynchronously
export function* watchDSEntity() {
  yield takeLatest(DS_ENTITY_UPDATE, updateEntityAndSearchDS);
}

// Watches for DS_ENTITY_FOUND action type asynchronously
export function* watchDSEntityFound() {
  yield takeLatest(DS_ENTITY_FOUND, searchDSByEntity);
}

// Watches for DS_ENTITY_FOUND action type asynchronously
export function* watchDSFilter() {
  yield takeLatest(DS_FILTER, searchDSByEntity);
}

// Watches for SEARCH_SUBMITTED action type asynchronously
export function* watchSearch() {
  yield takeLatest(SEARCH_SUBMITTED, submitSearch);
}

// Watches for  action type asynchronously
export function* watchPaginate() {
  yield takeLatest(SEARCH_PAGINATED, paginateSearch);
}
