import * as vscode from "vscode";
import { MessageData, TreeNode, RequestData } from "../../common/types";
import { TreeActTreeViewProvider } from "./extension";
import { run } from "./generateCode";
import { getPath } from "./getPath";

export const requestStateUpdate = (
  panel: vscode.WebviewPanel,
  payload: RequestData
) => {
  console.log("Requested state update");
  panel.webview.postMessage(payload);
};

// Write your own handlePost function here
export const handlePost = (
  panel: vscode.WebviewPanel,
  disposables?: vscode.Disposable[]
) => {
  panel.webview.onDidReceiveMessage(
    async (message: MessageData) => {
      switch (message.command) {
        case "generateApp":
          run(message, await getPath());
          break;
        case "updateState":
          // TODO: add state update logic of tree view
          console.log(message);
          // TODO: edit state from state.ts
          TreeActTreeViewProvider.refresh();
          break;
      }
    },
    undefined,
    disposables
  );
};
