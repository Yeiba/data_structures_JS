class MinHeapQR {
    constructor() {
        this.heap = [];
        this.map = new Map(); // Map to store the positions of elements for quick removals
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

    hasParent(index) {
        return this.getParentIndex(index) >= 0;
    }

    hasLeftChild(index) {
        return this.getLeftChildIndex(index) < this.heap.length;
    }

    hasRightChild(index) {
        return this.getRightChildIndex(index) < this.heap.length;
    }

    parent(index) {
        return this.heap[this.getParentIndex(index)];
    }

    leftChild(index) {
        return this.heap[this.getLeftChildIndex(index)];
    }

    rightChild(index) {
        return this.heap[this.getRightChildIndex(index)];
    }

    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
        this.map.set(this.heap[index1], index1);
        this.map.set(this.heap[index2], index2);
    }

    insert(value) {
        this.heap.push(value);
        this.map.set(value, this.heap.length - 1);
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (this.hasParent(index) && this.parent(index) > this.heap[index]) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }

    extractMin() {
        try {
            if (this.heap.length === 0) throw new Error("Heap is empty");

            const minValue = this.heap[0];
            const endValue = this.heap.pop();
            this.map.delete(minValue);

            if (this.heap.length > 0) {
                this.heap[0] = endValue;
                this.map.set(endValue, 0);
                this.heapifyDown(0);
            }

            return minValue;
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    heapifyDown(index) {
        let smallest = index;

        if (this.hasLeftChild(index) && this.leftChild(index) < this.heap[smallest]) {
            smallest = this.getLeftChildIndex(index);
        }

        if (this.hasRightChild(index) && this.rightChild(index) < this.heap[smallest]) {
            smallest = this.getRightChildIndex(index);
        }

        if (smallest !== index) {
            this.swap(index, smallest);
            this.heapifyDown(smallest);
        }
    }

    remove(value) {
        const index = this.map.get(value);
        if (index === undefined) return false;

        this.swap(index, this.heap.length - 1);
        this.heap.pop();
        this.map.delete(value);

        if (index < this.heap.length) {
            this.heapifyUpFromIndex(index);
            this.heapifyDown(index);
        }

        return true;
    }

    heapifyUpFromIndex(index) {
        while (this.hasParent(index) && this.parent(index) > this.heap[index]) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }

    peek() {
        try {
            if (this.heap.length === 0) throw new Error("Heap is empty");
            return this.heap[0];
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

// Example usage:
const minHeap = new MinHeapQR();
minHeap.insert(10);
minHeap.insert(5);
minHeap.insert(14);
minHeap.insert(9);
minHeap.insert(2);

console.log(minHeap.peek());  // Output: 2

console.log(minHeap.extractMin());  // Output: 2
console.log(minHeap.extractMin());  // Output: 5

minHeap.insert(3);
console.log(minHeap.peek());  // Output: 3

minHeap.remove(9);
console.log(minHeap.heap);  // Output: [ 3, 10, 14 ]
