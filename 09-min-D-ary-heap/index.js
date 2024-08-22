class MinDHeap {
    constructor(degree, maxNodes) {
        this.d = Math.max(2, degree);
        this.n = Math.max(this.d, maxNodes);
        this.heap = new Array(this.n);
        this.child = new Array(this.n);
        this.parent = new Array(this.n);
        this.sz = 0;

        for (let i = 0; i < this.n; i++) {
            this.parent[i] = Math.floor((i - 1) / this.d);
            this.child[i] = i * this.d + 1;
        }
    }

    // Returns the number of elements currently present inside the heap
    size() {
        return this.sz;
    }

    // Returns true if the heap is empty
    isEmpty() {
        return this.sz === 0;
    }

    // Clears all the elements inside the heap
    clear() {
        this.heap.fill(null);
        this.sz = 0;
    }

    // Returns the element at the top of the heap or null if the heap is empty
    peek() {
        if (this.isEmpty()) return null;
        return this.heap[0];
    }

    // Polls an element from the heap
    poll() {
        if (this.isEmpty()) return null;
        const root = this.heap[0];
        this.heap[0] = this.heap[--this.sz];
        this.heap[this.sz] = null;
        this.sink(0);
        return root;
    }

    // Adds a non-null element to the heap
    add(elem) {
        if (elem == null) throw new Error('No null elements please :)');
        this.heap[this.sz] = elem;
        this.swim(this.sz);
        this.sz++;
    }

    // Moves the element at index i down to its correct position
    sink(i) {
        let j = this.minChild(i);
        while (j !== -1) {
            this.swap(i, j);
            i = j;
            j = this.minChild(i);
        }
    }

    // Moves the element at index i up to its correct position
    swim(i) {
        while (i > 0 && this.less(i, this.parent[i])) {
            this.swap(i, this.parent[i]);
            i = this.parent[i];
        }
    }

    // Finds the minimum child of the node at index i
    minChild(i) {
        const from = this.child[i];
        const to = Math.min(this.sz, from + this.d);
        let minIndex = -1;

        for (let j = from; j < to; j++) {
            if (j < this.sz && (minIndex === -1 || this.less(j, minIndex))) {
                minIndex = j;
            }
        }

        return minIndex;
    }

    // Checks if the element at index i is less than the element at index j
    less(i, j) {
        return this.heap[i].compareTo(this.heap[j]) < 0;
    }

    // Swaps the elements at indices i and j
    swap(i, j) {
        const tmp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = tmp;
    }
}

// Example usage
const heap = new MinDHeap(3, 10); // A ternary heap with capacity of 10

heap.add({ value: 5, compareTo: (other) => this.value - other.value });
heap.add({ value: 3, compareTo: (other) => this.value - other.value });
heap.add({ value: 8, compareTo: (other) => this.value - other.value });
heap.add({ value: 1, compareTo: (other) => this.value - other.value });
heap.add({ value: 7, compareTo: (other) => this.value - other.value });

console.log(heap.peek()); // { value: 1, compareTo: [Function: compareTo] }
console.log(heap.poll()); // { value: 1, compareTo: [Function: compareTo] }
console.log(heap.peek()); // { value: 3, compareTo: [Function: compareTo] }
