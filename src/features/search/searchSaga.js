import { put, call } from 'redux-saga/effects';
import { search } from "clients/EntityClient";
import { SEARCH_RESULTS_RECEIVED, SEARCH_RESULTS_PAGINATED } from './searchConstants';

export function* submitSearch({query}) {
  try {
    const results = yield call(search, query);
    yield put({ type: SEARCH_RESULTS_RECEIVED, payload: results });
  } catch (err) {
    yield put({ type: 'SEARCH_LOAD_ERROR', err}); 
  }
}

export function* paginateSearch({query}) {
  try {
    const results = yield call(search, query);
    yield put({ type: SEARCH_RESULTS_PAGINATED, payload: results });
  } catch (err) {
    yield put({ type: 'SEARCH_LOAD_ERROR', err}); 
  }
}
