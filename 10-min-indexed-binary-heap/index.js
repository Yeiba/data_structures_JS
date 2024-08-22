class MinIndexedBinaryHeap {
    constructor(maxSize) {
        this.d = 2; // Binary heap
        this.maxSize = maxSize;
        this.size = 0;
        this.heap = new Array(maxSize);
        this.positions = new Array(maxSize).fill(-1); // Maps indices to their positions in the heap
        this.keys = new Array(maxSize);
    }

    // Adds an element to the heap
    add(index, key) {
        if (index < 0 || index >= this.maxSize) throw new Error('Index out of bounds');
        if (this.positions[index] !== -1) throw new Error('Index already in heap');

        this.heap[this.size] = index;
        this.keys[index] = key;
        this.positions[index] = this.size;
        this.size++;
        this.swim(this.size - 1);
    }

    // Removes an element from the heap
    remove(index) {
        if (index < 0 || index >= this.maxSize || this.positions[index] === -1) {
            throw new Error('Index not in heap');
        }

        const heapIndex = this.positions[index];
        this.swap(heapIndex, this.size - 1);
        this.size--;
        this.sink(heapIndex);
        this.positions[index] = -1;
        this.keys[index] = undefined;
    }

    // Returns the minimum element in the heap
    peek() {
        if (this.size === 0) return null;
        return this.heap[0];
    }

    // Returns the key associated with the index
    getKey(index) {
        if (index < 0 || index >= this.maxSize) throw new Error('Index out of bounds');
        return this.keys[index];
    }

    // Moves the element at index i up to its correct position
    swim(i) {
        while (i > 0 && this.less(i, Math.floor((i - 1) / this.d))) {
            const parent = Math.floor((i - 1) / this.d);
            this.swap(i, parent);
            i = parent;
        }
    }

    // Moves the element at index i down to its correct position
    sink(i) {
        while (true) {
            let smallest = i;
            for (let j = this.d * i + 1; j < Math.min(this.size, this.d * i + this.d + 1); j++) {
                if (this.less(j, smallest)) {
                    smallest = j;
                }
            }
            if (smallest === i) break;
            this.swap(i, smallest);
            i = smallest;
        }
    }

    // Compares the keys of two elements
    less(i, j) {
        return this.keys[this.heap[i]].compareTo(this.keys[this.heap[j]]) < 0;
    }

    // Swaps the elements at indices i and j
    swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
        this.positions[this.heap[i]] = i;
        this.positions[this.heap[j]] = j;
    }
}

// Helper function for comparison (assuming keys are objects with a `compareTo` method)
Object.prototype.compareTo = function (other) {
    if (this < other) return -1;
    if (this > other) return 1;
    return 0;
};

// Example usage
const heap = new MinIndexedBinaryHeap(10);

heap.add(0, 5);
heap.add(1, 3);
heap.add(2, 8);
heap.add(3, 1);
heap.add(4, 7);

console.log(heap.peek()); // 3 (index of the minimum key)
console.log(heap.getKey(heap.peek())); // 1 (value of the minimum key)
heap.remove(3); // Remove the element with index 3
console.log(heap.peek()); // 1 (new minimum key index)
console.log(heap.getKey(heap.peek())); // 3 (new minimum key value)
