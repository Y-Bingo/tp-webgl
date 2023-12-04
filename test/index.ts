import { createProgram, createShader } from '../utils/game_helper.ts';

const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;
    attribute vec4 aTex;
    // varying vec2 vTex;
    
    void main() {
        gl_Position = vec4(aPosition);
        vTex = vec2(1.0, 1.0);
    }
`;
const FRAGMENT_SHADER_SOURCE = `
    precision mediump float;
    
    uniform sampler2D uImg;
    // varying vec2 vTex;

    void main() {
        // gl_FragColor = texture2D(uImg, vTex);
        gl_FragColor = vec4(vTex, 0.0, 1.0);
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

// const uImg = gl.getUniformLocation(program, 'uImg');
const aPosition = gl.getAttribLocation(program, 'aPosition');
// const aTex = gl.getAttribLocation(program, 'aTex');

const img = new Image();
img.src = './assets/content.png';
img.onload = () => {
	// 处理纹理坐标
	const texCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
	// prettier-ignore
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        0.0,  0.0,
        1.0,  0.0,
        0.0,  1.0,
        0.0,  1.0,
        1.0,  0.0,
        1.0,  1.0
    ]), gl.STATIC_DRAW);
	gl.enableVertexAttribArray(aPosition);
	gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
	// gl.enableVertexAttribArray(aTex);
	// gl.vertexAttribPointer(aTex, 2, gl.FLOAT, false, 0, 0);
	// gl.vertexAttrib2f(aTex, 1.0, 1.0);

	// // 处理纹理数据
	// const texture = gl.createTexture();
	// gl.activeTexture(gl.TEXTURE0);
	// gl.bindTexture(gl.TEXTURE_2D, texture);
	// // 设置参数

	// // 将图像上传到纹理
	// gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGBA, gl.UNSIGNED_BYTE, img);
	// gl.uniform1i(uImg, 0);

	gl.drawArrays(gl.TRIANGLES, 0, 6);
};
