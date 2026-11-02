import { CHUNK_SIZE_X, CHUNK_SIZE_Y, CHUNK_SIZE_Z, BLOCK_TEXTURECOORD } from "./config.js";

export class Chunk {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
                for (let y = 0; y < 2; y++) {
                    this.map[x][y][z] = 1;
                }
            }
        }
    }

    generateMesh(indexOffset) {
        let pos = [];
        let idx = [];
        let texCoord = [];
        let col = [];
        for (let x = 0; x < CHUNK_SIZE_X; x++) {
            for (let y = 0; y < CHUNK_SIZE_Y; y++) {
                for (let z = 0; z < CHUNK_SIZE_Z; z++) {
                    if (this.isAir(x, y, z)) {
                        continue;
                    }

                    if (this.isAir(x, y, z + 1)) {
                        pos.push(x, y, z + 1);
                        pos.push(x + 1, y, z + 1);
                        pos.push(x + 1, y + 1, z + 1);
                        pos.push(x, y + 1, z + 1);

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
                        //
                    }

                    if (this.isAir(x + 1, y, z)) {
                        //
                    }

                    if (this.isAir(x - 1, y, z)) {
                        //
                    }

                    if (this.isAir(x, y + 1, z)) {
                        //
                    }

                    if (this.isAir(x, y - 1, z)) {
                        //
                    }
                }
            }
        }
        return { "pos": pos, "idx": idx, "texCoord": texCoord, "col": col };
    }

    isAir(x, y, z) {
        if (x < 0 || y < 0 || z < 0 || x >= CHUNK_SIZE_X || y >= CHUNK_SIZE_Y || z >= CHUNK_SIZE_Z) {
            return true;
        }
        return (this.map[x][y][z] === 0);
    }
}
