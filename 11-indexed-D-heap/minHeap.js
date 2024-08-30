class IndexedMinDHeap {
    constructor(d = 2) {
        this.d = d; // The number of children per node
        this.heap = []; // The heap storage
        this.indexMap = {}; // Map of indices to their position in the heap
    }

    // Helper method to get the parent index
    _getParent(index) {
        return Math.floor((index - 1) / this.d);
    }

    // Helper method to get the child index based on the child number
    _getChild(index, childNumber) {
        return this.d * index + childNumber + 1;
    }

    // Swap elements at two indices
    _swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
        this.indexMap[this.heap[i][0]] = i;
        this.indexMap[this.heap[j][0]] = j;
    }

    // Insert a new element into the heap
    insert(index, value) {
        try {

            if (index in this.indexMap) {
                throw new Error("Index already exists in the heap");
            }

            const node = [index, value];
            this.heap.push(node);
            this.indexMap[index] = this.heap.length - 1;
            this._heapifyUp(this.heap.length - 1);
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    // Heapify up to maintain the min-heap property
    _heapifyUp(index) {
        while (index > 0) {
            const parentIndex = this._getParent(index);
            if (this.heap[index][1] < this.heap[parentIndex][1]) {
                this._swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    // Extract the minimum element (root of the heap)
    extractMin() {
        try {

            if (this.heap.length === 0) {
                throw new Error("Heap is empty");
            }

            const minNode = this.heap[0];
            const lastNode = this.heap.pop();
            if (this.heap.length > 0) {
                this.heap[0] = lastNode;
                this.indexMap[lastNode[0]] = 0;
                this._heapifyDown(0);
            }
            delete this.indexMap[minNode[0]];
            return minNode;
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    // Heapify down to maintain the min-heap property
    _heapifyDown(index) {
        let smallest = index;
        const numChildren = this.d;

        for (let i = 0; i < numChildren; i++) {
            const childIndex = this._getChild(index, i);
            if (childIndex < this.heap.length && this.heap[childIndex][1] < this.heap[smallest][1]) {
                smallest = childIndex;
            }
        }

        if (smallest !== index) {
            this._swap(index, smallest);
            this._heapifyDown(smallest);
        }
    }

    // Update the value associated with a given index
    update(index, newValue) {
        try {

            if (!(index in this.indexMap)) {
                throw new Error("Index does not exist in the heap");
            }

            const heapIndex = this.indexMap[index];
            const oldValue = this.heap[heapIndex][1];
            this.heap[heapIndex] = [index, newValue];

            if (newValue < oldValue) {
                this._heapifyUp(heapIndex);
            } else {
                this._heapifyDown(heapIndex);
            }
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    // Retrieve the value associated with a given index
    get(index) {
        try {
            if (!(index in this.indexMap)) {
                throw new Error("Index does not exist in the heap");
            }
            const heapIndex = this.indexMap[index];
            return this.heap[heapIndex][1];
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    // Check if the heap is empty
    isEmpty() {
        return this.heap.length === 0;
    }

    // Get the size of the heap
    size() {
        return this.heap.length;
    }

    // String representation of the heap
    toString() {
        return JSON.stringify(this.heap);
    }
}

// Example usage:


const dHeap = new IndexedMinDHeap(3); // A ternary heap (D = 3)

dHeap.insert(1, 10);
dHeap.insert(2, 20);
dHeap.insert(3, 15);
dHeap.insert(4, 5);

console.log("Heap:", dHeap.toString()); // Print the heap

console.log("Extract Min:", dHeap.extractMin()); // Extract the minimum value
console.log("Heap after extraction:", dHeap.toString());

dHeap.update(3, 2); // Update value
console.log("Heap after update:", dHeap.toString());

console.log("Value at index 2:", dHeap.get(2)); // Get value
console.log("Heap Size:", dHeap.size());
console.log("Is Heap Empty?", dHeap.isEmpty());

// Test error handling

dHeap.update(99, 30); // Should raise an error

dHeap.get(99); // Should raise an error

