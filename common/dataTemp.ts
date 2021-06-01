import { MessageData, TreeNode } from "./types";

export const dataTemp: TreeNode = {
  Node: [
    {
      name: "App",
      index: 0,
      children: [1, 2, 3, 4],
    },
    {
      name: "Youtube",
      index: 1,
      children: [8, 9],
    },
    {
      name: "Webtoon",
      index: 2,
      children: [],
    },
    {
      name: "News",
      index: 3,
      children: [5, 6, 7],
    },
    {
      name: "Song",
      index: 4,
      children: [10, 11],
    },
    {
      name: "KBS",
      index: 5,
      children: [],
    },
    {
      name: "MBC",
      index: 6,
      children: [],
    },
    {
      name: "SBS",
      index: 7,
      children: [],
    },
    {
      name: "jjonak",
      index: 8,
      children: [],
    },
    {
      name: "geguri",
      index: 9,
      children: [],
    },
    {
      name: "VVS",
      index: 10,
      children: [12, 13],
    },
    {
      name: "Freak",
      index: 11,
      children: [],
    },
    {
      name: "MushVenom",
      index: 12,
      children: [],
    },
    {
      name: "Khundi",
      index: 13,
      children: [],
    },
  ],
};

export const sampleGenerateMessage: MessageData = {
  command: "generateApp",
  directory: "sample-app",
  data: dataTemp,
};
