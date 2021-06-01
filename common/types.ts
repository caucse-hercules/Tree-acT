export interface TreeNode {
  Node: {
    name: string;
    index: number;
    //children?: TreeNode[];
    children: number[];
  }[];
}

export interface MessageData {
  command: string;
  directory?: string;
  data?: TreeNode;
}
