export type TreeNode = {
  name: string;
  children?: TreeNode[];
};

export type MessageData = {
  command: string;
  directory?: string;
  data?: TreeNode | NewTreeNode[];
};

export type NewTreeNode = {
  id: number;
  name: string;
  parent?: number;
  children: number[];
  isExpanded: boolean;
};

export type RequestType = "add" | "delete" | "refresh";
export type RequestData = {
  command: RequestType;
  data?: NewTreeNode | NewTreeNode[];
};
