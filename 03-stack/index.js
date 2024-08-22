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
