import React, { useState } from "react";
import styled from "styled-components";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { Input, ClickAwayListener } from "@material-ui/core";
import { AddCircleOutline, RemoveCircleOutlineSharp } from "@material-ui/icons";
import { TreeNode, Name } from "../module/tree";

const Root = styled.p`
  display: inline-block;
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 50%;
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border: 0;
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

const NonLeaf = styled(ToggleButton)`
  display: inline-block;
  margin: 0 auto;
  padding: 10px 20px;
  width: 80px;
  height: 60px;
  border-radius: 10%;
  border: 2px solid #ffffff;
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
  border: 2px dashed #ffffff;
  position: relative;
  /* text-transform: none; */
`;

const WhiteInput = styled(Input)`
  color: white;
`;

const RootAddButton = styled(AddCircleOutline)`
  position: absolute;
  left: 22px;
  top: 45px;
  color: green;
  z-index: 1;
`;

const AddButton = styled(AddCircleOutline)`
  position: absolute;
  left: 27px;
  top: 60px;
  color: green;
  z-index: 1;
`;

const RemoveButton = styled(RemoveCircleOutlineSharp)`
  position: absolute;
  left: 27px;
  top: -30px;
  color: red;
  z-index: 1;
`;

const LabelText = styled.p`
  color: white;
  text-transform: none;
  margin: 0;
`;

interface nodeProps {
  node: TreeNode;
  onInsert: (id: number) => void;
  onRemove: (id: number) => void;
  onChangeName: ({ id, name }: Name) => void;
  onExpand: (id: number) => void;
}

const Node = (props: nodeProps) => {
  const { node, onInsert, onRemove, onChangeName, onExpand } = props;
  const [isEditable, setEditable] = useState<boolean>(false);
  let timer: ReturnType<typeof setTimeout>;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    clearTimeout(timer);
    if (e.detail === 1) {
      timer = setTimeout(() => onExpand(node.id), 175);
    } else if (e.detail === 2) {
      setEditable(true);
    }
  };

  const handleClickAway = () => {
    setEditable(false);
  };

  const handleSingleClick = () => {
    onExpand(node.id);
  };

  const handleDoubleClick = () => {
    setEditable(true);
  };

  const handleInsert = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    onInsert(node.id);
  };

  const handleRemove = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    onRemove(node.id);
  };

  return (
    <div>
      {node.id === 0 ? (
        <>
          <Root onClick={handleSingleClick}>
            <text>App</text>
            {node.isExpanded && <RootAddButton onClick={handleInsert} />}
          </Root>
        </>
      ) : node.children.length !== 0 ? (
        <ClickAwayListener onClickAway={handleClickAway}>
          <NonLeaf onClick={handleClick}>
            <RemoveButton onClick={handleRemove} />
            {isEditable ? (
              <WhiteInput
                value={node.name}
                autoFocus={true}
                inputProps={{
                  "aria-label": "description",
                  autoCapitalize: "none",
                }}
                onChange={(e) =>
                  onChangeName({ id: node.id, name: e.target.value })
                }
              />
            ) : (
              <LabelText>{node.name}</LabelText>
            )}
            {node.isExpanded && <AddButton onClick={handleInsert} />}
          </NonLeaf>
        </ClickAwayListener>
      ) : (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Leaf onDoubleClick={handleDoubleClick}>
            <RemoveButton onClick={handleRemove} />
            {isEditable ? (
              <WhiteInput
                value={node.name}
                autoFocus={true}
                inputProps={{
                  "aria-label": "description",
                  autoCapitalize: "none",
                }}
                onChange={(e) =>
                  onChangeName({ id: node.id, name: e.target.value })
                }
              />
            ) : (
              <LabelText>{node.name}</LabelText>
            )}
            <AddButton onClick={handleInsert} />
          </Leaf>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default Node;
