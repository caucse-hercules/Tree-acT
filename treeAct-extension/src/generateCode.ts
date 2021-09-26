import fs from "fs";
import path from "path";
import * as vscode from "vscode";
import { MessageData, TreeNode } from "../../common/types";
import waitUntil, { WAIT_FOREVER } from "async-wait-until";
import { exit } from "process";

const checkComponetNameDuplication = (componentArray: TreeNode[]): number => {
  for (let i = 0; i < componentArray.length - 1; i++) {
    for (let j = i + 1; j < componentArray.length; j++) {
      if (componentArray[i].name == componentArray[j].name) {
        return Number(j);
      }
    }
  }
  return -1;
};

/**
 * Function that checks if the component file name contains spaces.
 */
const checkBlank = (componentArray: TreeNode[]): number => {
  for (let i = 0; i < componentArray.length; i++) {
    /**
     * Returns the component's index if the component file name contains a space.
     */
    if (componentArray[i].name.search(/\s/) != -1) {
      return Number(i);
    }
  }
  return -1;
};

/**
 * Function that checks if another project with the same name exists in the directory in which the project will be created.
 */
const checkSameName = (projectPath: string): boolean => {
  /**
   * Returns true if another project with the same name exists.
   */
  if (fs.existsSync(projectPath)) {
    return true;
  }
  return false;
};

/**
 * Create a folder to store the components created by Tree-Act. The folder is named 'components' and is located in src of the project it created.
 */
const makeFolder = (generateComponentPath: string) => {
  if (!fs.existsSync(generateComponentPath)) {
    try {
      fs.mkdirSync(generateComponentPath);
    } catch (error) {
      console.log(error);
    }
  }
};

/**
 * Function that appends a string to a file in that path when it is received as a parameter.
 */
const FileSystem = (path: string, str: string) => {
  try {
    fs.appendFileSync(path, str);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Functions that consider the dependencies between components and generate import statements properly with DFS
 */
const makeComponent = (
  id: number, // Component's id
  generateComponentPath: string, // Path of folder to store the components created by Tree-Act
  srcPath: string, // src directory path of the project.
  componentArray: TreeNode[] // JSONArray of Components to Create
) => {
  /**
   * Store index of component with id matching id values in 'index'.
   */
  const index = componentArray.findIndex(
    (item: { id: number }) => item.id === id
  );

  /**
   * Store the JSONObject of that index in 'component'
   */
  const component = componentArray[index];
  console.log(component.name);

  /**
   * Divide cases by conditional statement because App.js path to be stored is different from other components.
   */
  if (component.name == "App") {
    fs.copyFileSync(`${srcPath}/App.js`, `${srcPath}/temp.js`);
    fs.truncateSync(`${srcPath}/App.js`, 0);
    FileSystem(`${srcPath}/App.js`, "import React from 'react';\n");
  } else {
    FileSystem(
      `${generateComponentPath}/${component.name}.js`,
      "import React from 'react';\n"
    );
  }

  /**
   * Get the child components that the current component will use and write import statement to current component file properly.
   */
  for (let i = 0; i < component.children.length; i++) {
    const nextId: number = component.children[i];
    const nextIndex = componentArray.findIndex(
      (item: { id: number }) => item.id === nextId
    );
    const nextComponent = componentArray[nextIndex];

    /**
     * Divide cases by conditional statement because App.js path to be stored is different from other components.
     */
    if (component.name == "App") {
      FileSystem(
        `${srcPath}/App.js`,
        `import ${nextComponent.name} from './components/${nextComponent.name}';\n`
      );
    } else {
      FileSystem(
        `${generateComponentPath}/${component.name}.js`,
        `import ${nextComponent.name} from './${nextComponent.name}';\n`
      );
    }

    makeComponent(nextId, generateComponentPath, srcPath, componentArray);
  }

  /**
   * When the import statement is written in the current component file, the default body is written in the current component file.
   * Divide cases by conditional statement because App.js path to be stored is different from other components.
   */
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

/**
 * Create reacat project and make its components.
 */
export const run = async (message: MessageData, dirPath: string) => {
  if (dirPath === "exit") {
    vscode.window.showInformationMessage("Cancelled");
    exit;
  } else {
    const folder: string = dirPath; // Path where the project will be created
    const generateComponentPath = path.join(
      folder,
      <string>message.directory,
      "src/components"
    ); // Path where the component will be created
    const projectPath = path.join(folder, <string>message.directory); // Path to the created project
    const srcPath = path.join(folder, <string>message.directory, "src"); // src path for project

    /**
     * Initialize child_terminal to create React poject and make its components
     */
    vscode.window.showInformationMessage("Starting");
    const child_terminal = vscode.window.createTerminal({
      name: "Show process",
      cwd: folder,
    });
    child_terminal.show();

    let componentIndexWithBlank = -1;
    let componentIndexWithDuplicate = -1;
    if (message.data !== undefined) {
      /**
       * Check that the name of the component files to be created contains a space, and exit if there is a space.
       */
      componentIndexWithBlank = checkBlank(message.data);
      if (componentIndexWithBlank != -1) {
        console.log(componentIndexWithBlank);
        const componentArray: TreeNode[] = message.data;
        const component = componentArray[componentIndexWithBlank];
        child_terminal.sendText(`exit`);
        vscode.window.showInformationMessage("Canceled");
        vscode.window.showErrorMessage(
          `Component file name contains spaces!  (${component.name}.js)`
        );
      }

      componentIndexWithDuplicate = checkComponetNameDuplication(message.data);
      if (componentIndexWithDuplicate != -1) {
        console.log(componentIndexWithDuplicate);
        const componentArray: TreeNode[] = message.data;
        const component = componentArray[componentIndexWithDuplicate];
        child_terminal.sendText(`exit`);
        vscode.window.showInformationMessage("Canceled");
        vscode.window.showErrorMessage(
          `Component file name is duplicated!  (${component.name}.js)`
        );
      }
    }

    /**
     * Checks if another project with the same name exists in the directory in which the project will be created, and exit if another project with the same name exists
     */
    const sameProjectName = checkSameName(projectPath);
    if (sameProjectName) {
      child_terminal.sendText(`exit`);
      vscode.window.showInformationMessage("Canceled");
      vscode.window.showErrorMessage(
        `A project with the same name already exists!  (${message.directory})`
      );
    }

    if (
      componentIndexWithBlank == -1 &&
      componentIndexWithDuplicate == -1 &&
      !sameProjectName
    ) {
      child_terminal.sendText(`npx create-react-app ${message.directory}`); // Create React project

      /**
       * It is a conditional statements to ensure the sequence of operations in asynchronous.
       */
      const exists = await waitUntil(
        () => fs.existsSync(srcPath),
        WAIT_FOREVER
      );

      /**
       * When a react project is created and its src folder is created, it executes the inside of the conditional statement.
       */
      if (exists && message.data !== undefined) {
        makeFolder(generateComponentPath);
        makeComponent(0, generateComponentPath, srcPath, message.data);
        vscode.window.showInformationMessage("Generate Component Complete!");
      }

      child_terminal.sendText("cd " + <string>message.directory);

      if (process.platform === "win32") {
        child_terminal.sendText("fsutil file createnew Tree-acT.md 0");
      } else {
        child_terminal.sendText("touch Tree-acT.md");
      }

      const committed = await waitUntil(
        () => fs.existsSync(projectPath + "/Tree-acT.md"),
        WAIT_FOREVER
      );

      /**
       * When Tree-acT.md is created, Tree-acT is complete, so execute the inside of the conditional statement.
       */
      if (committed) {
        setTimeout(() => {
          vscode.window.showInformationMessage("Tree-acT Complete!");
        }, 500);
      }

      fs.writeFileSync(
        projectPath + "/Tree-acT.md",
        "Thank you for using Tree-acT!!!",
        "utf8"
      );
    }
  }
};
