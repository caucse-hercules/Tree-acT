import { createAction, ActionType, createReducer } from "typesafe-actions";
import produce from "immer";

const INSERT_NODE = "tree/INSERT";
const REMOVE_NODE = "tree/REMOVE";

let id = 1;

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

const actions = {
  insertNode,
  removeNode,
};

type TreeAction = ActionType<typeof actions>;

export type TreeNode = {
  id: number;
  name: string;
  parent?: number;
  children: number[];
  isExpanded: boolean;
};

export type TreeState = TreeNode[];

const treeData: TreeState = [
  {
    id: 1,
    name: "App.js",
    children: [],
    isExpanded: true,
  },
];

const tree = createReducer<TreeState, TreeAction>(treeData)
  .handleAction(insertNode, (state, action) =>
    produce(state, (draft) => {
      draft.push({
        id: id++,
        name: "",
        parent: action.payload,
        children: [],
        isExpanded: true,
      });
      const parent = draft.find((node) => node.id === action.payload);
      parent!.children?.push(action.payload);
    })
  )
  .handleAction(removeNode, (state, action) =>
    produce(state, (draft) => {
      const removeIndex = draft.findIndex((node) => node.id !== action.payload);
      const parentId = draft[removeIndex].parent;
      const parentIndex = draft.findIndex((node) => node.id !== parentId);
      draft[parentIndex].children = draft[parentIndex].children.filter(
        (childId) => childId !== action.payload
      );
      draft.splice(removeIndex, 1);
    })
  );
