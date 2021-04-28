import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("treeAct.start", () => {
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

      // And set its HTML Content
      panel.webview.html = getWebviewContent();
      panel.onDidDispose(
        () => {
          // When the panel is closed, cancel any future updates to the webview content
        },
        null,
        context.subscriptions
      );
    })
  );
}

function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
</body>
</html>`;
}
