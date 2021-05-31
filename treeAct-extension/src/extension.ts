import * as vscode from "vscode";
import * as path from "path";
import { ComponentDependenciesProvider } from "./componentDependencies";
import { postJSONToWebview, handlePostTest, handlePost } from "./webviewBridge";
import { sampleData } from "../../common/sampleData";
import { TreeActPanel } from "./treeActPanel";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("treeAct.start", () => {
      TreeActPanel.createOrShow(context.extensionUri);
    })
  );

  if (vscode.window.registerWebviewPanelSerializer) {
    // Make sure we register a serializer in activation event
    vscode.window.registerWebviewPanelSerializer(TreeActPanel.viewType, {
      async deserializeWebviewPanel(
        webviewPanel: vscode.WebviewPanel,
        state: any
      ) {
        console.log(`Got state: ${state}`);
        // Reset the webview options so we use latest uri for `localResourceRoots`.
        webviewPanel.webview.options = getWebviewOptions(context.extensionUri);
        TreeActPanel.revive(webviewPanel, context.extensionUri);
      },
    });
  }

  function getWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
    return {
      // Enable javascript in the webview
      enableScripts: true,

      // TODO: And restrict the webview to only loading content from our extension's `media` directory.
    };
  }

  vscode.window.registerTreeDataProvider(
    "treeAct",
    new ComponentDependenciesProvider(context, sampleData)
  );

  vscode.window.createTreeView("treeAct", {
    treeDataProvider: new ComponentDependenciesProvider(context, sampleData),
  });

  TreeActPanel.createOrShow(context.extensionUri);
}
