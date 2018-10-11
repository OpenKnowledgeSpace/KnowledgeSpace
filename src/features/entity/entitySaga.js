import { put, call } from 'redux-saga/effects';
import { findByEntity } from "clients/EntityClient";
import { ENTITY_UPDATE, ENTITY_LOADED } from './entityConstants';

export function* updateEntity({curie}) {
  try {
    const entity = yield call(findByEntity, curie);
    yield put({ type: ENTITY_LOADED, payload: entity });
  } catch (err) {
    yield put({ type: 'ENTITY_LOAD_ERROR', err}); 
  }
}
