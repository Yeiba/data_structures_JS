class DAryMinHeap {
    constructor(d) {
        this.d = d;                // Number of children per node
        this.heap = [];            // Array to store heap elements
        this.size = 0;            // Number of elements in the heap
    }

    // Get the parent index of a node
    getParentIndex(index) {
        return Math.floor((index - 1) / this.d);
    }

    // Get the index of a child's node
    getChildIndex(parentIndex, childIndex) {
        return this.d * parentIndex + childIndex + 1;
    }

    // Swap elements at two indices
    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    // Insert a new value into the heap
    insert(value) {
        this.heap[this.size] = value;
        this.size++;
        this.heapifyUp(this.size - 1);
    }

    // Restore the heap property after insertion
    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            if (this.heap[index] < this.heap[parentIndex]) {
                this.swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    // Extract the minimum element (root of the heap)
    extractMin() {
        try {
            if (this.size === 0) {
                throw new Error("Heap is empty");
            }

            const min = this.heap[0];
            this.size--;
            if (this.size > 0) {
                this.heap[0] = this.heap[this.size];
                this.heapifyDown(0);
            }
            return min;
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    // Restore the heap property after extraction
    heapifyDown(index) {
        let smallest = index;
        for (let i = 1; i <= this.d; i++) {
            const childIndex = this.getChildIndex(index, i - 1);
            if (childIndex < this.size && this.heap[childIndex] < this.heap[smallest]) {
                smallest = childIndex;
            }
        }
        if (smallest !== index) {
            this.swap(index, smallest);
            this.heapifyDown(smallest);
        }
    }

    // Peek at the minimum element (root of the heap)
    peek() {
        try {
            if (this.size === 0) {
                throw new Error("Heap is empty");
            }
            return this.heap[0];
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    // Get the current size of the heap
    getSize() {
        return this.size;
    }

    // Check if the heap is empty
    isEmpty() {
        return this.size === 0;
    }

    // Print the heap elements
    printHeap() {
        console.log(this.heap.slice(0, this.size));
    }
}

// Example usage
const dAryMinHeap = new DAryMinHeap(3); // A ternary heap (D=3)

dAryMinHeap.insert(10);
dAryMinHeap.insert(5);
dAryMinHeap.insert(20);
dAryMinHeap.insert(1);
dAryMinHeap.insert(15);

console.log("Heap:", dAryMinHeap.heap); // Print heap structure
console.log("Min:", dAryMinHeap.peek()); // Output: Min: 1

console.log("Extract Min:", dAryMinHeap.extractMin()); // Output: Extract Min: 1
console.log("Heap after extraction:", dAryMinHeap.heap); // Print heap structure after extraction

dAryMinHeap.printHeap(); // Print the current state of the heap
