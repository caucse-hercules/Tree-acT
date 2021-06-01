import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Markdown from "markdown-to-jsx";
import readme from "../../../README.md";
import ReactMarkdown from "react-markdown";

const MarkDownStyle = styled.div`
  font-size: 1rem;
  line-height: 2.5rem;
  color: lightgray;
  background-color: black;
`;

const MarkdownRender = () => {
  const [html, setHTML] = useState("");

  return (
    <MarkDownStyle>
      <Markdown children={readme} />
    </MarkDownStyle>
  );
};

export default MarkdownRender;
