class IntArray {
    constructor(capacity = 16) {
        if (capacity < 0) {
            throw new Error(`Illegal Capacity: ${capacity}`);
        }
        this.arr = new Array(capacity).fill(0);
        this.len = 0;
        this.capacity = capacity;
    }

    // Initialize with an existing array
    static fromArray(array) {
        if (!array) {
            throw new Error('Array cannot be null');
        }
        const intArray = new IntArray(array.length);
        intArray.arr = array.slice();
        intArray.len = intArray.capacity = array.length;
        return intArray;
    }

    size() {
        return this.len;
    }

    isEmpty() {
        return this.len === 0;
    }

    get(index) {
        try {
            if (index < 0 || index >= this.len) {
                throw new Error('Index out of bounds');
            }
            return this.arr[index];
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    set(index, elem) {
        try {
            if (index < 0 || index >= this.len) {
                throw new Error('Index out of bounds');
            }
            this.arr[index] = elem;
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    add(elem) {
        if (this.len >= this.capacity) {
            this.capacity = this.capacity === 0 ? 1 : this.capacity * 2;
            const newArr = new Array(this.capacity).fill(0);
            for (let i = 0; i < this.len; i++) {
                newArr[i] = this.arr[i];
            }
            this.arr = newArr;
        }
        this.arr[this.len++] = elem;
    }

    removeAt(rmIndex) {
        try {
            if (rmIndex < 0 || rmIndex >= this.len) {
                throw new Error('Index out of bounds');
            }
            for (let i = rmIndex; i < this.len - 1; i++) {
                this.arr[i] = this.arr[i + 1];
            }
            this.arr[--this.len] = 0;
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    remove(elem) {
        for (let i = 0; i < this.len; i++) {
            if (this.arr[i] === elem) {
                this.removeAt(i);
                return true;
            }
        }
        return false;
    }

    reverse() {
        for (let i = 0; i < Math.floor(this.len / 2); i++) {
            const tmp = this.arr[i];
            this.arr[i] = this.arr[this.len - i - 1];
            this.arr[this.len - i - 1] = tmp;
        }
    }

    binarySearch(key) {
        let low = 0, high = this.len - 1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const midVal = this.arr[mid];
            if (midVal < key) {
                low = mid + 1;
            } else if (midVal > key) {
                high = mid - 1;
            } else {
                return mid;
            }
        }
        return -1; // not found
    }

    sort() {
        this.arr = this.arr.slice(0, this.len).sort((a, b) => a - b);
    }

    [Symbol.iterator]() {
        let index = 0;
        const len = this.len;
        const arr = this.arr;

        return {
            next() {
                if (index < len) {
                    return { value: arr[index++], done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }

    toString() {
        if (this.len === 0) return '[]';
        let result = '[';
        for (let i = 0; i < this.len - 1; i++) {
            result += this.arr[i] + ', ';
        }
        return result + this.arr[this.len - 1] + ']';
    }
}

// Example usage
const ar = new IntArray(50);
ar.add(3);
ar.add(7);
ar.add(6);
ar.add(-2);

ar.sort(); // [-2, 3, 6, 7]

for (let i = 0; i < ar.size(); i++) {
    console.log(ar.get(i)); // Prints -2, 3, 6, 7
}

console.log(ar.toString()); // Prints [-2, 3, 6, 7]
