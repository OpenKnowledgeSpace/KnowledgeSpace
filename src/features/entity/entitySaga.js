import { put, call } from 'redux-saga/effects';
import { findByCurie } from "clients/EntityClient";
import { queryAllByEntity } from "clients/DataSpaceClient";
import { ENTITY_UPDATE, ENTITY_FOUND, ENTITY_LOADED, ENTITY_DATASPACE_RESULTS_FOUND } from './entityConstants';

export function* updateEntity({curie}) {
  try {
    const entity = yield call(findByCurie, curie);
    yield put({ type: ENTITY_FOUND, payload: entity });
  } catch (err) {
    yield put({ type: 'ENTITY_LOAD_ERROR', err}); 
  }
}

export function* queryDataSpace({payload}) {
  try {
    const ds = yield call(queryAllByEntity, payload);
    yield put({ type: ENTITY_DATASPACE_RESULTS_FOUND, payload: ds });
  } catch (err) {
    yield put({ type: 'ENTITY_DATASPACE_QUERY_ERROR', err}); 
  }
}
