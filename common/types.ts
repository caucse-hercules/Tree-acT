export type MessageData = {
  command: string;
  directory?: string;
  data?: TreeNode[];
};

export type TreeNode = {
  id: number;
  name: string;
  parentId?: number;
  childrenId: number[];
  isExpanded: boolean;
};

export type Name = {
  id: number;
  name: string;
};

// Type of whole tree data
export type TreeState = { treeData: TreeNode[] };

export type RequestType = "add" | "delete" | "refresh" | "init";
export type RequestData = {
  command: RequestType;
  data?: TreeNode | TreeNode[];
};
