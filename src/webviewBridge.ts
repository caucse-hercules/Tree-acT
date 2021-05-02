import * as vscode from "vscode";
import { MessageData, TreeNode } from "./common/types";

export const postJSONtoWebview = (
  context: vscode.ExtensionContext,
  panel: vscode.WebviewPanel,
  payload: TreeNode
) => {
  panel.webview.postMessage({ jsonData: payload });
};

export const handlePostTest = (
  context: vscode.ExtensionContext,
  panel: vscode.WebviewPanel
) => {
  panel.webview.onDidReceiveMessage(
    (message: MessageData) => {
      switch (message.command) {
        case "sendJSON":
          vscode.window.showInformationMessage(message.text);
      }
    },
    undefined,
    context.subscriptions
  );
};
