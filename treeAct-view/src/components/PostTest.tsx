import React from "react";
import { useEffect } from "react";
import { MessageData } from "../../../common/types";
import { testGenerateMessage } from "../../../common/testData";

interface vscode {
  postMessage(message: MessageData): void;
}

declare const vscode: vscode;

const postData = () => {
  vscode.postMessage(testGenerateMessage);
};

const PostTest = () => {
  useEffect(() => {
    window.addEventListener("message", (event) => {
      const message = event.data; // The JSON data our extension sent

      console.log(message.data);
    });
  });

  return (
    <>
      <button onClick={postData}>
        누르기 전에 수백번 생각하고 눌러라. 제발.
      </button>
    </>
  );
};

export default PostTest;
