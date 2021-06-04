export type MessageData = {
  command: string;
  directory?: string;
  data?: NewTreeNode[];
};

export type NewTreeNode = {
  id: number;
  name: string;
  parent?: number;
  children: number[];
  isExpanded: boolean;
};

export type RequestType = "add" | "delete" | "refresh" | "init";
export type RequestData = {
  command: RequestType;
  data?: NewTreeNode | NewTreeNode[];
};
