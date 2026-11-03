export const CHUNK_SIZE_X = 16;
export const CHUNK_SIZE_Y = 32;
export const CHUNK_SIZE_Z = 16;

export const GRAVITY = 0.1;
export const PLAYER_MOVE_SPEED = 0.1;

const TEXTURE_SIZE = 128;

/**
 * @param {Array<number>} coords
 * @returns {Array<number>}
 */
function scaleUV(coords) {
    return coords.map((x) => {
        return x / TEXTURE_SIZE;
    });
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
            1, 9,
            9, 9,
            9, 1,
            1, 1
        ],
        "front": [
            21, 9,
            29, 9,
            29, 1,
            21, 1
        ],
        "back": [
            11, 9,
            19, 9,
            19, 1,
            11, 1
        ]
    }),
    2: createBlockUV({
        "top": [
            51, 9,
            59, 9,
            59, 1,
            51, 1
        ]
    }),
    3: createBlockUV({
        "top": [
            31, 9,
            39, 9,
            39, 1,
            31, 1
        ],
        "bottom": [
            51, 9,
            59, 9,
            59, 1,
            51, 1
        ],
        "front": [
            41, 9,
            49, 9,
            49, 1,
            41, 1
        ]
    })
};