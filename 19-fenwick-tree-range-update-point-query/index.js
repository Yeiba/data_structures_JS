class FenwickTreeRangeUpdatePointQuery {
    constructor(values) {
        if (values == null) throw new Error("Values array cannot be null!");

        this.N = values.length;
        values[0] = 0;

        // Make a clone of the values array since we manipulate
        // the array in place, destroying all its original content.
        let fenwickTree = values.slice();

        for (let i = 1; i < this.N; i++) {
            const parent = i + this.lsb(i);
            if (parent < this.N) fenwickTree[parent] += fenwickTree[i];
        }

        this.originalTree = fenwickTree;
        this.currentTree = fenwickTree.slice();
    }

    // Returns the value of the least significant bit (LSB)
    lsb(i) {
        return i & -i;
    }

    // Update the interval [left, right] with the value 'val', O(log(n))
    updateRange(left, right, val) {
        this.add(left, +val);
        this.add(right + 1, -val);
    }

    // Add 'v' to index 'i' and all the ranges responsible for 'i', O(log(n))
    add(i, v) {
        while (i < this.N) {
            this.currentTree[i] += v;
            i += this.lsb(i);
        }
    }

    // Get the value at a specific index
    get(i) {
        return this.prefixSum(i, this.currentTree) - this.prefixSum(i - 1, this.originalTree);
    }

    // Computes the prefix sum from [1, i], O(log(n))
    prefixSum(i, tree) {
        let sum = 0;
        while (i !== 0) {
            sum += tree[i];
            i &= ~this.lsb(i); // Equivalently, i -= this.lsb(i);
        }
        return sum;
    }
}

// Example Usage

// Initialize with a set of values (one-based)
let values = [0, 2, 4, 5, 7, 9];
const fenwickTree = new FenwickTreeRangeUpdatePointQuery(values);

// Update the range [2, 4] by adding 3
fenwickTree.updateRange(2, 4, 3);

// Get the value at index 3
console.log(fenwickTree.get(3)); // Output should reflect the update made

// Get the value at index 5
console.log(fenwickTree.get(5)); // Output should reflect only initial values, no update applied here
