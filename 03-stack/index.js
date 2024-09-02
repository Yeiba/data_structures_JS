
class Stack {
    constructor(firstElem = null) {
        this.head = firstElem ? new Stack.Node(firstElem) : firstElem;
        this._size = firstElem ? 1 : 0;
    }

    static Node = class {
        constructor(data) {
            this.data = data;
            this.next = null;
        }
    }

    // Return the number of elements in the stack
    size() {
        return this._size;
    }

    // Check if the stack is empty
    isEmpty() {
        return this._size === 0;
    }

    // Push an element on the stack
    push(elem) {
        const newNode = new Stack.Node(elem);
        newNode.next = this.head;
        this.head = newNode;
        this._size++;
    }

    // Pop an element off the stack
    // Throws an error if the stack is empty
    pop() {
        if (this.isEmpty()) {
            throw new Error("Empty stack");
        }
        const poppedNode = this.head;
        this.head = this.head.next;
        this._size--;
        return poppedNode.data;
    }

    // Peek the top of the stack without removing an element
    // Throws an error if the stack is empty
    peek() {
        if (this.isEmpty()) {
            throw new Error("Empty stack");
        }
        return this.head.data;
    }

    // Allow users to iterate through the stack using an iterator
    [Symbol.iterator]() {
        let current = this.head;

        return {
            next() {
                if (current) {
                    const value = current.data;
                    current = current.next;
                    return { value, done: false };
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
