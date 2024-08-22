class HashTableOpenAddressingBase {
    constructor(capacity = 7, loadFactor = 0.65) {
        if (capacity <= 0) throw new Error("Illegal capacity: " + capacity);
        if (loadFactor <= 0 || isNaN(loadFactor) || !isFinite(loadFactor))
            throw new Error("Illegal loadFactor: " + loadFactor);

        this.loadFactor = loadFactor;
        this.capacity = Math.max(7, capacity);
        this.threshold = Math.floor(this.capacity * loadFactor);

        this.keys = new Array(this.capacity).fill(null);
        this.values = new Array(this.capacity).fill(null);

        this.TOMBSTONE = Symbol('TOMBSTONE');
        this.size = 0;
        this.modificationCount = 0;
    }

    normalizeIndex(hash) {
        return (hash & 0x7FFFFFFF) % this.capacity;
    }

    // Method to be implemented by subclasses to define probing behavior
    setupProbing(key) {
        throw new Error('setupProbing() must be implemented by subclasses');
    }

    probe(x) {
        throw new Error('probe() must be implemented by subclasses');
    }

    adjustCapacity() {
        throw new Error('adjustCapacity() must be implemented by subclasses');
    }

    increaseCapacity() {
        this.capacity = (2 * this.capacity) + 1;
    }

    clear() {
        this.keys.fill(null);
        this.values.fill(null);
        this.size = 0;
        this.modificationCount++;
    }

    getSize() {
        return this.size;
    }

    getCapacity() {
        return this.capacity;
    }

    isEmpty() {
        return this.size === 0;
    }

    // Hash function for string keys
    getHash(key) {
        if (typeof key === 'string') {
            let hash = 0;
            for (let i = 0; i < key.length; i++) {
                const char = key.charCodeAt(i);
                hash = (hash << 5) - hash + char; // hash * 31 + char
            }
            return hash;
        } else if (typeof key === 'number') {
            return key;
        } else {
            throw new Error("Unsupported key type");
        }
    }

    insert(key, value) {
        if (key === null) throw new Error("Null key");
        if (this.size >= this.threshold) this.resizeTable();

        this.setupProbing(key);
        const offset = this.normalizeIndex(this.getHash(key));

        for (let i = offset, j = -1, x = 1; ; i = this.normalizeIndex(offset + this.probe(x++))) {
            if (this.keys[i] === this.TOMBSTONE) {
                if (j === -1) j = i;
            } else if (this.keys[i] !== null) {
                if (this.keys[i] === key) {
                    const oldValue = this.values[i];
                    if (j === -1) {
                        this.values[i] = value;
                    } else {
                        this.keys[i] = this.TOMBSTONE;
                        this.values[i] = null;
                        this.keys[j] = key;
                        this.values[j] = value;
                    }
                    this.modificationCount++;
                    return oldValue;
                }
            } else {
                if (j === -1) {
                    this.size++;
                    this.keys[i] = key;
                    this.values[i] = value;
                } else {
                    this.size++;
                    this.keys[j] = key;
                    this.values[j] = value;
                }
                this.modificationCount++;
                return null;
            }
        }
    }

    hasKey(key) {
        if (key === null) throw new Error("Null key");

        this.setupProbing(key);
        const offset = this.normalizeIndex(this.getHash(key));

        for (let i = offset, j = -1, x = 1; ; i = this.normalizeIndex(offset + this.probe(x++))) {
            if (this.keys[i] === this.TOMBSTONE) {
                if (j === -1) j = i;
            } else if (this.keys[i] !== null) {
                if (this.keys[i] === key) {
                    if (j !== -1) {
                        this.keys[j] = this.keys[i];
                        this.values[j] = this.values[i];
                        this.keys[i] = this.TOMBSTONE;
                        this.values[i] = null;
                    }
                    return true;
                }
            } else {
                return false;
            }
        }
    }

    get(key) {
        if (key === null) throw new Error("Null key");

        this.setupProbing(key);
        const offset = this.normalizeIndex(this.getHash(key));

        for (let i = offset, j = -1, x = 1; ; i = this.normalizeIndex(offset + this.probe(x++))) {
            if (this.keys[i] === this.TOMBSTONE) {
                if (j === -1) j = i;
            } else if (this.keys[i] !== null) {
                if (this.keys[i] === key) {
                    if (j !== -1) {
                        this.keys[j] = this.keys[i];
                        this.values[j] = this.values[i];
                        this.keys[i] = this.TOMBSTONE;
                        this.values[i] = null;
                        return this.values[j];
                    } else {
                        return this.values[i];
                    }
                }
            } else {
                return null;
            }
        }
    }

    remove(key) {
        if (key === null) throw new Error("Null key");

        this.setupProbing(key);
        const offset = this.normalizeIndex(this.getHash(key));

        for (let i = offset, x = 1; ; i = this.normalizeIndex(offset + this.probe(x++))) {
            if (this.keys[i] === this.TOMBSTONE) continue;
            if (this.keys[i] === null) return null;
            if (this.keys[i] === key) {
                this.size--;
                this.modificationCount++;
                const oldValue = this.values[i];
                this.keys[i] = this.TOMBSTONE;
                this.values[i] = null;
                return oldValue;
            }
        }
    }

    resizeTable() {
        this.increaseCapacity();
        this.adjustCapacity();
        this.threshold = Math.floor(this.capacity * this.loadFactor);

        const oldKeys = this.keys;
        const oldValues = this.values;

        this.keys = new Array(this.capacity).fill(null);
        this.values = new Array(this.capacity).fill(null);

        this.size = 0;
        this.modificationCount++;

        for (let i = 0; i < oldKeys.length; i++) {
            if (oldKeys[i] !== null && oldKeys[i] !== this.TOMBSTONE) {
                this.insert(oldKeys[i], oldValues[i]);
            }
        }
    }

    toString() {
        let result = "{";
        for (let i = 0; i < this.capacity; i++) {
            if (this.keys[i] !== null && this.keys[i] !== this.TOMBSTONE) {
                result += `${this.keys[i]} => ${this.values[i]}, `;
            }
        }
        result += "}";
        return result;
    }

    [Symbol.iterator]() {
        let index = 0;
        let keysLeft = this.size;
        const modificationCount = this.modificationCount;

        return {
            next: () => {
                if (modificationCount !== this.modificationCount) {
                    throw new Error('Concurrent modification detected');
                }
                while (index < this.capacity && (this.keys[index] === null || this.keys[index] === this.TOMBSTONE)) {
                    index++;
                }
                if (keysLeft > 0 && index < this.capacity) {
                    keysLeft--;
                    return { value: this.keys[index++], done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
}
console.log('#######################################')
console.log('linear probing')
console.log('#######################################')
class HashTableLinearProbing extends HashTableOpenAddressingBase {
    static LINEAR_CONSTANT = 17;

    setupProbing(key) {
        // No specific setup needed for linear probing
    }

    probe(x) {
        // Linear probing offset
        return x * HashTableLinearProbing.LINEAR_CONSTANT;
    }

    adjustCapacity() {
        while (this.gcd(HashTableLinearProbing.LINEAR_CONSTANT, this.capacity) !== 1) {
            this.capacity++;
        }
    }

    gcd(a, b) {
        if (b === 0) return a;
        return this.gcd(b, a % b);
    }
}

// Create an instance of the hash table
const hashTable_1 = new HashTableLinearProbing();

// Insert key-value pairs into the hash table
hashTable_1.insert("name", "Alice");
hashTable_1.insert("age", 30);
hashTable_1.insert("city", "New York");

// Retrieve values by key
console.log(hashTable_1.get("name")); // Output: "Alice"
console.log(hashTable_1.get("age"));  // Output: 30
console.log(hashTable_1.get("city")); // Output: "New York"

// Check if keys exist in the hash table
console.log(hashTable_1.hasKey("name")); // Output: true
console.log(hashTable_1.hasKey("country")); // Output: false

// Remove a key-value pair
console.log(hashTable_1.remove("city")); // Output: "New York"
console.log(hashTable_1.get("city"));    // Output: null

// Print the hash table content
console.log(hashTable_1.toString()); // Output: {name => Alice, age => 30, }

// Iterate over the hash table keys
for (let key of hashTable_1) {
    console.log(key); // Output: "name", "age"
}

console.log('#######################################')
console.log('Quadratic probing')
console.log('#######################################')

class HashTableQuadraticProbing extends HashTableOpenAddressingBase {
    static QUADRATIC_CONSTANT = 5;

    setupProbing(key) {
        // No specific setup needed for quadratic probing
    }

    probe(x) {
        // Quadratic probing offset: (x^2) * QUADRATIC_CONSTANT
        return HashTableQuadraticProbing.QUADRATIC_CONSTANT * x * x;
    }

    adjustCapacity() {
        while (this.gcd(HashTableQuadraticProbing.QUADRATIC_CONSTANT, this.capacity) !== 1) {
            this.capacity++;
        }
    }

    gcd(a, b) {
        if (b === 0) return a;
        return this.gcd(b, a % b);
    }
}

// Example usage

// Create an instance of the hash table
const hashTable_2 = new HashTableQuadraticProbing();

// Insert key-value pairs into the hash table
hashTable_2.insert("name", "Alice");
hashTable_2.insert("age", 30);
hashTable_2.insert("city", "New York");

// Retrieve values by key
console.log(hashTable_2.get("name")); // Output: "Alice"
console.log(hashTable_2.get("age"));  // Output: 30
console.log(hashTable_2.get("city")); // Output: "New York"

// Check if keys exist in the hash table
console.log(hashTable_2.hasKey("name")); // Output: true
console.log(hashTable_2.hasKey("country")); // Output: false

// Remove a key-value pair
console.log(hashTable_2.remove("city")); // Output: "New York"
console.log(hashTable_2.get("city"));    // Output: null

// Print the hash table content
console.log(hashTable_2.toString()); // Output: {name => Alice, age => 30, }

// Iterate over the hash table keys
for (let key of hashTable_2) {
    console.log(key); // Output: "name", "age"
}

console.log('#######################################')
console.log('Double Hashing')
console.log('#######################################')


class HashTableDoubleHashing extends HashTableOpenAddressingBase {
    constructor(capacity = 7, loadFactor = 0.65) {
        super(capacity, loadFactor);
        this.secondaryHashConstant = 3; // Example constant for secondary hashing
    }

    setupProbing(key) {
        // No specific setup needed for double hashing
    }

    probe(x, key) {
        if (key === undefined) {
            throw new Error("Key is undefined in probe method");
        }
        // Double hashing: (x * secondaryHash(key)) % capacity
        return x * this.secondaryHash(key);
    }

    secondaryHash(key) {
        if (key === undefined) {
            throw new Error("Key is undefined in secondaryHash method");
        }
        const hash = key.toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return this.secondaryHashConstant - (hash % this.secondaryHashConstant);
    }

    adjustCapacity() {
        // Ensure the capacity is a prime number to reduce collisions
        while (!this.isPrime(this.capacity)) {
            this.capacity++;
        }
    }

    isPrime(num) {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        return true;
    }

    insert(key, value) {
        if (key === null || key === undefined) throw new Error("Null or undefined key");
        if (this.size >= this.threshold) this.resizeTable();

        this.setupProbing(key);
        const offset = this.normalizeIndex(this.getHash(key));

        for (let i = offset, j = -1, x = 1; ; i = this.normalizeIndex(offset + this.probe(x++, key))) {
            if (this.keys[i] === this.TOMBSTONE) {
                if (j === -1) j = i;
            } else if (this.keys[i] !== null) {
                if (this.keys[i] === key) {
                    const oldValue = this.values[i];
                    if (j === -1) {
                        this.values[i] = value;
                    } else {
                        this.keys[i] = this.TOMBSTONE;
                        this.values[i] = null;
                        this.keys[j] = key;
                        this.values[j] = value;
                    }
                    this.modificationCount++;
                    return oldValue;
                }
            } else {
                if (j === -1) {
                    this.size++;
                    this.keys[i] = key;
                    this.values[i] = value;
                } else {
                    this.size++;
                    this.keys[j] = key;
                    this.values[j] = value;
                }
                this.modificationCount++;
                return null;
            }
        }
    }

    hasKey(key) {
        if (key === null || key === undefined) throw new Error("Null or undefined key");

        this.setupProbing(key);
        const offset = this.normalizeIndex(this.getHash(key));

        for (let i = offset, j = -1, x = 1; ; i = this.normalizeIndex(offset + this.probe(x++, key))) {
            if (this.keys[i] === this.TOMBSTONE) {
                if (j === -1) j = i;
            } else if (this.keys[i] !== null) {
                if (this.keys[i] === key) {
                    if (j !== -1) {
                        this.keys[j] = this.keys[i];
                        this.values[j] = this.values[i];
                        this.keys[i] = this.TOMBSTONE;
                        this.values[i] = null;
                    }
                    return true;
                }
            } else {
                return false;
            }
        }
    }

    get(key) {
        if (key === null || key === undefined) throw new Error("Null or undefined key");

        this.setupProbing(key);
        const offset = this.normalizeIndex(this.getHash(key));

        for (let i = offset, j = -1, x = 1; ; i = this.normalizeIndex(offset + this.probe(x++, key))) {
            if (this.keys[i] === this.TOMBSTONE) {
                if (j === -1) j = i;
            } else if (this.keys[i] !== null) {
                if (this.keys[i] === key) {
                    if (j !== -1) {
                        this.keys[j] = this.keys[i];
                        this.values[j] = this.values[i];
                        this.keys[i] = this.TOMBSTONE;
                        this.values[i] = null;
                        return this.values[j];
                    } else {
                        return this.values[i];
                    }
                }
            } else {
                return null;
            }
        }
    }

    remove(key) {
        if (key === null || key === undefined) throw new Error("Null or undefined key");

        this.setupProbing(key);
        const offset = this.normalizeIndex(this.getHash(key));

        for (let i = offset, x = 1; ; i = this.normalizeIndex(offset + this.probe(x++, key))) {
            if (this.keys[i] === this.TOMBSTONE) continue;
            if (this.keys[i] === null) return null;
            if (this.keys[i] === key) {
                this.size--;
                this.modificationCount++;
                const oldValue = this.values[i];
                this.keys[i] = this.TOMBSTONE;
                this.values[i] = null;
                return oldValue;
            }
        }
    }
}

// Example usage

// Create an instance of the hash table
const hashTable = new HashTableDoubleHashing();

// Insert key-value pairs into the hash table
hashTable.insert("name", "Alice");
hashTable.insert("age", 30);
hashTable.insert("city", "New York");

// Retrieve values by key
console.log(hashTable.get("name")); // Output: "Alice"
console.log(hashTable.get("age"));  // Output: 30
console.log(hashTable.get("city")); // Output: "New York"

// Check if keys exist in the hash table
console.log(hashTable.hasKey("name")); // Output: true
console.log(hashTable.hasKey("country")); // Output: false

// Remove a key-value pair
console.log(hashTable.remove("city")); // Output: "New York"
console.log(hashTable.get("city"));    // Output: null

// Print the hash table content
console.log(hashTable.toString()); // Output: {name => Alice, age => 30, }

// Iterate over the hash table keys
for (let key of hashTable) {
    console.log(key); // Output: "name", "age"
}
