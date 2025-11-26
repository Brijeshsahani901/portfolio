import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiMail, HiDownload } from "react-icons/hi";

function InfoItem({ label, value, status }) {
  const statusColor =
    status === "available"
      ? "bg-emerald-400/30 text-emerald-300 border-emerald-300/20"
      : status === "busy"
      ? "bg-rose-400/20 text-rose-300 border-rose-300/20"
      : "bg-white/5 text-gray-200 border-white/10";

  return (
    <div className="flex items-center justify-between rounded-xl px-3 py-2 border border-white/6">
      <div className="text-sm text-gray-300">{label}</div>
      <div className={`text-sm font-medium ${status ? statusColor : ""}`}>
        {value}
      </div>
    </div>
  );
}

export default function CursorContactCard({ RESUME_URL = "#" }) {
  const cardRef = useRef(null);
  // target values updated on mouse move
  const target = useRef({ rx: 0, ry: 0, tx: 0, ty: 0, spotlightX: 80, spotlightY: 80 });
  // current values interpolated for smooth motion
  const current = useRef({ rx: 0, ry: 0, tx: 0, ty: 0, spotlightX: 80, spotlightY: 80 });
  const rafRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // bounds used to compute relative mouse position
    function onMove(e) {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1

      // rotation: map px,py to range
      const ry = (px - 0.5) * 20; // rotateY (deg)
      const rx = (0.5 - py) * 20; // rotateX (deg)
      // translation for parallax
      const tx = (px - 0.5) * 18; // px shift
      const ty = (py - 0.5) * 12;

      target.current.rx = rx;
      target.current.ry = ry;
      target.current.tx = tx;
      target.current.ty = ty;
      // spotlight percentages for CSS variable (0..100)
      target.current.spotlightX = px * 100;
      target.current.spotlightY = py * 100;
    }

    function onLeave() {
      // reset to neutral
      target.current.rx = 0;
      target.current.ry = 0;
      target.current.tx = 0;
      target.current.ty = 0;
      target.current.spotlightX = 50;
      target.current.spotlightY = 50;
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseenter", onMove);

    // animation loop: lerp current -> target
    const ease = 0.12; // lower = smoother/slower
    function frame() {
      // lerp helper
      const lerp = (a, b, t) => a + (b - a) * t;

      current.current.rx = lerp(current.current.rx, target.current.rx, ease);
      current.current.ry = lerp(current.current.ry, target.current.ry, ease);
      current.current.tx = lerp(current.current.tx, target.current.tx, ease);
      current.current.ty = lerp(current.current.ty, target.current.ty, ease);
      current.current.spotlightX = lerp(current.current.spotlightX, target.current.spotlightX, ease);
      current.current.spotlightY = lerp(current.current.spotlightY, target.current.spotlightY, ease);

      // apply transform & css variables
      if (el) {
        el.style.transform = `perspective(1000px) rotateX(${current.current.rx.toFixed(2)}deg) rotateY(${current.current.ry.toFixed(2)}deg) translateX(${current.current.tx.toFixed(2)}px) translateY(${current.current.ty.toFixed(2)}px)`;
        el.style.setProperty("--spot-x", `${current.current.spotlightX.toFixed(2)}%`);
        el.style.setProperty("--spot-y", `${current.current.spotlightY.toFixed(2)}%`);
      }

      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseenter", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.25, duration: 0.55, ease: "easeOut" }}
      className="relative"
    >
      {/* outer gradient halo */}
      <div className="absolute -inset-4 rounded-3xl blur-2xl pointer-events-none" aria-hidden>
        <div className="w-full h-full rounded-3xl"
          style={{
            background:
              "linear-gradient(90deg, rgba(6,182,212,0.06), rgba(139,92,246,0.06))",
            filter: "blur(18px)"
          }}
        />
      </div>

      {/* main interactive card */}
      <div
        ref={cardRef}
        className="relative rounded-3xl border border-white/10 p-8 shadow-2xl bg-gradient-to-b from-white/3 to-white/2 backdrop-blur-lg overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          transition: "box-shadow 0.25s ease",
          // CSS variables for spotlight position used below
          // --spot-x / --spot-y set dynamically
          "--spot-x": "50%",
          "--spot-y": "50%",
        }}
      >
        {/* spotlight using pseudo-like absolute element */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(600px 300px at var(--spot-x) var(--spot-y), rgba(255,255,255,0.06), transparent 20%)",
            mixBlendMode: "overlay",
            zIndex: 0,
          }}
        />

        {/* subtle inner parallax layers */}
        <div className="relative z-10">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Let's Build Something Amazing
          </h3>

          <div className="mt-6 space-y-4">
            <InfoItem label="Email" value="ninjarapper960@gmail.com" />
            <InfoItem label="Phone" value="+91 8512840272" />
            <InfoItem label="Location" value="New Delhi, India" />
            <InfoItem
              label="Status"
              value="Available for projects"
              status="available"
            />
          </div>

          <motion.div
            className="flex gap-3 mt-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="mailto:ninjarapper960@gmail.com"
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/20"
            >
              <HiMail /> Email Me
            </motion.a>
          </motion.div>
        </div>

        {/* decorative top-right tiny gradient chip */}
        <div
          aria-hidden
          className="absolute -top-6 -right-6 w-36 h-36 rounded-full opacity-40 pointer-events-none"
          style={{
            background:
              "conic-gradient(from 120deg at 50% 50%, rgba(99,102,241,0.12), rgba(6,182,212,0.07), rgba(139,92,246,0.09))",
            filter: "blur(18px)",
            zIndex: 0,
          }}
        />
      </div>
    </motion.div>
  );
}
