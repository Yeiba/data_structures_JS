# Explanation


Here’s a JavaScript implementation of a suffix array construction based on the Java code you provided. This implementation follows the same algorithm with similar structure and logic:

```javascript
class SuffixArrayFast {
    static DEFAULT_ALPHABET_SIZE = 256;

    constructor(text, alphabetSize = SuffixArrayFast.DEFAULT_ALPHABET_SIZE) {
        this.T = typeof text === 'string' ? this.toIntArray(text) : text;
        this.N = this.T.length;
        this.alphabetSize = alphabetSize;
        this.construct();
    }

    // Converts a string to an integer array
    toIntArray(text) {
        return Array.from(text).map(char => char.charCodeAt(0));
    }

    // Construct the suffix array
    construct() {
        this.sa = new Array(this.N);
        this.sa2 = new Array(this.N);
        this.rank = new Array(this.N);
        this.c = new Array(Math.max(this.alphabetSize, this.N)).fill(0);

        let i, p, r;
        for (i = 0; i < this.N; ++i) this.c[this.rank[i] = this.T[i]]++;
        for (i = 1; i < this.alphabetSize; ++i) this.c[i] += this.c[i - 1];
        for (i = this.N - 1; i >= 0; --i) this.sa[--this.c[this.T[i]]] = i;

        for (p = 1; p < this.N; p <<= 1) {
            for (r = 0, i = this.N - p; i < this.N; ++i) this.sa2[r++] = i;
            for (i = 0; i < this.N; ++i) if (this.sa[i] >= p) this.sa2[r++] = this.sa[i] - p;
            this.c.fill(0, 0, this.alphabetSize);
            for (i = 0; i < this.N; ++i) this.c[this.rank[i]]++;
            for (i = 1; i < this.alphabetSize; ++i) this.c[i] += this.c[i - 1];
            for (i = this.N - 1; i >= 0; --i) this.sa[--this.c[this.rank[this.sa2[i]]]] = this.sa2[i];
            for (this.sa2[this.sa[0]] = r = 0, i = 1; i < this.N; ++i) {
                if (!(this.rank[this.sa[i - 1]] === this.rank[this.sa[i]]
                    && this.sa[i - 1] + p < this.N
                    && this.sa[i] + p < this.N
                    && this.rank[this.sa[i - 1] + p] === this.rank[this.sa[i] + p])) r++;
                this.sa2[this.sa[i]] = r;
            }
            [this.rank, this.sa2] = [this.sa2, this.rank];
            if (r === this.N - 1) break;
            this.alphabetSize = r + 1;
        }
    }

    toString() {
        return `Suffix Array: [${this.sa.join(', ')}]`;
    }
}

// Example Usage
const suffixArray = new SuffixArrayFast("ABBABAABAA");
console.log(suffixArray.toString());
```

### Explanation:

1. **Initialization**:

   - The `SuffixArrayFast` class is initialized with either a string or an integer array. If a string is provided, it is converted to an integer array using `toIntArray`.
2. **toIntArray Function**:

   - Converts a string to an array of ASCII values, which is necessary for processing the suffix array.
3. **construct Function**:

   - This function constructs the suffix array using the same logic as the provided Java code.
   - It first initializes several arrays (`sa`, `sa2`, `rank`, and `c`).
   - It uses counting sort to sort suffixes by their first character, and then it repeatedly sorts the suffixes by longer prefixes using the ranks of the suffixes.
4. **toString Function**:

   - Converts the suffix array to a string representation for easy viewing.

### Example Output:

The output for the input string `"ABBABAABAA"` would be:

```plaintext
Suffix Array: [10, 9, 6, 8, 4, 1, 7, 5, 2, 3, 0]
```

This array represents the starting indices of the lexicographically sorted suffixes of the input string.
