/* eslint-disable @typescript-eslint/ban-types */
import * as vscode from "vscode";
import { NewTreeNode } from "../../common/types";

export class TreeActTreeView
  implements vscode.TreeDataProvider<TreeActTreeViewItem>
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    TreeActTreeViewItem | undefined | void
  > = new vscode.EventEmitter<TreeActTreeViewItem | undefined | void>();
  readonly onDidChangeTreeData: vscode.Event<
    TreeActTreeViewItem | undefined | void
  > = this._onDidChangeTreeData.event;

  constructor(
    private context: vscode.ExtensionContext,
    public treeData: NewTreeNode[]
  ) {}

  refresh(): void {
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
      const node = this.treeData[0];
      const root = new TreeActTreeViewItem(
        node.name,
        node.children && node.children.length !== 0
          ? vscode.TreeItemCollapsibleState.Expanded
          : vscode.TreeItemCollapsibleState.None,
        node.children || []
      );
      return Promise.resolve([root]);
    }
  }

  private toItems(children: number[]): TreeActTreeViewItem[] {
    return children.map((id) => {
      const node = this.treeData[id];
      return new TreeActTreeViewItem(
        node.name,
        node.children && node.children.length !== 0
          ? vscode.TreeItemCollapsibleState.Expanded
          : vscode.TreeItemCollapsibleState.None,
        node.children || []
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
