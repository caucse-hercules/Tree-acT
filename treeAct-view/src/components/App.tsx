import * as React from "react";
import { sampleData } from "../../../common/sampleData";
import TreeContainer from "../containers/TreeContainer";
// import Tree from "./Tree";
import PostTest from "./PostTest";
import Layout from "./Layout";
import MarkdownRender from "./markdownRender";
const data = sampleData;

export const Hello = () => <TreeContainer />;

export const HelloW = (props: HelloProps) => (
  <h1>
    Hello from {props.compiler} and {props.framework}!
    <Layout />
    <PostTest />
    <MarkdownRender />
  </h1>
);
