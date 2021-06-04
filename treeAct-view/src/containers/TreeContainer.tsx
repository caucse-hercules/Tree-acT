import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { insertNode, removeNode, changeName, expandNode } from "../module/tree";
import { RootState } from "../module";
import Tree from "../components/Tree";

const TreeContainer = () => {
  const treeData = useSelector((state: RootState) => {
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
