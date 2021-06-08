import * as assert from "assert";
import { run } from "../../generateCode";
import fs from "fs";
import rimraf from "rimraf";
import { testGenerateMessage } from "../../../../common/testData";
import { NewTreeNode } from "../../../../common/types";

suite("Extension d Test Suite", function () {
  // Set timeout for waiting execute
  this.timeout(100000);

  test("Run Test", async () => {
    // Path where test application is installed
    const testPath = "./src/test";

    const testMessage = testGenerateMessage;
    const data: any = testMessage.data;

    // If test application already exists, remove it.
    if (fs.existsSync(testPath + "/" + testMessage.directory)) {
      rimraf.sync(testPath + "/" + testMessage.directory);
    }

    await run(testMessage, testPath);

    // Get components' name from input data to test if test application is installed well
    const nameList = await getComponentName(data);

    // Get components' name from installed test application to test if test application is installed well
    const createNameList = await getCreateComponentName(
      testPath + "/" + testMessage.directory + "/src"
    );

    // Test
    const equal = checkComponent(nameList, createNameList);
    assert.strictEqual(equal, true);
  });
});

// Function for comparing input components' name and installed components' name
const checkComponent = (inputNameList: string[], createNameList: string[]) => {
  inputNameList.sort((one, two) => (one > two ? -1 : 1));
  createNameList.sort((one, two) => (one > two ? -1 : 1));

  for (let i = 0; i < inputNameList.length; i++) {
    if (inputNameList[i] !== createNameList[i]) {
      return false;
    }
  }

  return true;
};

// Function to get input component's name
const getComponentName = async (data: NewTreeNode[]) => {
  const nameList: string[] = [];

  for (const i in data) {
    nameList.push(data[i].name);
  }

  return nameList;
};

// Function to get installed components' name
const getCreateComponentName = async (dirPath: string) => {
  const files = fs.readdirSync(dirPath + "/components");
  const sliceFiles: string[] = [];

  if (fs.existsSync(dirPath + "/App.js")) {
    files.push("App.js");
  }

  for (const i of files) {
    sliceFiles.push(i.split(".")[0]);
  }
  return sliceFiles;
};
