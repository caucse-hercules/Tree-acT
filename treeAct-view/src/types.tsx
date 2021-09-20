import { NewTreeNode } from "../../common/types";

export type Name = {
  id: number;
  name: string;
};

// Type of whole tree data
export type TreeState = { treeData: NewTreeNode[] };
