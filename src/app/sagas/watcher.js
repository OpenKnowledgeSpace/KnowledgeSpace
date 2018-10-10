import { takeLatest } from 'redux-saga/effects';
import { updateEntity } from 'features/wikiPage/wikiPageSaga';
import { ENTITY_UPDATE, ENTITY_LOADED } from 'features/wikiPage/wikiPageConstants';

// Watches for SEARCH_MEDIA_REQUEST action type asynchronously
export default function* watchEntity() {
  yield takeLatest(ENTITY_UPDATE, updateEntity);
}
