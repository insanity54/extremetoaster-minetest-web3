uniform float time;
uniform vec3 color;
varying vec2 vUv;
#pragma glslify: random = require(glsl-random)

void main() {
  gl_FragColor.rgba = vec4(0.8 + 0.3 * sin(vUv.yxx + time) + color, 0.01);
  //gl_FragColor.rgba = vec4(vec3(0.), 1.5);
}