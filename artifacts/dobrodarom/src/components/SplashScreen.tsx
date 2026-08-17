import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoMark } from "./layout/Logo";

interface SplashScreenProps {
  onDone: () => void;
}

// Each letter of the brand name animates in individually
function AnimatedWord({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.span
      className="inline-flex"
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function SplashScreen({ onDone }: SplashScreenProps) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Start exit at 2.6s so the fade-out finishes around 3.2s total
    const timer = setTimeout(() => setLeaving(true), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!leaving && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
          style={{ background: "#1B1918" }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Radial glow behind logo */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 340,
              height: 340,
              background: "radial-gradient(circle, rgba(208,57,74,0.20) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />

          {/* Logo emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.55, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative z-10 mb-8"
          >
            <LogoMark variant="white-on-red" size={120} />
          </motion.div>

          {/* Brand name */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <h1 className="font-serif font-bold text-white text-5xl md:text-6xl tracking-wide leading-none">
              <AnimatedWord text="Добро" delay={0.55} />
              {"\u00A0"}
              <AnimatedWord text="Даром" delay={0.85} />
            </h1>

            {/* Divider line */}
            <motion.div
              className="h-px bg-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: 200, transformOrigin: "left" }}
            />

            {/* Subtitle */}
            <motion.p
              className="text-white/50 text-[11px] tracking-[0.3em] uppercase font-medium"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5, ease: "easeOut" }}
            >
              Благотворительный фонд
            </motion.p>
          </div>

          {/* Pulsing dot indicator at the bottom */}
          <motion.div
            className="absolute bottom-12 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.4 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="rounded-full bg-white/30"
                style={{ width: 5, height: 5 }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
