import { createAction, ActionType, createReducer } from "typesafe-actions";
import produce from "immer";

const INSERT_NODE = "tree/INSERT";
const REMOVE_NODE = "tree/REMOVE";
const CHANGE_NAME = "tree/CHANGE_NAME";

let id = 0;

/*const defaultNode: TreeNode = {
  id: id++,
  name: "",
  parent: 
  children: [],
  isExpanded: true,
};*/

export const insertNode = createAction(INSERT_NODE)<number>();
/*{
      id: id++,
      name: "",
      children: [{}],
      isExpanded: true
   }*/

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
      console.log("Add node");
      console.log("add id: ", action.payload);
      draft.treeData.push({
        id: ++id,
        name: "",
        parent: action.payload,
        children: [],
        isExpanded: true,
      });
      const parent = draft.treeData.find((node) => node.id === action.payload);
      parent!.children?.push(id);
      console.log(draft.treeData);
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
      parent!.children.splice(indexInParent, 1);
      draft.treeData[removeIndex].children.map((id) => {
        parent!.children.splice(indexInParent, 0, id);
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
  );

export default treeReducer;
