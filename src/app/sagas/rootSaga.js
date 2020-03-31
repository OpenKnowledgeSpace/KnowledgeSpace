import {watchEntity, watchEntityFound, watchSearch,
  watchPaginate, watchDSEntity, watchDSEntityFound, watchDSFilter, watchDSPaginate,
  watchAutosuggest, watchLiteratureFilter, watchLiteraturePaginate, watchBrainRegionSearch} from './watchers'
import {all} from 'redux-saga/effects'

// Here, we register our watcher saga(s) and export as a single generator
// function (startForeman) as our root Saga.
export default function * startForman() {
  yield all([
    watchEntity(),
    watchEntityFound(),
    watchDSEntity(),
    watchDSEntityFound(),
    watchDSFilter(),
    watchSearch(),
    watchBrainRegionSearch(),
    watchPaginate(),
    watchDSPaginate(),
    watchLiteraturePaginate(),
    watchLiteratureFilter(),
    watchAutosuggest()
  ])
}
