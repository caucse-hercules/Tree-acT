import * as assert from "assert";
import { run } from "../../generateCode";
import fs from "fs";
import rimraf from "rimraf";
import { testGenerateMessage } from "../../../../common/testData";
import { NewTreeNode } from "../../../../common/types";

suite("Extension d Test Suite", function () {
  this.timeout(100000);

  test("Run Test", async () => {
    const testPath = "./src/test";
    const testMessage = testGenerateMessage;
    const data: any = testMessage.data;

    if (fs.existsSync(testPath + "/" + testMessage.directory)) {
      rimraf.sync(testPath + "/" + testMessage.directory);
    }

    await run(testMessage, testPath);

    const nameList = await getComponentName(data);

    const createNameList = await getCreateComponentName(
      testPath + "/" + testMessage.directory + "/src"
    );

    const equal = checkComponent(nameList, createNameList);
    assert.strictEqual(equal, true);
  });
});

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

const getComponentName = async (data: NewTreeNode[]) => {
  const nameList: string[] = [];

  for (const i in data) {
    nameList.push(data[i].name);
  }

  return nameList;
};

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
