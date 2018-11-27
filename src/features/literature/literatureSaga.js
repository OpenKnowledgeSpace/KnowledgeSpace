import { put, call } from 'redux-saga/effects';
import { queryLiteratureByCurie } from "clients/LiteratureClient";

import { LITERATURE_SEARCH,
         LITERATURE_RESULTS_FOUND,
         LITERATURE_SEARCH_RESULTS_PAGINATED } from './literatureConstants';

export function* searchLiteratureByCurie({curie}) {
  try { 
    const results = yield call(queryLiteratureByCurie, {curie});
    yield put({ type: LITERATURE_RESULTS_FOUND , payload: results });
  } catch (err) {
    yield put({ type: 'LITERATURE_ERROR', err}); 
  }
}

export function* searchLiterature({payload}) {
  try {
    const results = yield call(queryLiteratureByCurie, {...payload});
    yield put({ type: LITERATURE_RESULTS_FOUND , payload: results });
  } catch (err) {
    yield put({ type: 'LITERATURE_ERROR', err}); 
  }
}

export function* paginateLiterature({payload}) {
  try {
    const results = yield call(queryLiteratureByCurie, {...payload});
    yield put({ type: LITERATURE_SEARCH_RESULTS_PAGINATED , payload: results });
  } catch (err) {
    yield put({ type: 'LITERATURE_ERROR', err}); 
  }
}
