# Explanation


To implement tree traversal orders in JavaScript, you'll need to define traversal methods for Pre-order, In-order, Post-order, and Level-order traversals. Here's how you can create a `TreeTraversalOrder` enum and incorporate traversal methods in the `SplayTree` class.

### Step-by-Step Implementation

1. **Define the Traversal Enum**: In JavaScript, enums can be represented using objects.
2. **Add Traversal Methods**: Implement methods for each traversal order.

Here's the complete code:

```javascript
// TreeTraversalOrder Enum
const TreeTraversalOrder = {
  PRE_ORDER: 'PRE_ORDER',
  IN_ORDER: 'IN_ORDER',
  POST_ORDER: 'POST_ORDER',
  LEVEL_ORDER: 'LEVEL_ORDER'
};

// Node Class
class Node {
  constructor(data) {
    if (data === null) {
      throw new Error("Null data not allowed into tree");
    }
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// SplayTree Class with Traversal Methods
class SplayTree {
  constructor() {
    this.root = null;
  }

  // Public Methods
  search(node) {
    if (this.root === null) return null;
    this.root = this.splay(node);
    return this.root.data === node ? this.root : null;
  }

  insert(node) {
    if (this.root === null) {
      this.root = new Node(node);
      return this.root;
    }
    this.splay(node);

    const [left, right] = this.split(node);

    this.root = new Node(node);
    this.root.left = left;
    this.root.right = right;

    return this.root;
  }

  delete(node) {
    if (this.root === null) return null;

    const searchResult = this.splay(node);

    if (searchResult.data !== node) return null;

    const leftSubtree = this.root.left;
    const rightSubtree = this.root.right;

    // Set the 'to be deleted' key ready for garbage collection
    this.root.left = null;
    this.root.right = null;

    this.root = this.join(leftSubtree, rightSubtree);

    return this.root;
  }

  findMax() {
    let temp = this.root;
    while (temp.right !== null) temp = temp.right;
    return temp.data;
  }

  findMin() {
    let temp = this.root;
    while (temp.left !== null) temp = temp.left;
    return temp.data;
  }

  // Private Methods
  rightRotate(node) {
    const p = node.left;
    node.left = p.right;
    p.right = node;
    return p;
  }

  leftRotate(node) {
    const p = node.right;
    node.right = p.left;
    p.left = node;
    return p;
  }

  splayUtil(root, key) {
    if (root === null || root.data === key) return root;

    if (root.data > key) {
      if (root.left === null) return root;

      if (root.left.data > key) {
        root.left.left = this.splayUtil(root.left.left, key);
        root = this.rightRotate(root);
      } else if (root.left.data < key) {
        root.left.right = this.splayUtil(root.left.right, key);
        if (root.left.right !== null) root.left = this.leftRotate(root.left);
      }
      return (root.left === null) ? root : this.rightRotate(root);
    } else {
      if (root.right === null) return root;

      if (root.right.data > key) {
        root.right.left = this.splayUtil(root.right.left, key);
        if (root.right.left !== null) root.right = this.rightRotate(root.right);
      } else if (root.right.data < key) {
        root.right.right = this.splayUtil(root.right.right, key);
        root = this.leftRotate(root);
      }
      return (root.right === null) ? root : this.leftRotate(root);
    }
  }

  splay(node) {
    if (this.root === null) return null;
    this.root = this.splayUtil(this.root, node);
    return this.root;
  }

  split(node) {
    let right;
    let left;

    if (node > this.root.data) {
      right = this.root.right;
      left = this.root;
      left.right = null;
    } else {
      left = this.root.left;
      right = this.root;
      right.left = null;
    }
    return [left, right];
  }

  join(L, R) {
    if (L === null) {
      this.root = R;
      return R;
    }
    this.root = this.splayUtil(L, this.findMax(L));
    this.root.right = R;
    return this.root;
  }

  inorder(root, sorted = []) {
    if (root === null) {
      return sorted;
    }
    this.inorder(root.left, sorted);
    sorted.push(root.data);
    this.inorder(root.right, sorted);
    return sorted;
  }

  preorder(root, sorted = []) {
    if (root === null) {
      return sorted;
    }
    sorted.push(root.data);
    this.preorder(root.left, sorted);
    this.preorder(root.right, sorted);
    return sorted;
  }

  postorder(root, sorted = []) {
    if (root === null) {
      return sorted;
    }
    this.postorder(root.left, sorted);
    this.postorder(root.right, sorted);
    sorted.push(root.data);
    return sorted;
  }

  levelOrder(root) {
    const result = [];
    if (root === null) return result;
    const queue = [root];

    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node.data);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
    return result;
  }

  traverse(order = TreeTraversalOrder.IN_ORDER) {
    switch (order) {
      case TreeTraversalOrder.PRE_ORDER:
        return this.preorder(this.root).toString();
      case TreeTraversalOrder.IN_ORDER:
        return this.inorder(this.root).toString();
      case TreeTraversalOrder.POST_ORDER:
        return this.postorder(this.root).toString();
      case TreeTraversalOrder.LEVEL_ORDER:
        return this.levelOrder(this.root).toString();
      default:
        throw new Error("Unknown traversal order");
    }
  }

  toString() {
    return this.root ? this.inorder(this.root).toString() : "Empty Tree";
  }
}

// Example usage
const splayTree = new SplayTree();
const data = [2, 29, 26, -1, 10, 0, 2, 11];

data.forEach(i => splayTree.insert(i));

console.log("Tree:", splayTree.toString());

console.log("Pre-order traversal:", splayTree.traverse(TreeTraversalOrder.PRE_ORDER));
console.log("In-order traversal:", splayTree.traverse(TreeTraversalOrder.IN_ORDER));
console.log("Post-order traversal:", splayTree.traverse(TreeTraversalOrder.POST_ORDER));
console.log("Level-order traversal:", splayTree.traverse(TreeTraversalOrder.LEVEL_ORDER));
```

### Explanation

- **TreeTraversalOrder Enum**: Implemented using a constant object in JavaScript.
- **Traversal Methods**:
  - `preorder()`: Pre-order traversal (Root -> Left -> Right)
  - `inorder()`: In-order traversal (Left -> Root -> Right)
  - `postorder()`: Post-order traversal (Left -> Right -> Root)
  - `levelOrder()`: Level-order traversal (Breadth-First Search)
- **traverse() Method**: Chooses the appropriate traversal method based on the specified order.

This implementation covers different tree traversal methods and can be integrated with your existing `SplayTree` class.
