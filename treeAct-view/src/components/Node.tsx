import React, { useState } from "react";
import styled from "styled-components";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { Input, ClickAwayListener, Button } from "@material-ui/core";
import { AddBox, RemoveCircleOutlineSharp } from "@material-ui/icons";
import { TreeNode, Name } from "../module/tree";

const Root = styled.p`
  display: inline-block;
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 20%;
  /* background: linear-gradient(
    45deg,
    rgb(205, 155, 71) 30%,
    rgb(136, 0, 21) 90%
  ); */
  border: 2px solid #ffffff;
  position: relative;
  color: white;
  font-size: 15px;
  font-family: "HY견고딕", "Gulim", "돋움";
  &:after {
    border-left: 1px solid rgb(100, 100, 100);
    bottom: -30px;
    content: "";
    height: 30px;
    left: 50%;
    position: absolute;
    z-index: 0;
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
    border-left: 1px solid rgb(100, 100, 100);
    bottom: -30px;
    content: "";
    height: 2px;
    left: 50%;
    position: absolute;
    text-align: center;
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
  text-align: center;
  /* text-transform: none; */
`;

const WhiteInput = styled(Input)`
  color: white;
`;

const RootAddButton = styled.button`
  position: absolute;
  width: 50px;
  height: 17px;

  left: 12px;
  top: 42px;

  border-color: #00b400;
  border-style: solid;
  border-radius: 4px;

  background-color: rgb(30, 30, 30);
  color: #00b400;
  padding: 0px;

  font-size: 20px;
  font-weight: 400;
  margin: 0;
  padding: 0.5rem 1rem;

  text-align: center;
  text-decoration: none;
  line-height: 1px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  z-index: 1;
`;

const AddButton = styled.button`
  position: absolute;
  width: 50px;
  height: 17px;

  left: 13.5px;
  top: 60px;

  border-color: #00b400;
  border-style: solid;
  border-radius: 4px;

  background-color: rgb(30, 30, 30);
  color: #00b400;
  padding: 0px;

  font-size: 20px;
  font-weight: 400;
  margin: 0;
  padding: 0.5rem 1rem;

  text-align: center;
  text-decoration: none;
  line-height: 1px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  z-index: 1;
`;

const RemoveButton = styled(RemoveCircleOutlineSharp)`
  position: absolute;
  left: 48px;
  top: -24px;
  color: red;
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

  const handleDoubleClick = (e: React.MouseEvent<HTMLElement>) => {
    setEditable(true);
  };

  const handleClickAway = () => {
    setEditable(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    onExpand(node.id);
  };

  const handleInsert = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onInsert(node.id);
  };

  const handleRemove = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    console.log("remove id: ", node.id);
    onRemove(node.id);
  };

  return (
    <div>
      {node.name === "App" ? (
        <>
          <Root onClick={handleClick}>
            <text>App</text>
            <RootAddButton onClick={handleInsert}>+</RootAddButton>
          </Root>
        </>
      ) : node.children.length !== 0 ? (
        <ClickAwayListener onClickAway={handleClickAway}>
          <NonLeaf onClick={handleClick} onDoubleClick={handleDoubleClick}>
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
            <AddButton onClick={handleInsert}>+</AddButton>
          </NonLeaf>
        </ClickAwayListener>
      ) : (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Leaf onClick={handleClick} onDoubleClick={handleDoubleClick}>
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
            <AddButton onClick={handleInsert}>+</AddButton>
          </Leaf>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default Node;
