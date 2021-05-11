import React, { useState } from "react";
import { Group } from "@visx/group";
import { Tree as VxTree } from "@visx/hierarchy";
import { LinearGradient } from "@visx/gradient";
import { hierarchy } from "d3-hierarchy";
import { Zoom } from "@visx/zoom";

// import Links from './Links';
import Links from "./LinksMove";

// import Nodes from './Nodes';
import Nodes from "./NodesMove";

export interface TreeProps {
  data: any;
  width: number;
  height: number;
  margin?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export default function Tree(treeProps: TreeProps) {
  const {
    data,
    width,
    height,
    margin = {
      top: 30,
      left: 30,
      right: 30,
      bottom: 30,
    },
  } = treeProps;

  if (width < 10) return null;

  const innerWidth: number = width - margin.left - margin.right;
  const innerHeight: number = height - margin.top - margin.bottom;

  const origin = {
    x: 0,
    y: 0,
  };
  const sizeWidth: number = innerWidth;
  const sizeHeight: number = innerHeight;

  const [treeData, setTreeData] = useState<any>(data);
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const root = hierarchy(data, (d) => (d.isExpanded ? d.children : null));

  return (
    // root.each((node, i) => node.onClick = () => {
    //   console.log('clicked');
    // });
    <div>
      <svg width={width} height={height}>
        <LinearGradient id="lg" from="#fd9b93" to="#fe6e9e" />
        <rect width={width} height={height} rx={14} fill="#272b4d" />
        <VxTree
          top={margin.top}
          left={margin.left}
          root={root}
          size={[sizeWidth, sizeHeight]}
          separation={(a: any, b: any) =>
            (a.parent == b.parent ? 1 : 0.5) / a.depth
          }
        >
          {(tree: any) => (
            <Group top={origin.y} left={origin.x}>
              <Links links={tree.links()} />
              <Nodes
                nodes={tree.descendants()}
                onNodeClick={(node: any) => {
                  if (!node.data.isExpanded) {
                    node.data.x0 = node.x;
                    node.data.y0 = node.y;
                  }
                  node.data.isExpanded = !node.data.isExpanded;
                  console.log(node);
                  console.log(tree);
                  console.log("root is", root);
                  setUpdate(!update);
                }}
              />
            </Group>
          )}
        </VxTree>
      </svg>
    </div>
  );
}
