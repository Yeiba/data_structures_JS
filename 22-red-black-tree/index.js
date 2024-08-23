class RedBlackTree {
    constructor() {
        this.RED = true;
        this.BLACK = false;
        this.root = null;
        this.nodeCount = 0;
    }

    size() {
        return this.nodeCount;
    }

    isEmpty() {
        return this.size() === 0;
    }

    contains(value) {
        let node = this.root;
        if (node === null || value === null) return false;

        while (node !== null) {
            const cmp = this._compare(value, node.value);

            if (cmp < 0) {
                node = node.left;
            } else if (cmp > 0) {
                node = node.right;
            } else {
                return true;
            }
        }
        return false;
    }

    insert(value) {
        if (value === null) throw new Error("Value cannot be null");

        if (this.root === null) {
            this.root = new Node(value, null);
            this._insertionRelabel(this.root);
            this.nodeCount++;
            return true;
        }

        let node = this.root;
        while (true) {
            const cmp = this._compare(value, node.value);

            if (cmp < 0) {
                if (node.left === null) {
                    node.left = new Node(value, node);
                    this._insertionRelabel(node.left);
                    this.nodeCount++;
                    return true;
                }
                node = node.left;
            } else if (cmp > 0) {
                if (node.right === null) {
                    node.right = new Node(value, node);
                    this._insertionRelabel(node.right);
                    this.nodeCount++;
                    return true;
                }
                node = node.right;
            } else {
                return false;
            }
        }
    }

    _insertionRelabel(node) {
        let parent = node.parent;

        if (parent === null) {
            node.color = this.BLACK;
            this.root = node;
            return;
        }

        let grandParent = parent.parent;
        if (grandParent === null) return;

        if (parent.color === this.BLACK || node.color === this.BLACK) return;

        let nodeIsLeftChild = (parent.left === node);
        let parentIsLeftChild = (parent === grandParent.left);
        let uncle = parentIsLeftChild ? grandParent.right : grandParent.left;
        let uncleIsRedNode = (uncle === null) ? this.BLACK : uncle.color;

        if (uncleIsRedNode) {
            parent.color = this.BLACK;
            grandParent.color = this.RED;
            if (uncle !== null) uncle.color = this.BLACK;
        } else {
            if (parentIsLeftChild) {
                if (nodeIsLeftChild) {
                    grandParent = this._leftLeftCase(grandParent);
                } else {
                    grandParent = this._leftRightCase(grandParent);
                }
            } else {
                if (nodeIsLeftChild) {
                    grandParent = this._rightLeftCase(grandParent);
                } else {
                    grandParent = this._rightRightCase(grandParent);
                }
            }
        }

        this._insertionRelabel(grandParent);
    }

    _swapColors(a, b) {
        const tmpColor = a.color;
        a.color = b.color;
        b.color = tmpColor;
    }

    _leftLeftCase(node) {
        node = this._rightRotate(node);
        this._swapColors(node, node.right);
        return node;
    }

    _leftRightCase(node) {
        node.left = this._leftRotate(node.left);
        return this._leftLeftCase(node);
    }

    _rightRightCase(node) {
        node = this._leftRotate(node);
        this._swapColors(node, node.left);
        return node;
    }

    _rightLeftCase(node) {
        node.right = this._rightRotate(node.right);
        return this._rightRightCase(node);
    }

    _rightRotate(parent) {
        const grandParent = parent.parent;
        const child = parent.left;

        parent.left = child.right;
        if (child.right !== null) child.right.parent = parent;

        child.right = parent;
        parent.parent = child;

        child.parent = grandParent;
        this._updateParentChildLink(grandParent, parent, child);

        return child;
    }

    _leftRotate(parent) {
        const grandParent = parent.parent;
        const child = parent.right;

        parent.right = child.left;
        if (child.left !== null) child.left.parent = parent;

        child.left = parent;
        parent.parent = child;

        child.parent = grandParent;
        this._updateParentChildLink(grandParent, parent, child);

        return child;
    }

    _updateParentChildLink(parent, oldChild, newChild) {
        if (parent !== null) {
            if (parent.left === oldChild) {
                parent.left = newChild;
            } else {
                parent.right = newChild;
            }
        }
    }

    _compare(value1, value2) {
        if (value1 < value2) return -1;
        if (value1 > value2) return 1;
        return 0;
    }
}

class Node {
    constructor(value, parent) {
        this.value = value;
        this.parent = parent;
        this.color = true; // RED by default
        this.left = null;
        this.right = null;
    }
}

// Example usage:
const rbTree = new RedBlackTree();
const values = [5, 8, 1, -4, 6, -2, 0, 7];

for (const value of values) {
    rbTree.insert(value);
}

console.log("RB tree contains 6:", rbTree.contains(6));  // true
console.log("RB tree contains -5:", rbTree.contains(-5)); // false
console.log("RB tree contains 1:", rbTree.contains(1));   // true
console.log("RB tree contains 99:", rbTree.contains(99)); // false
