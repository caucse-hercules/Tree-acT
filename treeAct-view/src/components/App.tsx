import * as React from "react";
import PostTest from "./PostTest";
import Layout from "./Layout";

export interface HelloProps {
  compiler: string;
  framework: string;
}

export const Hello = (props: HelloProps) => (
  <h1>
    Hello from {props.compiler} and {props.framework}!
    <Layout />
    <PostTest />
  </h1>
);
