export const CHUNK_SIZE_X = 16;
export const CHUNK_SIZE_Y = 32;
export const CHUNK_SIZE_Z = 16;

const TS = 1 / 16;
function scaleUV(coords) {
    return coords.map(x => x * TS);
}
function createBlockUV({ top, bottom = top, front = top, back = front, right = back, left = right }) {
    return {
        "top": scaleUV(top),
        "bottom": scaleUV(bottom),
        "front": scaleUV(front),
        "back": scaleUV(back),
        "right": scaleUV(right),
        "left": scaleUV(left)
    };
}

export const BLOCK_TYPES = {
    0: "air",
    1: "james_head",
    2: "dirt",
    3: "grass_block",
    4: "stone",
};
export const BLOCK_TEXTURECOORD = {
    1: createBlockUV({
        "top": [
            0, 1,
            1, 1,
            1, 0,
            0, 0
        ],
        "front": [
            2, 1,
            3, 1,
            3, 0,
            2, 0
        ],
        "back": [
            1, 1,
            2, 1,
            2, 0,
            1, 0
        ]
    }),
    2: createBlockUV({
        "top": [
            5, 1,
            6, 1,
            6, 0,
            5, 0
        ]
    }),
    3: createBlockUV({
        "top": [
            3, 1,
            4, 1,
            4, 0,
            3, 0
        ],
        "bottom": [
            5, 1,
            6, 1,
            6, 0,
            5, 0
        ],
        "front": [
            4, 1,
            5, 1,
            5, 0,
            4, 0
        ]
    }),
    4: createBlockUV({
        "top": [
            6, 1,
            7, 1,
            7, 0,
            6, 0
        ]
    })
};
