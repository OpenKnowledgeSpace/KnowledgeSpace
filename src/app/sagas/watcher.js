import { takeLatest } from 'redux-saga/effects';
import { updateEntity } from 'features/entity/entitySaga';
import { ENTITY_UPDATE, ENTITY_LOADED } from 'features/entity/entityConstants';

// Watches for SEARCH_MEDIA_REQUEST action type asynchronously
export default function* watchEntity() {
  yield takeLatest(ENTITY_UPDATE, updateEntity);
}
