class BinaryHeapQuickRemovals {
    constructor(initialCapacity = 1) {
        this.heap = [];
        this.heapSize = 0;
        this.heapCapacity = initialCapacity;
        this.map = new Map();
    }

    // Create a heap from an array of elements
    static fromArray(elems) {
        const heap = new BinaryHeapQuickRemovals(elems.length);
        heap.heap = elems.slice(); // Copy the elements
        heap.heapSize = elems.length;
        heap.heapify();
        return heap;
    }

    // Create a heap from a collection
    static fromCollection(collection) {
        const heap = new BinaryHeapQuickRemovals(collection.length);
        for (const elem of collection) heap.add(elem);
        return heap;
    }

    // Check if the heap is empty
    isEmpty() {
        return this.heapSize === 0;
    }

    // Clear the heap
    clear() {
        this.heap = [];
        this.heapSize = 0;
        this.map.clear();
    }

    // Get the size of the heap
    size() {
        return this.heapSize;
    }

    // Get the minimum element
    peek() {
        if (this.isEmpty()) return null;
        return this.heap[0];
    }

    // Remove and return the minimum element
    poll() {
        return this.removeAt(0);
    }

    // Check if an element is in the heap
    contains(elem) {
        return elem !== null && this.map.has(elem);
    }

    // Add an element to the heap
    add(elem) {
        if (elem == null) throw new Error('Element cannot be null');

        if (this.heapSize < this.heapCapacity) {
            this.heap[this.heapSize] = elem;
        } else {
            this.heap.push(elem);
            this.heapCapacity++;
        }

        this.mapAdd(elem, this.heapSize);

        this.swim(this.heapSize);
        this.heapSize++;
    }

    // Perform bottom-up node swim
    swim(k) {
        let parent = Math.floor((k - 1) / 2);

        while (k > 0 && this.less(k, parent)) {
            this.swap(parent, k);
            k = parent;
            parent = Math.floor((k - 1) / 2);
        }
    }

    // Perform top-down node sink
    sink(k) {
        while (true) {
            const left = 2 * k + 1;
            const right = 2 * k + 2;
            let smallest = left;

            if (right < this.heapSize && this.less(right, left)) smallest = right;
            if (left >= this.heapSize || this.less(k, smallest)) break;

            this.swap(smallest, k);
            k = smallest;
        }
    }

    // Compare values at two indices
    less(i, j) {
        return this.heap[i] <= this.heap[j];
    }

    // Swap values at two indices
    swap(i, j) {
        const iElem = this.heap[i];
        const jElem = this.heap[j];

        this.heap[i] = jElem;
        this.heap[j] = iElem;

        this.mapSwap(iElem, jElem, i, j);
    }

    // Remove a specific element
    remove(elem) {
        if (elem == null) return false;

        const index = this.mapGet(elem);
        if (index !== null) {
            this.removeAt(index);
            return true;
        }
        return false;
    }

    // Remove the element at a specific index
    removeAt(i) {
        if (this.isEmpty()) return null;

        this.heapSize--;
        const removedData = this.heap[i];
        this.swap(i, this.heapSize);

        this.heap.pop();
        this.mapRemove(removedData, this.heapSize);

        if (i === this.heapSize) return removedData;

        const elem = this.heap[i];
        this.sink(i);
        if (this.heap[i] === elem) this.swim(i);

        return removedData;
    }

    // Build the heap from an array
    heapify() {
        for (let i = Math.floor(this.heapSize / 2) - 1; i >= 0; i--) {
            this.sink(i);
        }
    }

    // Check if the heap maintains the min-heap property
    isMinHeap(k = 0) {
        if (k >= this.heapSize) return true;

        const left = 2 * k + 1;
        const right = 2 * k + 2;

        if (left < this.heapSize && !this.less(k, left)) return false;
        if (right < this.heapSize && !this.less(k, right)) return false;

        return this.isMinHeap(left) && this.isMinHeap(right);
    }

    // Add an index to the map for a specific value
    mapAdd(value, index) {
        if (!this.map.has(value)) {
            this.map.set(value, new Set());
        }
        this.map.get(value).add(index);
    }

    // Remove an index from the map for a specific value
    mapRemove(value, index) {
        const set = this.map.get(value);
        if (set) {
            set.delete(index);
            if (set.size === 0) this.map.delete(value);
        }
    }

    // Get the index of a value from the map
    mapGet(value) {
        const set = this.map.get(value);
        if (set) {
            return Array.from(set).pop(); // Return the highest index
        }
        return null;
    }

    // Swap indices of two values in the map
    mapSwap(val1, val2, val1Index, val2Index) {
        const set1 = this.map.get(val1);
        const set2 = this.map.get(val2);

        if (set1 && set2) {
            set1.delete(val1Index);
            set2.delete(val2Index);

            set1.add(val2Index);
            set2.add(val1Index);
        }
    }

    // Convert the heap to a string representation
    toString() {
        return this.heap.toString();
    }
}

// Example usage
const heap = new BinaryHeapQuickRemovals();
heap.add(5);
heap.add(3);
heap.add(8);
heap.add(1);
heap.add(7);

console.log(heap.peek()); // 1 (min element)
console.log(heap.poll()); // 1 (removes and returns min element)
console.log(heap.peek()); // 3 (new min element)

console.log(heap.isMinHeap()); // true

// Convert an array to a heap
const heapFromArray = BinaryHeapQuickRemovals.fromArray([5, 3, 8, 1, 7]);
console.log(heapFromArray.toString()); // Min-heap representation

// Remove a specific element
heap.remove(7);
console.log(heap.toString()); // Heap after removal
