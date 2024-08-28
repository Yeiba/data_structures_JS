class BinarySearchTree {
    constructor() {
        this.nodeCount = 0;
        this.root = null;
    }
    // Internal Node class
    static Node = class {
        constructor(data, left = null, right = null) {
            this.data = data;
            this.left = left;
            this.right = right;
        }
    };

    // Check if the tree is empty
    isEmpty() {
        return this.size() === 0;
    }

    // Get the number of nodes in the tree
    size() {
        return this.nodeCount;
    }

    // Add an element to the BST
    add(elem) {
        if (this.contains(elem)) {
            return false;
        } else {
            this.root = this._add(this.root, elem);
            this.nodeCount++;
            return true;
        }
    }

    // Recursive helper method to add an element
    _add(node, elem) {
        if (node === null) {
            return new BinarySearchTree.Node(elem);
        }

        if (elem < node.data) {
            node.left = this._add(node.left, elem);
        } else {
            node.right = this._add(node.right, elem);
        }

        return node;
    }

    // Remove an element from the BST
    remove(elem) {
        if (this.contains(elem)) {
            this.root = this._remove(this.root, elem);
            this.nodeCount--;
            return true;
        }
        return false;
    }

    // Recursive helper method to remove an element
    _remove(node, elem) {
        if (node === null) return null;

        if (elem < node.data) {
            node.left = this._remove(node.left, elem);
        } else if (elem > node.data) {
            node.right = this._remove(node.right, elem);
        } else {
            // Node to be removed found
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            // Node with two children
            const minNode = this._findMin(node.right);
            node.data = minNode.data;
            node.right = this._remove(node.right, minNode.data);
        }

        return node;
    }

    // Find the minimum value node in a subtree
    _findMin(node) {
        while (node.left !== null) node = node.left;
        return node;
    }

    // Check if the tree contains a certain value
    contains(elem) {
        return this._contains(this.root, elem);
    }

    // Recursive helper method to check if a value exists
    _contains(node, elem) {
        if (node === null) return false;

        if (elem < node.data) {
            return this._contains(node.left, elem);
        } else if (elem > node.data) {
            return this._contains(node.right, elem);
        } else {
            return true;
        }
    }

    // Get the height of the tree
    height() {
        return this._height(this.root);
    }

    // Recursive helper method to calculate the height
    _height(node) {
        if (node === null) return 0;
        return Math.max(this._height(node.left), this._height(node.right)) + 1;
    }

    // Tree traversal methods
    traverse(order) {
        switch (order) {
            case 'PRE_ORDER':
                return this._preOrderTraversal();
            case 'IN_ORDER':
                return this._inOrderTraversal();
            case 'POST_ORDER':
                return this._postOrderTraversal();
            case 'LEVEL_ORDER':
                return this._levelOrderTraversal();
            default:
                return null;
        }
    }

    // Pre-order traversal
    _preOrderTraversal() {
        const stack = [this.root];
        const result = [];

        while (stack.length > 0) {
            const node = stack.pop();
            if (node) {
                result.push(node.data);
                stack.push(node.right);
                stack.push(node.left);
            }
        }

        return result[Symbol.iterator]();
    }

    // In-order traversal
    _inOrderTraversal() {
        const stack = [];
        const result = [];
        let current = this.root;

        while (stack.length > 0 || current !== null) {
            if (current !== null) {
                stack.push(current);
                current = current.left;
            } else {
                current = stack.pop();
                result.push(current.data);
                current = current.right;
            }
        }

        return result[Symbol.iterator]();
    }

    // Post-order traversal
    _postOrderTraversal() {
        const stack1 = [this.root];
        const stack2 = [];
        const result = [];

        while (stack1.length > 0) {
            const node = stack1.pop();
            if (node) {
                stack2.push(node);
                stack1.push(node.left);
                stack1.push(node.right);
            }
        }

        while (stack2.length > 0) {
            result.push(stack2.pop().data);
        }

        return result[Symbol.iterator]();
    }

    // Level-order traversal
    _levelOrderTraversal() {
        const queue = [this.root];
        const result = [];

        while (queue.length > 0) {
            const node = queue.shift();
            if (node) {
                result.push(node.data);
                queue.push(node.left);
                queue.push(node.right);
            }
        }

        return result[Symbol.iterator]();
    }
}

// Example usage:
const bst = new BinarySearchTree();

bst.add(10);
bst.add(5);
bst.add(15);
console.log([...bst.traverse('IN_ORDER')]); // [5, 10, 15]
console.log(bst.contains(10)); // true
console.log(bst.height()); // 2
bst.remove(10);
console.log(bst.contains(10)); // false
console.log([...bst.traverse('IN_ORDER')]); // [5, 15]
