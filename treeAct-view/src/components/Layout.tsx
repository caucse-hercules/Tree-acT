import React from "react";
import styled from "styled-components";
//import Rside from "./Rsidebar";

const Div = styled.div`
  display: flex;
  flex-direction: row;
`;
// const LSide = styled.div`
//   display: flex;
//   flex-direction: column;
//   border-style: solid;
//   border-color: lightgray;
//   min-width: 200px;
//   height: 100vh;
//   margin-right: 10px;
// `;
const TreeSpace = styled.div`
  display: flex;
  border-style: solid;
  border-color: lightgray;
  width: 84%;
  min-width: 1200px;
  height: 100vh;
  margin-right: 10px;
  overflow: auto;
`;
const Rside = styled.div`
  display: flex;
  font-size: 20px;
  flex-direction: column;
  border-style: solid;
  border-color: lightgray;
  margin-right: 10px;

  min-width: 230px;
  height: 100vh;
`;
const Layout = (props: any) => {
  return (
    <Div>
      <TreeSpace>트리공간</TreeSpace>
      <Rside>사이드바</Rside>
    </Div>
  );
};
export default Layout;
