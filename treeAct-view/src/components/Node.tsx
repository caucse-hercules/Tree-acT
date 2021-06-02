import React, { useState } from "react";
import styled from "styled-components";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { Input, ClickAwayListener } from "@material-ui/core";
import { AddCircleOutline, RemoveCircleOutlineSharp } from "@material-ui/icons";
import { node } from "webpack";
import { TreeNode, Name } from "../module/tree";

const Root = styled.p`
  display: inline-block;
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 50%;
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border: 0;
  position: relative;
  &:not(:last-child) {
    &:after {
      border-left: 1px solid green;
      bottom: -30px;
      content: "";
      height: 30px;
      left: 50%;
      position: absolute;
    }
  }
`;

const NonLeaf = styled(ToggleButton)`
  display: inline-block;
  margin: 0 auto;
  padding: 10px 20px;
  width: 80px;
  height: 60px;
  border-radius: 10%;
  border: 2px solid gray;
  position: relative;
  &:after {
    border-left: 1px solid green;
    bottom: -30px;
    content: "";
    height: 30px;
    left: 50%;
    position: absolute;
  }
`;

const Leaf = styled(ToggleButton)`
  display: inline-block;
  margin: 0 auto;
  padding: 10px 20px;
  width: 80px;
  height: 60px;
  border: 2px dashed gray;
  position: relative;
`;

interface nodeProps {
  node: TreeNode;
  onInsert: (id: number) => void;
  onRemove: (id: number) => void;
  onChangeName: ({ id, name }: Name) => void;
}

const Node = (props: nodeProps) => {
  const { node, onInsert, onRemove, onChangeName } = props;
  const [isEditable, setEditable] = useState<boolean>(false);

  const handleDoubleClick = () => {
    setEditable(true);
  };

  const handleClickAway = () => {
    setEditable(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        {node.name === "App.js" ? (
          <Root>
            <text>App</text>
            <div>
              <AddCircleOutline onClick={() => onInsert(node.id)} />
            </div>
          </Root>
        ) : node.children.length !== 0 ? (
          <NonLeaf>
            <div>
              <RemoveCircleOutlineSharp onClick={() => onRemove(node.id)} />
            </div>
            <Input
              defaultValue={node.name}
              disabled={!isEditable}
              inputProps={{ "aria-label": "description" }}
              onDoubleClick={handleDoubleClick}
            />
            <div>
              <AddCircleOutline onClick={() => onInsert(node.id)} />
            </div>
          </NonLeaf>
        ) : (
          <Leaf>
            <div>
              <RemoveCircleOutlineSharp onClick={() => onRemove(node.id)} />
            </div>
            <Input
              defaultValue={node.name}
              disabled={!isEditable}
              inputProps={{ "aria-label": "description" }}
              onDoubleClick={handleDoubleClick}
              onChange={(e) =>
                onChangeName({ id: node.id, name: e.target.value })
              }
            />
            <div>
              <AddCircleOutline onClick={() => onInsert(node.id)} />
            </div>
          </Leaf>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default Node;
