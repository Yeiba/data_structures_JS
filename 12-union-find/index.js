class UnionFind {
    constructor(size) {
        if (size <= 0) throw new Error("Size <= 0 is not allowed");

        this.size = size;
        this.numComponents = size;
        this.sz = new Array(size).fill(1); // Size of each component
        this.id = new Array(size); // Parent array

        for (let i = 0; i < size; i++) {
            this.id[i] = i; // Each element is its own root initially
        }
    }

    // Find the root of the component/set 'p' belongs to
    find(p) {
        // Find the root of the component/set
        let root = p;
        while (root !== this.id[root]) {
            root = this.id[root];
        }

        // Path compression
        while (p !== root) {
            const next = this.id[p];
            this.id[p] = root;
            p = next;
        }

        return root;
    }

    // Check if elements 'p' and 'q' are in the same component/set
    connected(p, q) {
        return this.find(p) === this.find(q);
    }

    // Get the size of the component/set containing 'p'
    componentSize(p) {
        return this.sz[this.find(p)];
    }

    // Get the number of elements in this Union-Find data structure
    size() {
        return this.size;
    }

    // Get the number of remaining components/sets
    components() {
        return this.numComponents;
    }

    // Unite the components/sets containing elements 'p' and 'q'
    unify(p, q) {
        const root1 = this.find(p);
        const root2 = this.find(q);

        // Elements are already in the same component
        if (root1 === root2) return;

        // Union by size
        if (this.sz[root1] < this.sz[root2]) {
            this.sz[root2] += this.sz[root1];
            this.id[root1] = root2;
        } else {
            this.sz[root1] += this.sz[root2];
            this.id[root2] = root1;
        }

        // Number of components has decreased by one
        this.numComponents--;
    }
}

// Example usage:
const uf = new UnionFind(10);

uf.unify(1, 2);
uf.unify(2, 3);
console.log(uf.connected(1, 3)); // true
console.log(uf.componentSize(1)); // 3
console.log(uf.components()); // 8 (10 - 2 components merged)

uf.unify(4, 5);
console.log(uf.connected(4, 5)); // true
console.log(uf.componentSize(4)); // 2
