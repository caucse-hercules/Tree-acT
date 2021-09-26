import { ClickAwayListener, Input } from "@material-ui/core";
import { RemoveCircleOutlineSharp } from "@material-ui/icons";
import ToggleButton from "@material-ui/lab/ToggleButton";
import React, { useState } from "react";
import styled from "styled-components";
import { TreeNode } from "../../../common/types";
import { Name } from "../../../common/types";

// style of root node (app)
const Root = styled.p`
  display: inline-block;
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 20%;
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

// style of non-leaf node.
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

// style of leaf node.
const Leaf = styled(ToggleButton)`
  display: inline-block;
  margin: 0 auto;
  padding: 10px 20px;
  width: 80px;
  height: 60px;
  border: 1.5px dashed #ffffff;
  position: relative;
  text-align: center;
`;

const WhiteInput = styled(Input)`
  color: white;
`;

// postion and style of 'add node' button of root node
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

// postion and style of 'add node' button
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

// position and style of 'remove node' button
const RemoveButton = styled(RemoveCircleOutlineSharp)`
  position: absolute;
  left: 48px;
  top: -24px;
  color: red;
  z-index: 1;
`;

// input parameter of node name
const LabelText = styled.p`
  color: white;
  text-transform: none;
  margin: 0;
`;

/**
 * View component of node
 */

interface nodeProps {
  node: TreeNode;
  onInsert: (id: number) => void;
  onRemove: (id: number) => void;
  onChangeName: ({ id, name }: Name) => void;
  onExpand: (id: number) => void;
}

const Node = (props: nodeProps) => {
  const { node, onInsert, onRemove, onChangeName, onExpand } = props;
  //For activating name input. If true, activate.
  const [isEditable, setEditable] = useState<boolean>(false);

  //Timer for handleClick
  let timer: ReturnType<typeof setTimeout>;

  /**
   * Handle double click and single click
   * When double click, activate name input, when single click, collapse descendants
   * @param e
   */
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    clearTimeout(timer);
    if (e.detail === 1) {
      timer = setTimeout(() => onExpand(node.id), 175);
    } else if (e.detail === 2) {
      setEditable(true);
    }
  };

  //Disable name input by clicking anywhere except the node
  const handleClickAway = () => {
    setEditable(false);
  };

  //Collapse/Expand the descendants by single click
  const handleSingleClick = () => {
    onExpand(node.id);
  };

  //Activate name input by double click
  const handleDoubleClick = () => {
    setEditable(true);
  };

  //Insert node
  const handleInsert = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onInsert(node.id);
  };

  //Remove node
  const handleRemove = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    onRemove(node.id);
  };

  return (
    <div>
      {
        //Root or not
        node.id === 0 ? (
          <>
            <Root onClick={handleSingleClick}>
              <text>App</text>
              {node.isExpanded && (
                <RootAddButton onClick={handleInsert}>+</RootAddButton>
              )}
            </Root>
          </>
        ) : //Render non leaf node if the node has children. If not, leaf node
        node.childrenId.length !== 0 ? (
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
              {node.isExpanded && (
                <AddButton onClick={handleInsert}>+</AddButton>
              )}
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
              <AddButton onClick={handleInsert}>+</AddButton>
            </Leaf>
          </ClickAwayListener>
        )
      }
    </div>
  );
};

export default Node;
