import * as assert from "assert";
import { run } from "../../generateCode";
import fs from "fs";
import rimraf from "rimraf";
import { sampleGenerateMessage } from "../../../../common/sampleData";
//import { sampleGenerateMessage } from "../../../../common/testData";
//import { after } from "mocha";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import waitUntil, { WAIT_FOREVER } from "async-wait-until";
// import * as myExtension from '../extension';

suite("Extension d Test Suite", function () {
  this.timeout(100000);
  // after(() => {
  //   vscode.window.showInformationMessage("All tests done!");
  // });

  // test("Sample Test", () => {
  //   assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  //   assert.strictEqual(-1, [1, 2, 3].indexOf(-5));
  // });

  test("Run Test", () => {
    const testPath = "../";
    const testMessage = sampleGenerateMessage;

    if (fs.existsSync(testPath + "sample-app")) {
      rimraf.sync(testPath + "sample-app");
    }

    //const res = await waitUntil(() => run(testMessage, testPath), WAIT_FOREVER);
    const res = run(testMessage, testPath);
    assert.strictEqual(res, "DONE");
  });
});
