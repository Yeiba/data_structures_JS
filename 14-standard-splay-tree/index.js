class SplayTree {
    constructor() {
        this.root = null;
    }

    // Internal Node class
    static Node = class {
        constructor(key, parent = null) {
            this.key = key;
            this.left = null;
            this.right = null;
            this.parent = parent;
        }
    };

    // Rotate left operation
    _rotateLeft(node) {
        const newRoot = node.right;
        node.right = newRoot.left;
        if (newRoot.left !== null) {
            newRoot.left.parent = node;
        }
        newRoot.parent = node.parent;
        if (node.parent === null) {
            this.root = newRoot;
        } else if (node === node.parent.left) {
            node.parent.left = newRoot;
        } else {
            node.parent.right = newRoot;
        }
        newRoot.left = node;
        node.parent = newRoot;
    }

    // Rotate right operation
    _rotateRight(node) {
        const newRoot = node.left;
        node.left = newRoot.right;
        if (newRoot.right !== null) {
            newRoot.right.parent = node;
        }
        newRoot.parent = node.parent;
        if (node.parent === null) {
            this.root = newRoot;
        } else if (node === node.parent.right) {
            node.parent.right = newRoot;
        } else {
            node.parent.left = newRoot;
        }
        newRoot.right = node;
        node.parent = newRoot;
    }

    // Splay operation
    _splay(node) {
        while (node.parent !== null) {
            if (node.parent.parent === null) {
                // Zig step
                if (node === node.parent.left) {
                    this._rotateRight(node.parent);
                } else {
                    this._rotateLeft(node.parent);
                }
            } else if (node === node.parent.left && node.parent === node.parent.parent.left) {
                // Zig-Zig step
                this._rotateRight(node.parent.parent);
                this._rotateRight(node.parent);
            } else if (node === node.parent.right && node.parent === node.parent.parent.right) {
                // Zig-Zig step
                this._rotateLeft(node.parent.parent);
                this._rotateLeft(node.parent);
            } else if (node === node.parent.right && node.parent === node.parent.parent.left) {
                // Zig-Zag step
                this._rotateLeft(node.parent);
                this._rotateRight(node.parent);
            } else {
                // Zig-Zag step
                this._rotateRight(node.parent);
                this._rotateLeft(node.parent);
            }
        }
    }

    // Find node with key
    _find(key) {
        let current = this.root;
        while (current !== null) {
            if (key < current.key) {
                current = current.left;
            } else if (key > current.key) {
                current = current.right;
            } else {
                this._splay(current);
                return current;
            }
        }
        return null;
    }

    // Insert a new key
    insert(key) {
        if (this.root === null) {
            this.root = new SplayTree.Node(key);
            return;
        }

        const foundNode = this._find(key);
        if (foundNode !== null) {
            return; // Key already exists
        }

        const newNode = new SplayTree.Node(key);
        if (key < this.root.key) {
            newNode.right = this.root;
            newNode.left = this.root.left;
            if (this.root.left !== null) {
                this.root.left.parent = newNode;
            }
            this.root.left = null;
        } else {
            newNode.left = this.root;
            newNode.right = this.root.right;
            if (this.root.right !== null) {
                this.root.right.parent = newNode;
            }
            this.root.right = null;
        }
        this.root.parent = newNode;
        this.root = newNode;
    }

    // Delete a key
    delete(key) {
        const node = this._find(key);
        if (node === null) {
            return; // Key not found
        }

        this._splay(node);
        if (node.left === null) {
            this.root = node.right;
            if (this.root !== null) {
                this.root.parent = null;
            }
        } else {
            const rightSubtree = node.right;
            this.root = node.left;
            this.root.parent = null;
            let maxLeft = this.root;
            while (maxLeft.right !== null) {
                maxLeft = maxLeft.right;
            }
            this._splay(maxLeft);
            this.root.right = rightSubtree;
            if (rightSubtree !== null) {
                rightSubtree.parent = this.root;
            }
        }
    }

    // Search for a key
    search(key) {
        return this._find(key) !== null;
    }

    // Find the minimum key
    findMin() {
        if (this.root === null) return null;

        let current = this.root;
        while (current.left !== null) {
            current = current.left;
        }
        this._splay(current);
        return current.key;
    }

    // Find the maximum key
    findMax() {
        if (this.root === null) return null;

        let current = this.root;
        while (current.right !== null) {
            current = current.right;
        }
        this._splay(current);
        return current.key;
    }

    // In-order traversal of the tree
    _inOrderTraversal(node, result) {
        if (node !== null) {
            this._inOrderTraversal(node.left, result);
            result.push(node.key);
            this._inOrderTraversal(node.right, result);
        }
    }

    inOrder() {
        const result = [];
        this._inOrderTraversal(this.root, result);
        return result;
    }
}

// Example usage
const tree = new SplayTree();
tree.insert(10);
tree.insert(20);
tree.insert(30);
tree.insert(40);
tree.insert(50);

console.log("In-order traversal after inserts:", tree.inOrder());

console.log("Searching for 30:", tree.search(30));  // true
console.log("Searching for 25:", tree.search(25));  // false

tree.delete(30);
console.log("In-order traversal after deleting 30:", tree.inOrder());

console.log("Find Min:", tree.findMin());  // 10
console.log("Find Max:", tree.findMax());  // 50
