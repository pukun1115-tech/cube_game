export class PerlinNoise {
    constructor() {
        /** @type {Uint16Array} */
        const permutation = new Uint16Array(256);
        for (let i = 0; i < 256; i++) {
            permutation[i] = i;
        }

        for (let i = 255; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
        }

        /** @type {Uint16Array} */
        this.p = new Uint16Array(512);
        for (let i = 0; i < 512; i++) {
            this.p[i] = permutation[(i & 255)];
        }
    }

    /**
     * @param {number} t
     * @returns {number}
     */
    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    /**
     * @param {number} t
     * @param {number} a
     * @param {number} b
     * @returns {number}
     */
    lerp(t, a, b) {
        return a + t * (b - a);
    }

    /**
     * @param {number} hash
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */
    grad(hash, x, y, z) {
        const h = hash & 15;

        const u = (h < 8 ? x : y);
        /*
        let v;
        if (h < 4) {
            v = y;
        } else if (h === 12 || h === 14) {
            v = x;
        } else {
            v = z;
        }
        */
        const v = (h < 4 ? y : (h === 12 || h === 14 ? x : z));

        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }

    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} z
     * @returns {number} 
     */
    noise(x, y = 0, z = 0) {
        const X = (Math.floor(x) & 255);
        const Y = (Math.floor(y) & 255);
        const Z = (Math.floor(z) & 255);

        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);

        const u = this.fade(x);
        const v = this.fade(y);
        const w = this.fade(z);

        const a = this.p[X] + Y;
        const b = this.p[X + 1] + Y;

        const idx000 = this.p[a] + Z;
        const idx010 = this.p[a + 1] + Z;
        const idx100 = this.p[b] + Z;
        const idx110 = this.p[b + 1] + Z;

        return this.lerp(
            w,
            this.lerp(
                v,
                this.lerp(
                    u,
                    this.grad(this.p[idx000 + 0], x - 0, y - 0, z - 0),
                    this.grad(this.p[idx100 + 0], x - 1, y - 0, z - 0)
                ),
                this.lerp(
                    u,
                    this.grad(this.p[idx010 + 0], x - 0, y - 1, z - 0),
                    this.grad(this.p[idx110 + 0], x - 1, y - 1, z - 0)
                )
            ),
            this.lerp(
                v,
                this.lerp(
                    u,
                    this.grad(this.p[idx000 + 1], x - 0, y - 0, z - 1),
                    this.grad(this.p[idx100 + 1], x - 1, y - 0, z - 1)
                ),
                this.lerp(
                    u,
                    this.grad(this.p[idx010 + 1], x - 0, y - 1, z - 1),
                    this.grad(this.p[idx110 + 1], x - 1, y - 1, z - 1)
                )
            )
        );
    }
}