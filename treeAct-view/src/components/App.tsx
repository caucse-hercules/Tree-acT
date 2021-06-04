import * as React from "react";
import TreeContainer from "../containers/TreeContainer";
// import Tree from "./Tree";
import PostTest from "./PostTest";
import Layout from "./Layout";
import MarkdownRender from "./markdownRender";
export interface HelloProps {
  compiler: string;
  framework: string;
}

const App = () => {
  return (
    <Layout>
      <TreeContainer />
    </Layout>
  );
};

export const Hello = () => <TreeContainer />;

export const HelloW = (props: HelloProps) => (
  <h1>
    Hello from {props.compiler} and {props.framework}!
    <Layout>
      <TreeContainer />
    </Layout>
    <PostTest />
    <MarkdownRender />
  </h1>
);

export default App;
