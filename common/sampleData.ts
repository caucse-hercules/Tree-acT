import { MessageData, NewTreeNode, TreeNode } from "./types";

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

export const sampleData: TreeNode = {
  name: "App",
  children: [
    {
      name: "Header",
      children: [
        {
          name: "Navigator",
          children: [
            {
              name: "JuniorNaver",
            },
            {
              name: "HappyBin",
            },
          ],
        },
        {
          name: "SearchBar",
        },
      ],
    },
    {
      name: "Content",
      children: [
        {
          name: "TapMenu",
          children: [
            {
              name: "Mail",
              children: [
                {
                  name: "writeMail",
                },
                {
                  name: "writeMailtoMe",
                },
              ],
            },
            {
              name: "Cafe",
            },
            {
              name: "Blog",
            },
            {
              name: "Shopping",
            },
            {
              name: "Pay",
            },
            {
              name: "News",
            },
          ],
        },
        {
          name: "Login",
          children: [
            {
              name: "Email",
            },
            {
              name: "Password",
            },
          ],
        },
        {
          name: "NewsBoard",
          children: [
            {
              name: "JTBC",
            },
            {
              name: "KBS",
              children: [
                {
                  name: "Article",
                  children: [
                    {
                      name: "Advertise",
                      children: [
                        {
                          name: "ADcontent",
                          children: [
                            {
                              name: "ADImage",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Footer",
      children: [
        {
          name: "Creators",
          children: [
            {
              name: "Creator",
            },
            {
              name: "SmallBusiness",
            },
          ],
        },
        {
          name: "Partners",
          children: [
            {
              name: "SME",
            },
            {
              name: "Store",
            },
          ],
        },
        {
          name: "Developers",
          children: [
            {
              name: "NaverDeveloperCenter",
            },
            {
              name: "OpenAPI",
            },
          ],
        },
      ],
    },
  ],
};

export const sampleGenerateMessage: MessageData = {
  command: "generateApp",
  directory: "sample-app",
  data: initialData,
};
