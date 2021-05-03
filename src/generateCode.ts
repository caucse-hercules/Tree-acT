import fs from "fs";
import path from "path";
import * as vscode from "vscode";
import * as child_process from "child_process";
import { MessageData } from "./common/types";

const makeFolder = (generateComponentPath: string) => {
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
function dfs(component: any, generateComponentPath: string) {
  FileSystem(
    generateComponentPath + "/" + component.name + ".js",
    "import React from 'react';\n"
  );
  const sampleTemplate = `const ${component.name} = () => { 
    return <div>${component.name}</div>; 
  };\n\n`;

  for (const i in component.children) {
    const next: any = component.children[i];
    console.log(next.name);
    FileSystem(
      generateComponentPath + "/" + component.name + ".js",
      `import ${next.name} from "./${next.name}";\n`
    );
    dfs(next, generateComponentPath);
  }

  FileSystem(
    generateComponentPath + "/" + component.name + ".js",
    "\n" + sampleTemplate
  );
  FileSystem(
    generateComponentPath + "/" + component.name + ".js",
    `export default ${component.name};\n`
  );
}

export function run(message: MessageData) {
  const folder: string =
    vscode.workspace.rootPath || `C:\\Users\\"문법식"\\Desktop\\test3`;
  const generateComponentPath = path.join(
    folder,
    <string>message.directory,
    "src/components"
  );
  vscode.window.showInformationMessage("Starting");
  const child = child_process.exec(
    `cd ${folder} && npx create-react-app ${message.directory}`,
    function (error, stdout, stderr) {
      console.log("stdout: " + stdout);
      console.log("stderr: " + stderr);
      if (error !== null) {
        console.log("exec error: " + error);
      }
      makeFolder(generateComponentPath);
      dfs(message.data, generateComponentPath);
      vscode.window.showInformationMessage("Done?");
    }
  );
}
