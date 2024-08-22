class IntStack {
    constructor(maxSize) {
        this.ar = new Array(maxSize);
        this.pos = 0;
    }

    // Returns the number of elements in the stack
    size() {
        return this.pos;
    }

    // Returns true/false on whether the stack is empty
    isEmpty() {
        return this.pos === 0;
    }

    // Returns the element at the top of the stack
    peek() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.ar[this.pos - 1];
    }

    // Adds an element to the top of the stack
    push(value) {
        if (typeof value !== 'number' || !Number.isInteger(value)) {
            throw new TypeError("Only integers are allowed");
        }
        this.ar[this.pos++] = value;
    }

    // Removes and returns the element from the top of the stack
    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.ar[--this.pos];
    }
}

// Example usage:
const s = new IntStack(5);

s.push(1);
s.push(2);
s.push(3);
s.push(4);
s.push(5);

console.log(s.pop()); // 5
console.log(s.pop()); // 4
console.log(s.pop()); // 3

s.push(3);
s.push(4);
s.push(5);

while (!s.isEmpty()) {
    console.log(s.pop());
}

// Benchmark test (optional)
function benchMarkTest() {
    const n = 10000000;
    const intStack = new IntStack(n);

    // IntStack benchmark
    let start = performance.now();
    for (let i = 0; i < n; i++) intStack.push(i);
    for (let i = 0; i < n; i++) intStack.pop();
    let end = performance.now();
    console.log("IntStack Time:", (end - start) / 1000, "seconds");

    // Array benchmark
    const arrayStack = [];
    start = performance.now();
    for (let i = 0; i < n; i++) arrayStack.push(i);
    for (let i = 0; i < n; i++) arrayStack.pop();
    end = performance.now();
    console.log("Array Time:", (end - start) / 1000, "seconds");
}

// Uncomment the line below to run the benchmark test
// benchMarkTest();
