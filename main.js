import { vertex_shader_source, fragment_shader_source, getAttributeLocations, getAttributeStrides, getUniformLocations } from "./shader.js";
import { create_shader, create_program, create_vbo, create_ibo, create_texture, set_attribute } from "./gl_functions.js";
import { Mat4 } from "./matrix.js";
import { deg2rad, rotateVectorXYZ } from "./rotation.js";
import { Chunk } from "./chunk.js";
import { PLAYER_MOVE_SPEED } from "./config.js";

/** @type {HTMLCanvasElement | null} */
const canvas = document.getElementById("canvas");
if (canvas === null) {
    throw new Error("canvas");
}

/** @type {WebGLRenderingContext | null} */
const gl = canvas.getContext("webgl");
if (gl === null) {
    throw new Error("gl");
}

/** @type {WebGLShader | null} */
const vertex_shader = create_shader(gl, vertex_shader_source, "vertex");
/** @type {WebGLShader | null} */
const fragment_shader = create_shader(gl, fragment_shader_source, "fragment");
if (vertex_shader === null || fragment_shader === null) {
    throw new Error("create_shader");
}

/** @type {WebGLProgram | null} */
const program = create_program(gl, vertex_shader, fragment_shader);
if (program === null) {
    throw new Error("create_program");
}

gl.useProgram(program);

/** @type {Record<string, number>} */
const attributeLocations = getAttributeLocations(gl, program);
/** @type {Record<string, number>} */
const attributeStrides = getAttributeStrides();

/** @type {Record<string, number>} */
const uniformLocations = getUniformLocations(gl, program);

gl.activeTexture(gl.TEXTURE0);
try {
    const texture = await create_texture(gl, "./texture.png");
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
} catch (error) {
    throw new Error("create_texture", { cause: error });
}

const mMatrix = Mat4.identity(Mat4.create());
const vMatrix = Mat4.identity(Mat4.create());
const pMatrix = Mat4.identity(Mat4.create());
const mvpMatrix = Mat4.identity(Mat4.create());

const player = {
    pos: { x: 0, y: 4, z: 0 },
    rot: { x: 0, y: 0, z: 0 },
};

const keyInputs = {};
window.addEventListener("keydown", (event) => {
    keyInputs[event.code] = true;
});
window.addEventListener("keyup", (event) => {
    keyInputs[event.code] = false;
});

/** @type {Array<Chunk>} */
let chunks = [];

/**
 * @param {WebGLRenderingContext} gl
 * @param {number} indexCount
 * @param {number} time
 * @returns {void}
 */
function mainLoop(gl, indexCount, time) {
    //キー操作
    const cosy = Math.cos(deg2rad(player.rot.y));
    const siny = Math.sin(deg2rad(player.rot.y));
    if (keyInputs["KeyW"] === true) {
        player.pos.x += PLAYER_MOVE_SPEED * siny;
        player.pos.z += PLAYER_MOVE_SPEED * cosy;
    }
    if (keyInputs["KeyS"] === true) {
        player.pos.x += -PLAYER_MOVE_SPEED * siny;
        player.pos.z += -PLAYER_MOVE_SPEED * cosy;
    }
    if (keyInputs["KeyA"] === true) {
        player.pos.x += PLAYER_MOVE_SPEED * cosy;
        player.pos.z += -PLAYER_MOVE_SPEED * siny;
    }
    if (keyInputs["KeyD"] === true) {
        player.pos.x += -PLAYER_MOVE_SPEED * cosy;
        player.pos.z += PLAYER_MOVE_SPEED * siny;
    }
    if (keyInputs["ArrowRight"] === true) {
        player.rot.y--;
    }
    if (keyInputs["ArrowLeft"] === true) {
        player.rot.y++;
    }
    if (keyInputs["ArrowUp"] === true) {
        player.rot.x--;
    }
    if (keyInputs["ArrowDown"] === true) {
        player.rot.x++;
    }
    //gldraw
    gl.clearDepth(1.0);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniform1i(uniformLocations["texture"], 0);

    Mat4.identity(mMatrix);
    Mat4.identity(vMatrix);
    Mat4.identity(pMatrix);
    Mat4.identity(mvpMatrix);

    const center = rotateVectorXYZ({ x: 0, y: 0, z: 1 }, { x: deg2rad(player.rot.x), y: deg2rad(player.rot.y), z: deg2rad(player.rot.z) });
    const up = rotateVectorXYZ({ x: 0, y: 1, z: 0 }, { x: deg2rad(player.rot.x), y: deg2rad(player.rot.y), z: deg2rad(player.rot.z) });

    Mat4.lookAt(vMatrix, [player.pos.x, player.pos.y + 1.6, player.pos.z], [player.pos.x + center.x, player.pos.y + 1.6 + center.y, player.pos.z + center.z], [up.x, up.y, up.z]);
    Mat4.perspective(pMatrix, deg2rad(80), gl.canvas.width / gl.canvas.height, 0.01, 1000);

    Mat4.multiply(mvpMatrix, pMatrix, vMatrix);
    Mat4.multiply(mvpMatrix, mvpMatrix, mMatrix);

    gl.uniformMatrix4fv(uniformLocations["mvpMatrix"], false, mvpMatrix);

    gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(() => mainLoop(gl, indexCount, time + 1));
}

/**
 * @param {WebGLRenderingContext} gl
 * @returns {void}
 */
function init(gl) {
    /**
     * @param {WebGLRenderingContext} gl
     * @returns {void}
     */
    function resizeCanvas(gl) {
        gl.canvas.width = window.innerWidth;
        gl.canvas.height = window.innerHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
    window.addEventListener("resize", () => {
        setTimeout(() => {
            resizeCanvas(gl);
        }, 10);
    });
    resizeCanvas(gl);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            chunks.push(new Chunk(i, j))
        }
    }

    /** @type {Array<number>} */
    let index = [];
    /** @type {Array<number>} */
    let position = [];
    /** @type {Array<number>} */
    let color = [];
    /** @type {Array<number>} */
    let textureCoord = [];
    /** @type {number} */
    let indexOffset = 0;

    for (const c of chunks) {
        const { pos, idx, texCoord, col, idxOffset } = c.generateMesh(indexOffset);
        indexOffset = idxOffset;
        index.push(...idx);
        position.push(...pos);
        color.push(...col);
        textureCoord.push(...texCoord);
    }

    const ibo = create_ibo(gl, index);
    const position_vbo = create_vbo(gl, position);
    const color_vbo = create_vbo(gl, color);
    const textureCoord_vbo = create_vbo(gl, textureCoord);
    if (ibo === null) {
        throw new Error("create_ibo");
    }
    if (position_vbo === null || color_vbo === null || textureCoord_vbo === null) {
        throw new Error("create_vbo");
    }

    set_attribute(gl, {
        "position": position_vbo,
        "color": color_vbo,
        "textureCoord": textureCoord_vbo,
    }, attributeLocations, attributeStrides);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

    mainLoop(gl, index.length, 0);
}

init(gl);
