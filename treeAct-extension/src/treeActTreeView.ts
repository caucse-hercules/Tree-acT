/* eslint-disable @typescript-eslint/ban-types */
import * as vscode from "vscode";
import { TreeNode } from "../../common/types";

export class TreeActTreeView
  implements vscode.TreeDataProvider<TreeActTreeViewItem>
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    TreeActTreeViewItem | undefined | void
  > = new vscode.EventEmitter<TreeActTreeViewItem | undefined | void>();
  readonly onDidChangeTreeData: vscode.Event<
    TreeActTreeViewItem | undefined | void
  > = this._onDidChangeTreeData.event;

  private treeData: TreeNode[];

  constructor(private context: vscode.ExtensionContext) {
    this.treeData = this.context.globalState.get("treeData") as TreeNode[];
  }

  refresh(): void {
    this.treeData = this.context.globalState.get("treeData") as TreeNode[];
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: TreeActTreeViewItem): vscode.TreeItem {
    return element;
  }
  // Need to get one depth children only.
  // Because more deep children will gotten by children element recursively.
  // Root item's id is always 0.
  getChildren(element?: TreeActTreeViewItem): Thenable<TreeActTreeViewItem[]> {
    if (element) {
      return Promise.resolve(this.toItems(element.children));
    } else {
      if (this.treeData.length === 0) return Promise.resolve([]);
      const node = this.treeData[0];
      const root = new TreeActTreeViewItem(
        node.name,
        node.childrenId && node.childrenId.length !== 0
          ? vscode.TreeItemCollapsibleState.Expanded
          : vscode.TreeItemCollapsibleState.None,
        node.childrenId || []
      );
      return Promise.resolve([root]);
    }
  }

  private toItems(children: number[]): TreeActTreeViewItem[] {
    return children.map((id) => {
      const node = this.treeData.find((item) => item.id === id);
      return new TreeActTreeViewItem(
        node!.name,
        node!.childrenId && node!.childrenId.length !== 0
          ? vscode.TreeItemCollapsibleState.Expanded
          : vscode.TreeItemCollapsibleState.None,
        node!.childrenId || []
      );
    });
  }
}

class TreeActTreeViewItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly children: number[]
  ) {
    super(label, collapsibleState);
    this.tooltip = `Component ${this.label}`;
    this.description = `Component ${this.label}`;
  }
}
