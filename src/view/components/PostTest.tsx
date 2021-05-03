import React from "react";
import { useEffect } from "react";
import { MessageData } from "../../common/types";
import { sampleData } from "../../common/sampleData";

interface vscode {
  postMessage(message: MessageData): void;
}

declare const vscode: vscode;

const postData = () => {
  vscode.postMessage({
    command: "generateApp",
    directory: "test-app",
    data: sampleData,
  });
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
