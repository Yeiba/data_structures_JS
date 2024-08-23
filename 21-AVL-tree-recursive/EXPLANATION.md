# Explanation

Here's a JavaScript implementation of an AVL Tree that mirrors the structure and logic of the provided Java code:

```javascript
class AVLTree {
    constructor() {
        this.root = null;
        this.nodeCount = 0;
        this.TOKEN = new Node(null); // Special token to signal duplicates
    }

    height() {
        return this.root ? this.root.height : 0;
    }

    size() {
        return this.nodeCount;
    }

    isEmpty() {
        return this.size() === 0;
    }

    contains(value) {
        let node = this.root;
        while (node !== null) {
            const cmp = this._compare(value, node.value);
            if (cmp < 0) node = node.left;
            else if (cmp > 0) node = node.right;
            else return true;
        }
        return false;
    }

    insert(value) {
        if (value === null) return false;
        const newRoot = this._insert(this.root, value);
        const inserted = newRoot !== this.TOKEN;
        if (inserted) {
            this.nodeCount++;
            this.root = newRoot;
        }
        return inserted;
    }

    _insert(node, value) {
        if (node === null) return new Node(value);

        const cmp = this._compare(value, node.value);

        if (cmp < 0) {
            node.left = this._insert(node.left, value);
        } else if (cmp > 0) {
            node.right = this._insert(node.right, value);
        } else {
            return this.TOKEN;
        }

        this._update(node);
        return this._balance(node);
    }

    _update(node) {
        const leftHeight = node.left ? node.left.height : -1;
        const rightHeight = node.right ? node.right.height : -1;

        node.height = 1 + Math.max(leftHeight, rightHeight);
        node.bf = rightHeight - leftHeight;
    }

    _balance(node) {
        if (node.bf === -2) {
            if (node.left.bf <= 0) {
                return this._rightRotation(node);
            } else {
                return this._leftRightCase(node);
            }
        }

        if (node.bf === 2) {
            if (node.right.bf >= 0) {
                return this._leftRotation(node);
            } else {
                return this._rightLeftCase(node);
            }
        }

        return node;
    }

    _leftRightCase(node) {
        node.left = this._leftRotation(node.left);
        return this._rightRotation(node);
    }

    _rightLeftCase(node) {
        node.right = this._rightRotation(node.right);
        return this._leftRotation(node);
    }

    _leftRotation(node) {
        const newParent = node.right;
        node.right = newParent.left;
        newParent.left = node;
        this._update(node);
        this._update(newParent);
        return newParent;
    }

    _rightRotation(node) {
        const newParent = node.left;
        node.left = newParent.right;
        newParent.right = node;
        this._update(node);
        this._update(newParent);
        return newParent;
    }

    remove(value) {
        const newRoot = this._remove(this.root, value);
        const removed = newRoot !== this.TOKEN || newRoot === null;

        if (removed) {
            this.root = newRoot;
            this.nodeCount--;
        }

        return removed;
    }

    _remove(node, value) {
        if (node === null) return this.TOKEN;

        const cmp = this._compare(value, node.value);

        if (cmp < 0) {
            node.left = this._remove(node.left, value);
        } else if (cmp > 0) {
            node.right = this._remove(node.right, value);
        } else {
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            } else {
                if (node.left.height > node.right.height) {
                    const successorValue = this._findMax(node.left);
                    node.value = successorValue;
                    node.left = this._remove(node.left, successorValue);
                } else {
                    const successorValue = this._findMin(node.right);
                    node.value = successorValue;
                    node.right = this._remove(node.right, successorValue);
                }
            }
        }

        this._update(node);
        return this._balance(node);
    }

    _findMin(node) {
        while (node.left !== null) node = node.left;
        return node.value;
    }

    _findMax(node) {
        while (node.right !== null) node = node.right;
        return node.value;
    }

    _compare(value1, value2) {
        if (typeof value1 === 'string' && typeof value2 === 'string') {
            return value1.localeCompare(value2);
        } else if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    }

    [Symbol.iterator]() {
        const stack = [];
        let trav = this.root;

        const iterator = {
            next: () => {
                while (trav !== null && trav.left !== null) {
                    stack.push(trav);
                    trav = trav.left;
                }

                if (stack.length === 0) {
                    return { done: true };
                }

                const node = stack.pop();

                if (node.right !== null) {
                    stack.push(node.right);
                    trav = node.right;
                }

                return { value: node.value, done: false };
            },
        };

        return iterator;
    }

    validateBSTInvariant(node = this.root) {
        if (node === null) return true;
        const val = node.value;
        let isValid = true;
        if (node.left !== null) isValid = isValid && node.left.value < val;
        if (node.right !== null) isValid = isValid && node.right.value > val;
        return isValid && this.validateBSTInvariant(node.left) && this.validateBSTInvariant(node.right);
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.height = 0;
        this.bf = 0; // balance factor
        this.left = null;
        this.right = null;
    }
}

// Example usage
const avlTree = new AVLTree();

avlTree.insert(10);
avlTree.insert(20);
avlTree.insert(5);
avlTree.insert(6);
avlTree.insert(15);
avlTree.insert(30);
avlTree.insert(25);

console.log("Tree Size:", avlTree.size());
console.log("Contains 15:", avlTree.contains(15));
console.log("Contains 100:", avlTree.contains(100));

avlTree.remove(10);
console.log("Contains 10 after removal:", avlTree.contains(10));
console.log("Tree Size after removal:", avlTree.size());

console.log("In-order traversal:");
for (const value of avlTree) {
    console.log(value);
}

console.log("Is valid BST:", avlTree.validateBSTInvariant());

```

### Key Features:

- **Node Class:** Represents each node with properties for value, height, balance factor (bf), and left/right children.
- **AVL Tree Operations:** Implements the main operations—insert, remove, and balance—following the AVL tree logic from the original Java code.
- **Balancing:** Handles the four cases for balancing (Left-Left, Left-Right, Right-Right, Right-Left) with rotations.
- **Iterator:** Implements an in-order iterator to traverse the tree.

You can now use this JavaScript AVL Tree class similar to how the Java version works.
