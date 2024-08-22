class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Queue {
    constructor(firstElem = null) {
        this.head = null;
        this.tail = null;
        this._size = 0;

        if (firstElem !== null) {
            this.offer(firstElem);
        }
    }

    // Return the size of the queue
    size() {
        return this._size;
    }

    // Returns whether or not the queue is empty
    isEmpty() {
        return this._size === 0;
    }

    // Peek the element at the front of the queue
    // The method throws an error if the queue is empty
    peek() {
        if (this.isEmpty()) throw new Error("Queue Empty");
        return this.head.data;
    }

    // Poll an element from the front of the queue
    // The method throws an error if the queue is empty
    poll() {
        if (this.isEmpty()) throw new Error("Queue Empty");

        const data = this.head.data;
        this.head = this.head.next;
        this._size--;

        if (this.isEmpty()) {
            this.tail = null;
        }

        return data;
    }

    // Add an element to the back of the queue
    offer(elem) {
        const newNode = new Node(elem);

        if (this.isEmpty()) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this._size++;
    }

    // Return an iterator to allow the user to traverse
    // through the elements found inside the queue
    [Symbol.iterator]() {
        let current = this.head;
        return {
            next: function () {
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

// Example usage
const queue = new Queue();

queue.offer(1);
queue.offer(2);
queue.offer(3);

console.log(queue.peek()); // 1
console.log(queue.poll()); // 1
console.log(queue.poll()); // 2
console.log(queue.poll()); // 3

// Uncomment to test the iterator
// for (let item of queue) {
//   console.log(item);
// }
