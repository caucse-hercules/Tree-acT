import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  insertNode,
  removeNode,
  changeName,
  initState,
  expandNode,
} from "../module/tree";
import { RootState } from "../module";
import Tree from "../components/Tree";
import { MessageData } from "../../../common/types";
import { debounce } from "lodash";

/**
 * Container to get state from redux store and dispatch actions of tree reducer
 */

declare const vscode: vscode;

type vscode = {
  postMessage(message: MessageData): void;
  setState(state: any): void;
  getState(): any;
};

const TreeContainer = () => {
  useEffect(() => {
    if (vscode !== undefined) {
      vscode.postMessage({ command: "init" });
      // TODO: dispatch loading and wait for checking initial state.
      window.addEventListener("message", (event) => {
        const message = event.data; // The JSON data our extension sent

        onInitState(message.data);
        // TODO: update state and dispatch loading done
      });
    }
  }, []);

  const sendStateToExtension = useCallback(
    debounce((state: RootState) => {
      console.log(state.treeReducer.treeData);
      if (vscode !== undefined) {
        vscode.postMessage({
          command: "updateState",
          data: state.treeReducer.treeData,
        });
        vscode.setState({ data: state.treeReducer.treeData });
      }
    }, 200),
    []
  );

  // Get current state(tree data) from redux store
  const treeData = useSelector((state: RootState) => {
    sendStateToExtension(state);
    return state.treeReducer.treeData;
  });

  // Dispatch actions created at tree module
  const dispatch = useDispatch();
  const onInsert = useCallback((id) => dispatch(insertNode(id)), [dispatch]);
  const onRemove = useCallback((id) => dispatch(removeNode(id)), [dispatch]);
  const onChangeName = useCallback(
    (name) => dispatch(changeName(name)),
    [dispatch]
  );
  const onExpand = useCallback((id) => dispatch(expandNode(id)), [dispatch]);
  const onInitState = useCallback(
    (initialState) => dispatch(initState(initialState)),
    [dispatch]
  );

  return (
    <Tree
      treeData={treeData}
      onInsert={onInsert}
      onRemove={onRemove}
      onChangeName={onChangeName}
      onExpand={onExpand}
    />
  );
};

export default React.memo(TreeContainer);
