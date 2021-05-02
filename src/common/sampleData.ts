import { TreeNode } from "./types";

export const sampleData: TreeNode = {
  name: "App",
  children: [
    {
      name: "TodoContainer",
      children: [
        {
          name: "AddTodo",
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "TodoList",
          children: [
            {
              name: "TodoItem",
            },
          ],
        },
      ],
    },
  ],
};
