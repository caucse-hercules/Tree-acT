import { createAction, ActionType, createReducer } from "typesafe-actions";
import produce from "immer";
import { TreeNode, TreeState, Name } from "../../../common/types";
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

export const initState = createAction(INIT_STATE)<TreeNode[]>();
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
      childrenId: [], // Contain id of children nodes as number type
      isExpanded: true,
    },
  ],
};

// Reducer with handleAction Chaining method and immer
const treeReducer = createReducer<TreeState, TreeAction>(treeData)
  .handleAction(initState, (state, action) =>
    produce(state, (draft) => {
      id = action.payload.reduce((prev, curr) =>
        prev.id > curr.id ? prev : curr
      ).id;
      draft.treeData = action.payload;
    })
  )
  // Insert default node to treeData array and ID to parent's children array
  .handleAction(insertNode, (state, action) =>
    produce(state, (draft) => {
      draft.treeData.push({
        id: ++id,
        name: "",
        parentId: action.payload,
        childrenId: [],
        isExpanded: true,
      });
      const parent = draft.treeData.find((node) => node.id === action.payload);
      parent!.childrenId?.push(id);
    })
  )
  // Remove clicked node
  .handleAction(removeNode, (state, action) =>
    produce(state, (draft) => {
      const removedNode = draft.treeData.find(
        (node) => node.id === action.payload
      );
      const removedNodeParent = draft.treeData.find(
        (node) => node.id === removedNode!.parentId
      );

      // Update parent attribute of the node's children
      removedNode!.childrenId.map((childId) => {
        const child = draft.treeData.find((node) => node.id === childId);
        child!.parentId = removedNodeParent!.id;
      });

      // Attach the node's children array to parent's
      removedNodeParent!.childrenId = removedNodeParent!.childrenId.reduce<
        number[]
      >(
        (acc, v) =>
          v === action.payload
            ? [...acc, ...removedNode!.childrenId]
            : [...acc, v],
        []
      );

      // Remove the node from tree data
      draft.treeData = draft.treeData.filter(
        (node) => node.id !== action.payload
      );
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
