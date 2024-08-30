class MinHeap {
    constructor() {
        this.heap = [];
    }

    // Helper method to get the index of the parent node
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    // Helper method to get the index of the left child node
    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    // Helper method to get the index of the right child node
    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    // Helper method to swap two elements in the heap
    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    // Method to add a new element to the heap
    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    // Method to heapify up (for maintaining the heap property after insertion)
    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);

            if (this.heap[parentIndex] > this.heap[index]) {
                this.swap(parentIndex, index);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    // Method to remove and return the minimum element (root) from the heap
    extractMin() {
        try {
            if (this.heap.length === 0) {
                throw new Error("Heap is empty");
            }

            if (this.heap.length === 1) {
                return this.heap.pop();
            }

            const min = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.heapifyDown(0);

            return min;
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    // Method to heapify down (for maintaining the heap property after removal)
    heapifyDown(index) {
        let smallest = index;
        const leftChildIndex = this.getLeftChildIndex(index);
        const rightChildIndex = this.getRightChildIndex(index);

        if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallest]) {
            smallest = leftChildIndex;
        }

        if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallest]) {
            smallest = rightChildIndex;
        }

        if (smallest !== index) {
            this.swap(index, smallest);
            this.heapifyDown(smallest);
        }
    }

    // Method to return the minimum element (root) without removing it
    peek() {
        try {
            if (this.heap.length === 0) {
                throw new Error("Heap is empty");
            }
            return this.heap[0];
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    // Method to get the size of the heap
    size() {
        return this.heap.length;
    }

    // Method to check if the heap is empty
    isEmpty() {
        return this.heap.length === 0;
    }
}

// Example usage:
const minHeap = new MinHeap();
minHeap.insert(10);
minHeap.insert(5);
minHeap.insert(14);
minHeap.insert(9);
minHeap.insert(2);

console.log(minHeap.peek()); // Output: 2

console.log(minHeap.extractMin()); // Output: 2
console.log(minHeap.extractMin()); // Output: 5
console.log(minHeap.extractMin()); // Output: 9

console.log(minHeap.size()); // Output: 2

console.log(minHeap.isEmpty()); // Output: false

console.log(minHeap.extractMin()); // Output: 10
console.log(minHeap.extractMin()); // Output: 14

console.log(minHeap.isEmpty()); // Output: true
