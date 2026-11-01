/**
 * @description 度数からラジアンに変換
 * @returns {number}
 */
export function deg2Rad(d) {
    return d * (Math.PI / 180);
}

/**
 * @description 3次元ベクトルをx軸, y軸, z軸の順に回転
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

    const cosx = Math.cos(rx);
    const sinx = Math.sin(rx);
    const cosy = Math.cos(ry);
    const siny = Math.sin(ry);
    const cosz = Math.cos(rz);
    const sinz = Math.sin(rz);

    //x
    const x1 = vector.x;
    const y1 = vector.y * cosx - vector.z * sinx;
    const z1 = vector.y * sinx + vector.z * cosx;

    //y
    const x2 = z1 * siny + x1 * cosy;
    const y2 = y1;
    const z2 = z1 * cosy - x1 * siny;

    //z
    return {
        x: x2 * cosz - y2 * sinz,
        y: x2 * sinz + y2 * cosz,
        z: z2,
    };
}

/**
 * @description 3次元ベクトルをz軸, y軸, x軸の順に回転
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
export function rotateVectorZXY(vector, rotation) {
    const { x: rx, y: ry, z: rz } = rotation;

    const cosx = Math.cos(rx);
    const sinx = Math.sin(rx);
    const cosy = Math.cos(ry);
    const siny = Math.sin(ry);
    const cosz = Math.cos(rz);
    const sinz = Math.sin(rz);

    //z
    const x1 = vector.x * cosz - vector.y * sinz;
    const y1 = vector.x * sinz + vector.y * cosz;
    const z1 = vector.z;

    //y
    const x2 = z1 * cosy - x1 * siny;
    const y2 = y1;
    const z2 = z1 * siny + x1 * cosy;

    //z
    return {
        x: x2 * cosz - y2 * sinz,
        y: x2 * sinz + y2 * cosz,
        z: z2,
    };
}
