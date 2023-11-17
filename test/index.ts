import { createProgram, createShader } from './game_helper.ts';

const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;
    void main() {
        gl_Position = aPosition;
        gl_PointSize = 10.0;
    }
`;
const FRAGMENT_SHADER_SOURCE = `
    precision mediump float;
    uniform vec3 uColor;
    uniform float uAlpha;
    void main() {
        gl_FragColor = vec4( uColor, uAlpha );
    }
`;

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const gl = canvas.getContext('webgl') as WebGLRenderingContext;

const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);

const program = createProgram(gl, vertexShader, fragmentShader);

const aPosition = gl.getAttribLocation(program, 'aPosition');

const uColor = gl.getUniformLocation(program, 'uColor');
const uAlpha = gl.getUniformLocation(program, 'uAlpha');
gl.uniform1f(uAlpha, 1.0);
gl.uniform3f(uColor, 1.0, 0.4, 0.2);

const POINTS = new Float32Array([
	0.5,
	0.5, //
	-0.5,
	0.5, //
	0.5,
	-0.5,
]);
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, POINTS, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition);

gl.drawArrays(gl.TRIANGLES, 0, 3);
