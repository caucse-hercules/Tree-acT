import React, { Fragment } from "react";
import { LinkVertical } from "@visx/shape";

function Link({ data, ...props }: any) {
  const LinkComponent = LinkVertical;
  console.log("link data", data);
  return (
    <LinkComponent
      data={data}
      stroke="#374469"
      strokeWidth="1"
      fill="none"
      {...props}
    />
  );
}

export default Link;
