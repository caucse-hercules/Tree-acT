import * as React from "react";
import { sampleData } from "../../../common/sampleData";
import Tree from "./Tree";
const data = sampleData;

export const Hello = () => <Tree data={data} width={1200} height={960} />;
