class IndexedMaxDHeap {
    constructor(d = 2) {
        this.d = d; // Number of children per node
        this.heap = []; // Array to store heap elements
        this.indexMap = {}; // Map of indices to their positions in the heap
    }

    // Get the parent index of a given node
    _getParent(index) {
        return Math.floor((index - 1) / this.d);
    }

    // Get the child index of a given node based on child number
    _getChild(index, childNumber) {
        return this.d * index + childNumber + 1;
    }

    // Swap elements at two indices and update indexMap
    _swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
        this.indexMap[this.heap[i].index] = i;
        this.indexMap[this.heap[j].index] = j;
    }

    // Restore the max heap property by bubbling down
    _heapifyDown(index) {
        let largest = index;
        for (let i = 0; i < this.d; i++) {
            const childIndex = this._getChild(index, i);
            if (childIndex < this.heap.length &&
                this.heap[childIndex].value > this.heap[largest].value) {
                largest = childIndex;
            }
        }

        if (largest !== index) {
            this._swap(index, largest);
            this._heapifyDown(largest);
        }
    }

    // Restore the max heap property by bubbling up
    _heapifyUp(index) {
        const parentIndex = this._getParent(index);
        if (index > 0 && this.heap[index].value > this.heap[parentIndex].value) {
            this._swap(index, parentIndex);
            this._heapifyUp(parentIndex);
        }
    }

    // Insert a new element into the heap
    insert(index, value) {
        try {

            if (this.indexMap[index] !== undefined) {
                throw new Error("Index already exists in the heap");
            }

            const newNode = { index, value };
            this.heap.push(newNode);
            this.indexMap[index] = this.heap.length - 1;
            this._heapifyUp(this.heap.length - 1);
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    // Remove the element with a specific index
    remove(index) {
        try {
            const heapIndex = this.indexMap[index];
            if (heapIndex === undefined) {
                throw new Error("Index does not exist in the heap");
            }

            this._swap(heapIndex, this.heap.length - 1);
            this.heap.pop();
            delete this.indexMap[index];

            if (heapIndex < this.heap.length) {
                this._heapifyUp(heapIndex);
                this._heapifyDown(heapIndex);
            }

        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    // Get the value at a specific index
    get(index) {
        try {
            const heapIndex = this.indexMap[index];
            if (heapIndex === undefined) {
                throw new Error("Index does not exist in the heap");
            }
            return this.heap[heapIndex].value;
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    // Peek the maximum value in the heap (root of the heap)
    peek() {
        try {

            if (this.heap.length === 0) {
                throw new Error("Heap is empty");
            }
            return this.heap[0].value;
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    // Print the heap for debugging purposes
    print() {
        console.log(this.heap.map(node => node.value));
    }
}

// Example usage
const heap = new IndexedMaxDHeap(3); // Ternary heap

heap.insert(1, 10);
heap.insert(2, 20);
heap.insert(3, 30);
heap.insert(4, 40);
heap.insert(5, 50);

console.log("Heap:");
heap.print();

console.log("Value at index 2:", heap.get(2)); // Should be 20

heap.remove(2);

console.log("Heap after removing index 2:");
heap.print();

console.log("Value at index 3:", heap.get(6)); // Should be 30 after adjustments
console.log("Value at index 3:", heap.get(3)); // Should be 30 after adjustments
