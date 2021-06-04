import * as assert from "assert";
import { run } from "../../generateCode";
import fs from "fs";
import rimraf from "rimraf";
import { sampleGenerateMessage } from "../../../../common/sampleData";
import { NewTreeNode } from "../../../../common/types";

suite("Extension d Test Suite", function () {
  this.timeout(100000);

  test("Run Test", async () => {
    const testPath = "../..";
    const testMessage = sampleGenerateMessage;
    const data: any = testMessage.data;

    if (fs.existsSync(testPath + "/sample-app")) {
      rimraf.sync(testPath + "/sample-app");
    }

    await run(testMessage, testPath);

    const nameList = await getComponentName(data);

    const createNameList = await getCreateComponentName(testPath);

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
  const files = fs.readdirSync(dirPath + "/sample-app/src/components");
  const sliceFiles: string[] = [];

  if (fs.existsSync(dirPath + "/sample-app/src/App.js")) {
    files.push("App.js");
  }

  for (const i of files) {
    sliceFiles.push(i.split(".")[0]);
  }
  return sliceFiles;
};
