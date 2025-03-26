precision mediump float;

varying float vRandoms;

void main() {
    gl_FragColor = vec4(1.0, vRandoms, 0.0, 1.0);
}
