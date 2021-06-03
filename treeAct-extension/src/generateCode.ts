import fs from "fs";
import path from "path";
import * as vscode from "vscode";
import { MessageData } from "../../common/types";
import waitUntil, { WAIT_FOREVER } from "async-wait-until";
import { exit } from "process";

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

function makeComponent(
  component: any,
  generateComponentPath: string,
  srcPath: string
) {
  if (component.name == "App") {
    fs.copyFileSync(`${srcPath}/App.js`, `${srcPath}/temp.js`); //리액트 프로젝트에서 생성된 App.js의 content를 복사해서 temp.js에 저장
    fs.truncateSync(`${srcPath}/App.js`, 0); //App.js의 content 지우기
    FileSystem(`${srcPath}/App.js`, "import React from 'react';\n");
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
      FileSystem(
        `${srcPath}/App.js`,
        `import ${next.name} from './components/${next.name}';\n`
      ); //리액트 프로젝트에서 생성된 App.js에 의존성 처리
    } else {
      FileSystem(
        `${generateComponentPath}/${component.name}.js`,
        `import ${next.name} from './${next.name}';\n`
      );
    }
    makeComponent(next, generateComponentPath, srcPath);
  }

  if (component.name == "App") {
    const tempStr: string = fs.readFileSync(`${srcPath}/temp.js`).toString();
    FileSystem(`${srcPath}/App.js`, tempStr); //temp.js에 저장된 App.js의 content를 의존성 처리가 다 된 App.js에 이어적기
    fs.unlinkSync(`${srcPath}/temp.js`);
  } else {
    const componentTemplate = `const ${component.name} = () => {\n\treturn <div>${component.name}</div>;\n};\n\nexport default ${component.name};\n`;
    FileSystem(
      `${generateComponentPath}/${component.name}.js`,
      `\n${componentTemplate}`
    );
  }
}

export async function run(message: MessageData, dirPath: string) {
  if (dirPath === "exit") {
    vscode.window.showInformationMessage("Canceled");
    exit;
  } else {
    const folder: string = vscode.workspace.rootPath || dirPath;
    const generateComponentPath = path.join(
      folder,
      <string>message.directory,
      "src/components"
    );
    const srcPath = path.join(folder, <string>message.directory, "src");
    const gitLogPath = path.join(
      folder,
      <string>message.directory,
      ".git",
      "logs"
    );
    vscode.window.showInformationMessage("Starting");
    const child_terminal = vscode.window.createTerminal({
      name: "Show process",
      cwd: folder,
    });
    child_terminal.show();

    child_terminal.sendText(`npx create-react-app ${message.directory}`);
    const exists = await waitUntil(() => fs.existsSync(srcPath), WAIT_FOREVER);
    if (exists) {
      makeFolder(generateComponentPath);
      makeComponent(message.data, generateComponentPath, srcPath);
      vscode.window.showInformationMessage("Generate Component Complete!");
    }
    const committed = await waitUntil(
      () => fs.existsSync(gitLogPath),
      WAIT_FOREVER
    );
    if (committed) {
      setTimeout(() => {
        vscode.window.showInformationMessage("Tree-acT Complete!");
      }, 500);
    }

    // return new Promise(function (resolve, reject) {
    //   resolve("DONE");
    // });
    return "DONE";
  }
}
