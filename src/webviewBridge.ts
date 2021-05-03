import * as vscode from "vscode";
import { MessageData, TreeNode } from "./common/types";
import { run } from "./generateCode";

export const postJSONToWebview = (
  context: vscode.ExtensionContext,
  panel: vscode.WebviewPanel,
  payload: TreeNode
) => {
  const message: MessageData = {
    command: "JSONToWebview",
    data: payload,
  };
  panel.webview.postMessage(message);
};

export const handlePostTest = (
  context: vscode.ExtensionContext,
  panel: vscode.WebviewPanel
) => {
  panel.webview.onDidReceiveMessage(
    (message: MessageData) => {
      switch (message.command) {
        case "JSONToExtension":
          vscode.window.showInformationMessage(JSON.stringify(message.data));
      }
    },
    undefined,
    context.subscriptions
  );
};

// Write your own handlePost function here

export const handlePost = (
  context: vscode.ExtensionContext,
  panel: vscode.WebviewPanel
) => {
  panel.webview.onDidReceiveMessage(
    (message: MessageData) => {
      switch (message.command) {
        case "generateApp":
          run(message);
      }
    },
    undefined,
    context.subscriptions
  );
};