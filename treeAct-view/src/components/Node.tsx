import React, { useState } from "react";
import styled from "styled-components";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { Input } from "@material-ui/core";
import { AddCircleOutline, RemoveCircleOutlineSharp } from "@material-ui/icons";
import { node } from "webpack";

let p: any;

const isEditable: boolean = false;

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

export interface NodeProps {
  name: string;
  depth: number;
  hasChildren: boolean;
}

const Node = (nodeProps: NodeProps) => {
  const { name, depth, hasChildren } = nodeProps;
  p = nodeProps;

  return (
    <div>
      {depth == 0 ? (
        <Root>
          <text>App</text>
        </Root>
      ) : hasChildren ? (
        <NonLeaf>
          <Input
            defaultValue={name}
            disabled={!isEditable}
            inputProps={{ "aria-label": "description" }}
          />
        </NonLeaf>
      ) : (
        <Leaf>
          <Input
            defaultValue={name}
            disabled={!isEditable}
            inputProps={{ "aria-label": "description" }}
          />
        </Leaf>
      )}
    </div>
  );
};

export default Node;
