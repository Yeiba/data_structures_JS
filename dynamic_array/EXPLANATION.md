# Explanation


Here's a generic dynamic array implementation in JavaScript:

```javascript
class DynamicArray {
  constructor(capacity = 16) {
    if (capacity < 0) {
      throw new Error(`Illegal Capacity: ${capacity}`);
    }
    this.capacity = capacity;
    this.arr = new Array(capacity);
    this.len = 0; // length user thinks array is
  }

  size() {
    return this.len;
  }

  isEmpty() {
    return this.size() === 0;
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

  clear() {
    for (let i = 0; i < this.len; i++) {
      this.arr[i] = null;
    }
    this.len = 0;
  }

  add(elem) {
    // Time to resize!
    if (this.len >= this.capacity) {
      this.capacity = this.capacity === 0 ? 1 : this.capacity * 2;
      const newArr = new Array(this.capacity);
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
    const data = this.arr[rmIndex];
    const newArr = new Array(this.len - 1);
    for (let i = 0, j = 0; i < this.len; i++) {
      if (i !== rmIndex) {
        newArr[j++] = this.arr[i];
      }
    }
    this.arr = newArr;
    this.capacity = --this.len;
    return data;
  }

  remove(obj) {
    const index = this.indexOf(obj);
    if (index === -1) return false;
    this.removeAt(index);
    return true;
  }

  indexOf(obj) {
    for (let i = 0; i < this.len; i++) {
      if (obj === null) {
        if (this.arr[i] === null) return i;
      } else {
        if (this.arr[i] === obj) return i;
      }
    }
    return -1;
  }

  contains(obj) {
    return this.indexOf(obj) !== -1;
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

// Example usage:
const arr = new DynamicArray();
arr.add(1);
arr.add(2);
arr.add(3);
console.log(arr.toString()); // Output: [1, 2, 3]
arr.removeAt(1);
console.log(arr.toString()); // Output: [1, 3]
console.log(arr.contains(2)); // Output: false
console.log(arr.size()); // Output: 2
```

### Explanation:

- **Constructor**: Initializes the dynamic array with a given capacity, defaulting to 16. The array grows dynamically as more elements are added.
- **Methods**:
  - `size()`: Returns the number of elements in the array.
  - `isEmpty()`: Checks if the array is empty.
  - `get(index)`: Retrieves the element at the specified index.
  - `set(index, elem)`: Sets the element at the specified index.
  - `clear()`: Clears the array.
  - `add(elem)`: Adds an element to the array, resizing if necessary.
  - `removeAt(index)`: Removes the element at the specified index.
  - `remove(obj)`: Removes the first occurrence of the specified object.
  - `indexOf(obj)`: Returns the index of the specified object, or -1 if not found.
  - `contains(obj)`: Checks if the array contains the specified object.
  - `[Symbol.iterator]`: Implements the iterator protocol for the array.
  - `toString()`: Returns a string representation of the array.
