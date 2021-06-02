import * as vscode from "vscode";
import { treeState } from "./state";
import { TreeActPanel } from "./treeActPanel";
import { addNode, deleteNode, TreeActTreeView } from "./treeActTreeView";

export let TreeActTreeViewProvider: TreeActTreeView;

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("treeAct.start", () => {
      TreeActPanel.createOrShow(context.extensionUri);
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("treeAct.addNode", () => {
      addNode();
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("treeAct.deleteNode", () => {
      deleteNode();
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

  TreeActTreeViewProvider = new TreeActTreeView(context, treeState);
  vscode.window.registerTreeDataProvider("treeAct", TreeActTreeViewProvider);

  vscode.window.createTreeView("treeAct", {
    treeDataProvider: TreeActTreeViewProvider,
  });

  // TreeActPanel.createOrShow(context.extensionUri);

  console.log("Activated!");
}

export function deactivate() {
  console.log("Deactivated!");
}
