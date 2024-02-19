import { createProgram, createShader } from '../utils/game_helper.ts';
import FRAGMENT_SHADER_SOURCE from './shader/index.fs.glsl';
import VERTEX_SHADER_SOURCE from './shader/index.vs.glsl';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const gl = canvas.getContext('webgl') as WebGLRenderingContext;
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
const program = createProgram(gl, vertexShader, fragmentShader);

const aTex = gl.getAttribLocation(program, 'aTex');
const uImg = gl.getUniformLocation(program, 'uImg');
const uTexSize = gl.getUniformLocation(program, 'uTexSize');
const aPosition = gl.getAttribLocation(program, 'aPosition');

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
        // 0.0,  1.0,
        // 1.0,  0.0,
        1.0,  1.0
    ]), gl.STATIC_DRAW);
	gl.enableVertexAttribArray(aPosition);
	gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(aTex);
	gl.vertexAttribPointer(aTex, 2, gl.FLOAT, false, 0, 0);
	gl.uniform2f(uTexSize, img.width, img.height);

	// 处理纹理数据
	const texture = gl.createTexture();
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texture);
	// 设置参数
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

	// 处理放大缩小的逻辑
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

	// 处理 横向 纵向 平铺的方式
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	// 将图像上传到纹理
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
	gl.uniform1i(uImg, 0);

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};
