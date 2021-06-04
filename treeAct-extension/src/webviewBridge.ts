import * as vscode from "vscode";
import { MessageData, RequestData } from "../../common/types";
import { treeActTreeViewProvider } from "./extension";
import { run } from "./generateCode";
import { getPath } from "./getPath";

export const requestStateUpdate = (
  panel: vscode.WebviewPanel,
  payload: RequestData
) => {
  console.log("Requested state update");
  panel.webview.postMessage(payload);
};

export const setInitialState = (
  panel: vscode.WebviewPanel,
  payload: RequestData
) => {
  console.log("Setting initial state");
  panel.webview.postMessage(payload);
};

export const postMessage = (
  panel: vscode.WebviewPanel,
  payload: RequestData
) => {
  panel.webview.postMessage(payload);
};

// Write your own handlePost function here
export const handlePost = (
  context: vscode.ExtensionContext,
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
          context.globalState.update("treeData", message.data);
          treeActTreeViewProvider.refresh();
          break;
        case "init":
          console.log("Initialize request from webview");
          postMessage(panel, {
            command: "init",
            data: context.globalState.get("treeData"),
          });
          break;
      }
    },
    undefined,
    disposables
  );
};
