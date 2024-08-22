# Explanation

Here's a JavaScript implementation of a binary heap based on the provided Java code. This implementation is for a min-heap priority queue:

```javascript
class BinaryHeap {
  constructor(initialCapacity = 1) {
    this.heap = [];
    this.heapSize = 0;
    this.heapCapacity = initialCapacity;
    this.map = new Map(); // Map to support quick removals
  }

  // Construct a priority queue using an array of elements
  static fromArray(elems) {
    const heap = new BinaryHeap(elems.length);
    heap.heap = elems.slice(); // Copy the elements
    heap.heapSize = elems.length;
    heap.heapify();
    return heap;
  }

  // Priority queue construction from a collection
  static fromCollection(collection) {
    const heap = new BinaryHeap(collection.length);
    for (const elem of collection) heap.add(elem);
    return heap;
  }

  // Returns true if the priority queue is empty
  isEmpty() {
    return this.heapSize === 0;
  }

  // Clears everything inside the heap
  clear() {
    this.heap = [];
    this.heapSize = 0;
    this.map.clear();
  }

  // Return the size of the heap
  size() {
    return this.heapSize;
  }

  // Returns the value of the element with the lowest priority
  peek() {
    if (this.isEmpty()) return null;
    return this.heap[0];
  }

  // Removes the root of the heap
  poll() {
    return this.removeAt(0);
  }

  // Test if an element is in heap
  contains(elem) {
    return elem !== null && this.map.has(elem);
  }

  // Adds an element to the priority queue
  add(elem) {
    if (elem == null) throw new Error('Element cannot be null');

    if (this.heapSize < this.heapCapacity) {
      this.heap[this.heapSize] = elem;
    } else {
      this.heap.push(elem);
      this.heapCapacity++;
    }

    this.mapAdd(elem, this.heapSize);
    this.heapSize++;
    this.swim(this.heapSize - 1);
  }

  // Swap two nodes
  swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;

    this.mapSwap(this.heap[i], this.heap[j], i, j);
  }

  // Perform bottom up node swim
  swim(k) {
    let parent = Math.floor((k - 1) / 2);

    while (k > 0 && this.less(k, parent)) {
      this.swap(parent, k);
      k = parent;
      parent = Math.floor((k - 1) / 2);
    }
  }

  // Top down node sink
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

  // Tests if the value of node i <= node j
  less(i, j) {
    return this.heap[i] <= this.heap[j];
  }

  // Removes a node at a particular index
  removeAt(i) {
    if (this.isEmpty()) return null;

    this.heapSize--;
    const removedData = this.heap[i];
    this.swap(i, this.heapSize);
    this.heap.pop();

    this.mapRemove(removedData, this.heapSize);

    if (i === this.heapSize) return removedData;

    let elem = this.heap[i];
    this.sink(i);
    if (this.heap[i] === elem) this.swim(i);

    return removedData;
  }

  // Removes a specific element
  remove(elem) {
    if (elem == null || !this.contains(elem)) return false;

    const index = this.mapGet(elem);
    if (index !== null) {
      this.removeAt(index);
      return true;
    }
    return false;
  }

  // Heapify process to build the heap from an array
  heapify() {
    for (let i = Math.floor(this.heapSize / 2) - 1; i >= 0; i--) {
      this.sink(i);
    }
  }

  // Recursively checks if this heap is a min heap
  isMinHeap(k = 0) {
    if (k >= this.heapSize) return true;

    const left = 2 * k + 1;
    const right = 2 * k + 2;

    if (left < this.heapSize && !this.less(k, left)) return false;
    if (right < this.heapSize && !this.less(k, right)) return false;

    return this.isMinHeap(left) && this.isMinHeap(right);
  }

  // Converts the heap to a string
  toString() {
    return this.heap.toString();
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
}

// Example usage
const heap = new BinaryHeap();
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
const heapFromArray = BinaryHeap.fromArray([5, 3, 8, 1, 7]);
console.log(heapFromArray.toString()); // Min-heap representation

// Remove a specific element
heap.remove(7);
console.log(heap.toString()); // Heap after removal

```

### Explanation:

- **`BinaryHeap` Class**: Implements a min-heap priority queue.

  - **Constructor**: Initializes an empty heap with optional initial capacity.
  - **Static Methods**:
    - `fromArray(elems)`: Constructs a heap from an array of elements using heapify.
    - `fromCollection(collection)`: Constructs a heap from a collection.
  - **Instance Methods**:
    - `isEmpty()`: Checks if the heap is empty.
    - `clear()`: Clears the heap.
    - `size()`: Returns the number of elements in the heap.
    - `peek()`: Returns the root element without removing it.
    - `poll()`: Removes and returns the root element.
    - `contains(elem)`: Checks if an element is in the heap.
    - `add(elem)`: Adds an element to the heap.
    - `removeAt(i)`: Removes the element at a specific index.
    - `heapify()`: Builds the heap from an array.
    - `isMinHeap(k)`: Recursively checks if the heap maintains the min-heap property.
    - `toString()`: Returns a string representation of the heap.
- **Example Usage**: Demonstrates basic heap operations including adding elements, peeking, polling, and removing elements. It also shows how to create a heap from an array and check if it maintains the min-heap property.
- ### Key Additions:


  * **`map`**: Added to support quick removals by keeping track of element indices.
  * **`remove(elem)`**: This method now efficiently removes a specific element if it exists in the heap.
  * **`mapAdd(value, index)`, `mapRemove(value, index)`, `mapGet(value)`, `mapSwap(val1, val2, val1Index, val2Index)`**: Helper methods for managing the `map` to support efficient removals.

  This implementation ensures that you can remove arbitrary elements efficiently while maintaining the heap properties.
