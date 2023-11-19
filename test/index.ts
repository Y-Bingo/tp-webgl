import { createProgram, createShader } from './game_helper.ts';

const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;
    attribute float aPointSize;
    varying vec4 vColor;
    void main() {
        gl_Position = aPosition;
        gl_PointSize = aPointSize;
        vColor = aPosition;
    }
`;
const FRAGMENT_SHADER_SOURCE = `
    precision mediump float;
    uniform vec3 uColor;
    uniform float uAlpha;
    varying vec4 vColor;
    void main() {
        gl_FragColor = vColor;
    }
`;

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const gl = canvas.getContext('webgl') as WebGLRenderingContext;

const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);

const program = createProgram(gl, vertexShader, fragmentShader);

const aPosition = gl.getAttribLocation(program, 'aPosition');
const aPointSize = gl.getAttribLocation(program, 'aPointSize');

const uColor = gl.getUniformLocation(program, 'uColor');
const uAlpha = gl.getUniformLocation(program, 'uAlpha');
gl.uniform1f(uAlpha, 1.0);
gl.uniform3f(uColor, 1.0, 0.4, 0.2);

const POINTS = new Float32Array([
	0.5, // x
	0.5, // y
	10.0, // pSize
	-0.5, // x
	0.5, // y
	20.0, // pSize
	0.5, // x
	-0.5, // y
	30.0, // pSize
]);
const BYTE = POINTS.BYTES_PER_ELEMENT;
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, POINTS, gl.STATIC_DRAW);
// point
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, BYTE * 3, 0);
gl.enableVertexAttribArray(aPosition);
// pointSize
gl.vertexAttribPointer(aPointSize, 1, gl.FLOAT, false, BYTE * 3, BYTE * 2);
gl.enableVertexAttribArray(aPointSize);

gl.drawArrays(gl.POINTS, 0, 3);
