import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type PropsWithChildren,
} from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, TerminalSquare } from "lucide-react";
import { event } from "./content";

export function RegistrationLink({
  children = "Register now",
  className = "",
  onClick,
}: PropsWithChildren<{ className?: string; onClick?: () => void }>) {
  const url = safeExternalUrl(event.registrationUrl);
  return (
    <a
      className={`button ${className}`}
      href={event.registrationOpen ? (url ?? "#register") : "#register"}
      onClick={onClick}
      {...(event.registrationOpen && url
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {event.registrationOpen ? children : "Registration closed"}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}

export function safeExternalUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: PropsWithChildren<{ className?: string; delay?: number }>) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export const navItems = [
  { id: "overview", label: "The experience" },
  { id: "tracks", label: "Domains" },
  { id: "announcements", label: "Race control" },
  { id: "schedule", label: "Schedule" },
  { id: "teams", label: "The grid" },
  { id: "rules", label: "Rulebook" },
  { id: "after-dark", label: "After dark" },
  { id: "faq", label: "FAQs" },
];

// Adapted from the user-supplied React Bits LineSidebar; real anchors and scroll-aware active state.
export function LineSidebar() {
  const [active, setActive] = useState("overview");
  const [hover, setHover] = useState<number | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-18% 0px -62% 0px" },
    );
    navItems.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <nav
      className="line-sidebar"
      aria-label="Page sections"
      onPointerLeave={() => setHover(null)}
    >
      <span className="rail-label">THE RACING LINE</span>
      {navItems.map((item, i) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-current={active === item.id ? "location" : undefined}
          onPointerEnter={() => setHover(i)}
          style={
            {
              "--proximity":
                hover === null ? 0 : Math.max(0, 1 - Math.abs(hover - i) / 2),
            } as CSSProperties
          }
        >
          <span className="rail-tick" />
          <span className="rail-index">0{i + 1}</span>
          {item.label}
        </a>
      ))}
      <span className="rail-bottom">SYNORA / 2026</span>
    </nav>
  );
}

// React Bits CurvedLoop, adapted to stop offscreen and avoid per-frame React renders.
export function CurvedLoop() {
  const id = useId().replace(/:/g, "");
  const host = useRef<HTMLDivElement>(null);
  const path = useRef<SVGTextPathElement>(null);
  const inView = useInView(host);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0,
      offset = 0,
      last = 0;
    const step = (now: number) => {
      if (last) offset = (offset - Math.min(now - last, 32) * 0.025) % 720;
      last = now;
      path.current?.setAttribute("startOffset", String(offset));
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);
  return (
    <div className="curved-loop" ref={host} aria-hidden="true">
      <svg viewBox="0 0 1440 145">
        <defs>
          <path id={id} d="M-800,65 Q720,180 2500,20" />
        </defs>
        <text>
          <textPath ref={path} href={`#${id}`}>
            {"CODE ✦ INNOVATE ✦ COMPETE ✦ ".repeat(8)}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

const CardHover = createContext(false);
// Adapted from Aceternity UI 3D Card. Pointer tilt is decorative, capped and motion-aware.
export function CardContainer({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();
  return (
    <CardHover.Provider value={hovered}>
      <div className={`card-perspective ${className}`}>
        <div
          ref={ref}
          className="card-3d"
          onPointerMove={(e) => {
            if (reduce || e.pointerType !== "mouse") return;
            setHovered(true);
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.transform = `rotateX(${(-(e.clientY - r.top - r.height / 2) / r.height) * 7}deg) rotateY(${((e.clientX - r.left - r.width / 2) / r.width) * 7}deg)`;
          }}
          onPointerLeave={() => {
            setHovered(false);
            if (ref.current) ref.current.style.transform = "";
          }}
        >
          {children}
        </div>
      </div>
    </CardHover.Provider>
  );
}

export function CardItem({
  children,
  translateZ = 30,
  className = "",
}: PropsWithChildren<{ translateZ?: number; className?: string }>) {
  const hovered = useContext(CardHover);
  return (
    <div
      className={`card-item ${className}`}
      style={{ transform: `translateZ(${hovered ? translateZ : 0}px)` }}
    >
      {children}
    </div>
  );
}

export function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const view = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [lines, setLines] = useState(0);
  useEffect(() => {
    if (!view || reduce || lines >= 3) return;
    const timer = setTimeout(() => setLines(lines + 1), 550);
    return () => clearTimeout(timer);
  }, [view, reduce, lines]);
  return (
    <div className="terminal" ref={ref}>
      <div className="terminal-bar">
        <TerminalSquare size={16} />
        <span>synora / race-control</span>
        <span className="terminal-dots">● ● ●</span>
      </div>
      <div className="terminal-content">
        <p>
          <span className="terminal-prompt">❯</span> launch your first hackathon
          <span className="terminal-caret" aria-hidden="true">
            _
          </span>
        </p>
        {[
          "4 hours to learn the essentials",
          "30+ mentors in your corner",
          "One grid. Endless possibilities.",
        ].map((line, i) => (
          <p
            key={line}
            className={
              reduce || lines > i ? "terminal-line shown" : "terminal-line"
            }
          >
            <Check size={14} />
            {line}
          </p>
        ))}
      </div>
      <div className="terminal-bottom">
        BRIEFING 01 <span>YOU’RE IN GOOD COMPANY.</span>
      </div>
    </div>
  );
}

export function CanvasText({ children }: PropsWithChildren) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, 600, 90);
    for (let i = 0; i < 42; i++) {
      ctx.strokeStyle = `rgba(255,255,255,${0.1 + (i % 3) * 0.05})`;
      ctx.beginPath();
      ctx.moveTo(i * 17, 90);
      ctx.lineTo(i * 17 + 70, 0);
      ctx.stroke();
    }
  }, []);
  return (
    <span className={`canvas-text ${reduce ? "static" : ""}`}>
      <canvas ref={canvas} width={600} height={90} aria-hidden="true" />
      <span>{children}</span>
    </span>
  );
}
