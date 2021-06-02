import * as React from "react";
import PostTest from "./PostTest";
import { sampleData } from "../../../common/sampleData";
import Layout from "./Layout";
import MarkdownRender from "./markdownRender";

export interface HelloProps {
  compiler: string;
  framework: string;
}

export const Hello = (props: HelloProps) => (
  <h1>
    Hello from {props.compiler} and {props.framework}!
    <Layout />
    <PostTest />
    <MarkdownRender />
  </h1>
);
