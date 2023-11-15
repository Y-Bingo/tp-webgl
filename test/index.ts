const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const gl = canvas.getContext('webgl');

gl?.clearColor(1.0, 0.0, 0.0, 1.0);
gl?.clear(gl.COLOR_BUFFER_BIT);

// 创建 program
// const program = gl.createProgram();

const VERTEX_SHADER_SOURCE = ``;
const FRAGMENT_SHADER_SOURCE = ``;

console.log('new load index');
