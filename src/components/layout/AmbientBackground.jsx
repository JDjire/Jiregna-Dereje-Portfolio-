import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// ─── Matrix character (only 0 and 1) ─────────────────────────────────────────
const CHARS = ['0', '1'];

class MatrixDot {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.reset(true);
  }

  reset(initial = false) {
    this.ox = Math.random() * this.w;
    this.oy = initial ? Math.random() * this.h : Math.random() * this.h;
    this.x = this.ox;
    this.y = this.oy;
    this.vx = 0;
    this.vy = 0;
    // Font size gives the "size" of the char
    this.size = Math.floor(Math.random() * 10 + 9); // 9–19 px
    this.char = CHARS[Math.floor(Math.random() * CHARS.length)];
    // Vary greenness — bright / mid / dim
    const l = 35 + Math.floor(Math.random() * 45); // 35–80 %
    this.color = `hsl(120, 100%, ${l}%)`;
    this.alpha = 0.25 + Math.random() * 0.65;
    // Slow random drift
    this.driftAngle = Math.random() * Math.PI * 2;
    this.driftSpeed = 0.006 + Math.random() * 0.01;
    this.driftRadius = 10 + Math.random() * 20;
    this.tick = Math.random() * 1000; // phase offset
  }

  resize(w, h) {
    this.ox = (this.ox / this.w) * w;
    this.oy = (this.oy / this.h) * h;
    this.x = (this.x / this.w) * w;
    this.y = (this.y / this.h) * h;
    this.w = w;
    this.h = h;
  }

  update(mx, my) {
    this.tick++;
    const RADIUS = 160;

    // Mouse repulsion
    const dx = this.x - mx;
    const dy = this.y - my;
    const distSq = dx * dx + dy * dy;
    if (distSq < RADIUS * RADIUS && distSq > 0) {
      const dist = Math.sqrt(distSq);
      const force = ((RADIUS - dist) / RADIUS) * 2.5;
      this.vx += (dx / dist) * force;
      this.vy += (dy / dist) * force;
    }

    // Drift target
    const tx = this.ox + Math.cos(this.driftAngle + this.tick * this.driftSpeed) * this.driftRadius;
    const ty = this.oy + Math.sin(this.driftAngle + this.tick * this.driftSpeed) * this.driftRadius;

    // Spring back to drifting home
    this.vx += (tx - this.x) * 0.04;
    this.vy += (ty - this.y) * 0.04;

    // Damp
    this.vx *= 0.86;
    this.vy *= 0.86;

    this.x += this.vx;
    this.y += this.vy;

    // Randomly flip character for flicker effect
    if (Math.random() < 0.008) {
      this.char = CHARS[Math.floor(Math.random() * CHARS.length)];
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.font = `bold ${this.size}px 'Courier New', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // Subtle text glow
    ctx.shadowColor = '#00ff41';
    ctx.shadowBlur = 6;
    ctx.fillText(this.char, this.x, this.y);
    ctx.restore();
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function AmbientBackground() {
  const reduced = useReducedMotion();
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({ mouseX: -9999, mouseY: -9999, particles: [] });

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;

    const buildParticles = (w, h) => {
      const count = Math.max(60, Math.min(180, Math.floor((w * h) / 8000)));
      return Array.from({ length: count }, () => new MatrixDot(w, h));
    };

    const setSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width === w && canvas.height === h) return;
      if (state.particles.length > 0) {
        state.particles.forEach((p) => p.resize(w, h));
      } else {
        state.particles = buildParticles(w, h);
      }
      canvas.width = w;
      canvas.height = h;
    };

    // Initial setup
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    state.particles = buildParticles(canvas.width, canvas.height);

    const onMouse = (e) => {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
    };
    const onLeave = () => {
      state.mouseX = -9999;
      state.mouseY = -9999;
    };
    const onResize = () => setSize();

    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize);

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of state.particles) {
        p.update(state.mouseX, state.mouseY);
        p.draw(ctx);
      }
    };

    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, [reduced]);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden ambient-bg"
      aria-hidden
    >
      {/* Deep green ambient glows */}
      <div
        className="absolute pointer-events-none ambient-glow-1"
        style={{
          top: '-10%',
          right: '-10%',
          width: 600,
          height: 600,
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute pointer-events-none ambient-glow-2"
        style={{
          bottom: '-10%',
          left: '-10%',
          width: 700,
          height: 700,
          filter: 'blur(70px)',
        }}
      />

      {/* Matrix particle canvas */}
      {!reduced && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}
