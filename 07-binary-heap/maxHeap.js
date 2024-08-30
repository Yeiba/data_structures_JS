class MaxHeap {
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

            if (this.heap[parentIndex] < this.heap[index]) {
                this.swap(parentIndex, index);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    // Method to remove and return the maximum element (root) from the heap
    extractMax() {
        try {
            if (this.heap.length === 0) {
                throw new Error("Heap is empty");
            }

            if (this.heap.length === 1) {
                return this.heap.pop();
            }

            const max = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.heapifyDown(0);

            return max;
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    // Method to heapify down (for maintaining the heap property after removal)
    heapifyDown(index) {
        let largest = index;
        const leftChildIndex = this.getLeftChildIndex(index);
        const rightChildIndex = this.getRightChildIndex(index);

        if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] > this.heap[largest]) {
            largest = leftChildIndex;
        }

        if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] > this.heap[largest]) {
            largest = rightChildIndex;
        }

        if (largest !== index) {
            this.swap(index, largest);
            this.heapifyDown(largest);
        }
    }

    // Method to return the maximum element (root) without removing it
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
const maxHeap = new MaxHeap();
maxHeap.insert(10);
maxHeap.insert(5);
maxHeap.insert(14);
maxHeap.insert(9);
maxHeap.insert(2);

console.log(maxHeap.peek()); // Output: 14

console.log(maxHeap.extractMax()); // Output: 14
console.log(maxHeap.extractMax()); // Output: 10
console.log(maxHeap.extractMax()); // Output: 9

console.log(maxHeap.size()); // Output: 2

console.log(maxHeap.isEmpty()); // Output: false

console.log(maxHeap.extractMax()); // Output: 5
console.log(maxHeap.extractMax()); // Output: 2

console.log(maxHeap.isEmpty()); // Output: true
