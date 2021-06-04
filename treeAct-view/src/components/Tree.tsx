import React from "react";
import styled from "styled-components";
import { NewTreeNode } from "../../../common/types";
import { Name } from "../module/tree";
import Node from "./Node";

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

interface treeProps {
  treeData: NewTreeNode[];
  onInsert: (id: number) => void;
  onRemove: (id: number) => void;
  onChangeName: ({ id, name }: Name) => void;
  onExpand: (id: number) => void;
}

const Tree = (props: treeProps) => {
  const { treeData, onInsert, onRemove, onChangeName, onExpand } = props;

  const createNode = (childrenId: number[]) => {
    return (
      <ChildUl>
        {childrenId.map((childId) => {
          const childNode = treeData.find((node) => node.id === childId);
          return (
            <ChildLi>
              <Node
                node={childNode!}
                onInsert={onInsert}
                onRemove={onRemove}
                onChangeName={onChangeName}
                onExpand={onExpand}
              />
              {childNode!.children.length !== 0 &&
                childNode!.isExpanded &&
                createNode(childNode!.children)}
            </ChildLi>
          );
        })}
      </ChildUl>
    );
  };

  return (
    <div>
      <RootUl>
        <RootLi>
          <Node
            node={treeData[0]}
            onInsert={onInsert}
            onRemove={onRemove}
            onChangeName={onChangeName}
            onExpand={onExpand}
          ></Node>
          {treeData[0].children.length !== 0 &&
            treeData[0].isExpanded &&
            createNode(treeData[0].children)}
        </RootLi>
      </RootUl>
    </div>
  );
};

export default Tree;
