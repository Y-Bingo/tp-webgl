import { createProgram, createShader } from '../../utils/game_helper.ts';

const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;

    uniform vec2 uResolution;    
    
    void main() {
        vec2 clipSpace = aPosition.xy  / uResolution  * 2.0 - 1.0;
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    }
`;
const FRAGMENT_SHADER_SOURCE = `
    precision mediump float;
    uniform vec4 uColor;
    void main() {
        gl_FragColor = uColor;
    }
`;

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const gl = canvas.getContext('webgl') as WebGLRenderingContext;
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
const program = createProgram(gl, vertexShader, fragmentShader);

const uColor = gl.getUniformLocation(program, 'uColor');
const aPosition = gl.getAttribLocation(program, 'aPosition');
const uResolution = gl.getUniformLocation(program, 'uResolution');

// prettier-ignore
// 顶点坐标
// const POINTS = new Float32Array([
//     10, 20,
//     80, 20,
//     10, 30,
//     10, 30,
//     80, 20,
//     80, 30,
// ]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
// gl.bufferData(gl.ARRAY_BUFFER, POINTS, gl.STATIC_DRAW);

// point
gl.enableVertexAttribArray(aPosition);
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

gl.uniform2f(uResolution, gl.canvas.width, gl.canvas.height);

for (let i = 0; i < 50; i++) {
	setRectangle(gl, rangeInt(gl.canvas.width), rangeInt(gl.canvas.height), rangeInt(gl.canvas.width) / 2, rangeInt(gl.canvas.height) / 2);
	gl.uniform4f(uColor, Math.random(), Math.random(), Math.random(), 1);
	gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function rangeInt(range) {
	return Math.floor(Math.random() * range);
}

function setRectangle(gl, x, y, w, h) {
	const x1 = x;
	const x2 = x + w;
	const y1 = y;
	const y2 = y + h;
	// prettier-ignore
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x2, y2,
        x1, y1,
        x1, y2,
        x2, y2,
    ]), gl.STATIC_DRAW);
}
