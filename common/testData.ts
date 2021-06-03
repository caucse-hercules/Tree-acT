import { MessageData, NewTreeNode } from "./types";

export const initialData: NewTreeNode[] = [
  {
    id: 0,
    name: "App",
    children: [1, 2, 3],
    isExpanded: true,
  },
  {
    id: 1,
    name: "Header",
    parent: 0,
    children: [4, 7],
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
    id: 3,
    name: "Footer",
    parent: 0,
    children: [],
    isExpanded: true,
  },
  {
    id: 4,
    name: "Navigator",
    parent: 1,
    children: [5, 6],
    isExpanded: true,
  },
  {
    id: 5,
    name: "JuniorNaver",
    parent: 4,
    children: [],
    isExpanded: true,
  },
  {
    id: 6,
    name: "HappyBin",
    parent: 4,
    children: [],
    isExpanded: true,
  },
  {
    id: 7,
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
