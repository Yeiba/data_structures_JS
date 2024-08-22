// Helper function to compute hash code for strings
String.prototype.hashCode = function () {
    let hash = 0;
    for (let i = 0; i < this.length; i++) {
        const char = this.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

// Entry class to store key-value pairs
class Entry {
    constructor(key, value) {
        if (key === null) throw new Error("Null key is not allowed");
        this.key = key;
        this.value = value;
        this.hash = this.computeHash();
    }

    computeHash() {
        return typeof this.key === 'string' ? this.key.hashCode() : this.key.toString().hashCode();
    }

    equals(other) {
        return this.hash === other.hash && this.key === other.key;
    }

    toString() {
        return `${this.key} => ${this.value}`;
    }
}

// Hash table class
class HashTableSeparateChaining {
    constructor(capacity = 3, maxLoadFactor = 0.75) {
        if (capacity < 0) throw new Error("Illegal capacity");
        if (maxLoadFactor <= 0 || Number.isNaN(maxLoadFactor) || !Number.isFinite(maxLoadFactor))
            throw new Error("Illegal maxLoadFactor");

        this.maxLoadFactor = maxLoadFactor;
        this.capacity = Math.max(3, capacity);
        this.threshold = Math.floor(this.capacity * this.maxLoadFactor);
        this.size = 0;
        this.table = Array(this.capacity).fill(null).map(() => []);
    }

    normalizeIndex(keyHash) {
        return Math.abs(keyHash) % this.capacity;
    }

    clear() {
        this.table = Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    containsKey(key) {
        return this.hasKey(key);
    }

    hasKey(key) {
        const bucketIndex = this.normalizeIndex(this.computeHash(key));
        return this.bucketSeekEntry(bucketIndex, key) !== null;
    }

    put(key, value) {
        return this.insert(key, value);
    }

    add(key, value) {
        return this.insert(key, value);
    }

    insert(key, value) {
        if (key === null) throw new Error("Null key is not allowed");
        const newEntry = new Entry(key, value);
        const bucketIndex = this.normalizeIndex(newEntry.hash);
        return this.bucketInsertEntry(bucketIndex, newEntry);
    }

    get(key) {
        if (key === null) return null;
        const bucketIndex = this.normalizeIndex(this.computeHash(key));
        const entry = this.bucketSeekEntry(bucketIndex, key);
        return entry ? entry.value : null;
    }

    remove(key) {
        if (key === null) return null;
        const bucketIndex = this.normalizeIndex(this.computeHash(key));
        return this.bucketRemoveEntry(bucketIndex, key);
    }

    bucketRemoveEntry(bucketIndex, key) {
        const entry = this.bucketSeekEntry(bucketIndex, key);
        if (entry !== null) {
            const bucket = this.table[bucketIndex];
            const index = bucket.indexOf(entry);
            if (index > -1) bucket.splice(index, 1);
            this.size--;
            return entry.value;
        }
        return null;
    }

    bucketInsertEntry(bucketIndex, entry) {
        const bucket = this.table[bucketIndex];
        const existentEntry = this.bucketSeekEntry(bucketIndex, entry.key);

        if (existentEntry === null) {
            bucket.push(entry);
            this.size++;
            if (this.size > this.threshold) this.resizeTable();
            return null; // No previous entry
        } else {
            const oldVal = existentEntry.value;
            existentEntry.value = entry.value;
            return oldVal;
        }
    }

    bucketSeekEntry(bucketIndex, key) {
        const bucket = this.table[bucketIndex];
        for (const entry of bucket) {
            if (entry.key === key) return entry;
        }
        return null;
    }

    resizeTable() {
        const oldTable = this.table;
        this.capacity *= 2;
        this.threshold = Math.floor(this.capacity * this.maxLoadFactor);
        this.table = Array(this.capacity).fill(null).map(() => []);

        for (const bucket of oldTable) {
            for (const entry of bucket) {
                const bucketIndex = this.normalizeIndex(entry.hash);
                this.table[bucketIndex].push(entry);
            }
        }
    }

    computeHash(key) {
        return typeof key === 'string' ? key.hashCode() : key.toString().hashCode();
    }

    keys() {
        const keys = [];
        for (const bucket of this.table) {
            for (const entry of bucket) {
                keys.push(entry.key);
            }
        }
        return keys;
    }

    values() {
        const values = [];
        for (const bucket of this.table) {
            for (const entry of bucket) {
                values.push(entry.value);
            }
        }
        return values;
    }

    toString() {
        let str = '{';
        for (const bucket of this.table) {
            for (const entry of bucket) {
                str += entry.toString() + ', ';
            }
        }
        str = str.replace(/, $/, '');
        str += '}';
        return str;
    }
}

// Example usage
const hashTable = new HashTableSeparateChaining();

hashTable.put("key1", "value1");
hashTable.put("key2", "value2");
hashTable.put("key3", "value3");

console.log("HashTable:", hashTable.toString());
console.log("Get 'key1':", hashTable.get("key1"));
console.log("Contains 'key2':", hashTable.containsKey("key2"));
console.log("Keys:", hashTable.keys());
console.log("Values:", hashTable.values());
console.log("Remove 'key3':", hashTable.remove("key3"));
console.log("HashTable after removal:", hashTable.toString());
