import {combineReducers} from "redux";

import {reduceReducers} from "common/utils/reducerUtils";

import entityReducer from 'features/entity/entityReducer';
import searchReducer from 'features/search/searchReducer';
import dataSpaceAggsReducer from 'features/dataSpaceAggs/dataSpaceAggsReducer';
import dataSpaceReducer from 'features/dataSpace/dataSpaceReducer';

const combinedReducer = combineReducers({
  entity: entityReducer,
  search: searchReducer,
  dataSpaceAggs: dataSpaceAggsReducer,
  dataSpace: dataSpaceReducer
});

const rootReducer = reduceReducers(
  combinedReducer
);

export default rootReducer;
