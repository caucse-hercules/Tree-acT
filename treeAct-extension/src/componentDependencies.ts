import * as vscode from "vscode";
import { TreeNode } from "../../common/types";

export class ComponentDependenciesProvider
  implements vscode.TreeDataProvider<ComponentTreeItem> {
  constructor(
    private context: vscode.ExtensionContext,
    public treeData: TreeNode
  ) {}

  getTreeItem(element: ComponentTreeItem): vscode.TreeItem {
    return element;
  }
  // Need to get one depth children only.
  // Because more deep children will gotten by children element recursively.
  getChildren(element?: ComponentTreeItem): Thenable<ComponentTreeItem[]> {
    if (element) {
      return Promise.resolve(this.toItems(element.children));
    } else {
      const root = new ComponentTreeItem(
        this.treeData.name,
        this.treeData.children && this.treeData.children.length !== 0
          ? vscode.TreeItemCollapsibleState.Expanded
          : vscode.TreeItemCollapsibleState.None,
        this.treeData.children || []
      );
      return Promise.resolve([root]);
    }
  }

  private toItems(children: TreeNode[]): ComponentTreeItem[] {
    return children.map(
      (node) =>
        new ComponentTreeItem(
          node.name,
          node.children && node.children.length !== 0
            ? vscode.TreeItemCollapsibleState.Expanded
            : vscode.TreeItemCollapsibleState.None,
          node.children || []
        )
    );
  }
}

class ComponentTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly children: TreeNode[]
  ) {
    super(label, collapsibleState);
    this.tooltip = `Component ${this.label}`;
    this.description = `Component ${this.label}`;
  }
}
