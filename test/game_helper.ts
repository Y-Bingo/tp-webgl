export function createShader(gl: WebGLRenderingContext, type, shaderSource) {
	const shader = gl.createShader(type);

	gl.shaderSource(shader!, shaderSource);
	gl.compileShader(shader!);

	return shader!;
}

export function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
	const program = gl.createProgram() as WebGLProgram;

	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);

	gl.linkProgram(program);
	gl.useProgram(program);

	return program!;
}
