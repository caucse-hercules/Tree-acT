export interface TreeNode {
  name: string;
  children?: TreeNode[];
}

export interface MessageData {
  command: string;
  directory?: string;
  data?: TreeNode;
}

export type NewTreeNode = {
  id: number;
  name: string;
  parent?: number;
  children: number[];
  isExpanded: boolean;
};
