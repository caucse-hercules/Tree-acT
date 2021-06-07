import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
//import Rside from "./Rsidebar";

type LayoutProps = {
  children: React.ReactElement;
};

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

// Layout of Webview : Tree is located in this view.
const TreeSpace = styled.div`
  display: flex;
  border-style: solid;
  border-color: lightgray;
  border-radius: 4px;
  width: 84%;
  //min-width: 1200px;
  height: 98vh;
  margin-right: 10px;
  overflow: auto;
`;

// Layout of right sidebar that will be filled with detail of Nodes.
const Rside = styled.div`
  display: flex;
  font-size: 20px;
  border-radius: 4px;
  flex-direction: column;
  border-style: solid;
  border-color: lightgray;
  margin-right: 10px;

  min-width: 230px;
  height: 98vh;
`;

const Layout = ({ children }: LayoutProps) => {
  const isBig = useMediaQuery({ minWidth: 1280 });
  return (
    <FlexRow>
      <TreeSpace>{children}</TreeSpace>
      {isBig && <Rside></Rside>}
    </FlexRow>
  );
};
export default Layout;
