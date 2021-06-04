import { MessageData, NewTreeNode } from "./types";

export const initialData: NewTreeNode[] = [
  {
    id: 0,
    name: "App",
    children: [1, 2, 4],
    isExpanded: true,
  },
  {
    id: 1,
    name: "Header",
    parent: 0,
    children: [5, 8],
    isExpanded: true,
  },
  {
    id: 2,
    name: "Content",
    parent: 0,
    children: [],
    isExpanded: true,
  },
  {
    id: 4,
    name: "Footer",
    parent: 0,
    children: [],
    isExpanded: true,
  },
  {
    id: 5,
    name: "Navigator",
    parent: 1,
    children: [6, 7],
    isExpanded: true,
  },
  {
    id: 6,
    name: "JuniorNaver",
    parent: 5,
    children: [],
    isExpanded: true,
  },
  {
    id: 7,
    name: "HappyBin",
    parent: 5,
    children: [],
    isExpanded: true,
  },
  {
    id: 8,
    name: "SearchBar",
    parent: 1,
    children: [],
    isExpanded: true,
  },
];

export const sampleGenerateMessage: MessageData = {
  command: "generateApp",
  directory: "sample-app",
  data: initialData,
};
