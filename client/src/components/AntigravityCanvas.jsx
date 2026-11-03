import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import PhoneRender3D from './PhoneRender3D';
import { Sparkles, Compass, Rocket, RotateCcw, Zap, Shield, Battery, Cpu, Camera, Radio, Gift } from 'lucide-react';

const CHIP_DEFINITIONS = [
  { id: 'chip-1', label: 'Snapdragon 8 Gen 4 Extreme', icon: Cpu, color: '#00f5d4', x: 0.18, y: 0.22, w: 220, h: 44 },
  { id: 'chip-2', label: '200MP Quad-Periscope 100x', icon: Camera, color: '#34A89A', x: 0.82, y: 0.26, w: 215, h: 44 },
  { id: 'chip-3', label: '5,400mAh Graphene Battery', icon: Battery, color: '#4E9B9A', x: 0.15, y: 0.52, w: 210, h: 44 },
  { id: 'chip-4', label: 'Aerospace Grade 5 Titanium', icon: Shield, color: '#a855f7', x: 0.84, y: 0.55, w: 215, h: 44 },
  { id: 'chip-5', label: 'Zero-G Gyroscopic Core', icon: Compass, color: '#38bdf8', x: 0.24, y: 0.78, w: 195, h: 44 },
  { id: 'chip-6', label: 'Two-Way Satellite SOS', icon: Radio, color: '#f59e0b', x: 0.76, y: 0.78, w: 190, h: 44 },
  { id: 'chip-7', label: 'Pre-Order: $99 Deposit', icon: Zap, color: '#00f5d4', isAction: true, x: 0.5, y: 0.88, w: 230, h: 50 },
  { id: 'chip-8', label: 'Free AeroBuds Pro 2 Gift', icon: Gift, color: '#ec4899', x: 0.5, y: 0.14, w: 200, h: 44 },
];

export default function AntigravityCanvas({ activeColor, onPreOrderClick, onCustomizeClick }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const starlightCanvasRef = useRef(null);

  // States
  const [antigravity, setAntigravity] = useState(true);
  const [physicsReady, setPhysicsReady] = useState(false);
  const [chipPositions, setChipPositions] = useState({});
  const [gravityStats, setGravityStats] = useState({ gForce: '0.00g', status: 'ZERO-G FLUID' });

  // Mouse coordinates for parallax grid bending
  const mousePos = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const engineRef = useRef(null);
  const bodiesRef = useRef({});

  // 1. Mouse movement tracking for grid starlight parallax
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current.targetX = (e.clientX - rect.left) / rect.width;
    mousePos.current.targetY = (e.clientY - rect.top) / rect.height;
  };

  // 2. Interactive Matter.js Engine Setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { Engine, World, Bodies, Mouse, MouseConstraint, Events, Body } = Matter;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create engine with zero-g by default
    const engine = Engine.create({
      gravity: { x: 0, y: 0, scale: 0.001 }
    });
    engineRef.current = engine;

    // Boundary walls to keep chips inside container with bouncy restitution
    const wallOptions = { isStatic: true, restitution: 0.9, friction: 0.1 };
    const wallThickness = 100;
    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, width * 2, wallThickness, wallOptions);
    const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions);

    World.add(engine.world, [ground, ceiling, leftWall, rightWall]);

    // Create dynamic physics bodies for each UI Spec Badge
    const bodies = {};
    const initialPosMap = {};

    CHIP_DEFINITIONS.forEach((chip) => {
      const posX = width * chip.x;
      const posY = height * chip.y;

      const body = Bodies.rectangle(posX, posY, chip.w, chip.h, {
        chamfer: { radius: 22 },
        restitution: 0.85,
        frictionAir: 0.015,
        friction: 0.1,
        density: 0.002,
        label: chip.id
      });

      // Initial gentle rotational velocity for zero-g drifting feel
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.012);
      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 1.5,
        y: (Math.random() - 0.5) * 1.5
      });

      bodies[chip.id] = body;
      initialPosMap[chip.id] = { x: posX, y: posY, angle: 0 };
    });

    bodiesRef.current = bodies;
    World.add(engine.world, Object.values(bodies));
    setChipPositions(initialPosMap);

    // Mouse Interaction: Grabbing & Dragging UI Badges
    const mouse = Mouse.create(container);
    // Remove default scroll interception of matter-js mouse
    mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.15,
        render: { visible: false }
      }
    });

    World.add(engine.world, mouseConstraint);

    // Update loop: sync Matter.js body coordinates to React State
    let animationFrameId;
    let tickCount = 0;

    const renderLoop = () => {
      Engine.update(engine, 1000 / 60);
      tickCount++;

      // When Antigravity is active, apply gentle buoyant drifting forces
      if (engine.world.gravity.y === 0) {
        Object.values(bodies).forEach((b) => {
          // Floating wave drift
          const waveX = Math.sin((tickCount * 0.02) + b.id) * 0.0003;
          const waveY = Math.cos((tickCount * 0.02) + b.id) * 0.0003;
          Body.applyForce(b, b.position, { x: waveX, y: waveY });

          // Prevent bodies from drifting completely out of bounds
          if (b.position.x < 50) Body.applyForce(b, b.position, { x: 0.002, y: 0 });
          if (b.position.x > width - 50) Body.applyForce(b, b.position, { x: -0.002, y: 0 });
          if (b.position.y < 50) Body.applyForce(b, b.position, { x: 0, y: 0.002 });
          if (b.position.y > height - 60) Body.applyForce(b, b.position, { x: 0, y: -0.002 });
        });
      }

      // Sync positions every frame
      const updated = {};
      CHIP_DEFINITIONS.forEach((chip) => {
        const b = bodies[chip.id];
        if (b) {
          updated[chip.id] = {
            x: b.position.x,
            y: b.position.y,
            angle: b.angle
          };
        }
      });
      setChipPositions(updated);

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);
    setPhysicsReady(true);

    return () => {
      cancelAnimationFrame(animationFrameId);
      World.clear(engine.world);
      Engine.clear(engine);
    };
  }, []);

  // 3. Starlight & Perspective Grid Canvas micro-interaction (Bending toward cursor)
  useEffect(() => {
    const canvas = starlightCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let starAnimId;

    // Generate stars
    const numStars = 80;
    const stars = Array.from({ length: numStars }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.7 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2
    }));

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 700;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let frame = 0;
    const drawBackground = () => {
      frame++;
      // Smooth lerp mouse pos
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const mX = mousePos.current.x * w;
      const mY = mousePos.current.y * h;

      // 1. Draw glowing mouse radial aura
      const grad = ctx.createRadialGradient(mX, mY, 10, mX, mY, 350);
      grad.addColorStop(0, 'rgba(0, 245, 212, 0.08)');
      grad.addColorStop(0.5, 'rgba(52, 168, 154, 0.03)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // 2. Warping Grid Lines bending subtly toward mouse
      ctx.lineWidth = 1;
      const gridSize = 48;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';

      // Vertical lines
      for (let x = 0; x <= w; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= h; y += 30) {
          const dx = x - mX;
          const dy = y - mY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const warpFactor = Math.max(0, 1 - dist / 300) * 16;
          const warpedX = x + (dx / (dist || 1)) * warpFactor;
          if (y === 0) ctx.moveTo(warpedX, y);
          else ctx.lineTo(warpedX, y);
        }
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= h; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 30) {
          const dx = x - mX;
          const dy = y - mY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const warpFactor = Math.max(0, 1 - dist / 300) * 16;
          const warpedY = y + (dy / (dist || 1)) * warpFactor;
          if (x === 0) ctx.moveTo(x, warpedY);
          else ctx.lineTo(x, warpedY);
        }
        ctx.stroke();
      }

      // 3. Starlight particles with zero-g glimmer
      stars.forEach((star) => {
        const starX = star.x * w;
        const starY = star.y * h;
        const currentAlpha = star.alpha + Math.sin(frame * star.pulseSpeed + star.phase) * 0.2;
        ctx.fillStyle = `rgba(180, 240, 235, ${Math.max(0.1, currentAlpha)})`;
        ctx.beginPath();
        ctx.arc(starX, starY, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      starAnimId = requestAnimationFrame(drawBackground);
    };

    starAnimId = requestAnimationFrame(drawBackground);

    return () => {
      cancelAnimationFrame(starAnimId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // 4. Handle Antigravity Toggle (Earth Gravity 1.0 vs Zero-G Floating)
  const toggleAntigravity = () => {
    if (!engineRef.current) return;
    const newState = !antigravity;
    setAntigravity(newState);

    const { Body } = Matter;
    const bodies = bodiesRef.current;

    if (newState) {
      // Turn ANTIGRAVITY ON (Zero-G)
      engineRef.current.world.gravity.y = 0;
      setGravityStats({ gForce: '0.00g', status: 'ZERO-G FLUID ORBIT' });

      // Apply uplifting anti-gravity impulse to float elements back up!
      Object.values(bodies).forEach((b) => {
        Body.setVelocity(b, {
          x: (Math.random() - 0.5) * 3,
          y: -Math.random() * 6 - 3 // upwards burst
        });
        Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.04);
      });
    } else {
      // Turn ANTIGRAVITY OFF (Earth Gravity Active)
      engineRef.current.world.gravity.y = 1.0;
      setGravityStats({ gForce: '1.00g', status: 'TERRESTRIAL GRAVITY ON' });

      // Trigger initial downward tumble
      Object.values(bodies).forEach((b) => {
        Body.setVelocity(b, {
          x: (Math.random() - 0.5) * 2,
          y: Math.random() * 2 + 1
        });
      });
    }
  };

  // 5. Reset Positions to pristine orbit
  const handleResetOrbit = () => {
    if (!containerRef.current || !bodiesRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const { Body } = Matter;

    CHIP_DEFINITIONS.forEach((chip) => {
      const b = bodiesRef.current[chip.id];
      if (b) {
        Body.setPosition(b, { x: width * chip.x, y: height * chip.y });
        Body.setVelocity(b, { x: (Math.random() - 0.5) * 1.5, y: (Math.random() - 0.5) * 1.5 });
        Body.setAngle(b, 0);
      }
    });

    if (!antigravity) {
      toggleAntigravity();
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[720px] lg:h-[820px] bg-[#0b0f17] overflow-hidden select-none flex items-center justify-center border-b border-white/5"
    >
      {/* Background Starlight & Bending Grid Canvas */}
      <canvas 
        ref={starlightCanvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Ambient Neon Atmosphere Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-teal-500/10 via-neon-cyan/15 to-transparent rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Top Banner Tagline */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-glass">
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-slate-300">
            Interactive Physics Canvas // Drag Chips & Phone
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white">
          Defy Gravity. <span className="bg-gradient-to-r from-neon-cyan via-teal-300 to-neon-teal bg-clip-text text-transparent">Pre-Order the Future.</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto px-4 font-sans font-light">
          Engineered with an internal zero-G stabilizer and Grade 5 titanium. Grab elements to test physical inertia or toggle gravity below.
        </p>
      </div>

      {/* Physics HUD: Antigravity Toggle in Corner (Key Feature 3) */}
      <div className="absolute top-6 right-6 z-30 flex flex-col items-end gap-2.5">
        <div className="glass-panel-glow px-4 py-3 rounded-2xl flex items-center gap-3 shadow-2xl border border-white/15">
          <div className="text-right">
            <div className="text-[10px] font-mono tracking-widest text-slate-400">GRAVITY FIELD</div>
            <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5 justify-end">
              <span className={`w-2 h-2 rounded-full ${antigravity ? 'bg-neon-cyan animate-pulse' : 'bg-amber-400'}`} />
              {gravityStats.gForce} • {antigravity ? 'ZERO-G' : 'EARTH'}
            </div>
          </div>

          <button
            onClick={toggleAntigravity}
            className={`relative px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase transition-all duration-300 flex items-center gap-2 shadow-lg ${
              antigravity 
                ? 'bg-gradient-to-r from-teal-500 to-neon-cyan text-slate-950 shadow-neon-teal hover:brightness-110 active:scale-95' 
                : 'bg-slate-800 text-slate-200 border border-amber-400/50 hover:bg-slate-700 active:scale-95'
            }`}
          >
            <Rocket className={`w-3.5 h-3.5 transition-transform ${antigravity ? 'rotate-45' : 'rotate-180'}`} />
            {antigravity ? 'Antigravity: ON' : 'Gravity: ON'}
          </button>

          <button
            onClick={handleResetOrbit}
            title="Reset Orbit Positions"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/10"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live Status Pill */}
        <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-neon-teal" />
          <span>{gravityStats.status}</span>
        </div>
      </div>

      {/* Central Object: 3D Smartphone Mockup (Key Feature 1) */}
      <div 
        className="relative z-20 transition-all duration-500 flex flex-col items-center justify-center pt-24 lg:pt-16"
        style={{
          animation: antigravity ? 'float 6s ease-in-out infinite' : 'none',
          transform: antigravity ? 'none' : 'translateY(110px)'
        }}
      >
        <PhoneRender3D 
          color={activeColor}
          interactive={true}
          scale={1.0}
          showScreen={true}
        />

        {/* Action Buttons Directly Below Phone */}
        <div className="mt-6 flex items-center gap-3 z-30">
          <button
            onClick={onPreOrderClick}
            className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-neon-teal to-neon-cyan text-slate-950 shadow-neon-cyan hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
          >
            <Zap className="w-4 h-4 fill-current" />
            Pre-Order from $99
          </button>

          <button
            onClick={onCustomizeClick}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 backdrop-blur-md hover:border-neon-teal/50 transition-all duration-200"
          >
            Customize Specs
          </button>
        </div>
      </div>

      {/* Floating Physics Spec Badges (Key Feature 2 & 3) */}
      {physicsReady && CHIP_DEFINITIONS.map((chip) => {
        const pos = chipPositions[chip.id];
        if (!pos) return null;
        const IconComponent = chip.icon;

        return (
          <div
            key={chip.id}
            data-chip-id={chip.id}
            onClick={() => {
              if (chip.isAction) onPreOrderClick();
            }}
            className={`absolute z-20 cursor-grab active:cursor-grabbing select-none transition-shadow duration-200 ${
              chip.isAction 
                ? 'glass-panel-glow border-neon-cyan/50 hover:border-neon-cyan' 
                : 'glass-card'
            }`}
            style={{
              width: `${chip.w}px`,
              height: `${chip.h}px`,
              left: 0,
              top: 0,
              transform: `translate3d(${pos.x - chip.w / 2}px, ${pos.y - chip.h / 2}px, 0px) rotate(${pos.angle}rad)`,
              borderRadius: '24px',
              willChange: 'transform'
            }}
          >
            <div className="w-full h-full px-3.5 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2.5 min-w-0">
                <div 
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${chip.color}18`,
                    border: `1px solid ${chip.color}40`,
                    color: chip.color
                  }}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium text-slate-200 truncate">
                  {chip.label}
                </span>
              </div>

              {/* Status Glow Dot */}
              <div 
                className="w-1.5 h-1.5 rounded-full shrink-0 ml-1.5"
                style={{ backgroundColor: chip.color, boxShadow: `0 0 8px ${chip.color}` }}
              />
            </div>
          </div>
        );
      })}

      {/* Bottom Physics Floor Indicator (visible when gravity is on) */}
      {!antigravity && (
        <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent pointer-events-none" />
      )}
    </div>
  );
}

