import {combineReducers} from "redux";

import {reduceReducers} from "common/utils/reducerUtils";
import wikiPageReducer from 'features/wikiPage/wikiPageReducer'

const combinedReducer = combineReducers({
  wikiPage: wikiPageReducer
});

const rootReducer = reduceReducers(
  combinedReducer
);

export default rootReducer;
