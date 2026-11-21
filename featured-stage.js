// 3D curved WebGL image stage for the Featured Work section.
// Renders each .work-row-media image onto a subdivided 3D curved plane synced with scroll and hover.
window.initFeaturedStage = function (stageEl, rows) {
  if (!stageEl || !rows || !rows.length) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'work-stage-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  stageEl.prepend(canvas);

  const gl =
    canvas.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'high-performance' }) ||
    canvas.getContext('experimental-webgl', { alpha: true, antialias: true });

  if (!gl) {
    canvas.remove();
    return;
  }

  const vsSource = `
    precision mediump float;
    attribute vec2 aPos;
    attribute vec2 aUv;

    uniform vec2 uPlaneSize;
    uniform vec2 uWorldPos;
    uniform vec2 uViewport;
    uniform float uVelocity;
    uniform float uHover;
    uniform float uCameraZ;
    uniform mat4 uProjection;

    varying vec2 vUv;
    varying float vNormY;
    varying float vDepthShade;

    void main() {
      vUv = aUv;
      float PI = 3.14159265359;
      float normY = clamp(uWorldPos.y / max(uViewport.y * 0.6, 1.0), -1.4, 1.4);
      vNormY = normY;

      float hoverScale = 1.0 + uHover * 0.015;
      float lx = aPos.x * uPlaneSize.x * hoverScale;
      float ly = aPos.y * uPlaneSize.y * hoverScale;
      float lz = 0.0;

      float velFactor = clamp(uVelocity * 0.015, -1.0, 1.0);
      float velMag = abs(velFactor);
      float dxCenter = aUv.x - 0.5;
      float dyCenter = aUv.y - 0.5;

      // Sinusoidal ribbon wave across the sheet
      float waveZ = 24.0 + velMag * 28.0;
      float dzWave = sin(aUv.y * PI * 1.25 + normY * 1.1) * waveZ;
      float twistZ = sin(aUv.x * PI + normY * 0.9) * (12.0 + velMag * 14.0) * dyCenter;

      // Cylindrical arch across X
      float archZ = 26.0 + velMag * 18.0;
      float dzArch = -(dxCenter * dxCenter) * archZ;

      // Horizontal S-sway for curved side edges
      float swayX = 14.0 + velMag * 16.0;
      float dxSway = sin(aUv.y * PI * 1.2 + normY * 0.85) * swayX;

      // Subtle vertical wave on top/bottom edges
      float waveY = sin(aUv.x * PI * 1.15 + normY * 0.8) * (8.0 + velMag * 10.0)
                  + velFactor * 12.0 * (dxCenter * dxCenter);

      lx += dxSway;
      ly += waveY;
      lz += dzWave + twistZ + dzArch;

      // Gentle cylindrical drum tilt around X proportional to vertical screen offset
      float tiltX = -normY * 0.22 + velFactor * 0.07;
      float cx = cos(tiltX);
      float sx = sin(tiltX);
      float ry = ly * cx - lz * sx;
      float rz = ly * sx + lz * cx;

      // Subtle Y twist for off-center depth
      float tiltY = normY * 0.05;
      float cy = cos(tiltY);
      float sy = sin(tiltY);
      float rx = lx * cy + rz * sy;
      rz = -lx * sy + rz * cy;

      rz += uHover * 24.0;

      vDepthShade = rz / 56.0;

      vec3 world = vec3(rx + uWorldPos.x, ry + uWorldPos.y, rz);
      vec4 mvPos = vec4(world.x, world.y, world.z - uCameraZ, 1.0);
      gl_Position = uProjection * mvPos;
    }
  `;

  const fsSource = `
    precision mediump float;
    uniform sampler2D uTex;
    uniform vec2 uPlaneSize;
    uniform vec2 uTexSize;
    uniform float uHover;
    uniform float uHasTex;

    varying vec2 vUv;
    varying float vNormY;
    varying float vDepthShade;

    void main() {
      vec2 halfSize = uPlaneSize * 0.5;
      vec2 pxPos = (vUv - 0.5) * uPlaneSize;
      float radius = min(16.0, min(halfSize.x, halfSize.y));
      vec2 q = abs(pxPos) - (halfSize - vec2(radius));
      float dist = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - radius;
      float alpha = 1.0 - smoothstep(-1.2, 1.2, dist);
      if (alpha < 0.01) discard;

      float pAspect = uPlaneSize.x / max(uPlaneSize.y, 1.0);
      float tAspect = uTexSize.x / max(uTexSize.y, 1.0);
      vec2 uv = vUv;
      if (pAspect > tAspect) {
        float s = tAspect / pAspect;
        uv.y = (uv.y - 0.5) * s + 0.5;
      } else {
        float s = pAspect / tAspect;
        uv.x = (uv.x - 0.5) * s + 0.5;
      }

      vec3 texColor = uHasTex > 0.5 ? texture2D(uTex, uv).rgb : vec3(0.08, 0.08, 0.09);
      float focus = 1.0 - smoothstep(0.15, 1.05, abs(vNormY));
      float brightness = mix(0.36, 1.0, max(focus, uHover * 0.85));
      float shade = 0.94 + 0.06 * clamp(vDepthShade, -1.0, 1.0);

      gl_FragColor = vec4(texColor * brightness * shade, alpha);
    }
  `;

  function compileShader(type, source) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('FeaturedStage shader error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vs = compileShader(gl.VERTEX_SHADER, vsSource);
  const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) {
    canvas.remove();
    return;
  }

  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('FeaturedStage link error:', gl.getProgramInfoLog(program));
    canvas.remove();
    return;
  }

  stageEl.classList.add('has-webgl');

  // Build subdivided plane geometry (48 cols x 32 rows)
  const COLS = 48;
  const ROWS = 32;
  const vertCount = (COLS + 1) * (ROWS + 1);
  const positions = new Float32Array(vertCount * 2);
  const uvs = new Float32Array(vertCount * 2);
  let vIdx = 0;
  for (let r = 0; r <= ROWS; r++) {
    const v = r / ROWS; // 0 = top, 1 = bottom
    const py = 0.5 - v; // +0.5 = top, -0.5 = bottom
    for (let c = 0; c <= COLS; c++) {
      const u = c / COLS;
      const px = u - 0.5;
      positions[vIdx] = px;
      positions[vIdx + 1] = py;
      uvs[vIdx] = u;
      uvs[vIdx + 1] = v;
      vIdx += 2;
    }
  }

  const indices = new Uint16Array(COLS * ROWS * 6);
  let iIdx = 0;
  for (let r = 0; r < ROWS; r++) {
    const rowStart = r * (COLS + 1);
    const nextRowStart = (r + 1) * (COLS + 1);
    for (let c = 0; c < COLS; c++) {
      const a = rowStart + c;
      const b = rowStart + c + 1;
      const cc = nextRowStart + c;
      const d = nextRowStart + c + 1;
      indices[iIdx++] = a;
      indices[iIdx++] = cc;
      indices[iIdx++] = b;
      indices[iIdx++] = b;
      indices[iIdx++] = cc;
      indices[iIdx++] = d;
    }
  }

  const posBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  const uvBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
  gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);

  const idxBuf = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  const aPos = gl.getAttribLocation(program, 'aPos');
  const aUv = gl.getAttribLocation(program, 'aUv');
  const uPlaneSize = gl.getUniformLocation(program, 'uPlaneSize');
  const uWorldPos = gl.getUniformLocation(program, 'uWorldPos');
  const uViewport = gl.getUniformLocation(program, 'uViewport');
  const uVelocity = gl.getUniformLocation(program, 'uVelocity');
  const uHover = gl.getUniformLocation(program, 'uHover');
  const uCameraZ = gl.getUniformLocation(program, 'uCameraZ');
  const uProjection = gl.getUniformLocation(program, 'uProjection');
  const uTex = gl.getUniformLocation(program, 'uTex');
  const uTexSize = gl.getUniformLocation(program, 'uTexSize');
  const uHasTex = gl.getUniformLocation(program, 'uHasTex');

  function drawRoundedRectPath(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function prepareTextureSource(img) {
    const nw = img.naturalWidth || 1;
    const nh = img.naturalHeight || 1;
    if (nw >= nh) {
      return { source: img, width: nw, height: nh };
    }

    // Compose portrait screenshots (e.g. mobile apps) onto a 1280x800 landscape frame
    const cw = 1280;
    const ch = 800;
    const offscreen = document.createElement('canvas');
    offscreen.width = cw;
    offscreen.height = ch;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return { source: img, width: nw, height: nh };

    ctx.fillStyle = '#0d0e12';
    ctx.fillRect(0, 0, cw, ch);

    ctx.save();
    try {
      ctx.filter = 'blur(42px)';
    } catch (_) {}
    ctx.globalAlpha = 0.48;
    const bgScale = Math.max(cw / nw, ch / nh) * 1.15;
    const bw = nw * bgScale;
    const bh = nh * bgScale;
    ctx.drawImage(img, (cw - bw) * 0.5, (ch - bh) * 0.5, bw, bh);
    ctx.restore();

    const grad = ctx.createRadialGradient(cw * 0.5, ch * 0.5, ch * 0.15, cw * 0.5, ch * 0.5, cw * 0.7);
    grad.addColorStop(0, 'rgba(10, 10, 14, 0.25)');
    grad.addColorStop(1, 'rgba(10, 10, 14, 0.88)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, cw, ch);

    const targetH = 680;
    const targetW = targetH * (nw / nh);
    const dx = (cw - targetW) * 0.5;
    const dy = (ch - targetH) * 0.5;
    const radius = 28;

    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
    ctx.shadowBlur = 36;
    ctx.shadowOffsetY = 14;
    drawRoundedRectPath(ctx, dx, dy, targetW, targetH, radius);
    ctx.fillStyle = '#111114';
    ctx.fill();
    ctx.restore();

    ctx.save();
    drawRoundedRectPath(ctx, dx, dy, targetW, targetH, radius);
    ctx.clip();
    ctx.drawImage(img, dx, dy, targetW, targetH);
    ctx.restore();

    ctx.save();
    drawRoundedRectPath(ctx, dx, dy, targetW, targetH, radius);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    return { source: offscreen, width: cw, height: ch };
  }

  function uploadTexture(item) {
    if (!item.img || !item.img.naturalWidth) return;
    const prepared = prepareTextureSource(item.img);
    const tex = item.tex || gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, prepared.source);
    item.tex = tex;
    item.texW = prepared.width;
    item.texH = prepared.height;
    item.ready = true;
  }

  const items = rows.map((row) => {
    const media = row.querySelector('.work-row-media');
    const meta = row.querySelector('.work-row-meta');
    const img = row.querySelector('.work-row-media img');
    const item = {
      row,
      media,
      meta,
      img,
      tex: null,
      texW: 16,
      texH: 10,
      ready: false,
      hoverTarget: 0,
      hover: 0,
      lastMetaOpacity: -1
    };

    if (img) {
      if (img.complete && img.naturalWidth > 0) {
        uploadTexture(item);
      } else {
        img.addEventListener('load', () => uploadTexture(item));
      }
    }

    row.addEventListener('pointerenter', () => { item.hoverTarget = 1; });
    row.addEventListener('pointerleave', () => { item.hoverTarget = 0; });
    row.addEventListener('focus', () => { item.hoverTarget = 1; });
    row.addEventListener('blur', () => { item.hoverTarget = 0; });

    return item;
  });

  // Fallback solid 1x1 texture when an image hasn't finished loading yet
  const fallbackTex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, fallbackTex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([20, 20, 24, 255]));

  let vw = window.innerWidth;
  let vh = window.innerHeight;
  let cameraZ = 1000;
  const projMatrix = new Float32Array(16);

  function updateViewport() {
    vw = window.innerWidth;
    vh = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(vw * dpr));
    canvas.height = Math.max(1, Math.round(vh * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);

    const fovRad = (45 * Math.PI) / 180;
    const f = 1.0 / Math.tan(fovRad * 0.5);
    cameraZ = (vh * 0.5) * f;
    const aspect = vw / Math.max(vh, 1);
    const near = 10.0;
    const far = Math.max(cameraZ * 4.0, 4000.0);
    const nf = 1.0 / (near - far);

    projMatrix.fill(0);
    projMatrix[0] = f / aspect;
    projMatrix[5] = f;
    projMatrix[10] = (far + near) * nf;
    projMatrix[11] = -1;
    projMatrix[14] = 2 * far * near * nf;
  }

  updateViewport();
  window.addEventListener('resize', updateViewport);

  let isStageNear = true;
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        isStageNear = entries[0] ? entries[0].isIntersecting : true;
      },
      { rootMargin: '360px 0px' }
    );
    observer.observe(stageEl);
  }

  const smoothstep = (e0, e1, x) => {
    const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
    return t * t * (3 - 2 * t);
  };

  let lastScrollY = window.scrollY;
  let lastTime = performance.now();
  let smoothVel = 0;
  let canvasCleared = false;

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.disable(gl.DEPTH_TEST);
  gl.clearColor(0, 0, 0, 0);

  function renderFrame(now) {
    const dt = Math.max(4, Math.min(50, now - lastTime));
    lastTime = now;

    const currentScrollY = window.scrollY;
    const rawVel = ((currentScrollY - lastScrollY) * 16.67) / dt;
    lastScrollY = currentScrollY;
    const clampedVel = Math.max(-75, Math.min(75, rawVel));
    smoothVel += (clampedVel - smoothVel) * 0.12;
    if (Math.abs(smoothVel) < 0.01) smoothVel = 0;

    const sheetOpen = document.body.classList.contains('sheet-locked');
    if (sheetOpen || !isStageNear) {
      if (!canvasCleared) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        canvasCleared = true;
      }
      requestAnimationFrame(renderFrame);
      return;
    }

    canvasCleared = false;
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.enableVertexAttribArray(aUv);
    gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf);

    gl.uniform2f(uViewport, vw, vh);
    gl.uniform1f(uVelocity, smoothVel);
    gl.uniform1f(uCameraZ, cameraZ);
    gl.uniformMatrix4fv(uProjection, false, projMatrix);
    gl.uniform1i(uTex, 0);

    const margin = 260;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.hover += (item.hoverTarget - item.hover) * 0.14;
      if (!item.media) continue;

      const rect = item.media.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) continue;

      const worldX = rect.left + rect.width * 0.5 - vw * 0.5;
      const worldY = -(rect.top + rect.height * 0.5) + vh * 0.5;
      const normY = Math.max(-1.4, Math.min(1.4, worldY / Math.max(vh * 0.6, 1)));

      if (item.meta) {
        const focus = 1.0 - smoothstep(0.15, 1.05, Math.abs(normY));
        const metaOpacity = 0.28 + 0.72 * Math.max(focus, item.hover * 0.85);
        if (Math.abs(metaOpacity - item.lastMetaOpacity) > 0.005) {
          item.meta.style.opacity = metaOpacity.toFixed(3);
          item.lastMetaOpacity = metaOpacity;
        }
      }

      if (rect.bottom < -margin || rect.top > vh + margin) continue;

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, item.ready ? item.tex : fallbackTex);
      gl.uniform1f(uHasTex, item.ready ? 1.0 : 0.0);
      gl.uniform2f(uTexSize, item.texW, item.texH);
      gl.uniform2f(uPlaneSize, rect.width, rect.height);
      gl.uniform2f(uWorldPos, worldX, worldY);
      gl.uniform1f(uHover, item.hover);

      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    }

    requestAnimationFrame(renderFrame);
  }

  requestAnimationFrame(renderFrame);
};
