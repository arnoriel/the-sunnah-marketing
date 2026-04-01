import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ─── Types ───────────────────────────────────────────────────────────────────
type Scene = 'intro' | 'box' | 'reveal';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface ConfettiItem {
  id: number;
  x: number;
  y: number;
  rotate: number;
  color: string;
  scale: number;
  duration: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function useMouseTilt(ref: React.RefObject<HTMLDivElement | null>) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 30 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY, ref]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return { rotateX, rotateY, handleMouseMove, handleMouseLeave };
}

// ─── Canvas Card Download → PDF (via jsPDF) ──────────────────────────────────
async function downloadVIPCard(name: string) {
  const { jsPDF } = await import('jspdf');
  await document.fonts.ready;

  // 2× resolution canvas for crispness
  const canvas = document.createElement('canvas');
  canvas.width = 2100;
  canvas.height = 1320;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(2, 2); // draw at base 1050×660, auto-scaled 2×

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, 1050, 660);
  bg.addColorStop(0, '#05050f');
  bg.addColorStop(0.4, '#080818');
  bg.addColorStop(0.7, '#0a0a22');
  bg.addColorStop(1, '#05050f');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1050, 660);

  // Subtle grid
  ctx.strokeStyle = 'rgba(26, 107, 255, 0.06)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 1050; i += 50) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 660); ctx.stroke();
  }
  for (let j = 0; j <= 660; j += 50) {
    ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(1050, j); ctx.stroke();
  }

  // Outer glow border
  const borderGrad = ctx.createLinearGradient(0, 0, 1050, 660);
  borderGrad.addColorStop(0, 'rgba(26, 107, 255, 0.7)');
  borderGrad.addColorStop(0.5, 'rgba(0, 198, 255, 0.9)');
  borderGrad.addColorStop(1, 'rgba(26, 107, 255, 0.7)');
  ctx.strokeStyle = borderGrad;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(18, 18, 1014, 624);

  // Inner subtle border
  ctx.strokeStyle = 'rgba(0, 198, 255, 0.15)';
  ctx.lineWidth = 1;
  ctx.strokeRect(26, 26, 998, 608);

  // Diagonal shimmer overlay
  const shimmer = ctx.createLinearGradient(0, 0, 1050, 660);
  shimmer.addColorStop(0, 'transparent');
  shimmer.addColorStop(0.3, 'rgba(26, 107, 255, 0.04)');
  shimmer.addColorStop(0.5, 'rgba(255, 255, 255, 0.06)');
  shimmer.addColorStop(0.7, 'rgba(0, 198, 255, 0.04)');
  shimmer.addColorStop(1, 'transparent');
  ctx.fillStyle = shimmer;
  ctx.fillRect(0, 0, 1050, 660);

  // Brand name
  ctx.font = '800 52px "Bebas Neue", cursive';
  const brandGrad = ctx.createLinearGradient(56, 70, 56, 130);
  brandGrad.addColorStop(0, '#ffffff');
  brandGrad.addColorStop(0.4, '#7ab0ff');
  brandGrad.addColorStop(1, '#00c6ff');
  ctx.fillStyle = brandGrad;
  ctx.fillText('THE SUNNAH MARKETING', 56, 128);

  // VIP badge (top right)
  ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#ffd700';
  ctx.textAlign = 'right';
  ctx.fillText('★  VIP  MEMBER', 994, 90);
  ctx.textAlign = 'left';

  // Small divider under brand
  const divGrad1 = ctx.createLinearGradient(56, 0, 500, 0);
  divGrad1.addColorStop(0, 'rgba(26, 107, 255, 0.6)');
  divGrad1.addColorStop(1, 'transparent');
  ctx.strokeStyle = divGrad1;
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(56, 145); ctx.lineTo(450, 145); ctx.stroke();

  // PREMIUM CLIENT label
  ctx.font = '300 14px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = 'rgba(160, 160, 200, 0.7)';
  ctx.fillText('P R E M I U M   C L I E N T', 56, 190);

  // Chip (gold)
  ctx.save();
  const chipGrad = ctx.createLinearGradient(56, 220, 130, 290);
  chipGrad.addColorStop(0, '#b8860b');
  chipGrad.addColorStop(0.3, '#ffd700');
  chipGrad.addColorStop(0.6, '#daa520');
  chipGrad.addColorStop(1, '#b8860b');
  ctx.fillStyle = chipGrad;
  ctx.beginPath();
  ctx.roundRect(56, 220, 68, 50, 8);
  ctx.fill();
  // Chip lines
  ctx.strokeStyle = 'rgba(0,0,0,0.3)';
  ctx.lineWidth = 1;
  [76, 88, 100].forEach(x => {
    ctx.beginPath(); ctx.moveTo(x, 226); ctx.lineTo(x, 264); ctx.stroke();
  });
  ctx.beginPath(); ctx.moveTo(62, 244); ctx.lineTo(118, 244); ctx.stroke();
  ctx.restore();

  // Customer name (large)
  const nameFontSize = name.length > 16 ? 68 : name.length > 12 ? 76 : 84;
  ctx.font = `800 ${nameFontSize}px "Bebas Neue", cursive`;
  const nameGrad = ctx.createLinearGradient(56, 310, 56, 430);
  nameGrad.addColorStop(0, '#ffffff');
  nameGrad.addColorStop(0.3, '#90c2ff');
  nameGrad.addColorStop(0.7, '#4d8bff');
  nameGrad.addColorStop(1, '#00c6ff');
  ctx.fillStyle = nameGrad;
  ctx.fillText(name.toUpperCase(), 56, 420);

  // Service label
  ctx.font = '400 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = 'rgba(180, 180, 220, 0.65)';
  ctx.fillText('HIGH CONVERTING WEBSITE', 56, 462);

  // Horizontal divider
  const midDiv = ctx.createLinearGradient(56, 0, 994, 0);
  midDiv.addColorStop(0, 'transparent');
  midDiv.addColorStop(0.1, 'rgba(26, 107, 255, 0.4)');
  midDiv.addColorStop(0.9, 'rgba(26, 107, 255, 0.4)');
  midDiv.addColorStop(1, 'transparent');
  ctx.strokeStyle = midDiv;
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(56, 490); ctx.lineTo(994, 490); ctx.stroke();

  // Card dots row
  ctx.font = '18px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = 'rgba(130, 130, 170, 0.5)';
  ctx.fillText('●●●●   ●●●●   ●●●●   2025', 56, 535);

  // Hologram circle (bottom right)
  const holoOuter = ctx.createRadialGradient(920, 578, 0, 920, 578, 58);
  holoOuter.addColorStop(0, 'rgba(0, 198, 255, 0.9)');
  holoOuter.addColorStop(0.4, 'rgba(26, 107, 255, 0.7)');
  holoOuter.addColorStop(0.7, 'rgba(26, 107, 255, 0.3)');
  holoOuter.addColorStop(1, 'rgba(26, 107, 255, 0.05)');
  ctx.fillStyle = holoOuter;
  ctx.beginPath(); ctx.arc(920, 578, 58, 0, Math.PI * 2); ctx.fill();

  // Inner hologram ring
  ctx.strokeStyle = 'rgba(0, 198, 255, 0.6)';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(920, 578, 48, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(920, 578, 38, 0, Math.PI * 2); ctx.stroke();

  // TSM text in hologram
  ctx.font = 'bold 22px "Bebas Neue", cursive';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.textAlign = 'center';
  ctx.fillText('TSM', 920, 585);
  ctx.textAlign = 'left';

  // Bottom decorative dots
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = `rgba(26, 107, 255, ${0.3 - i * 0.04})`;
    ctx.beginPath();
    ctx.arc(56 + i * 22, 610, 5 - i * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Convert canvas to image and embed in PDF
  const imgData = canvas.toDataURL('image/png', 1.0);

  // Credit-card proportions in mm: 85.6 × 53.98 → scale up 1.5× for readability
  const cardW = 128.4; // mm
  const cardH = 80.97; // mm

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [cardW, cardH],
  });

  doc.addImage(imgData, 'PNG', 0, 0, cardW, cardH);
  doc.save(`TSM-VIP-Card-${name.replace(/\s+/g, '-')}.pdf`);
}

// ─── Floating Particle ───────────────────────────────────────────────────────
function FloatingDot({ p }: { p: Particle }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: p.size,
        height: p.size,
        background: `rgba(26, 107, 255, ${0.2 + p.size * 0.08})`,
        filter: `blur(${p.size > 4 ? 2 : 0}px)`,
      }}
      animate={{
        y: [0, -18, 0],
        opacity: [0.15, 0.5, 0.15],
        scale: [1, 1.3, 1],
      }}
      transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
    />
  );
}

// ─── Confetti Piece ──────────────────────────────────────────────────────────
function Confetti({ item }: { item: ConfettiItem }) {
  const shapes = ['rounded-full', 'rounded-sm', 'rounded-none'];
  const shape = shapes[item.id % shapes.length];
  return (
    <motion.div
      className={`absolute pointer-events-none ${shape}`}
      style={{
        width: 8 * item.scale,
        height: 8 * item.scale,
        background: item.color,
        top: '50%',
        left: '50%',
      }}
      initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
      animate={{ x: item.x, y: item.y, rotate: item.rotate, opacity: 0, scale: 0.2 }}
      transition={{ duration: item.duration, ease: [0.25, 0.46, 0.45, 0.94] }}
    />
  );
}

// ─── VIP Card (Screen) ───────────────────────────────────────────────────────
function VIPCardDisplay({
  name,
  small = false,
}: {
  name: string;
  small?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useMouseTilt(cardRef);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const w = small ? 320 : 480;
  const h = small ? 200 : 300;
  const scale = w / 480;

  return (
    <motion.div
      ref={cardRef}
      style={{
        width: w,
        height: h,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        cursor: 'default',
      }}
      className="relative select-none"
    >
      {/* Card body */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          borderRadius: 16 * scale,
          background: 'linear-gradient(135deg, #05050f 0%, #080820 40%, #0a0a28 70%, #05050f 100%)',
          border: '1px solid rgba(26, 107, 255, 0.4)',
          boxShadow: `0 0 40px rgba(26, 107, 255, 0.3), 0 0 80px rgba(26, 107, 255, 0.1), inset 0 0 60px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.07 }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`v${i}`} x1={`${(i / 11) * 100}%`} y1="0" x2={`${(i / 11) * 100}%`} y2="100%"
              stroke="#1a6bff" strokeWidth="1" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={`${(i / 7) * 100}%`} x2="100%" y2={`${(i / 7) * 100}%`}
              stroke="#1a6bff" strokeWidth="1" />
          ))}
        </svg>

        {/* Holographic shimmer overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.06) 40%, rgba(0,198,255,0.08) 50%, rgba(26,107,255,0.06) 60%, transparent 80%)',
            backgroundSize: '200% 200%',
          }}
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Top border accent */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,198,255,0.8), transparent)' }} />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: 24 * scale }}>
          {/* Top row */}
          <div className="flex items-start justify-between">
            <div>
              <div
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: 18 * scale,
                  letterSpacing: '0.05em',
                  lineHeight: 1,
                  background: 'linear-gradient(to bottom, #ffffff, #7ab0ff, #00c6ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                THE SUNNAH MARKETING
              </div>
            </div>
            <div style={{
              fontSize: 10 * scale,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: '#ffd700',
              fontWeight: 700,
              letterSpacing: '0.12em',
            }}>
              ★ VIP
            </div>
          </div>

          {/* Middle — chip + label */}
          <div className="flex items-center gap-3">
            {/* Chip */}
            <div style={{
              width: 38 * scale,
              height: 28 * scale,
              borderRadius: 4 * scale,
              background: 'linear-gradient(135deg, #b8860b, #ffd700, #daa520)',
              flexShrink: 0,
            }} />
            <div>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 8 * scale,
                color: 'rgba(160,160,200,0.6)',
                letterSpacing: '0.2em',
                marginBottom: 4 * scale,
              }}>
                PREMIUM CLIENT
              </div>
              {/* Name */}
              <div style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: Math.min(34 * scale, name.length > 15 ? 22 * scale : 30 * scale),
                letterSpacing: '0.04em',
                lineHeight: 1,
                background: 'linear-gradient(to bottom, #ffffff 0%, #90c2ff 40%, #4d8bff 70%, #00c6ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {name.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div>
            {/* Divider */}
            <div className="mb-2" style={{
              height: 1,
              background: 'linear-gradient(90deg, rgba(26,107,255,0.4), rgba(26,107,255,0.1))',
            }} />
            <div className="flex items-end justify-between">
              <div>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 8 * scale,
                  color: 'rgba(160,160,200,0.55)',
                  marginBottom: 4 * scale,
                }}>
                  HIGH CONVERTING WEBSITE
                </div>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 7 * scale,
                  color: 'rgba(120,120,160,0.45)',
                  letterSpacing: '0.08em',
                }}>
                  ●●●●  ●●●●  ●●●●  2025
                </div>
              </div>
              {/* Hologram badge */}
              <motion.div
                style={{
                  width: 40 * scale,
                  height: 40 * scale,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0,198,255,0.8) 0%, rgba(26,107,255,0.5) 50%, rgba(26,107,255,0.05) 100%)',
                  border: `1px solid rgba(0,198,255,0.5)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <svg width={22 * scale} height={22 * scale} viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="9" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                  <circle cx="11" cy="11" r="5" stroke="rgba(0,198,255,0.8)" strokeWidth="1" />
                  <circle cx="11" cy="11" r="2" fill="rgba(255,255,255,0.8)" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Heading Gradient ────────────────────────────────────────────────────────
const HEADING: React.CSSProperties = {
  fontFamily: "'Bebas Neue', cursive",
  letterSpacing: '0.04em',
  background: 'linear-gradient(to bottom, #ffffff 0%, #90c2ff 35%, #4d8bff 65%, #00c6ff 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  lineHeight: 1,
  textTransform: 'uppercase' as const,
};

// ─── Scene 1: Intro ──────────────────────────────────────────────────────────
function IntroScene({ name, onNext }: { name: string; onNext: () => void }) {
  const particles = useMemo<Particle[]>(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 3) * 100,
      y: seededRandom(i * 5) * 100,
      size: seededRandom(i * 7) * 5 + 2,
      delay: seededRandom(i * 11) * 3,
      duration: seededRandom(i * 13) * 3 + 3,
    })), []);

  return (
    <motion.div
      key="intro"
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#050507' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 600, height: 600,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(26,107,255,0.08) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {particles.map(p => <FloatingDot key={p.id} p={p} />)}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* From label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(11px, 2vw, 13px)',
            color: 'rgba(0, 198, 255, 0.8)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}
        >
          FROM THE SUNNAH MARKETING
        </motion.div>

        {/* "YOUR ORDER HAS" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{
            ...HEADING,
            fontSize: 'clamp(32px, 6vw, 72px)',
            color: 'rgba(255,255,255,0.5)',
            WebkitTextFillColor: 'rgba(255,255,255,0.4)',
            marginBottom: '-0.1em',
          }}
        >
          YOUR ORDER HAS
        </motion.div>

        {/* "ARRIVED" - huge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ ...HEADING, fontSize: 'clamp(72px, 16vw, 200px)', marginBottom: '0.5rem' }}
        >
          ARRIVED
        </motion.div>

        {/* Animated line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.1, duration: 0.8, ease: 'easeOut' }}
          style={{
            height: 1,
            width: 'clamp(120px, 30vw, 320px)',
            background: 'linear-gradient(90deg, transparent, rgba(26,107,255,0.8), rgba(0,198,255,1), rgba(26,107,255,0.8), transparent)',
            marginBottom: '1.5rem',
            transformOrigin: 'center',
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            color: 'rgba(160, 160, 200, 0.75)',
            maxWidth: 420,
            lineHeight: 1.6,
            marginBottom: '3rem',
          }}
        >
          A special delivery for{' '}
          <span style={{ color: '#fff', fontWeight: 600 }}>{name}</span> — your
          exclusive package is waiting to be unwrapped.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(26,107,255,0.5)' }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            letterSpacing: '0.2em',
            color: '#fff',
            background: 'linear-gradient(135deg, #1a6bff, #00c6ff)',
            border: 'none',
            borderRadius: 8,
            padding: '14px 48px',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <motion.span
            className="absolute inset-0"
            style={{ background: 'rgba(255,255,255,0.15)' }}
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
          />
          BEGIN UNBOXING →
        </motion.button>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            marginTop: '2rem',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 11,
            color: 'rgba(120, 120, 160, 0.5)',
            letterSpacing: '0.15em',
          }}
        >
          OR SCROLL DOWN
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Scene 2: Box ────────────────────────────────────────────────────────────
function BoxScene({ onOpen }: { onOpen: () => void }) {
  const [isOpening, setIsOpening] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const confetti = useMemo<ConfettiItem[]>(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: (seededRandom(i * 3) - 0.5) * 700,
      y: (seededRandom(i * 5) - 0.5) * 500 - 150,
      rotate: (seededRandom(i * 7) - 0.5) * 720,
      color: ['#1a6bff', '#00c6ff', '#ffffff', '#ffd700', '#ff6b9d', '#7cfc00'][i % 6],
      scale: seededRandom(i * 11) * 1.5 + 0.5,
      duration: seededRandom(i * 13) * 1.2 + 0.8,
    })), []);

  const particles = useMemo<Particle[]>(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 17) * 100,
      y: seededRandom(i * 19) * 100,
      size: seededRandom(i * 23) * 4 + 1.5,
      delay: seededRandom(i * 29) * 2,
      duration: seededRandom(i * 31) * 2 + 2.5,
    })), []);

  function handleTap() {
    if (isOpening) return;
    setIsOpening(true);
    setShowConfetti(true);
    setTimeout(() => onOpen(), 1800);
  }

  return (
    <motion.div
      key="box"
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#050507' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      {/* BG Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(p => <FloatingDot key={p.id} p={p} />)}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(26,107,255,0.06) 0%, transparent 60%)',
        }} />
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          {confetti.map(item => <Confetti key={item.id} item={item} />)}
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(11px, 2vw, 13px)',
            color: 'rgba(0,198,255,0.7)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          YOUR PACKAGE IS READY
        </motion.div>

        {/* THE BOX */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative' }}
        >
          {/* Inner glow when opened */}
          <AnimatePresence>
            {isOpening && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.5 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 0,
                  background: 'radial-gradient(ellipse, rgba(26,107,255,0.6) 0%, rgba(0,198,255,0.3) 40%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
            )}
          </AnimatePresence>

          {/* Box Wrapper (3D perspective) */}
          <motion.div
            style={{ position: 'relative', zIndex: 1, perspective: 800 }}
            animate={!isOpening ? { y: [0, -12, 0] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Box Lid */}
            <motion.div
              animate={isOpening
                ? { rotateX: -110, y: -20, opacity: 0 }
                : { rotateX: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                transformOrigin: 'bottom center',
                width: 'clamp(220px, 40vw, 320px)',
                height: 'clamp(60px, 10vw, 80px)',
                marginBottom: -2,
                borderRadius: '12px 12px 0 0',
                background: 'linear-gradient(160deg, #0d0d25 0%, #0a0a1e 50%, #07071a 100%)',
                border: '1px solid rgba(26,107,255,0.5)',
                borderBottom: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 -10px 40px rgba(26,107,255,0.15)',
              }}
            >
              {/* Ribbon strip on lid */}
              <div style={{
                position: 'absolute',
                top: 0, bottom: 0,
                width: 'clamp(28px, 5vw, 40px)',
                left: '50%', transform: 'translateX(-50%)',
                background: 'linear-gradient(to bottom, rgba(26,107,255,0.6), rgba(0,198,255,0.6))',
                opacity: 0.8,
              }} />
              {/* Top border glow */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(0,198,255,0.9), transparent)',
              }} />
            </motion.div>

            {/* Box Body */}
            <div style={{
              width: 'clamp(220px, 40vw, 320px)',
              height: 'clamp(160px, 28vw, 220px)',
              borderRadius: '0 0 12px 12px',
              background: 'linear-gradient(160deg, #0a0a1e 0%, #080815 60%, #050510 100%)',
              border: '1px solid rgba(26,107,255,0.4)',
              borderTop: '1px solid rgba(26,107,255,0.2)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(26,107,255,0.1)',
            }}>
              {/* Ribbon strip on body */}
              <div style={{
                position: 'absolute',
                top: 0, bottom: 0,
                width: 'clamp(28px, 5vw, 40px)',
                left: '50%', transform: 'translateX(-50%)',
                background: 'linear-gradient(to bottom, rgba(26,107,255,0.5), rgba(0,198,255,0.5))',
                opacity: 0.7,
              }} />
              {/* Horizontal ribbon strip */}
              <div style={{
                position: 'absolute',
                left: 0, right: 0,
                height: 'clamp(28px, 5vw, 40px)',
                top: '50%', transform: 'translateY(-50%)',
                background: 'linear-gradient(to right, rgba(26,107,255,0.5), rgba(0,198,255,0.5))',
                opacity: 0.7,
              }} />

              {/* Branding on box */}
              <div style={{
                position: 'absolute',
                bottom: 16, left: 0, right: 0,
                textAlign: 'center',
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 'clamp(11px, 2vw, 14px)',
                letterSpacing: '0.15em',
                color: 'rgba(160,160,200,0.4)',
              }}>
                THE SUNNAH MARKETING
              </div>

              {/* Inner glow on open */}
              <AnimatePresence>
                {isOpening && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'radial-gradient(ellipse at 50% 0%, rgba(26,107,255,0.4) 0%, rgba(0,198,255,0.2) 50%, transparent 80%)',
                    }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Bow */}
            <motion.div
              animate={isOpening ? { scale: 0, opacity: 0, y: -40 } : { scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute',
                top: 'calc(clamp(60px, 10vw, 80px) - 24px)',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 30,
                zIndex: 5,
              }}
            >
              {/* Left loop */}
              <div style={{
                position: 'absolute',
                width: 22, height: 22,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1a6bff, #00c6ff)',
                top: 0, left: 4,
                transform: 'rotate(-25deg)',
                opacity: 0.9,
              }} />
              {/* Right loop */}
              <div style={{
                position: 'absolute',
                width: 22, height: 22,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00c6ff, #1a6bff)',
                top: 0, right: 4,
                transform: 'rotate(25deg)',
                opacity: 0.9,
              }} />
              {/* Center knot */}
              <div style={{
                position: 'absolute',
                width: 14, height: 14,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #fff, #00c6ff)',
                top: 8, left: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 10px rgba(0,198,255,0.8)',
              }} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* TAP TO OPEN button */}
        <AnimatePresence>
          {!isOpening ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.06,
                  boxShadow: '0 0 50px rgba(26,107,255,0.6), 0 0 100px rgba(26,107,255,0.2)',
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(26,107,255,0.3)',
                    '0 0 40px rgba(0,198,255,0.5)',
                    '0 0 20px rgba(26,107,255,0.3)',
                  ],
                }}
                transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                onClick={handleTap}
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: 'clamp(18px, 3vw, 24px)',
                  letterSpacing: '0.2em',
                  color: '#fff',
                  background: 'linear-gradient(135deg, #1a6bff 0%, #005ec4 50%, #1a6bff 100%)',
                  backgroundSize: '200% 200%',
                  border: '1px solid rgba(0,198,255,0.4)',
                  borderRadius: 10,
                  padding: '16px 52px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <motion.span
                  className="absolute inset-0 opacity-30"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
                />
                TAP TO OPEN
              </motion.button>

              <motion.p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 'clamp(11px, 2vw, 13px)',
                  color: 'rgba(120,120,160,0.5)',
                  letterSpacing: '0.1em',
                }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                YOUR VIP CARD IS INSIDE
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(13px, 2vw, 16px)',
                color: 'rgba(0,198,255,0.8)',
                letterSpacing: '0.1em',
              }}
            >
              Opening your package...
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Scene 3: Reveal ─────────────────────────────────────────────────────────
function RevealScene({ name }: { name: string }) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const celebrationParticles = useMemo<Particle[]>(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 37) * 100,
      y: seededRandom(i * 41) * 100,
      size: seededRandom(i * 43) * 5 + 2,
      delay: seededRandom(i * 47) * 2,
      duration: seededRandom(i * 53) * 3 + 3,
    })), []);

  useEffect(() => {
    const t1 = setTimeout(() => setShowCard(true), 300);
    const t2 = setTimeout(() => setShowWelcome(true), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  async function handleDownload() {
    setDownloading(true);
    await downloadVIPCard(name);
    setDownloading(false);
    setDownloaded(true);
  }

  return (
    <motion.div
      key="reveal"
      className="fixed inset-0 overflow-y-auto overflow-x-hidden"
      style={{ background: '#050507' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* BG */}
      <div className="fixed inset-0 pointer-events-none">
        {celebrationParticles.map(p => <FloatingDot key={p.id} p={p} />)}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(26,107,255,0.07) 0%, transparent 60%)',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center py-16 px-6"
        style={{ gap: 'clamp(24px, 5vh, 48px)' }}>

        {/* Welcome heading */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 'clamp(11px, 2vw, 13px)',
                  color: 'rgba(0,198,255,0.7)',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}
              >
                WELCOME TO THE FAMILY
              </motion.div>

              <div style={{
                ...HEADING,
                fontSize: 'clamp(52px, 11vw, 140px)',
                display: 'block',
              }}>
                WELCOME,
              </div>

              <div style={{
                ...HEADING,
                fontSize: 'clamp(40px, 9vw, 110px)',
                display: 'block',
                marginTop: '-0.15em',
              }}>
                {name.toUpperCase()}
              </div>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                style={{
                  height: 1,
                  maxWidth: 400,
                  margin: '1rem auto',
                  background: 'linear-gradient(90deg, transparent, rgba(26,107,255,0.7), rgba(0,198,255,0.9), rgba(26,107,255,0.7), transparent)',
                  transformOrigin: 'center',
                }}
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 'clamp(14px, 2.5vw, 18px)',
                  color: 'rgba(180, 180, 220, 0.8)',
                  maxWidth: 520,
                  margin: '0 auto',
                  lineHeight: 1.7,
                }}
              >
                Thank you for ordering{' '}
                <span style={{ color: '#fff', fontWeight: 700 }}>High Converting Website</span>
                <br />
                <span style={{ color: 'rgba(0,198,255,0.8)' }}>at The Sunnah Marketing</span>
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* VIP Card */}
        <AnimatePresence>
          {showCard && (
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-4"
            >
              {/* Card label */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 'clamp(10px, 1.8vw, 12px)',
                  color: 'rgba(120,120,160,0.6)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                YOUR VIP MEMBERSHIP CARD
              </motion.div>

              {/* Glow behind card */}
              <div style={{ position: 'relative' }}>
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: -20,
                    background: 'radial-gradient(ellipse, rgba(26,107,255,0.2) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                    zIndex: 0,
                  }}
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <VIPCardDisplay name={name} />
                </div>
              </div>

              {/* Download button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center gap-3 mt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(26,107,255,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDownload}
                  disabled={downloading}
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: 'clamp(14px, 2vw, 17px)',
                    letterSpacing: '0.15em',
                    color: '#fff',
                    background: downloaded
                      ? 'linear-gradient(135deg, #0a5c0a, #0e8a0e)'
                      : 'linear-gradient(135deg, #1a6bff, #00c6ff)',
                    border: 'none',
                    borderRadius: 8,
                    padding: '13px 36px',
                    cursor: downloading ? 'default' : 'pointer',
                    opacity: downloading ? 0.7 : 1,
                    transition: 'background 0.4s',
                    position: 'relative',
                    overflow: 'hidden',
                    minWidth: 220,
                  }}
                >
                  {downloading ? 'GENERATING PDF...' : downloaded ? '✓ PDF SAVED' : '↓ DOWNLOAD CARD (.PDF)'}
                </motion.button>

                <motion.a
                  href="https://thesunnahmarketing.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.04,
                    boxShadow: '0 0 40px rgba(0,198,255,0.4)',
                    background: 'linear-gradient(135deg, #00c6ff, #1a6bff)',
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: 'clamp(14px, 2vw, 17px)',
                    letterSpacing: '0.15em',
                    color: '#fff',
                    background: 'transparent',
                    border: '1px solid rgba(0,198,255,0.5)',
                    borderRadius: 8,
                    padding: '13px 36px',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'inline-block',
                    minWidth: 220,
                    textAlign: 'center',
                    transition: 'all 0.3s',
                  }}
                >
                  VISIT YOUR WEBSITE →
                </motion.a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 'clamp(10px, 1.8vw, 12px)',
                  color: 'rgba(100,100,140,0.5)',
                  textAlign: 'center',
                  maxWidth: 360,
                  lineHeight: 1.6,
                }}
              >
                Your VIP card will be downloaded as a PDF file with
                the exact same premium design — ready to save or share.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(11px, 1.8vw, 13px)',
            color: 'rgba(80,80,120,0.5)',
            textAlign: 'center',
            letterSpacing: '0.1em',
          }}
        >
          Bi idhnillah — may this be a blessing for your business.
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PackagingPage() {
  // Load Bebas Neue font
  useEffect(() => {
    if (document.querySelector('link[href*="Bebas+Neue"]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap';
    document.head.appendChild(link);
  }, []);

  const name = useMemo(() => {
    if (typeof window === 'undefined') return 'Valued Customer';
    return new URLSearchParams(window.location.search).get('name') || 'Valued Customer';
  }, []);

  const [scene, setScene] = useState<Scene>('intro');
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle scroll to advance from intro
  useEffect(() => {
    if (scene !== 'intro') return;
    const handleScroll = () => {
      if (window.scrollY > 60) setScene('box');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scene]);

  return (
    <>
      {/* Ensures page is scrollable for the scroll trigger on intro */}
      <div ref={containerRef} style={{ height: scene === 'intro' ? '200vh' : '100vh' }}>
        <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
          <AnimatePresence mode="wait">
            {scene === 'intro' && (
              <IntroScene key="intro" name={name} onNext={() => setScene('box')} />
            )}
            {scene === 'box' && (
              <BoxScene key="box" onOpen={() => setScene('reveal')} />
            )}
            {scene === 'reveal' && (
              <RevealScene key="reveal" name={name} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}