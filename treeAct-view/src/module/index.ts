import { combineReducers } from "redux";
import treeReducer, { TreeState } from "./tree";

export interface RootState {
  treeReducer: TreeState;
}

const rootReducer = combineReducers({
  treeReducer,
});

export default rootReducer;
