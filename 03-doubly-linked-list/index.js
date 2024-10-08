class DoublyLinkedList {
    constructor(firstElem = null) {
        this.head = firstElem ? new DoublyLinkedList.Node(firstElem) : firstElem;  // The first node in the list
        this.size = firstElem ? 1 : 0;     // Number of nodes in the list
        this.tail = this.head !== null ? this.head : null;
    }

    // Internal Node class
    static Node = class {
        constructor(data, prev = null, next = null) {
            this.data = data;
            this.prev = prev;
            this.next = next;
        }
    };

    // Clear the linked list
    clear() {
        let trav = this.head;
        while (trav !== null) {
            const next = trav.next;
            trav.prev = trav.next = null;
            trav.data = null;
            trav = next;
        }
        this.head = this.tail = trav = null;
        this.size = 0;
    }

    // Return the size of the linked list
    Size() {
        return this.size
    }

    // Check if the linked list is empty
    isEmpty() {
        return this.size === 0;
    }

    // Add an element to the tail of the linked list
    add(elem) {
        this.addLast(elem);
    }

    // Add a node to the tail of the linked list
    addLast(elem) {
        if (this.isEmpty()) {
            this.head = this.tail = new DoublyLinkedList.Node(elem);
        } else {
            this.tail.next = new DoublyLinkedList.Node(elem, this.tail);
            this.tail = this.tail.next;
        }
        this.size++;
    }

    // Add an element to the beginning of the linked list
    addFirst(elem) {
        if (this.isEmpty()) {
            this.head = this.tail = new DoublyLinkedList.Node(elem);
        } else {
            this.head.prev = new DoublyLinkedList.Node(elem, null, this.head);
            this.head = this.head.prev;
        }
        this.size++;
    }

    // Check the value of the first node if it exists
    peekFirst() {
        try {
            if (this.isEmpty()) throw new Error("Empty list");
            return this.head.data;
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    // Check the value of the last node if it exists
    peekLast() {
        try {
            if (this.isEmpty()) throw new Error("Empty list");
            return this.tail.data;
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    // Remove the first value at the head of the linked list
    removeFirst() {
        try {
            if (this.isEmpty()) throw new Error("Empty list");

            const data = this.head.data;
            this.head = this.head.next;
            this.size--;

            if (this.isEmpty()) this.tail = null;
            else this.head.prev = null;

            return data;
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    // Remove the last value at the tail of the linked list
    removeLast() {
        try {
            if (this.isEmpty()) throw new Error("Empty list");

            const data = this.tail.data;
            this.tail = this.tail.prev;
            this.size--;

            if (this.isEmpty()) this.head = null;
            else this.tail.next = null;

            return data;
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    // Remove an arbitrary node from the linked list
    remove(node) {
        if (node.prev === null) return this.removeFirst();
        if (node.next === null) return this.removeLast();

        node.prev.next = node.next;
        node.next.prev = node.prev;

        const data = node.data;
        node.data = null;
        node.prev = node.next = null;

        this.size--;

        return data;
    }

    // Remove a node at a particular index
    removeAt(index) {
        try {
            if (index < 0 || index >= this.size) {
                throw new Error("Index out of bounds");
            }

            let trav;
            if (index < this.size / 2) {
                trav = this.head;
                for (let i = 0; i !== index; i++) {
                    trav = trav.next;
                }
            } else {
                trav = this.tail;
                for (let i = this.size - 1; i !== index; i--) {
                    trav = trav.prev;
                }
            }

            return this.remove(trav);
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    // Remove a particular value in the linked list
    removeValue(obj) {
        let trav = this.head;

        while (trav !== null) {
            if (obj === null && trav.data === null) {
                this.remove(trav);
                return true;
            } else if (obj !== null && obj === trav.data) {
                this.remove(trav);
                return true;
            }
            trav = trav.next;
        }

        return false;
    }

    // Find the index of a particular value in the linked list
    indexOf(obj) {
        let index = 0;
        let trav = this.head;

        while (trav !== null) {
            if (obj === null && trav.data === null) {
                return index;
            } else if (obj !== null && obj === trav.data) {
                return index;
            }
            trav = trav.next;
            index++;
        }

        return -1;
    }

    // Check if a value is contained within the linked list
    contains(obj) {
        return this.indexOf(obj) !== -1;
    }

    // Iterator
    [Symbol.iterator]() {
        let trav = this.head;

        return {
            next: () => {
                if (trav !== null) {
                    const value = trav.data;
                    trav = trav.next;
                    return { value, done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }

    // String representation of the linked list
    toString() {
        let sb = "[ ";
        let trav = this.head;
        while (trav !== null) {
            sb += trav.data + ", ";
            trav = trav.next;
        }
        sb += " ]";
        return sb;
    }
}

// Example usage:
const dll = new DoublyLinkedList();
dll.add(3);
dll.addFirst(2);
dll.addLast(4);

console.log(dll.toString()); // [ 2, 3, 4, ]

console.log(dll.peekFirst()); // 2
console.log(dll.peekLast());  // 4

dll.removeFirst();
dll.removeLast();

console.log(dll.toString()); // [ 3, ]


dll.add(6);
console.log(dll.toString()); // [ 3, ]
dll.add(7);
console.log(dll.toString()); // [ 3, ]

console.log(dll.removeAt(1)); // 6
console.log(dll.toString());  // [ 3, 7, ]

console.log(dll.indexOf(7));  // 1
console.log(dll.contains(5)); // false

for (const item of dll) {
    console.log(item); // 3, 7
}

dll.clear();
console.log('Size:', dll.Size()); // Output: Size: 0
console.log('Is empty:', dll.isEmpty()); // Output: Is empty: true