class FenwickTreeRangeQueryPointUpdate {
    constructor(szOrValues) {
        if (Array.isArray(szOrValues)) {
            const values = szOrValues;
            if (values == null) throw new Error("Values array cannot be null!");

            this.N = values.length;
            values[0] = 0;

            // Make a clone of the values array since we manipulate
            // the array in place destroying all its original content.
            this.tree = values.slice();

            for (let i = 1; i < this.N; i++) {
                const parent = i + this.lsb(i);
                if (parent < this.N) this.tree[parent] += this.tree[i];
            }
        } else {
            const sz = szOrValues;
            this.N = sz + 1;
            this.tree = new Array(this.N).fill(0);
        }
    }

    // Returns the value of the least significant bit (LSB)
    lsb(i) {
        return i & -i;
    }

    // Computes the prefix sum from [1, i], O(log(n))
    prefixSum(i) {
        let sum = 0;
        while (i !== 0) {
            sum += this.tree[i];
            i &= ~this.lsb(i); // Equivalently, i -= lsb(i);
        }
        return sum;
    }

    // Returns the sum of the interval [left, right], O(log(n))
    sum(left, right) {
        if (right < left) throw new Error("Make sure right >= left");
        return this.prefixSum(right) - this.prefixSum(left - 1);
    }

    // Get the value at index i
    get(i) {
        return this.sum(i, i);
    }

    // Add 'v' to index 'i', O(log(n))
    add(i, v) {
        while (i < this.N) {
            this.tree[i] += v;
            i += this.lsb(i);
        }
    }

    // Set index i to be equal to v, O(log(n))
    set(i, v) {
        this.add(i, v - this.sum(i, i));
    }

    toString() {
        return JSON.stringify(this.tree);
    }
}

// Example Usage

// Initialize with a size of 10
const fenwickTree = new FenwickTreeRangeQueryPointUpdate(10);

// Add values to specific indices
fenwickTree.add(1, 5);
fenwickTree.add(2, 3);
fenwickTree.add(3, 7);
fenwickTree.add(4, 6);

// Sum of range [1, 3]
console.log(fenwickTree.sum(1, 3)); // Output: 15

// Get the value at index 3
console.log(fenwickTree.get(3)); // Output: 7

// Set the value at index 3 to 10
fenwickTree.set(3, 10);

// Print the tree
console.log(fenwickTree.toString()); // Output: [0,5,8,10,21,0,0,0,0,0,0]
