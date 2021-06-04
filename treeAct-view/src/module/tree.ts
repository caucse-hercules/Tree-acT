import { createAction, ActionType, createReducer } from "typesafe-actions";
import produce from "immer";

const INSERT_NODE = "tree/INSERT";
const REMOVE_NODE = "tree/REMOVE";
const CHANGE_NAME = "tree/CHANGE_NAME";

let id = 0;

export const insertNode = createAction(INSERT_NODE)<number>();
export const removeNode = createAction(REMOVE_NODE)<number>();
export const changeName = createAction(CHANGE_NAME)<Name>();

const actions = {
  insertNode,
  removeNode,
  changeName,
};

export type Name = {
  id: number;
  name: string;
};

export type TreeAction = ActionType<typeof actions>;

export type TreeNode = {
  id: number;
  name: string;
  parent?: number;
  children: number[];
  isExpanded: boolean;
};

export type TreeState = { treeData: TreeNode[] };

const treeData: TreeState = {
  treeData: [
    {
      id: 0,
      name: "App.js",
      children: [],
      isExpanded: true,
    },
  ],
};

const treeReducer = createReducer<TreeState, TreeAction>(treeData)
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
      /*parent!.children.splice(indexInParent, 1);
      draft.treeData[removeIndex].children.map((id) => {
        parent!.children.splice(indexInParent, 0, id);
        const child = draft.treeData.find((node) => node.id === id);
        child!.parent = parentId;
      });*/
      const temp_arr1 = parent!.children.slice(0, indexInParent);
      const temp_arr2 = parent!.children.slice(indexInParent + 1);
      parent!.children = temp_arr1
        .concat(draft.treeData[removeIndex].children)
        .concat(temp_arr2);
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
  );

export default treeReducer;
