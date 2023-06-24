/**
 * 创建平移矩阵
 * @param {*} x 
 * @param {*} y 
 * @param {*} z 
 * @returns 
 */
function createTranslateMatrix(x = 0, y = 0, z = 0) {
	return new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        x, y, z, 1.0
    ]);
}

/**
 * 创建缩放矩阵
 * @param {*} x 
 * @param {*} y 
 * @param {*} z 
 * @returns 
 */
function createScaleMatrix(x = 0, y = 0, z = 0) {
	return new Float32Array([
        x, 0.0, 0.0, 0.0,
        0.0, y, 0.0, 0.0,
        0.0, 0.0, z, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
}

/**
 * 创建绕 Z 轴旋转的矩阵
 * @param {*} x 
 * @param {*} y 
 * @param {*} z 
 * @returns 
 */
function createRotateMatrix( deg ) {
	return new Float32Array([
        Math.cos(deg),  -Math.sin(deg), 0.0, 0.0,
        Math.sin(deg), Math.cos(deg), 0.0, 0.0,
        0.0,            0.0,           1.0, 0.0,
        0.0,            0.0,           0.0, 1.0
    ]);
}


