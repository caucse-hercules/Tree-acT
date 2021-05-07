import React from "react";
import { Group } from "@visx/group";
import { Tree } from "@visx/hierarchy";
import { LinearGradient } from "@visx/gradient";
import { hierarchy } from "d3-hierarchy";

// import Links from './Links';
import Links from "./LinksMove";

// import Nodes from './Nodes';
import Nodes from "./NodesMove";

export default class extends React.Component {
  state = {
    layout: "cartesian",
    orientation: "horizontal",
    linkType: "diagonal",
    stepPercent: 0.5,
  };

  render() {
    const {
      data,
      width,
      height,
      events = false,
      margin = {
        top: 30,
        left: 30,
        right: 30,
        bottom: 30,
      },
    } = this.props;
    const { layout, orientation, linkType, stepPercent } = this.state;

    if (width < 10) return null;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    let origin;
    let sizeWidth;
    let sizeHeight;

    if (layout === "polar") {
      origin = {
        x: innerWidth / 2,
        y: innerHeight / 2,
      };
      sizeWidth = 2 * Math.PI;
      sizeHeight = Math.min(innerWidth, innerHeight) / 2;
    } else {
      origin = { x: 0, y: 0 };
      if (orientation === "vertical") {
        sizeWidth = innerWidth;
        sizeHeight = innerHeight;
      } else {
        sizeWidth = innerHeight;
        sizeHeight = innerWidth;
      }
    }

    const root = hierarchy(data, (d) => (d.isExpanded ? d.children : null));
    // root.each((node, i) => node.onClick = () => {
    //   console.log('clicked');
    // });

    return (
      <div>
        <div>
          <label>layout:</label>
          <select
            onChange={(e) => this.setState({ layout: e.target.value })}
            value={layout}
          >
            <option value="cartesian">cartesian</option>
            <option value="polar">polar</option>
          </select>

          <label>orientation:</label>
          <select
            onChange={(e) => this.setState({ orientation: e.target.value })}
            value={orientation}
            disabled={layout === "polar"}
          >
            <option value="vertical">vertical</option>
            <option value="horizontal">horizontal</option>
          </select>

          <label>link:</label>
          <select
            onChange={(e) => this.setState({ linkType: e.target.value })}
            value={linkType}
          >
            <option value="diagonal">diagonal</option>
            <option value="step">step</option>
            <option value="curve">curve</option>
            <option value="line">line</option>
            <option value="elbow">elbow</option>
          </select>

          <label>step:</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            onChange={(e) => this.setState({ stepPercent: e.target.value })}
            value={stepPercent}
            disabled={linkType !== "step" || layout === "polar"}
          />
        </div>

        <svg width={width} height={height}>
          <LinearGradient id="lg" from="#fd9b93" to="#fe6e9e" />
          <rect width={width} height={height} rx={14} fill="#272b4d" />
          <Tree
            top={margin.top}
            left={margin.left}
            root={root}
            size={[sizeWidth, sizeHeight]}
            separation={(a, b) => (a.parent == b.parent ? 1 : 0.5) / a.depth}
          >
            {(tree) => (
              <Group top={origin.y} left={origin.x}>
                <Links
                  links={tree.links()}
                  linkType={linkType}
                  layout={layout}
                  orientation={orientation}
                  stepPercent={stepPercent}
                />

                <Nodes
                  nodes={tree.descendants()}
                  layout={layout}
                  orientation={orientation}
                  onNodeClick={(node) => {
                    if (!node.data.isExpanded) {
                      node.data.x0 = node.x;
                      node.data.y0 = node.y;
                    }
                    node.data.isExpanded = !node.data.isExpanded;
                    this.forceUpdate();
                  }}
                />
              </Group>
            )}
          </Tree>
        </svg>
      </div>
    );
  }
}
