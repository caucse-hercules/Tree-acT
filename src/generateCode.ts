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

function dfs(component: any, generateComponentPath: string, srcPath:string) {

  if (component.name == "App") {
    fs.copyFileSync(srcPath+'/App.js', srcPath+'/temp.js'); //리액트 프로젝트에서 생성된 App.js의 content를 복사해서 temp.js에 저장
    fs.truncateSync(srcPath+'/App.js', 0); //App.js의 content 지우기
    FileSystem(srcPath+'/App.js', "import React from 'react';\n");
  } else {
    FileSystem(
      `${generateComponentPath}/${component.name}.js`,
      "import React from 'react';\n"
    );
  }
  for (const i in component.children) {
    const next: any = component.children[i];
    console.log(next.name);
    if (component.name == "App") {
      FileSystem(srcPath+'/App.js', `import ${next.name} from './components/${next.name}';\n`); //리액트 프로젝트에서 생성된 App.js에 의존성 처리
    } else {
      FileSystem(
        `${generateComponentPath}/${component.name}.js`,
        `import ${next.name} from './${next.name}';\n`
      );
    }
    dfs(next, generateComponentPath, srcPath);
  }

  if (component.name == "App") {
    const tempStr: string[] = fs
      .readFileSync(srcPath+'/temp.js')
      .toString()
      .split("\n");
    for (const j in tempStr) {
      FileSystem(srcPath+'/App.js', tempStr[j] + "\n"); //temp.js에 저장된 App.js의 content를 의존성 처리가 다 된 App.js에 이어적기
    }
    fs.unlinkSync(srcPath+'/temp.js');
  } else {
    const sampleTemplate = `const ${component.name} = () => { 
    return <div>${component.name}</div>; 
    };\n\n`;
    FileSystem(
      `${generateComponentPath}/${component.name}.js`,
      "\n" + sampleTemplate
    );
    FileSystem(
      `${generateComponentPath}/${component.name}.js`,
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
  const srcPath = path.join(folder, <string>message.directory, "src");

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
      dfs(message.data, generateComponentPath, srcPath);
      vscode.window.showInformationMessage("Done?");
    }
  );
}
