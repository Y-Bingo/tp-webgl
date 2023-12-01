/**
 * 归一化，单位向量
 */
export function normalize(a: number[]) {
	let sum = 0;
	for (let v of a) {
		sum += v * v;
	}

	const sqrt = Math.sqrt(sum);
	// prettier-ignore
	return new Float32Array([
        a[ 0 ] / sqrt,
        a[ 1 ] / sqrt,
        a[ 2 ] / sqrt,
    ])
}

/**
 * 叉乘
 */
export function cross(a, b) {
	// prettier-ignore
	return new Float32Array([
        a[ 1 ] * b[ 2 ] - a[ 2 ] * b[ 1 ],
        a[ 2 ] * b[ 0 ] - a[ 0 ] * b[ 2 ],
        a[ 0 ] * b[ 1 ] - a[ 1 ] * b[ 0 ],
    ]);
}

/**
 * 点乘
 */
export function dot(a, b): number {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/**
 * 向量差
 */
export function minus(a, b) {
	// prettier-ignore
	return new Float32Array([
        a[ 0 ] - b[ 0 ],
        a[ 1 ] - b[ 1 ],
        a[ 2 ] - b[ 2 ],
    ])
}

/**
 * 获取视图矩阵
 */
export function getViewMatrix(ex, ey, yz, lx, ly, lz, ux, uy, uz) {
    
}
