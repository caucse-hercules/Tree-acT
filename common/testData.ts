/**
 * Sample Data for Testing
 * You can see how Message Data and New Tree Node are composed in /common/types.ts.
 */
import { MessageData, TreeNode } from "./types";

/**
 * Information about each node's attributes
 * id : integer type for node's index
 * name : string type for node's name
 * childrenId : integer array type for storing node's childrenId index
 * isExpanded : boolean type for checking node is opened(not important for testing)
 */
export const testData: TreeNode[] = [
  {
    id: 0,
    name: "App",
    childrenId: [1, 2, 4],
    isExpanded: true,
  },
  {
    id: 1,
    name: "Header",
    parentId: 0,
    childrenId: [5, 8],
    isExpanded: true,
  },
  {
    id: 2,
    name: "Content",
    parentId: 0,
    childrenId: [],
    isExpanded: true,
  },
  {
    id: 4,
    name: "Footer",
    parentId: 0,
    childrenId: [],
    isExpanded: true,
  },
  {
    id: 5,
    name: "Navigator",
    parentId: 1,
    childrenId: [6, 7],
    isExpanded: true,
  },
  {
    id: 6,
    name: "JuniorNaver",
    parentId: 5,
    childrenId: [],
    isExpanded: true,
  },
  {
    id: 7,
    name: "HappyBin",
    parentId: 5,
    childrenId: [],
    isExpanded: true,
  },
  {
    id: 8,
    name: "SearchBar",
    parentId: 1,
    childrenId: [],
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
