import * as vscode from "vscode";
import { sampleData } from "./common/sampleData";

interface jsonItem {
  name: string;
  children?: jsonItem[];
}

// TODO: Need to parse all of data recursively
export class ComponentDependenciesProvider
  implements vscode.TreeDataProvider<ComponentTreeItem> {
  getTreeItem(element: ComponentTreeItem): vscode.TreeItem {
    return element;
  }
  // Need to get one depth children only.
  // Because more deep children will gotten by children element recursively.
  getChildren(element?: ComponentTreeItem): Thenable<ComponentTreeItem[]> {
    return Promise.resolve(
      this.getComponentsInJson(JSON.stringify(sampleData))
    );
    // if (element) {
    //   return Promise.resolve(this.getComponentsInJson(JSON.stringify(data)));
    // } else {
    //   vscode.window.showInformationMessage("Something went wrong!");
    //   return Promise.resolve([]);
    // }
  }

  private getComponentsInJson(data: string): ComponentTreeItem[] {
    if (data) {
      const parsed = JSON.parse(data);

      const toComponent = (componentName: string): ComponentTreeItem => {
        return new ComponentTreeItem(
          componentName,
          vscode.TreeItemCollapsibleState.None
        );
      };

      const components = parsed ? [toComponent(parsed.name)] : [];
      return components;
    } else {
      return [];
    }
  }
}

class ComponentTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = `Component ${this.label}`;
    this.description = `Component ${this.label} is element of tree.`;
  }
}
