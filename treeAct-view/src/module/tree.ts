import { createAction, ActionType, createReducer } from "typesafe-actions";
import produce from "immer";
import { NewTreeNode } from "../../../common/types";
import { TreeState, Name } from "../types";
/**
 * Tree reducer module by Ducks pattern
 *
 * Actions:
 *  Insert node, Remove node, Change node name, Collapse/Expand descendants
 */
const INIT_STATE = "tree/INIT_STATE";
const INSERT_NODE = "tree/INSERT";
const REMOVE_NODE = "tree/REMOVE";
const CHANGE_NAME = "tree/CHANGE_NAME";
const EXPAND_NODE = "tree/EXPAND_NODE";

// ID for new node
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

type TreeAction = ActionType<typeof actions>;

// Initial state of tree reducer
const treeData: TreeState = {
  treeData: [
    {
      id: 0,
      name: "App",
      children: [], // Contain id of children nodes as number type
      isExpanded: true,
    },
  ],
};

// Reducer with handleAction Chaining method and immer
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
  // Insert default node to treeData array and ID to parent's children array
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
  // Remove clicked node
  .handleAction(removeNode, (state, action) =>
    produce(state, (draft) => {
      const removeIndex = draft.treeData.findIndex(
        (node) => node.id === action.payload
      );
      const parentId = draft.treeData[removeIndex].parent;
      const parent = draft.treeData.find((node) => node.id === parentId);
      const indexInParent = parent!.children.findIndex(
        (id) => id === action.payload
      ); // Index of the node in parent's children array

      // Attach the node's children array to parent's
      const temp_arr1 = parent!.children.slice(0, indexInParent);
      const temp_arr2 = parent!.children.slice(indexInParent + 1);
      parent!.children = temp_arr1
        .concat(draft.treeData[removeIndex].children)
        .concat(temp_arr2);

      // Update parent attribute of the node's children
      parent!.children.map((childId) => {
        const child = draft.treeData.find((node) => node.id === childId);
        child!.parent = parentId;
      });
      // Remove the node from tree data
      draft.treeData.splice(removeIndex, 1);
    })
  )
  // Change node's name
  .handleAction(changeName, (state, action) =>
    produce(state, (draft) => {
      const clickedNode = draft.treeData.find(
        (node) => node.id === action.payload.id
      );
      clickedNode!.name = action.payload.name;
    })
  )
  // Collapse/Expand clicked node's descendants
  .handleAction(expandNode, (state, action) =>
    produce(state, (draft) => {
      const clickedNode = draft.treeData.find(
        (node) => node.id === action.payload
      );
      clickedNode!.isExpanded = !clickedNode!.isExpanded;
    })
  );

export default treeReducer;
