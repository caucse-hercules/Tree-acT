import fs from "fs";
import path from "path";
import * as vscode from "vscode";
import { MessageData } from "../../common/types";
import waitUntil, { WAIT_FOREVER } from "async-wait-until";
import { exit } from "process";

const checkBlank = (componentArray: any): number => {
  for (const i in componentArray) {
    if (componentArray[i].name.search(/\s/) != -1) {
      return Number(i);
    }
  }
  return -1;
};

const checkSameName = (projectPath: string, child_terminal: any): boolean => {
  if (fs.existsSync(projectPath)) {
    return true;
  }
  return false;
};

const makeFolder = (generateComponentPath: string) => {
  if (!fs.existsSync(generateComponentPath)) {
    try {
      fs.mkdirSync(generateComponentPath);
    } catch (error) {
      console.log(error);
    }
  }
};

const FileSystem = (path: string, str: string) => {
  try {
    fs.appendFileSync(path, str);
  } catch (error) {
    console.log(error);
  }
};

const makeComponent = (
  componentArray: any,
  id: number,
  generateComponentPath: string,
  srcPath: string
) => {
  const index = componentArray.findIndex(
    (item: { id: number }) => item.id === id
  );
  const component = componentArray[index];
  console.log(component.name);

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
    const nextId: number = component.children[i];
    const nextIndex = componentArray.findIndex(
      (item: { id: number }) => item.id === nextId
    );
    const nextComponent = componentArray[nextIndex];

    if (component.name == "App") {
      FileSystem(
        `${srcPath}/App.js`,
        `import ${nextComponent.name} from './components/${nextComponent.name}';\n`
      ); //리액트 프로젝트에서 생성된 App.js에 의존성 처리
    } else {
      FileSystem(
        `${generateComponentPath}/${component.name}.js`,
        `import ${nextComponent.name} from './${nextComponent.name}';\n`
      );
    }

    makeComponent(componentArray, nextId, generateComponentPath, srcPath);
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
};

export const run = async (message: MessageData, dirPath: string) => {
  if (dirPath === "exit") {
    vscode.window.showInformationMessage("Canceled");
    exit;
  } else {
    const folder: string = dirPath;
    const generateComponentPath = path.join(
      folder,
      <string>message.directory,
      "src/components"
    );
    const projectPath = path.join(folder, <string>message.directory);
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

    const componentIndex = checkBlank(message.data);
    if (componentIndex != -1) {
      console.log(componentIndex);
      const componentArray: any = message.data;
      const component = componentArray[componentIndex];
      child_terminal.sendText(`exit`);
      vscode.window.showInformationMessage("Canceled");
      vscode.window.showErrorMessage(
        `Component file name contains spaces!  (${component.name}.js)`
      );
    }

    const sameProjectName = checkSameName(projectPath, child_terminal);
    if (sameProjectName) {
      child_terminal.sendText(`exit`);
      vscode.window.showInformationMessage("Canceled");
      vscode.window.showErrorMessage(
        `A project with the same name already exists!  (${message.directory})`
      );
    } else {
      child_terminal.sendText(`npx create-react-app ${message.directory}`);
      const exists = await waitUntil(
        () => fs.existsSync(srcPath),
        WAIT_FOREVER
      );
      if (exists) {
        makeFolder(generateComponentPath);
        makeComponent(message.data, 0, generateComponentPath, srcPath);
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
    }
  }
};
