import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
//import Rside from "./Rsidebar";

const Div = styled.div`
  display: flex;
  flex-direction: row;
`;
const TreeSpace = styled.div`
  display: flex;
  border-style: solid;
  border-color: lightgray;
  border-radius: 4px;
  width: 84%;
  //min-width: 1200px;
  height: 100vh;
  margin-right: 10px;
  overflow: auto;
`;
const Rside = styled.div`
  display: flex;
  font-size: 20px;
  border-radius: 4px;
  flex-direction: column;
  border-style: solid;
  border-color: lightgray;
  margin-right: 10px;

  min-width: 230px;
  height: 100vh;
`;
const Layout = (props: any) => {
  const isBig = useMediaQuery({ minWidth: 1250 });
  return (
    <Div>
      <TreeSpace>트리공간</TreeSpace>
      {isBig && <Rside>사이드바</Rside>}
    </Div>
  );
};
export default Layout;
