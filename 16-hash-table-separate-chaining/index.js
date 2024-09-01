class HashTable {
    constructor(size = 53) {
        this.keyMap = new Array(size);
    }

    // Hash function to convert key into an index
    _hash(key) {
        let total = 0;
        let prime = 31; // Using a prime number for better distribution of hash values
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            let char = key[i];
            let value = char.charCodeAt(0) - 96;
            total = (total * prime + value) % this.keyMap.length;
        }
        return total;
    }

    // Insert key-value pair into the hash table
    set(key, value) {
        let index = this._hash(key);
        if (!this.keyMap[index]) {
            this.keyMap[index] = [];
        }
        this.keyMap[index].push([key, value]);
    }

    // Retrieve value by key
    get(key) {
        let index = this._hash(key);
        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    return this.keyMap[index][i][1];
                }
            }
        }
        return undefined;
    }

    // Remove key-value pair
    remove(key) {
        let index = this._hash(key);
        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    this.keyMap[index].splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    }

    // Retrieve all keys in the hash table
    keys() {
        let keysArray = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    keysArray.push(this.keyMap[i][j][0]);
                }
            }
        }
        return keysArray;
    }

    // Retrieve all values in the hash table
    values() {
        let valuesArray = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    valuesArray.push(this.keyMap[i][j][1]);
                }
            }
        }
        return valuesArray;
    }
}

// Example usage
const ht = new HashTable();
ht.set("pink", "#ffc0cb");
ht.set("blue", "#0000ff");
ht.set("black", "#000000");
ht.set("white", "#ffffff");

console.log("Value associated with 'pink':", ht.get("pink"));  // "#ffc0cb"
console.log("Value associated with 'blue':", ht.get("blue"));  // "#0000ff"
console.log("Removing 'pink':", ht.remove("pink"));            // true
console.log("Value associated with 'pink' after removal:", ht.get("pink"));  // undefined
console.log("All keys in hash table:", ht.keys());            // ["blue", "black", "white"]
console.log("All values in hash table:", ht.values());        // ["#0000ff", "#000000", "#ffffff"]
