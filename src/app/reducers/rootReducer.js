import {combineReducers} from 'redux'

import {reduceReducers} from 'common/utils/reducerUtils'

import entityReducer from 'features/entity/entityReducer'
import entitySearchReducer from 'features/entitySearch/entitySearchReducer'
import dataSpaceAggsReducer from 'features/dataSpaceAggs/dataSpaceAggsReducer'
import dataSpaceReducer from 'features/dataSpace/dataSpaceReducer'
import literatureReducer from 'features/literature/literatureReducer'

const combinedReducer = combineReducers({
  entity: entityReducer,
  entitySearch: entitySearchReducer,
  dataSpaceAggs: dataSpaceAggsReducer,
  dataSpace: dataSpaceReducer,
  literature: literatureReducer
})

const rootReducer = reduceReducers(
  combinedReducer
)

export default rootReducer
