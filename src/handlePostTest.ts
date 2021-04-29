import * as vscode from "vscode";

export interface MessageData {
  command: string;
  text: string;
}

const handlePostTest = (
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

export default handlePostTest;
