import * as React from "react";
import Tree from './Tree';
import data from './data';


export const Hello = () => (
  <Tree data={data} width={600} height={500} />
);
