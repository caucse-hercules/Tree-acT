export function findCollapsedParent(node: any): any | null {
  if (!node.data.isExpanded) {
    return node;
  } else if (node.parent) {
    return findCollapsedParent(node.parent);
  } else {
    return null;
  }
}

export function translateCoords(node: any) {
  return {
    top: node.y,
    left: node.x,
  };
}
