import * as vscode from "vscode";
import * as path from "path";
import handlePostTest from "./handlePostTest";
import { ComponentDependenciesProvider } from "./componentDependencies";

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

    // Get path to webpack bundled js file on disk
    const bundledJsPath = vscode.Uri.file(
      path.join(context.extensionPath, "out", "client", "main.js")
    );
    const bundledJsUri = panel.webview.asWebviewUri(bundledJsPath);

    handlePostTest(context, panel);
    // And set its HTML Content
    panel.webview.html = getWebviewContent(bundledJsUri);
    panel.onDidDispose(
      () => {
        // When the panel is closed, cancel any future updates to the webview content
      },
      null,
      context.subscriptions
    );
  };
  startWebview();

  vscode.window.registerTreeDataProvider(
    "treeAct",
    new ComponentDependenciesProvider()
  );
  vscode.window.createTreeView("treeAct", {
    treeDataProvider: new ComponentDependenciesProvider(),
  });
  // context.subscriptions.push(
  //   vscode.commands.registerCommand("treeAct.start", () => {
  //     startWebview();
  //   })
  // );
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
