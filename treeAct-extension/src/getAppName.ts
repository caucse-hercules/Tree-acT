import * as vscode from "vscode";

export async function getAppName() {
  const options: vscode.InputBoxOptions = {
    placeHolder: "Enter your project name",
    title: "Your Project",
  };

  const inputName = await vscode.window.showInputBox(options);

  if (inputName === undefined) {
    vscode.window.showInformationMessage("Cancelled");
  } else {
    return inputName;
  }
}
