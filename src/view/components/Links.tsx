import React, { Fragment } from 'react';
import{ Group } from '@visx/group';
import { NodeGroup } from 'react-move';

import Link from './Link';

function findCollapsedParent(node) {
  if (!node.data.isExpanded) {
    return node;
  } else if (node.parent) {
    return findCollapsedParent(node.parent);
  } else {
    return null;
  }
}

function Links({ links, linkType, layout, orientation, stepPercent }) {
  return (
    <Fragment>
      {links.map((link, i) => {
        return (
          <Link
            data={link}
            linkType={linkType}
            layout={layout}
            orientation={orientation}
            stepPercent={stepPercent}
            stroke="#374469"
            strokeWidth="1"
            fill="none"
            key={i}
          />
        )
      })}
    </Fragment>
  )
}

export default Links;