/**
 * @description 度数からラジアンに変換
 * @returns {number}
 */
export function deg2Rad(d) {
    return d * (Math.PI / 180);
}

/**
 * @description 3次元ベクトルをx軸, y軸, z軸の順に回転します。
 * @param {Object} vector
 * @param {number} vector.x
 * @param {number} vector.y
 * @param {number} vector.z
 * @param {Object} rotation
 * @param {number} rotation.x
 * @param {number} rotation.y
 * @param {number} rotation.z
 * @returns {Object}
 * @returns {number} returns.x
 * @returns {number} returns.y
 * @returns {number} returns.z
 */
export function rotateVectorXYZ(vector, rotation) {
    const { x: rx, y: ry, z: rz } = rotation;

    const cx = Math.cos(rx);
    const sx = Math.sin(rx);
    const cy = Math.cos(ry);
    const sy = Math.sin(ry);
    const cz = Math.cos(rz);
    const sz = Math.sin(rz);

    //x軸回転
    const x1 = vector.x;
    const y1 = vector.y * cx - vector.z * sx;
    const z1 = vector.y * sx + vector.z * cx;

    //y軸回転
    const x2 = x1 * cy + z1 * sy;
    const y2 = y1;
    const z2 = -x1 * sy + z1 * cy;

    //z軸回転
    return {
        x: x2 * cz - y2 * sz,
        y: x2 * sz + y2 * cz,
        z: z2,
    };
}

/**
 * @description 3次元ベクトルをz軸, y軸, x軸の順に回転します。
 * @param {Object} vector
 * @param {number} vector.x
 * @param {number} vector.y
 * @param {number} vector.z
 * @param {Object} rotation
 * @param {number} rotation.x
 * @param {number} rotation.y
 * @param {number} rotation.z
 * @returns {Object}
 * @returns {number} returns.x
 * @returns {number} returns.y
 * @returns {number} returns.z
 */
export function rotateVectorXYZ(vector, rotation) {
    const { x: rx, y: ry, z: rz } = rotation;

    const cx = Math.cos(rx);
    const sx = Math.sin(rx);
    const cy = Math.cos(ry);
    const sy = Math.sin(ry);
    const cz = Math.cos(rz);
    const sz = Math.sin(rz);

    //x軸回転
    const x1 = vector.x;
    const y1 = vector.y * cx - vector.z * sx;
    const z1 = vector.y * sx + vector.z * cx;

    // Y軸回転
    const x2 = x1 * cy + z1 * sy;
    const y2 = y1;
    const z2 = -x1 * sy + z1 * cy;

    // Z軸回転
    return {
        x: x2 * cz - y2 * sz,
        y: x2 * sz + y2 * cz,
        z: z2,
    };
}
