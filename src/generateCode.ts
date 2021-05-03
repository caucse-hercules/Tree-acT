import comp from './sample-component.json';
import fs from 'fs';
import { runInTerminal } from 'run-in-terminal';
import * as vscode from 'vscode';

//const directory: string = './' + comp.directory + '/src/components';
const directory = vscode.workspace.rootPath || `C:\\Users\\"문법식"\\Desktop\\test`;
const str1 = 'const ';
const str2 = ' = () => { \n return <div>';
const str3 = '</div>; \n};\n\n';

const RunInTerminal = () => {
  runInTerminal((`cd ${directory} && npx create-react-app ${comp.directory}`));
};

const makeFolder = () => {
  if (!fs.existsSync(directory))
    fs.mkdirSync(directory);
};

function FileSystem(path: string, str: string) {
  try {
    fs.appendFileSync(path, str);
  } catch (err) {
    console.log(err);
  }
}
function dfs(component: any) {
  FileSystem(directory + '/' + component.name + '.js', 'import React from \'react\';\n');

  for (const i in component.children) {
    const next: any = component.children[i];
    console.log(next.name);
    FileSystem(directory + '/' + component.name + '.js', 'import ' + next.name + ' from \'' + './' + next.name + '\';\n');
    dfs(next);
  }

  FileSystem(directory + '/' + component.name + '.js', '\n' + str1 + component.name + str2 + component.name + str3);
  FileSystem(directory + '/' + component.name + '.js', 'export default ' + component.name + ';\n');
}

export function run() {
  RunInTerminal();
  makeFolder();
  dfs(comp.data);
}