/**
 * Sample Data for Testing
 * You can see how Message Data and New Tree Node are composed in /common/types.ts.
 */
import { MessageData, NewTreeNode } from "./types";

/**
 * Information about each node's attributes
 * id : integer type for node's index
 * name : string type for node's name
 * children : integer array type for storing node's children index
 * isExpanded : boolean type for checking node is opened(not important for testing)
 */
export const testData: NewTreeNode[] = [
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

/**
 * Message Data for generating test application
 * You can get this data for testing.
 * command : Command for generating application(This is used in /src/webviewBridge.ts.)
 * directory : Application name when you generate test application
 * data : Test data used in generating test application(You can see this above.)
 */
export const testGenerateMessage: MessageData = {
  command: "generateApp",
  directory: "test-app",
  data: testData,
};
