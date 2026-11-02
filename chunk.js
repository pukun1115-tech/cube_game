import { CHUNK_SIZE_X, CHUNK_SIZE_Y, CHUNK_SIZE_Z, BLOCK_TEXTURECOORD } from "./config.js";

export class Chunk {
    constructor(x, z) {
        this.x = x * CHUNK_SIZE_X;
        this.z = z * CHUNK_SIZE_Z;
        this.map = null;
        this.generateMap();
    }

    generateMap() {
        this.map = new Array(CHUNK_SIZE_X);
        for (let x = 0; x < CHUNK_SIZE_X; x++) {
            this.map[x] = new Array(CHUNK_SIZE_Y);
            for (let y = 0; y < CHUNK_SIZE_Y; y++) {
                this.map[x][y] = new Array(CHUNK_SIZE_Z).fill(0);
            }
        }

        for (let x = 0; x < CHUNK_SIZE_X; x++) {
            for (let z = 0; z < CHUNK_SIZE_Z; z++) {
                const dirtHeight = Math.floor(Math.random() * 4);
                for (let y = 0; y < dirtHeight; y++) {
                    this.map[x][y][z] = 3;
                }
            }
        }
    }

    /**
     * @param {number} indexOffset
     * @returns {{
     *     pos: Array<number>,
     *     idx: Array<number>,
     *     texCoord: Array<number>,
     *     col: Array<number>,
     *     idxOffset: number
     * }}
     */
    generateMesh(indexOffset) {
        /** @type {Array<number>} */
        let pos = [];
        /** @type {Array<number>} */
        let idx = [];
        /** @type {Array<number>} */
        let texCoord = [];
        /** @type {Array<number>} */
        let col = [];
        for (let x = 0; x < CHUNK_SIZE_X; x++) {
            for (let y = 0; y < CHUNK_SIZE_Y; y++) {
                for (let z = 0; z < CHUNK_SIZE_Z; z++) {
                    if (this.isAir(x, y, z)) {
                        continue;
                    }
                    const worldX = x + this.x;
                    const worldZ = z + this.z;

                    if (this.isAir(x, y, z + 1)) {
                        pos.push(worldX, y, worldZ + 1);
                        pos.push(worldX + 1, y, worldZ + 1);
                        pos.push(worldX + 1, y + 1, worldZ + 1);
                        pos.push(worldX, y + 1, worldZ + 1);

                        idx.push(indexOffset + 0, indexOffset + 1, indexOffset + 2);
                        idx.push(indexOffset + 0, indexOffset + 2, indexOffset + 3);
                        indexOffset += 4;

                        texCoord.push(...BLOCK_TEXTURECOORD[this.map[x][y][z]]["front"]);

                        col.push(1, 1, 1, 1);
                        col.push(1, 1, 1, 1);
                        col.push(1, 1, 1, 1);
                        col.push(1, 1, 1, 1);
                    }

                    if (this.isAir(x, y, z - 1)) {
                        pos.push(worldX + 1, y, worldZ);
                        pos.push(worldX, y, worldZ);
                        pos.push(worldX, y + 1, worldZ);
                        pos.push(worldX + 1, y + 1, worldZ);

                        idx.push(indexOffset + 0, indexOffset + 1, indexOffset + 2);
                        idx.push(indexOffset + 0, indexOffset + 2, indexOffset + 3);
                        indexOffset += 4;

                        texCoord.push(...BLOCK_TEXTURECOORD[this.map[x][y][z]]["back"]);

                        col.push(1, 1, 1, 1);
                        col.push(1, 1, 1, 1);
                        col.push(1, 1, 1, 1);
                        col.push(1, 1, 1, 1);
                    }

                    if (this.isAir(x + 1, y, z)) {
                        pos.push(worldX + 1, y, worldZ + 1);
                        pos.push(worldX + 1, y, worldZ);
                        pos.push(worldX + 1, y + 1, worldZ);
                        pos.push(worldX + 1, y + 1, worldZ + 1);

                        idx.push(indexOffset + 0, indexOffset + 1, indexOffset + 2);
                        idx.push(indexOffset + 0, indexOffset + 2, indexOffset + 3);
                        indexOffset += 4;

                        texCoord.push(...BLOCK_TEXTURECOORD[this.map[x][y][z]]["right"]);

                        col.push(1, 1, 1, 1);
                        col.push(1, 1, 1, 1);
                        col.push(1, 1, 1, 1);
                        col.push(1, 1, 1, 1);
                    }

                    if (this.isAir(x - 1, y, z)) {
                        pos.push(worldX, y, worldZ);
                        pos.push(worldX, y, worldZ + 1);
                        pos.push(worldX, y + 1, worldZ + 1);
                        pos.push(worldX, y + 1, worldZ);

                        idx.push(indexOffset + 0, indexOffset + 1, indexOffset + 2);
                        idx.push(indexOffset + 0, indexOffset + 2, indexOffset + 3);
                        indexOffset += 4;

                        texCoord.push(...BLOCK_TEXTURECOORD[this.map[x][y][z]]["left"]);

                        col.push(1, 1, 1, 1);
                        col.push(1, 1, 1, 1);
                        col.push(1, 1, 1, 1);
                        col.push(1, 1, 1, 1);
                    }

                    if (this.isAir(x, y + 1, z)) {
                        pos.push(worldX, y + 1, worldZ + 1);
                        pos.push(worldX + 1, y + 1, worldZ + 1);
                        pos.push(worldX + 1, y + 1, worldZ);
                        pos.push(worldX, y + 1, worldZ);

                        idx.push(indexOffset + 0, indexOffset + 1, indexOffset + 2);
                        idx.push(indexOffset + 0, indexOffset + 2, indexOffset + 3);
                        indexOffset += 4;

                        texCoord.push(...BLOCK_TEXTURECOORD[this.map[x][y][z]]["top"]);

                        col.push(1, 1, 1, 1);
                        col.push(1, 1, 1, 1);
                        col.push(1, 1, 1, 1);
                        col.push(1, 1, 1, 1);
                    }

                    if (this.isAir(x, y - 1, z)) {
                        pos.push(worldX, y, worldZ);
                        pos.push(worldX + 1, y, worldZ);
                        pos.push(worldX + 1, y, worldZ + 1);
                        pos.push(worldX, y, worldZ + 1);

                        idx.push(indexOffset + 0, indexOffset + 1, indexOffset + 2);
                        idx.push(indexOffset + 0, indexOffset + 2, indexOffset + 3);
                        indexOffset += 4;

                        texCoord.push(...BLOCK_TEXTURECOORD[this.map[x][y][z]]["bottom"]);

                        col.push(1, 1, 1, 1);
                        col.push(1, 1, 1, 1);
                        col.push(1, 1, 1, 1);
                        col.push(1, 1, 1, 1);
                    }
                }
            }
        }
        return { "pos": pos, "idx": idx, "texCoord": texCoord, "col": col, "idxOffset": indexOffset };
    }

    isAir(x, y, z) {
        if (x < 0 || y < 0 || z < 0 || x >= CHUNK_SIZE_X || y >= CHUNK_SIZE_Y || z >= CHUNK_SIZE_Z) {
            return true;
        }
        return (this.map[x][y][z] === 0);
    }
}
