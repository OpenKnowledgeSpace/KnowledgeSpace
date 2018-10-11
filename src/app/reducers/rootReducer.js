import {combineReducers} from "redux";

import {reduceReducers} from "common/utils/reducerUtils";
import entityReducer from 'features/entity/entityReducer'

const combinedReducer = combineReducers({
  entity: entityReducer
});

const rootReducer = reduceReducers(
  combinedReducer
);

export default rootReducer;
