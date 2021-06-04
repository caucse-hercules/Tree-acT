import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { insertNode, removeNode, changeName, initState, expandNode } from "../module/tree";
import { RootState } from "../module";
import Tree from "../components/Tree";
import { MessageData } from "../../../common/types";
import { debounce } from "lodash";

type vscode = {
  postMessage(message: MessageData): void;
  setState(state: any): void;
  getState(): any;
};

declare const vscode: vscode;
const TreeContainer = () => {
  const sendStateToExtension = useCallback(
    debounce((state: RootState) => {
      console.log(state.treeReducer.treeData);
      vscode.postMessage({
        command: "updateState",
        data: state.treeReducer.treeData,
      });
      vscode.setState({ data: state.treeReducer.treeData });
    }, 200),
    []
  );

  const treeData = useSelector((state: RootState) => {
    sendStateToExtension(state);
    return state.treeReducer.treeData;
  });
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

  useEffect(() => {
    vscode.postMessage({ command: "init" });
    // TODO: dispatch loading and wait for checking initial state.
    window.addEventListener("message", (event) => {
      const message = event.data; // The JSON data our extension sent

      onInitState(message.data);
      // TODO: update state and dispatch loading done
    });
  }, []);

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
