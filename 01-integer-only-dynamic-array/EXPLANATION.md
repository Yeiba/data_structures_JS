# Explanation


Here is the JavaScript version of the integer-only dynamic array based on the provided Java code:

```javascript
class IntArray {
  static DEFAULT_CAP = 8;

  constructor(capacity = IntArray.DEFAULT_CAP) {
    if (capacity < 0) {
      throw new Error(`Illegal Capacity: ${capacity}`);
    }
    this.capacity = capacity;
    this.arr = new Array(capacity).fill(0);
    this.len = 0;
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
    if (index < 0 || index >= this.len) {
      throw new Error('Index out of bounds');
    }
    return this.arr[index];
  }

  set(index, elem) {
    if (index < 0 || index >= this.len) {
      throw new Error('Index out of bounds');
    }
    this.arr[index] = elem;
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
    if (rmIndex < 0 || rmIndex >= this.len) {
      throw new Error('Index out of bounds');
    }
    for (let i = rmIndex; i < this.len - 1; i++) {
      this.arr[i] = this.arr[i + 1];
    }
    this.arr[--this.len] = 0;
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
```

### Explanation:

- **Constructor**: Initializes the array with a default or specified capacity, filled with zeros.
- **Methods**:
  - `size()`: Returns the number of elements in the array.
  - `isEmpty()`: Checks if the array is empty.
  - `get(index)`: Retrieves the element at the specified index.
  - `set(index, elem)`: Sets the element at the specified index.
  - `add(elem)`: Adds an element to the array, resizing if necessary.
  - `removeAt(index)`: Removes the element at the specified index, shifting elements left.
  - `remove(elem)`: Searches and removes the first occurrence of the element.
  - `reverse()`: Reverses the array in place.
  - `binarySearch(key)`: Performs a binary search on the array (assuming it is sorted).
  - `sort()`: Sorts the array.
  - `[Symbol.iterator]`: Provides an iterator for the array.
  - `toString()`: Returns a string representation of the array.

This JavaScript implementation mirrors the functionality of the Java version while taking advantage of JavaScript's dynamic typing and built-in array methods.
