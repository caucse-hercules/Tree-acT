import * as vscode from "vscode";

export async function getPath() {
  const options: vscode.OpenDialogOptions = {
    canSelectFolders: true,
    openLabel: "Save",
    filters: {
      "All files": ["*"],
    },
  };

  const path = await vscode.window.showOpenDialog(options);

  if (path == undefined) {
    return "";
  } else {
    return path[0].fsPath;
  }
}
