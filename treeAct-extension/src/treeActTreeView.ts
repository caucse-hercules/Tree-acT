/* eslint-disable @typescript-eslint/ban-types */
import * as vscode from "vscode";
import { TreeNode } from "../../common/types";

export class TreeActTreeView
  implements vscode.TreeDataProvider<TreeActTreeViewItem>
{
  constructor(
    private context: vscode.ExtensionContext,
    public treeData: TreeNode
  ) {}

  getTreeItem(element: TreeActTreeViewItem): vscode.TreeItem {
    return element;
  }
  // Need to get one depth children only.
  // Because more deep children will gotten by children element recursively.
  getChildren(element?: TreeActTreeViewItem): Thenable<TreeActTreeViewItem[]> {
    if (element) {
      return Promise.resolve(this.toItems(element.children));
    } else {
      // When root
      const root = new TreeActTreeViewItem(
        this.treeData.name,
        this.treeData.children && this.treeData.children.length !== 0
          ? vscode.TreeItemCollapsibleState.Expanded
          : vscode.TreeItemCollapsibleState.None,
        this.treeData.children || []
      );
      return Promise.resolve([root]);
    }
  }

  private toItems(children: TreeNode[]): TreeActTreeViewItem[] {
    return children.map(
      (node) =>
        new TreeActTreeViewItem(
          node.name,
          node.children && node.children.length !== 0
            ? vscode.TreeItemCollapsibleState.Expanded
            : vscode.TreeItemCollapsibleState.None,
          node.children || []
        )
    );
  }
}

class TreeActTreeViewItem extends vscode.TreeItem {
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
