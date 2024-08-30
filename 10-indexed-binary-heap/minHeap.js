class IndexedMinHeap {
    constructor() {
        this.heap = [];
        this.indexMap = new Map(); // Maps indices to heap positions
    }

    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    swap(index1, index2) {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;

        // Update index map
        this.indexMap.set(this.heap[index1].index, index1);
        this.indexMap.set(this.heap[index2].index, index2);
    }

    insert(index, value) {
        try {
            if (this.indexMap.has(index)) {
                throw new Error("Index already exists in the heap");
            }

            const node = { index, value };
            this.heap.push(node);
            this.indexMap.set(index, this.heap.length - 1);
            this.heapifyUp(this.heap.length - 1);
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            if (this.heap[index].value < this.heap[parentIndex].value) {
                this.swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    extractMin() {
        try {
            if (this.heap.length === 0) {
                throw new Error("Heap is empty");
            }

            const min = this.heap[0];
            const last = this.heap.pop();
            this.indexMap.delete(min.index);

            if (this.heap.length > 0) {
                this.heap[0] = last;
                this.indexMap.set(last.index, 0);
                this.heapifyDown(0);
            }

            return min;
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    heapifyDown(index) {
        let smallest = index;
        const leftChildIndex = this.getLeftChildIndex(index);
        const rightChildIndex = this.getRightChildIndex(index);

        if (leftChildIndex < this.heap.length && this.heap[leftChildIndex].value < this.heap[smallest].value) {
            smallest = leftChildIndex;
        }

        if (rightChildIndex < this.heap.length && this.heap[rightChildIndex].value < this.heap[smallest].value) {
            smallest = rightChildIndex;
        }

        if (smallest !== index) {
            this.swap(index, smallest);
            this.heapifyDown(smallest);
        }
    }

    update(index, newValue) {
        try {
            if (!this.indexMap.has(index)) {
                throw new Error("Index does not exist in the heap");
            }

            const heapIndex = this.indexMap.get(index);
            const oldValue = this.heap[heapIndex].value;
            this.heap[heapIndex].value = newValue;

            if (newValue < oldValue) {
                this.heapifyUp(heapIndex);
            } else {
                this.heapifyDown(heapIndex);
            }
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    get(index) {
        try {
            if (!this.indexMap.has(index)) {
                throw new Error("Index does not exist in the heap");
            }

            const heapIndex = this.indexMap.get(index);
            return this.heap[heapIndex].value;
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    size() {
        return this.heap.length;
    }

    toString() {
        return this.heap.map(node => `Index: ${node.index}, Value: ${node.value}`).join(", ");
    }
}

// Example usage

const heap = new IndexedMinHeap();

heap.insert(1, 10);
heap.insert(2, 5);
heap.insert(3, 15);
heap.insert(4, 8);

console.log("Heap:", heap.toString()); // Print the heap

console.log("Extract Min:", heap.extractMin()); // Extracts the minimum value
console.log("Heap after extraction:", heap.toString()); // Print the heap after extraction

heap.update(3, 4); // Update value at index 3
console.log("Heap after update:", heap.toString()); // Print the heap after update

console.log("Value at index 2:", heap.get(2)); // Get value at index 2
console.log("Heap Size:", heap.size()); // Print the size of the heap
console.log("Is Heap Empty?", heap.isEmpty()); // Check if the heap is empty

// Test error cases
// Uncomment the following lines to see error handling in action

// heap.update(99, 20); // Error: Index does not exist in the heap
// heap.get(99); // Error: Index does not exist in the heap

