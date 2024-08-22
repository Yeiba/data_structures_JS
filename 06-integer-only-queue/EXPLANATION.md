# Explanation


Here is a JavaScript implementation of an integer-only queue based on the provided Java code. This implementation is optimized for performance and requires you to specify an upper bound on the number of elements.

```javascript
class IntQueue {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.ar = new Array(maxSize + 1); // One extra space to distinguish full from empty
    this.front = 0;
    this.end = 0;
  }

  // Returns true if the queue is empty
  isEmpty() {
    return this.front === this.end;
  }

  // Returns the number of elements inside the queue
  size() {
    if (this.front > this.end) {
      return (this.end + this.ar.length - this.front);
    }
    return this.end - this.front;
  }

  // Peek at the front element without removing it
  peek() {
    if (this.isEmpty()) throw new Error("Queue is empty");
    return this.ar[this.front];
  }

  // Add an element to the end of the queue
  enqueue(value) {
    if ((this.end + 1) % this.ar.length === this.front) {
      throw new Error("Queue too small!");
    }
    this.ar[this.end] = value;
    this.end = (this.end + 1) % this.ar.length;
  }

  // Remove and return the element at the front of the queue
  dequeue() {
    if (this.isEmpty()) throw new Error("Queue is empty");
    const value = this.ar[this.front];
    this.front = (this.front + 1) % this.ar.length;
    return value;
  }
}

// Example usage
const queue = new IntQueue(5);

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
queue.enqueue(5);

console.log(queue.dequeue()); // 1
console.log(queue.dequeue()); // 2
console.log(queue.dequeue()); // 3
console.log(queue.dequeue()); // 4

console.log(queue.isEmpty()); // false

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.dequeue()); // 5
console.log(queue.dequeue()); // 1
console.log(queue.dequeue()); // 2
console.log(queue.dequeue()); // 3

console.log(queue.isEmpty()); // true

// Uncomment to test the benchmark
// benchMarkTest();

function benchMarkTest() {
  const n = 10000000;
  const intQueue = new IntQueue(n);

  // Benchmark IntQueue
  let start = performance.now();
  for (let i = 0; i < n; i++) intQueue.enqueue(i);
  for (let i = 0; i < n; i++) intQueue.dequeue();
  let end = performance.now();
  console.log(`IntQueue Time: ${(end - start) / 1000} seconds`);

  // Benchmark ArrayDeque (for comparison)
  const arrayDeque = [];
  start = performance.now();
  for (let i = 0; i < n; i++) arrayDeque.push(i);
  for (let i = 0; i < n; i++) arrayDeque.shift();
  end = performance.now();
  console.log(`ArrayDeque Time: ${(end - start) / 1000} seconds`);
}
```

### Explanation:

- **`IntQueue` Class**: Implements a circular buffer to manage the queue operations.

  - **Constructor**: Initializes the queue with a maximum size. The array size is `maxSize + 1` to handle the circular nature of the buffer.
  - **`isEmpty()`**: Checks if the queue is empty.
  - **`size()`**: Calculates the number of elements in the queue.
  - **`peek()`**: Returns the front element without removing it. Throws an error if the queue is empty.
  - **`enqueue(value)`**: Adds an element to the end of the queue. Throws an error if the queue is full.
  - **`dequeue()`**: Removes and returns the front element. Throws an error if the queue is empty.
- **Example Usage**: Demonstrates basic queue operations and includes a benchmarking function to compare the performance of the `IntQueue` against a JavaScript array-based implementation.
- **Benchmarking**: The `benchMarkTest()` function provides performance comparisons between the custom `IntQueue` and a standard array-based queue implementation.
