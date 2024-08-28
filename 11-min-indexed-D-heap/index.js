class MinIndexedDHeap {
    constructor(degree, maxSize) {
        if (maxSize <= 0) throw new Error("maxSize <= 0");

        this.D = Math.max(2, degree);
        this.N = Math.max(this.D + 1, maxSize);
        this.sz = 0;

        this.child = new Array(this.N);
        this.parent = new Array(this.N);
        this.pm = new Array(this.N).fill(-1); // Position map
        this.im = new Array(this.N).fill(-1); // Inverse map
        this.values = new Array(this.N);

        for (let i = 0; i < this.N; i++) {
            this.parent[i] = i === 0 ? null : Math.floor((i - 1) / this.D);
            this.child[i] = i * this.D + 1;
        }
    }

    size() {
        return this.sz;
    }

    isEmpty() {
        return this.sz === 0;
    }

    contains(ki) {
        this.keyInBoundsOrThrow(ki);
        return this.pm[ki] !== -1;
    }

    peekMinKeyIndex() {
        this.isNotEmptyOrThrow();
        return this.im[0];
    }

    pollMinKeyIndex() {
        const minKi = this.peekMinKeyIndex();
        this.delete(minKi);
        return minKi;
    }

    peekMinValue() {
        this.isNotEmptyOrThrow();
        return this.values[this.im[0]];
    }

    pollMinValue() {
        const minValue = this.peekMinValue();
        this.delete(this.peekMinKeyIndex());
        return minValue;
    }

    insert(ki, value) {
        if (this.contains(ki)) throw new Error(`Index already exists: ${ki}`);
        this.valueNotNullOrThrow(value);
        this.pm[ki] = this.sz;
        this.im[this.sz] = ki;
        this.values[ki] = value;
        this.sz++;
        this.swim(this.sz - 1);
    }

    valueOf(ki) {
        this.keyExistsOrThrow(ki);
        return this.values[ki];
    }

    delete(ki) {
        this.keyExistsOrThrow(ki);
        const i = this.pm[ki];
        this.swap(i, --this.sz);
        this.sink(i);
        this.swim(i);
        const value = this.values[ki];
        this.values[ki] = undefined;
        this.pm[ki] = -1;
        this.im[this.sz] = -1;
        return value;
    }

    update(ki, value) {
        this.keyExistsAndValueNotNullOrThrow(ki, value);
        const i = this.pm[ki];
        const oldValue = this.values[ki];
        this.values[ki] = value;
        this.sink(i);
        this.swim(i);
        return oldValue;
    }

    decrease(ki, value) {
        this.keyExistsAndValueNotNullOrThrow(ki, value);
        if (this.less(value, this.values[ki])) {
            this.values[ki] = value;
            this.swim(this.pm[ki]);
        }
    }

    increase(ki, value) {
        this.keyExistsAndValueNotNullOrThrow(ki, value);
        if (this.less(this.values[ki], value)) {
            this.values[ki] = value;
            this.sink(this.pm[ki]);
        }
    }

    swim(i) {
        while (i > 0 && this.less(i, this.parent[i])) {
            this.swap(i, this.parent[i]);
            i = this.parent[i];
        }
    }

    sink(i) {
        while (true) {
            const minChildIdx = this.minChild(i);
            if (minChildIdx === -1) break;
            this.swap(i, minChildIdx);
            i = minChildIdx;
        }
    }

    minChild(i) {
        let minIdx = -1;
        const from = this.child[i];
        const to = Math.min(this.sz, from + this.D);
        for (let j = from; j < to; j++) {
            if (j < this.sz && (minIdx === -1 || this.less(j, minIdx))) {
                minIdx = j;
            }
        }
        return minIdx;
    }

    swap(i, j) {
        const tmp = this.im[i];
        this.im[i] = this.im[j];
        this.im[j] = tmp;
        this.pm[this.im[i]] = i;
        this.pm[this.im[j]] = j;
    }

    less(i, j) {
        return this.values[this.im[i]] < this.values[this.im[j]];
    }

    valueNotNullOrThrow(value) {
        if (value == null) throw new Error("value cannot be null");
    }

    keyInBoundsOrThrow(ki) {
        if (ki < 0 || ki >= this.N) throw new Error(`Key index out of bounds: ${ki}`);
    }

    keyExistsOrThrow(ki) {
        if (!this.contains(ki)) throw new Error(`Index does not exist: ${ki}`);
    }

    keyExistsAndValueNotNullOrThrow(ki, value) {
        this.keyExistsOrThrow(ki);
        this.valueNotNullOrThrow(value);
    }

    isNotEmptyOrThrow() {
        if (this.isEmpty()) throw new Error("Priority queue underflow");
    }

    isMinHeap() {
        return this.isMinHeapRec(0);
    }

    isMinHeapRec(i) {
        const from = this.child[i];
        const to = Math.min(this.sz, from + this.D);
        for (let j = from; j < to; j++) {
            if (j < this.sz && !this.less(i, j)) return false;
            if (j < this.sz && !this.isMinHeapRec(j)) return false;
        }
        return true;
    }

    toString() {
        return this.im.slice(0, this.sz).toString();
    }
}

// Example usage
const heap = new MinIndexedDHeap(3, 10); // Ternary heap

heap.insert(0, 5);
heap.insert(1, 3);
heap.insert(2, 8);
heap.insert(3, 1);
heap.insert(4, 7);

console.log(heap.peekMinKeyIndex()); // 3 (index of the minimum key)
console.log(heap.peekMinValue()); // 1 (value of the minimum key)
heap.delete(3); // Remove the element with index 3
console.log(heap.peekMinKeyIndex()); // 1 (new minimum key index)
console.log(heap.peekMinValue()); // 3 (new minimum key value)
