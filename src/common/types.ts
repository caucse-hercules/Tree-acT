export interface TreeNode {
  name: string;
  children?: TreeNode[];
}

export interface MessageData {
  command: string;
  text: string;
}
