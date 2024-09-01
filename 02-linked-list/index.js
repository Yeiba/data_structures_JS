class LinkedList {
    constructor(data) {
        this.head = data !== undefined ? new LinkedList.Node(data) : null;  // The first node in the list
        this.size = data !== undefined ? 1 : 0;     // Number of nodes in the list
    }

    // Node class represents each element in the linked list
    static Node = class {
        constructor(data) {
            this.data = data;
            this.next = null; // Pointer to the next node
        }
    };

    // Add a new node with the given data at the end of the list
    append(data) {
        const newNode = new LinkedList.Node(data);
        if (this.head === null) {
            // If the list is empty, set the head to the new node
            this.head = newNode;
        } else {
            let current = this.head;
            // Traverse to the end of the list
            while (current.next !== null) {
                current = current.next;
            }
            // Link the last node to the new node
            current.next = newNode;
        }
        this.size++;
    }

    // Insert a new node with the given data at the specified position
    insertAt(data, index) {
        try {
            if (index < 0 || index > this.size) {
                throw new Error("Index out of bounds");
            }

            const newNode = new LinkedList.Node(data);
            if (index === 0) {
                // Insert at the beginning
                newNode.next = this.head;
                this.head = newNode;
            } else {
                let current = this.head;
                let previous;
                let count = 0;

                // Traverse to the position where the node is to be inserted
                while (count < index) {
                    previous = current;
                    current = current.next;
                    count++;
                }

                // Insert the new node in the list
                newNode.next = current;
                previous.next = newNode;
            }
            this.size++;
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    // Remove a node from the list by data
    remove(data) {
        let current = this.head;
        let previous = null;

        while (current !== null) {
            if (current.data === data) {
                if (previous === null) {
                    // Remove the head node
                    this.head = current.next;
                } else {
                    // Remove a node from the middle or end
                    previous.next = current.next;
                }
                this.size--;
                return current.data;
            }
            previous = current;
            current = current.next;
        }
        return null;
    }

    // Get the data at the specified index
    getAt(index) {
        try {
            if (index < 0 || index >= this.size) {
                throw new Error("Index out of bounds");
            }

            let current = this.head;
            let count = 0;

            while (current !== null) {
                if (count === index) {
                    return current.data;
                }
                count++;
                current = current.next;
            }
            return null;
        } catch (e) {
            console.error("Error:", e.message);
        }
    }

    // Print the linked list
    printList() {
        let current = this.head;
        let list = "";
        while (current !== null) {
            list += current.data + " -> ";
            current = current.next;
        }
        list += "null";
        console.log(list);
    }

    // Get the size of the linked list
    getSize() {
        return this.size;
    }

    // Check if the list is empty
    isEmpty() {
        return this.size === 0;
    }
}

// Example usage:

const ll = new LinkedList(4);
ll.append(10);
ll.append(20);
ll.append(30);
ll.insertAt(15, 1);
ll.printList();  // Output: 10 -> 15 -> 20 -> 30 -> null

console.log(ll.getAt(2)); // Output: 20

ll.remove(20);
ll.printList();  // Output: 10 -> 15 -> 30 -> null

console.log('Size:', ll.getSize()); // Output: Size: 3
console.log('Is empty:', ll.isEmpty()); // Output: Is empty: false
