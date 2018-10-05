import {combineReducers} from "redux";

import {reduceReducers} from "common/utils/reducerUtils";
import testReducer from "./testReducer";

const combinedReducer = combineReducers({
  test: testReducer
});

const rootReducer = reduceReducers(
  combinedReducer
);

export default rootReducer;
