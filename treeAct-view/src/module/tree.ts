import { createAction, ActionType, createReducer } from "typesafe-actions";
import produce from "immer";
import { NewTreeNode } from "../../../common/types";

const INIT_STATE = "tree/INIT_STATE";
const INSERT_NODE = "tree/INSERT";
const REMOVE_NODE = "tree/REMOVE";
const CHANGE_NAME = "tree/CHANGE_NAME";
const EXPAND_NODE = "tree/EXPAND_NODE";

let id = 0;

export const initState = createAction(INIT_STATE)<NewTreeNode[]>();
export const insertNode = createAction(INSERT_NODE)<number>();
export const removeNode = createAction(REMOVE_NODE)<number>();
export const changeName = createAction(CHANGE_NAME)<Name>();
export const expandNode = createAction(EXPAND_NODE)<number>();

const actions = {
  initState,
  insertNode,
  removeNode,
  changeName,
  expandNode,
};

export type Name = {
  id: number;
  name: string;
};

export type TreeAction = ActionType<typeof actions>;

export type TreeState = { treeData: NewTreeNode[] };

const treeData: TreeState = {
  treeData: [
    {
      id: 0,
      name: "App",
      children: [],
      isExpanded: true,
    },
  ],
};

const treeReducer = createReducer<TreeState, TreeAction>(treeData)
  .handleAction(initState, (state, action) =>
    produce(state, (draft) => {
      const maxIdNode = action.payload.reduce((prev, curr) => {
        return prev.id > curr.id ? prev : curr;
      });
      id = maxIdNode.id;
      draft.treeData = action.payload;
    })
  )
  .handleAction(insertNode, (state, action) =>
    produce(state, (draft) => {
      draft.treeData.push({
        id: ++id,
        name: "",
        parent: action.payload,
        children: [],
        isExpanded: true,
      });
      const parent = draft.treeData.find((node) => node.id === action.payload);
      parent!.children?.push(id);
    })
  )
  .handleAction(removeNode, (state, action) =>
    produce(state, (draft) => {
      const removeIndex = draft.treeData.findIndex(
        (node) => node.id === action.payload
      );
      const parentId = draft.treeData[removeIndex].parent;
      const parent = draft.treeData.find((node) => node.id === parentId);
      const indexInParent = parent!.children.findIndex(
        (id) => id === action.payload
      );
      const temp_arr1 = parent!.children.slice(0, indexInParent);
      const temp_arr2 = parent!.children.slice(indexInParent + 1);
      parent!.children = temp_arr1
        .concat(draft.treeData[removeIndex].children)
        .concat(temp_arr2);
      parent!.children.map((childId) => {
        const child = draft.treeData.find((node) => node.id === childId);
        child!.parent = parentId;
      });
      draft.treeData.splice(removeIndex, 1);
    })
  )
  .handleAction(changeName, (state, action) =>
    produce(state, (draft) => {
      const clickedNode = draft.treeData.find(
        (node) => node.id === action.payload.id
      );
      clickedNode!.name = action.payload.name;
    })
  )
  .handleAction(expandNode, (state, action) =>
    produce(state, (draft) => {
      const clickedNode = draft.treeData.find(
        (node) => node.id === action.payload
      );
      clickedNode!.isExpanded = !clickedNode!.isExpanded;
    })
  );

export default treeReducer;
