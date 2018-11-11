import { put, call } from 'redux-saga/effects';
import { findByEntity } from "clients/EntityClient";
import { querySourceByEntity } from "clients/DataSpaceClient";

import { DS_ENTITY_FOUND, DS_RESULTS_FOUND } from './dataSpaceConstants';
import { ENTITY_FOUND } from '../entity/entityConstants';


export function* updateEntityAndSearchDS({payload}) {
  try {
    const {curie, source} = payload 
    const entity = yield call(findByEntity, curie);
    yield put({ type: ENTITY_FOUND, payload: entity });
    yield put({ type: DS_ENTITY_FOUND , payload: {  entity, source } });
  } catch (err) {
    yield put({ type: 'DATASPACE_ERROR', err}); 
  }
}

export function* searchDSByEntity({payload}) {
  try {
    const {entity,source,filters,page} = payload; 
    const results = yield call(querySourceByEntity, {entity,source,filters,page});
    yield put({ type: DS_RESULTS_FOUND , payload: { results, filters, page }});
  } catch (err) {
    yield put({ type: 'DATASPACE_ERROR', err}); 
  }
}
