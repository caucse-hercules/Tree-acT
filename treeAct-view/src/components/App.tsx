import * as React from "react";
import PostTest from "./PostTest";
//import { sampleData } from "../../../common/sampleData";
import { dataTemp } from "../../../common/dataTemp";
import Layout from "./Layout";

export interface HelloProps {
  compiler: string;
  framework: string;
}

export const Hello = (props: HelloProps) => (
  <h1>
    Hello from {props.compiler} and {props.framework}!
    <Layout data={dataTemp} />
    <PostTest />
  </h1>
);
