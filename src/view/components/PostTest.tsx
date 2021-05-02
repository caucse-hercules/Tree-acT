import React from "react";
import { useEffect } from "react";
import { MessageData } from "../../handlePostTest";

interface vscode {
  postMessage(message: MessageData): void;
}

declare const vscode: vscode;

const sampleData = {
  name: "CEO",
  children: [
    {
      name: "Manager",
      attributes: {
        department: "Production",
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
  ],
};

const postData = () => {
  vscode.postMessage({
    command: "sendJSON",
    text: JSON.stringify(sampleData),
  });
};

const PostTest = () => {
  useEffect(() => {
    window.addEventListener("message", (event) => {
      const message = event.data; // The JSON data our extension sent

      console.log(message.jsonData);
    });
  });

  return (
    <>
      <button onClick={postData}>Click me to send data to extension!</button>
    </>
  );
};

export default PostTest;
