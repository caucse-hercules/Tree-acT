import * as vscode from "vscode";
import { TreeActPanel } from "./treeActPanel";
import { TreeActTreeView } from "./treeActTreeView";

export let treeActTreeViewProvider: TreeActTreeView;

export function activate(context: vscode.ExtensionContext) {
  context.globalState.update("treeData", []);

  context.subscriptions.push(
    vscode.commands.registerCommand("treeAct.start", () => {
      TreeActPanel.createOrShow(context, context.extensionUri);
    })
  );

  if (vscode.window.registerWebviewPanelSerializer) {
    // Make sure we register a serializer in activation event
    console.log("Registering serializer");
    vscode.window.registerWebviewPanelSerializer(TreeActPanel.viewType, {
      async deserializeWebviewPanel(
        webviewPanel: vscode.WebviewPanel,
        state: any
      ) {
        console.log(`Got state: ${state}`);
        // Reset the webview options so we use latest uri for `localResourceRoots`.
        webviewPanel.webview.options = getWebviewOptions(context.extensionUri);
        TreeActPanel.revive(context, webviewPanel, context.extensionUri);
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

  treeActTreeViewProvider = new TreeActTreeView(context);
  vscode.window.registerTreeDataProvider("treeAct", treeActTreeViewProvider);

  vscode.window.createTreeView("treeAct", {
    treeDataProvider: treeActTreeViewProvider,
  });

  // TreeActPanel.createOrShow(context.extensionUri);

  console.log("Activated!");
}

export function deactivate() {
  console.log("Deactivated!");
}
