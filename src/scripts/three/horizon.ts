// Glowing orange planet horizons drawn in a single full-screen fragment shader (plain WebGL, no library).
// `arc` is the hero's luminous rim with light rays; `planet` is the dotted globe in the Experience section.

const vertex = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uRise;
uniform float uMode;
const vec3 HOT = vec3(1.0, 0.95, 0.88);
const vec3 PEACH = vec3(1.0, 0.70, 0.48);
const vec3 ORANGE = vec3(1.0, 0.357, 0.122);
const vec3 DEEP = vec3(0.76, 0.255, 0.047);

vec4 arc(vec2 uv, vec2 p, float aspect) {
  float radius = max(aspect * 0.78, 1.2);
  vec2 center = vec2(0.0, -radius + mix(0.3, 0.52, uRise));
  vec2 q = p - center;
  float d = length(q) - radius;
  float crest = pow(clamp(q.y / radius, 0.0, 1.0), 4.0);
  float band = 0.1;
  float t = clamp(-d / band, 0.0, 1.0);
  float inBand = step(-band, d) * step(d, 0.0);
  vec3 bandColor = mix(mix(HOT, PEACH, smoothstep(0.0, 0.22, t)), mix(ORANGE, DEEP, smoothstep(0.55, 1.0, t)), smoothstep(0.18, 0.6, t));
  float bandAlpha = inBand * (1.0 - smoothstep(0.7, 1.0, t)) * (0.25 + 0.75 * crest);
  float rim = exp(-abs(d) * 170.0) * (0.35 + 0.65 * crest);
  float innerArc = exp(-abs(d + band * 2.1) * 110.0) * 0.22 * crest;
  float outside = step(0.0, d);
  float bloom = exp(-max(d, 0.0) * 5.5) * outside * (0.12 + 0.88 * crest) * (0.92 + 0.08 * sin(uTime * 0.8));
  float rays = 0.5 + 0.5 * sin(uv.x * aspect * 34.0 + sin(uv.x * 9.0 + uTime * 0.15) * 2.4);
  rays = pow(rays, 7.0) * outside * exp(-max(d, 0.0) * 1.8) * smoothstep(0.02, 0.35, crest) * 0.28;
  vec3 color = bandColor * bandAlpha * 1.25 + HOT * rim + ORANGE * bloom * 0.6 + PEACH * rays + PEACH * innerArc;
  float inside = 1.0 - outside;
  float alpha = clamp(max(max(bandAlpha, rim), bloom * 0.6 + rays) + inside * 0.96, 0.0, 1.0);
  return vec4(color, alpha);
}

vec4 planet(vec2 p, float aspect) {
  float radius = max(aspect * 0.62, 0.95);
  vec2 center = vec2(0.0, -radius + mix(-0.12, 0.27, uRise));
  vec2 q = p - center;
  float d = length(q) - radius;
  float inside = step(d, 0.0);
  float rim = exp(-abs(d) * 42.0);
  float halo = exp(-max(d, 0.0) * 5.0) * (1.0 - inside);
  vec2 cell = fract(q * 44.0) - 0.5;
  float dots = smoothstep(0.2, 0.0, length(cell)) * inside * smoothstep(-0.5, 0.0, d);
  float shimmer = 0.85 + 0.15 * sin(uTime * 1.2 + q.x * 5.0);
  vec3 color = ORANGE * halo * 0.8 * shimmer + PEACH * rim * 1.3 + ORANGE * dots * 0.55;
  float alpha = clamp(max(max(halo * 0.8, rim), inside * 0.92), 0.0, 1.0);
  return vec4(color, alpha);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y);
  gl_FragColor = uMode > 0.5 ? arc(uv, p, aspect) : planet(p, aspect);
}
`;

export type HorizonMode = 'arc' | 'planet';

export function createHorizon(canvas: HTMLCanvasElement, mode: HorizonMode = 'planet') {
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl) return null;
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  };
  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  // One oversized triangle covers the whole viewport.
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const uResolution = gl.getUniformLocation(program, 'uResolution');
  const uTime = gl.getUniformLocation(program, 'uTime');
  const uRise = gl.getUniformLocation(program, 'uRise');
  gl.uniform1f(gl.getUniformLocation(program, 'uMode'), mode === 'arc' ? 1 : 0);

  let rise = 0;
  let time = 0;
  let frame = 0;
  let last = 0;
  let running = false;

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = Math.max(1, Math.round(canvas.clientWidth * ratio));
    const height = Math.max(1, Math.round(canvas.clientHeight * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  };
  const draw = () => {
    resize();
    gl.uniform2f(uResolution, canvas.width, canvas.height);
    gl.uniform1f(uTime, time);
    gl.uniform1f(uRise, rise);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  const tick = (now: number) => {
    time += Math.min(0.05, (now - last) / 1000);
    last = now;
    draw();
    frame = running ? requestAnimationFrame(tick) : 0;
  };

  return {
    start() {
      if (running) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    },
    stop() {
      running = false;
      cancelAnimationFrame(frame);
      draw();
    },
    /** 0 = resting position, 1 = fully risen. */
    setRise(value: number) {
      rise = value;
      if (!running) draw();
    },
    destroy() {
      running = false;
      cancelAnimationFrame(frame);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}

export type Horizon = NonNullable<ReturnType<typeof createHorizon>>;
