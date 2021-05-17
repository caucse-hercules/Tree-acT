# Tree-acT

Build your react project with TREE!

## How to Run ?

### Prerequisites

- VSCode : Basically this is VSCode extension, for this reason you need VSCode to run this code.
- Node.js : This is extension of VSCode which is built with electron powered by node, for this reason you need Node.js to build this extension.
- npm & npx : npx is the utility of npm so you need npm, and our extension uses [create-react-app](https://github.com/facebook/create-react-app) internally so you need npx too.
- yarn : You need yarn as package manager because we are using [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) currently.

### Step 1. Clone this repository

Clone this repository where you prefer.

### Step 2. Install dependencies

Move to cloned repository and in the root directory execute below to install dependencies and initialize yarn workspaces.

```sh
yarn # install dependencies and initialize yarn workspaces
```

### Step 3. Execute VSCode extension

Open this repository directory with VSCode.  
And press `F5` or execute `Run - Start Debugging` at the VSCode menu.  
That's it! You'll see build processes and after seconds, will be able to see `Extension Development Host`.  
You can use our extension by clicking our `extension's activity menu icon` which is on the leftmost side of VSCode.

## LICENSE

MIT License
