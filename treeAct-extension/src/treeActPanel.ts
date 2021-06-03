import * as vscode from "vscode";
import { handlePost } from "./webviewBridge";

/**
 * Manages Tree-acT webview panels
 */
export class TreeActPanel {
  /**
   * Track the current panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: TreeActPanel | undefined;

  public static readonly viewType = "treeAct";

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;
    // If we already have a panel, show it
    if (TreeActPanel.currentPanel) {
      TreeActPanel.currentPanel._panel.reveal(column);
      return;
    }
    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      "treeAct", // Identifies the type of the webview. Used internally
      "Tree-acT", // Title of the panel displayed to the user
      vscode.ViewColumn.One, // Editor column to show the new webview panel in.
      {
        // Enable scripts in the webview
        enableScripts: true,
      }
    );

    TreeActPanel.currentPanel = new TreeActPanel(panel, extensionUri);
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    TreeActPanel.currentPanel = new TreeActPanel(panel, extensionUri);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    // Set the webview's initial html content
    this._update();

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programmatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Update the content based on view changes
    this._panel.onDidChangeViewState(
      (e) => {
        if (this._panel.visible) {
          this._update();
        }
      },
      null,
      this._disposables
    );

    // Handle messages from the webview
    handlePost(this._panel, this._disposables);
  }

  public dispose() {
    TreeActPanel.currentPanel = undefined;

    vscode.window.showInformationMessage(
      "You can open Tree-acT again via clicking the icon on Tree View."
    );
    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private _update() {
    const webview = this._panel.webview;
    this._updateForTreeAct(webview, "Tree-acT");
    return;
  }

  private _updateForTreeAct(webview: vscode.Webview, tabName: string) {
    this._panel.title = tabName;
    this._panel.webview.html = this._getHtmlForWebview(webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // Local path to main script run in the webview
    const scriptPathOnDisk = vscode.Uri.joinPath(
      this._extensionUri,
      "out",
      "client",
      "main.js"
    );

    // And the uri we use to load this script in the webview
    const scriptUri = webview.asWebviewUri(scriptPathOnDisk);

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Cat Coding</title>
      </head>
      <body>
          <div id="root"></div>
          <script>const vscode = acquireVsCodeApi();</script>
          <script src="${scriptUri}"></script>
          <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
      </body>
      </html>`;
  }
}
