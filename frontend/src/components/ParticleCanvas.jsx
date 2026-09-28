import { useEffect, useRef } from 'react';

const COLORS = ['#8B5CF6','#EC4899','#06B6D4','#10B981','#F59E0B','#F97316','#A78BFA'];

export default function ParticleCanvas({ style = {} }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let particles = [];
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x  = Math.random() * canvas.width;
        this.y  = Math.random() * canvas.height;
        this.vx = (Math.random() - .5) * .55;
        this.vy = (Math.random() - .5) * .55;
        this.r  = Math.random() * 2.8 + 1.2;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.alpha = Math.random() * .45 + .25;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = .02 + Math.random() * .02;
      }
      update() {
        const dx = mouse.x - this.x, dy = mouse.y - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          const force = (100 - dist) / 100 * .8;
          this.vx -= (dx / dist) * force * .06;
          this.vy -= (dy / dist) * force * .06;
        }
        this.x += this.vx; this.y += this.vy;
        const sp = .6;
        if (Math.abs(this.vx) > sp) this.vx *= .95;
        if (Math.abs(this.vy) > sp) this.vy *= .95;
        if (this.x < 0) { this.x = 0; this.vx *= -1; }
        if (this.x > canvas.width) { this.x = canvas.width; this.vx *= -1; }
        if (this.y < 0) { this.y = 0; this.vy *= -1; }
        if (this.y > canvas.height) { this.y = canvas.height; this.vy *= -1; }
        this.pulse += this.pulseSpeed;
      }
      draw() {
        const pAlpha = this.alpha + Math.sin(this.pulse) * .1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color + Math.round(pAlpha * 255).toString(16).padStart(2,'0');
        ctx.fill();
        // Glow
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 3);
        grd.addColorStop(0, this.color + '40');
        grd.addColorStop(1, this.color + '00');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }
    }

    const drawConnections = () => {
      const maxDist = 130;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * .35;
            const grd = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            grd.addColorStop(0, particles[i].color + Math.round(alpha*255).toString(16).padStart(2,'0'));
            grd.addColorStop(1, particles[j].color + Math.round(alpha*255).toString(16).padStart(2,'0'));
            ctx.beginPath();
            ctx.strokeStyle = grd;
            ctx.lineWidth = .6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const init = () => {
      particles = [];
      const n = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 70);
      for (let i = 0; i < n; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawConnections();
      particles.forEach(p => { p.update(); p.draw(); });
      raf = requestAnimationFrame(animate);
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onResize = () => { resize(); init(); };

    resize(); init(); animate();
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', ...style }}
    />
  );
}
