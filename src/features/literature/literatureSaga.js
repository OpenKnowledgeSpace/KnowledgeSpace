import {queryLiteratureByHash} from 'clients/LiteratureClient'

import {LITERATURE_SEARCH,
  LITERATURE_RESULTS_FOUND,
  LITERATURE_SEARCH_RESULTS_PAGINATED} from './literatureConstants'
import {put, call} from 'redux-saga/effects'

export function * searchLiteratureByHash(payload) {
  try {
    const {hash} = payload;
    const results = yield call(queryLiteratureByHash, {hash})
    yield put({type: LITERATURE_RESULTS_FOUND, payload: results})
  } catch (err) {
    yield put({type: 'LITERATURE_ERROR', err})
  }
}

export function * searchLiterature({payload}) {
  try {
    const results = yield call(queryLiteratureByHash, {...payload})
    yield put({type: LITERATURE_RESULTS_FOUND, payload: results})
  } catch (err) {
    yield put({type: 'LITERATURE_ERROR', err})
  }
}

export function * paginateLiterature({payload}) {
  try {
    const results = yield call(queryLiteratureByHash, {...payload})
    yield put({type: LITERATURE_SEARCH_RESULTS_PAGINATED, payload: results})
  } catch (err) {
    yield put({type: 'LITERATURE_ERROR', err})
  }
}
