uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandoms;

varying float vRandoms;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += aRandoms * 0.4;
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
    vRandoms = aRandoms;
}
