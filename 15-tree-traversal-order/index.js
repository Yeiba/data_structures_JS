class BinaryTree {
    constructor() {
        this.root = null;
    }
    static TreeNode = class {
        constructor(key) {
            this.key = key;
            this.left = null;
            this.right = null;
        }
    }
    // Insert a node into the tree
    insert(key) {
        const newNode = new BinaryTree.TreeNode(key);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this._insertNode(this.root, newNode);
        }
    }

    _insertNode(node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this._insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this._insertNode(node.right, newNode);
            }
        }
    }

    // In-order traversal
    inOrderTraversal(node, result = []) {
        if (node !== null) {
            this.inOrderTraversal(node.left, result);
            result.push(node.key);
            this.inOrderTraversal(node.right, result);
        }
        return result;
    }

    // Pre-order traversal
    preOrderTraversal(node, result = []) {
        if (node !== null) {
            result.push(node.key);
            this.preOrderTraversal(node.left, result);
            this.preOrderTraversal(node.right, result);
        }
        return result;
    }

    // Post-order traversal
    postOrderTraversal(node, result = []) {
        if (node !== null) {
            this.postOrderTraversal(node.left, result);
            this.postOrderTraversal(node.right, result);
            result.push(node.key);
        }
        return result;
    }

    // Level-order traversal (Breadth-First Search)
    levelOrderTraversal() {
        const result = [];
        const queue = [];

        if (this.root !== null) {
            queue.push(this.root);

            while (queue.length > 0) {
                const node = queue.shift();
                result.push(node.key);

                if (node.left !== null) {
                    queue.push(node.left);
                }
                if (node.right !== null) {
                    queue.push(node.right);
                }
            }
        }

        return result;
    }
}

// Example usage
const tree = new BinaryTree();
tree.insert(15);
tree.insert(10);
tree.insert(20);
tree.insert(8);
tree.insert(12);
tree.insert(17);
tree.insert(25);

console.log("In-order Traversal:", tree.inOrderTraversal(tree.root)); // [8, 10, 12, 15, 17, 20, 25]
console.log("Pre-order Traversal:", tree.preOrderTraversal(tree.root)); // [15, 10, 8, 12, 20, 17, 25]
console.log("Post-order Traversal:", tree.postOrderTraversal(tree.root)); // [8, 12, 10, 17, 25, 20, 15]
console.log("Level-order Traversal:", tree.levelOrderTraversal()); // [15, 10, 20, 8, 12, 17, 25]
