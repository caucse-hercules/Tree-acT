import React, { useState } from "react";
import { sampleData } from "../../../common/sampleData";
import styled from "styled-components";
import Node, { NodeProps } from "./Node";
import { TreeNode } from "../types";
import { node } from "webpack";
import { blue } from "@material-ui/core/colors";

const RootUl = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0;
  text-align: center;
`;
const RootLi = styled.li`
  box-sizing: border-box;
  flex: 1;
  padding: 0 5px;
`;
const ChildUl = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0;
  text-align: center;
  margin-top: 59px;
  position: relative;
`;
const ChildLi = styled.li`
  box-sizing: border-box;
  flex: 1;
  padding: 0 5px;
  position: relative;
  &:after,
  &:before {
    border-top: 1px solid green;
    content: "";
    position: absolute;
    top: -30px;
    width: 50%;
  }

  &:before {
    border-left: 1px solid green;
    height: 30px;
    left: 50%;
  }

  &:after {
    right: 50%;
  }
  &:first-child,
  &:last-child {
    &:before {
      border-top: 1px solid green;
      border-top-left-radius: 10px;
      top: -30px;
    }

    &:after {
      border: none;
    }
  }

  &:last-child {
    &:before {
      border-left: 0;
      border-right: 1px solid green;
      border-top-left-radius: 0;
      border-top-right-radius: 10px;
      left: 0;
      right: 50%;
    }
  }

  &:only-child {
    &:before {
      border-top: none;
      border-top-right-radius: 0;
    }
  }
`;

let treeData: TreeNode[];
let depth = 0;

const Tree = () => {
  if (sampleData.children) treeData = sampleData.children;

  const createNode = (childrenNode: TreeNode[]) => {
    let node_name: string;
    depth += 1;
    console.log(childrenNode);
    return (
      <ChildUl>
        {childrenNode.map((node) => (
          <ChildLi>
            {node.children ? (
              <Node name={node.name} depth={depth} hasChildren={true} />
            ) : (
              <Node name={node.name} depth={depth} hasChildren={false} />
            )}
            {node.children && createNode(node.children)}
          </ChildLi>
        ))}
      </ChildUl>
    );
  };

  return (
    <div>
      <RootUl>
        <RootLi>
          <Node name="App" depth={0} hasChildren={true}></Node>
          {createNode(treeData)}
        </RootLi>
      </RootUl>
    </div>
  );
};

export default Tree;
