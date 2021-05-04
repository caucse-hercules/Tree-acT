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
  const folder: string =
    vscode.workspace.rootPath || `C:\\Users\\"문법식"\\Desktop\\test3`;
  const appJsPath = path.join(folder, "sample-app/src/App.js");
  const tempJsPath = path.join(folder, "sample-app/src/temp.js");

  if (component.name == "App") {
    console.log("1");
    fs.copyFileSync(appJsPath, tempJsPath);
    fs.truncateSync(appJsPath, 0);
    FileSystem(appJsPath, "import React from 'react';\n");
  } else {
    console.log("2");
    FileSystem(
      generateComponentPath + "/" + component.name + ".js",
      "import React from 'react';\n"
    );
  }
  for (const i in component.children) {
    const next: any = component.children[i];
    console.log(next.name);
    if (component.name == "App") {
      FileSystem(appJsPath, `import ${next.name} from "./${next.name}";\n`);
    } else {
      FileSystem(
        generateComponentPath + "/" + component.name + ".js",
        `import ${next.name} from "./${next.name}";\n`
      );
    }
    dfs(next, generateComponentPath);
  }

  if (component.name == "App") {
    const tempStr: string[] = fs
      .readFileSync(tempJsPath)
      .toString()
      .split("\n");
    for (const j in tempStr) {
      console.log(tempStr[j]);
      FileSystem(appJsPath, tempStr[j] + "\n");
    }
    fs.unlinkSync(tempJsPath);
  } else {
    const sampleTemplate = `const ${component.name} = () => { 
    return <div>${component.name}</div>; 
    };\n\n`;
    FileSystem(
      generateComponentPath + "/" + component.name + ".js",
      "\n" + sampleTemplate
    );
    FileSystem(
      generateComponentPath + "/" + component.name + ".js",
      `export default ${component.name};\n`
    );
  }
}

export function run(message: MessageData) {
  const folder: string =
    vscode.workspace.rootPath || `C:\\Users\\"문법식"\\Desktop\\test3`;
  const generateComponentPath = path.join(
    folder,
    <string>message.directory,
    "src/components"
  );
  //const appJsPath = path.join(folder, <string>message.directory, "src");

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
