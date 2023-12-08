attribute vec4 aPosition;
attribute vec2 aTex;
varying vec2 vTex;

void main() {
    gl_Position = vec4(aPosition);
    vTex = aTex;
}