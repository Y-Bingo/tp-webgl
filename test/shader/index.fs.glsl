precision mediump float;

uniform vec2 uTexSize;
uniform sampler2D uImg;
varying vec2 vTex;

void main() {
    vec2 onePixel = vec2(1., 1.) / uTexSize;

    gl_FragColor = texture2D(uImg, vTex);
}