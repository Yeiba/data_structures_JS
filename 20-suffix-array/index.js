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
