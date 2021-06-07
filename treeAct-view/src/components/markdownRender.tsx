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
const InlineCode = styled.span`
  background-color: yellow;
`;

const MarkdownRender = () => {
  const [html, setHTML] = useState("");

  /**
   * readme.md in welcome page
   */
  return (
    <MarkDownStyle>
      {/* <Markdown children={readme} /> */}
      <ReactMarkdown>{readme}</ReactMarkdown>
    </MarkDownStyle>
  );
};

export default MarkdownRender;
