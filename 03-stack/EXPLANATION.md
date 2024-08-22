# Explanation


Here's a JavaScript implementation of a stack using a linked list based on the provided Java code:

```javascript
class Stack {
  constructor(firstElem = null) {
    this.list = [];
    if (firstElem !== null) {
      this.push(firstElem);
    }
  }

  // Return the number of elements in the stack
  size() {
    return this.list.length;
  }

  // Check if the stack is empty
  isEmpty() {
    return this.size() === 0;
  }

  // Push an element on the stack
  push(elem) {
    this.list.push(elem);
  }

  // Pop an element off the stack
  // Throws an error if the stack is empty
  pop() {
    if (this.isEmpty()) {
      throw new Error("Empty stack");
    }
    return this.list.pop();
  }

  // Peek the top of the stack without removing an element
  // Throws an error if the stack is empty
  peek() {
    if (this.isEmpty()) {
      throw new Error("Empty stack");
    }
    return this.list[this.list.length - 1];
  }

  // Allow users to iterate through the stack using an iterator
  [Symbol.iterator]() {
    let index = this.list.length;
    const list = this.list;

    return {
      next() {
        if (index > 0) {
          index--;
          return { value: list[index], done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
}

// Example usage:
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.pop());  // 3
console.log(stack.peek()); // 2
console.log(stack.size()); // 2

for (const item of stack) {
  console.log(item); // 2, 1
}
```

### Explanation:

- **Constructor**: Initializes the stack. You can optionally pass an initial element.
- **Methods**:
  - `size()`: Returns the number of elements in the stack.
  - `isEmpty()`: Checks if the stack is empty.
  - `push(elem)`: Pushes an element onto the stack.
  - `pop()`: Pops an element off the stack. Throws an error if the stack is empty.
  - `peek()`: Peeks at the top element without removing it. Throws an error if the stack is empty.
  - `[Symbol.iterator]`: Allows iteration over the stack. This is implemented in reverse order to reflect the LIFO (Last In, First Out) nature of a stack.

### Differences from Java:

- **LinkedList Replacement**: JavaScript does not have a native `LinkedList` class, so this implementation uses an array (`this.list`) to simulate the linked list's behavior.
- **Error Handling**: Java's `EmptyStackException` is replaced with a standard `Error` in JavaScript for consistency.

This implementation is designed to behave similarly to the Java stack, including size checks, pushing, popping, and peeking functionalities, while allowing for iteration through the stack.
