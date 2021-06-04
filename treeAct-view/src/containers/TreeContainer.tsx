import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { insertNode, removeNode, changeName } from "../module/tree";
import { RootState } from "../module";
import Tree from "../components/Tree";
import { debounce } from "lodash";
import { MessageData } from "../../../common/types";

interface vscode {
  postMessage(message: MessageData): void;
}

declare const vscode: vscode;

const TreeContainer = () => {
  const sendStateToExtension = useCallback(
    debounce((state: RootState) => {
      console.log(state.treeReducer.treeData);
      vscode.postMessage({
        command: "updateState",
        data: state.treeReducer.treeData,
      });
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
  return (
    <Tree
      treeData={treeData}
      onInsert={onInsert}
      onRemove={onRemove}
      onChangeName={onChangeName}
    />
  );
};

export default React.memo(TreeContainer);
