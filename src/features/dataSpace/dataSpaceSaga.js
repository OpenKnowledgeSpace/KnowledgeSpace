import {findBySlug} from 'clients/EntityClient'
import {querySourceByEntity} from 'clients/DataSpaceClient'

import {ENTITY_FOUND} from '../entity/entityConstants'
import {DS_ENTITY_FOUND, DS_RESULTS_FOUND, DS_SEARCH_RESULTS_PAGINATED} from './dataSpaceConstants'
import {put, call} from 'redux-saga/effects'

export function * updateEntityAndSearchDS({payload}) {
  try {
    const {slug, source} = payload
    const entity = yield call(findBySlug, slug)
    yield put({type: ENTITY_FOUND, payload: entity})
    yield put({type: DS_ENTITY_FOUND, payload: {entity, source}})
  } catch (err) {
    yield put({type: 'DATASPACE_ERROR', err})
  }
}

export function * searchDSByEntity({payload}) {
  try {
    const {entity, source, filters, page} = payload
    const results = yield call(querySourceByEntity, {entity, source, filters, page})
    yield put({type: DS_RESULTS_FOUND, payload: results})
  } catch (err) {
    yield put({type: 'DATASPACE_ERROR', err})
  }
}

export function * paginateDSSearch({payload}) {
  try {
    const {entity, source, filters, page} = payload
    const results = yield call(querySourceByEntity, {entity, source, filters, page})
    yield put({type: DS_SEARCH_RESULTS_PAGINATED, payload: results})
  } catch (err) {
    yield put({type: 'ENTITY_SEARCH_LOAD_ERROR', err})
  }
}
