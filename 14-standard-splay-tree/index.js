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

    toString() {
        return this.root ? this.inorder(this.root).toString() : "Empty Tree";
    }
}

// Example usage
const splayTree = new SplayTree();
const data = [2, 29, 26, -1, 10, 0, 2, 11];

data.forEach(i => splayTree.insert(i));

console.log("Tree:", splayTree.toString());

console.log("Insert 20:", splayTree.insert(20));
console.log("Delete 29:", splayTree.delete(29));
console.log("Search 10:", splayTree.search(10));
console.log("Find Min:", splayTree.findMin());
console.log("Find Max:", splayTree.findMax());
console.log("Tree after operations:", splayTree.toString());
