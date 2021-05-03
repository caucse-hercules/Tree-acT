import * as vscode from "vscode";
import * as path from "path";
import { ComponentDependenciesProvider } from "./componentDependencies";
import { postJSONToWebview, handlePostTest } from "./webviewBridge";
import { sampleData } from "./common/sampleData";
import { run } from "./generateCode";

export function activate(context: vscode.ExtensionContext) {
  const startWebview = () => {
    // Create and show a new webview
    const panel = vscode.window.createWebviewPanel(
      "treeAct", // Identifies the type of the webview. Used internally
      "Tree-acT", // Title of the panel displayed to the user
      vscode.ViewColumn.One, // Editor column to show the new webview panel in.
      {
        // Enable scripts in the webview
        enableScripts: true,
      }
    );

    panel.onDidDispose(
      () => {
        // When the panel is closed, cancel any future updates to the webview content
      },
      null,
      context.subscriptions
    );
    return panel;
  };
  const treeActPanel = startWebview();

  // Get path to webpack bundled js file on disk
  const bundledJsPath = vscode.Uri.file(
    path.join(context.extensionPath, "out", "client", "main.js")
  );
  const bundledJsUri = treeActPanel.webview.asWebviewUri(bundledJsPath);

  handlePostTest(context, treeActPanel);
  context.subscriptions.push(
    vscode.commands.registerCommand("treeAct.postJson", () => {
      postJSONToWebview(context, treeActPanel, sampleData);
    })
  );

  // And set its HTML Content
  treeActPanel.webview.html = getWebviewContent(bundledJsUri);

  vscode.window.registerTreeDataProvider(
    "treeAct",
    new ComponentDependenciesProvider()
  );
  vscode.window.createTreeView("treeAct", {
    treeDataProvider: new ComponentDependenciesProvider(),
  });
  context.subscriptions.push(
    vscode.commands.registerCommand("treeAct.start", () => {
      startWebview();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("treeAct.generateCode", () => {
      run();
    })
  );
}

function getWebviewContent(bundledUri: vscode.Uri) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
    <script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
</head>
<body>
    <div id="root"></div>
    <script>const vscode = acquireVsCodeApi();</script>
    <script src="${bundledUri}"></script>
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
</body>
</html>`;
}
