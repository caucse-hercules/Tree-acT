import React, { Fragment } from "react";
import { Group } from "@visx/group";
import NodeGroup from "react-move/NodeGroup";

import Node from "./Node";
import { findCollapsedParent, translateCoords } from "./utils";

interface NodesProps {
  nodes: any[];
  onNodeCtrlClick: any;
}

function Nodes(nodesProps: NodesProps) {
  const { nodes, onNodeCtrlClick } = nodesProps;

  return (
    <NodeGroup
      data={nodes}
      keyAccessor={(d) => d.data.name}
      start={(node) => {
        const parentCoords = translateCoords(node.parent || { x: 0, y: 0 });
        return {
          top: parentCoords.top,
          left: parentCoords.left,
          opacity: 0,
        };
      }}
      enter={(node) => {
        const topLeft = translateCoords(node);
        return {
          top: [topLeft.top],
          left: [topLeft.left],
          opacity: [1],
        };
      }}
      update={(node) => {
        const topLeft = translateCoords(node);
        return {
          top: [topLeft.top],
          left: [topLeft.left],
          opacity: [1],
        };
      }}
      leave={(node) => {
        const collapsedParent = findCollapsedParent(node.parent);
        const collapsedParentPrevPos = {
          x: collapsedParent.data.x0,
          y: collapsedParent.data.y0,
        };
        const topLeft = translateCoords(collapsedParentPrevPos);
        return {
          top: [topLeft.top],
          left: [topLeft.left],
          opacity: [0],
        };
      }}
    >
      {(nodes) => (
        <Group>
          {nodes.map(({ key, data: node, state }) => {
            const width = 40;
            const height = 20;
            return (
              <Group
                top={state.top}
                left={state.left}
                key={key}
                opacity={state.opacity}
              >
                <Node
                  node={node}
                  onCtrlClick={(e: React.MouseEvent) =>
                    onNodeCtrlClick(node, e)
                  }
                  key={key}
                />
              </Group>
            );
          })}
        </Group>
      )}
    </NodeGroup>
  );
}

export default Nodes;
