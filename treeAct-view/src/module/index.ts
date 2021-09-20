import { combineReducers } from "redux";
import treeReducer from "./tree";
import { TreeState } from "../types";

export interface RootState {
  treeReducer: TreeState;
}

const rootReducer = combineReducers({
  treeReducer,
});

export default rootReducer;
