import { MessageData, TreeNode } from "./types";

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
  data: sampleData,
};
