import React from "react";
import styled, { css } from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: row;
`;
const LSide = styled.div`
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-color: lightgray;
  width: 200px;
  height: 530vh;
  margin-right: 10px;
`;
const TreeSpace = styled.div`
  display: flex;
  border-style: solid;
  border-color: lightgray;
  width: 1000px;
  height: 530vh;
  margin-right: 10px;
`;
const Rside = styled.div`
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-color: lightgray;
  margin-right: 10px;
  width: 200px;
  height: 530vh;
`;
const Layout = () => {
  return (
    <Div>
      <LSide>sdf</LSide>
      <TreeSpace>트리공간</TreeSpace>
      <Rside>사이드바</Rside>
    </Div>
  );
};
export default Layout;
