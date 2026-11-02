export const CHUNK_SIZE_X = 16;
export const CHUNK_SIZE_Y = 32;
export const CHUNK_SIZE_Z = 16;

export const BLOCK_TYPES = {
    0: "air",
    1: "james_head",
    2: "dirt",
    3: "stone",
};
const TS = 1 / 16;
export const BLOCK_TEXTURECOORD = {
    1: {
        "top": [
            TS * 0, TS * 1,
            TS * 1, TS * 1,
            TS * 1, TS * 0,
            TS * 0, TS * 0,
        ],
        "bottom": [
            TS * 0, TS * 1,
            TS * 1, TS * 1,
            TS * 1, TS * 0,
            TS * 0, TS * 0,
        ],
        "right": [
            TS * 1, TS * 1,
            TS * 2, TS * 1,
            TS * 2, TS * 0,
            TS * 1, TS * 0,
        ],
        "left": [
            TS * 1, TS * 1,
            TS * 2, TS * 1,
            TS * 2, TS * 0,
            TS * 1, TS * 0,
        ],
        "front": [
            TS * 2, TS * 1,
            TS * 3, TS * 1,
            TS * 3, TS * 0,
            TS * 2, TS * 0,
        ],
        "back": [
            TS * 1, TS * 1,
            TS * 2, TS * 1,
            TS * 2, TS * 0,
            TS * 1, TS * 0,
        ],
    },
};
