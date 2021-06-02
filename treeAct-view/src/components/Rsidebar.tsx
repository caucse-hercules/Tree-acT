import React, { useState } from "react";
import { dataTemp } from "../../../common/dataTemp";
// const recursion = (props: any) => {
//   const NodeList = props.data.Node.map((node) => {
//     return <li>{}</li>;
//   });
// };

const Bar = (props: any) => {
  console.log(dataTemp.Node[1].children[0]);
  const childList = {};
  return (
    <li>
      노드이름 : {dataTemp.Node[props.index]}
      <ul>{}</ul>
    </li>
  );
};
const Rside = (props: any) => {
  //const [NodeList, setNodeList] = useState(props.data.Node[0]);

  return (
    <div>
      <Bar index={0}></Bar>
    </div>
  );
};

export default Rside;
