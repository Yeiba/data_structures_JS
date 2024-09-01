class FenwickTree {
    constructor(size) {
        this.size = size;
        this.tree = new Array(size + 1).fill(0);
    }

    update(index, delta) {
        // Update the value at index `index` by adding `delta`.
        // Index is 1-based.
        while (index <= this.size) {
            this.tree[index] += delta;
            index += index & -index;
        }
    }

    query(index) {
        // Query the prefix sum from 1 to `index`.
        // Index is 1-based.
        let sum = 0;
        while (index > 0) {
            sum += this.tree[index];
            index -= index & -index;
        }
        return sum;
    }

    printTree() {
        // Print the Fenwick Tree array for debugging purposes.
        console.log('Fenwick Tree:', this.tree.slice(1)); // Skip index 0, which is unused
    }
}

// Example usage
const fenwickTree = new FenwickTree(10);

// Update operations
fenwickTree.update(1, 5);
fenwickTree.update(3, 2);
fenwickTree.update(7, 7);

// Print the tree
console.log('After updates:');
fenwickTree.printTree();

// Query operations
console.log('Sum from 1 to 3:', fenwickTree.query(3));  // Output: 7 (5 + 2)
console.log('Sum from 1 to 7:', fenwickTree.query(7));  // Output: 14 (5 + 2 + 7)
console.log('Sum from 1 to 10:', fenwickTree.query(10)); // Output: 14
