import * as vscode from "vscode";
import { TreeNode } from "./common/types";

export const postJSONtoWebview = (
  context: vscode.ExtensionContext,
  panel: vscode.WebviewPanel,
  payload: TreeNode
) => {
  panel.webview.postMessage({ jsonData: payload });
};
