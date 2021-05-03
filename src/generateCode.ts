import { sampleGenerateMessage } from "./common/sampleData";
import fs from "fs";
import path from "path";
import * as vscode from "vscode";
import * as child_process from "child_process";

const folder: string =
  vscode.workspace.rootPath || `C:\\Users\\"문법식"\\Desktop\\test3`;
const generateComponentPath = path.join(
  folder,
  <string>sampleGenerateMessage.directory,
  "src/components"
);
const str1 = "const ";
const str2 = " = () => { \n return <div>";
const str3 = "</div>; \n};\n\n";

const makeFolder = () => {
  if (!fs.existsSync(generateComponentPath)) {
    try {
      fs.mkdirSync(generateComponentPath);
    } catch (error) {
      console.log(error);
    }
  }
};

function FileSystem(folder: string, str: string) {
  try {
    fs.appendFileSync(folder, str);
  } catch (error) {
    console.log(error);
  }
}
function dfs(component: any) {
  FileSystem(
    generateComponentPath + "/" + component.name + ".js",
    "import React from 'react';\n"
  );

  for (const i in component.children) {
    const next: any = component.children[i];
    console.log(next.name);
    FileSystem(
      generateComponentPath + "/" + component.name + ".js",
      "import " + next.name + " from '" + "./" + next.name + "';\n"
    );
    dfs(next);
  }

  FileSystem(
    generateComponentPath + "/" + component.name + ".js",
    "\n" + str1 + component.name + str2 + component.name + str3
  );
  FileSystem(
    generateComponentPath + "/" + component.name + ".js",
    "export default " + component.name + ";\n"
  );
}

export function run() {
  console.log("Started!");
  const child = child_process.exec(
    `cd ${folder} && npx create-react-app ${sampleGenerateMessage.directory}`,
    function (error, stdout, stderr) {
      console.log("stdout: " + stdout);
      console.log("stderr: " + stderr);
      if (error !== null) {
        console.log("exec error: " + error);
      }
      makeFolder();
      dfs(sampleGenerateMessage.data);
      vscode.window.showInformationMessage("Done?");
    }
  );
}
