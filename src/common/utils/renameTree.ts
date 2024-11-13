export function renameTree(tree, label:string,key:string) {
  // Recorre cada nodo del árbol
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];

    // Cambia la clave 'name' a 'label'
    if (label in node) {
      node.label = node[label];
      delete node[label];
    }
    if (key in node) {
        node.key = node[key];
      delete node[key];
      }

    // Recorre recursivamente los hijos del nodo actual
    if ("children" in node && node.children.length > 0) {
        renameTree(node.children, label,key);
    }
  }

  // Devuelve el árbol modificado
  return tree;
}
