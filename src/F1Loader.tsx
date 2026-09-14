import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, ArrowRight } from "lucide-react";

interface F1LoaderProps {
  onEnterSite: () => void;
}

export function F1Loader({ onEnterSite }: F1LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [rpm, setRpm] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // System check verifications
  const [engineVerified, setEngineVerified] = useState(false);
  const [systemsVerified, setSystemsVerified] = useState(false);
  const [networkVerified, setNetworkVerified] = useState(false);
  const [assetsVerified, setAssetsVerified] = useState(false);
  const [trackReadyVerified, setTrackReadyVerified] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialize audio and progress loop
  useEffect(() => {
    // 1. Audio setup
    const audio = new Audio("/assets/f1-engine-sound.mp3");
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = 0.95;
    audioRef.current = audio;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked by browser policy until gesture
      });
    }

    // Unlock audio on first user gesture anywhere
    const unlockAudio = () => {
      if (audioRef.current && !audioRef.current.paused === false) {
        audioRef.current.play().catch(() => {});
      }
      events.forEach((evt) => window.removeEventListener(evt, unlockAudio));
    };
    const events = ["pointerdown", "touchstart", "keydown", "click"];
    events.forEach((evt) =>
      window.addEventListener(evt, unlockAudio, { passive: true, once: true })
    );

    // 2. Load Progress Animation (~2.5s duration)
    const minDuration = 2500;
    const startTime = performance.now();
    let currentDispProgress = 0;

    const tick = (now: number) => {
      const elapsed = Math.max(0, now - startTime);
      const timeFraction = Math.min(elapsed / minDuration, 1.0);
      const easedTime = Math.pow(timeFraction, 1.12);

      currentDispProgress += (easedTime - currentDispProgress) * 0.16;
      if (timeFraction >= 1.0) {
        currentDispProgress = 1.0;
      }

      const currentPct = currentDispProgress * 100;
      setProgress(currentPct);

      const targetRpm = currentDispProgress * 16000;
      setRpm(targetRpm);

      // Scale audio playback rate with RPM
      if (audioRef.current && !audioRef.current.paused) {
        const rate = 0.85 + (targetRpm / 16000) * 0.5;
        audioRef.current.playbackRate = Math.min(Math.max(rate, 0.75), 1.5);
      }

      // Verifications
      if (currentPct >= 20) setEngineVerified(true);
      if (currentPct >= 45) setSystemsVerified(true);
      if (currentPct >= 65) setNetworkVerified(true);
      if (currentPct >= 85) setAssetsVerified(true);
      if (currentPct >= 98 || currentDispProgress >= 0.999) {
        setTrackReadyVerified(true);
        setIsReady(true);
      }

      if (timeFraction >= 1.0 && currentDispProgress >= 0.999) {
        setProgress(100);
        setRpm(16000);
        setTrackReadyVerified(true);
        setIsReady(true);

        // Automatically transition into the site
        exitTimerRef.current = setTimeout(() => {
          setIsExiting(true);
          exitTimerRef.current = setTimeout(() => {
            if (audioRef.current) {
              audioRef.current.pause();
            }
            onEnterSite();
          }, 500);
        }, 400);

        return;
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      events.forEach((evt) => window.removeEventListener(evt, unlockAudio));
    };
  }, [onEnterSite]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isAudioMuted) {
      audioRef.current.play().catch(() => {});
      setIsAudioMuted(false);
    } else {
      audioRef.current.pause();
      setIsAudioMuted(true);
    }
  };

  const handleEnterClick = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    onEnterSite();
  };

  // Needle angle calculation (-135deg at 0 RPM to +135deg at 16,000 RPM)
  const needleAngle = -135 + (rpm / 16000) * 270;
  const redlineVibration =
    rpm >= 12000 ? (Math.random() - 0.5) * ((rpm - 12000) / 4000) * 2 : 0;

  // Tachometer SVG parameters
  const cx = 240;
  const cy = 240;
  const tickRadius = 195;
  const textRadius = 156;
  const fraction = Math.min(Math.max(rpm / 16000, 0), 1);
  const startAngleRad = ((-135 - 90) * Math.PI) / 180;
  const currentAngleRad = ((needleAngle - 90) * Math.PI) / 180;

  const sx = cx + tickRadius * Math.cos(startAngleRad);
  const sy = cy + tickRadius * Math.sin(startAngleRad);
  const ex = cx + tickRadius * Math.cos(currentAngleRad);
  const ey = cy + tickRadius * Math.sin(currentAngleRad);
  const sweepSpan = fraction * 270;
  const largeArc = sweepSpan > 180 ? 1 : 0;

  return (
    <div
      id="f1-loader"
      className={isExiting ? "loader-hidden" : ""}
      role="progressbar"
      aria-label="Loading SYNORA Telemetry"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="loader-vignette-overlay" />

      {/* 1. TOP HEADER ROW */}
      <header className="exact-header">
        <div className="header-meta-left">
          <div className="desktop-only-meta">
            <div className="app-title">SYNORA.EXE</div>
            <div>INITIATING</div>
            <div>SYSTEM CHECK</div>
            <div>LOADING EXPERIENCE</div>
          </div>
          <div className="mobile-only-hud-left">
            <div className="m-row">
              <span>LAP</span> <span className="val-white">01</span>
            </div>
            <div className="m-row">
              <span>DRS</span> <span className="val-green">READY</span>
            </div>
            <div className="m-row">
              <span>TYRE</span> <span className="val-red">SOFT</span>
            </div>
          </div>
        </div>

        <div className="header-brand-center">
          <div className="brand-main-title">
            <span>
              SYN<span className="brand-o-accent">O</span>RA
            </span>
            <div className="racing-checkered-flag">
              <div className="flag-box" />
              <div className="flag-box dim" />
              <div className="flag-box" />
              <div className="flag-box dim" />
              <div className="flag-box dim" />
              <div className="flag-box" />
              <div className="flag-box dim" />
              <div className="flag-box" />
            </div>
          </div>
          <div className="brand-subtitle">FRESHERS HACKATHON</div>
          <div className="brand-tagline">BUILD TODAY. LEAD TOMORROW.</div>
        </div>

        <div className="header-meta-right">
          <div className="desktop-only-meta">
            <div>SPEED</div>
            <div>IDEAS</div>
            <div>PEOPLE</div>
            <div>
              A BRIGHTER TOMORROW <span className="slash-accent">/</span>
            </div>
          </div>
          <div className="mobile-only-hud-right">
            <div className="m-row m-title">SYNORA.EXE</div>
            <div className="m-row m-subtitle">
              SYSTEM CHECK <span className="slash-accent">/</span>
            </div>
            <div
              className={`m-row m-chk ${engineVerified ? "verified" : ""}`}
            >
              ENGINE {engineVerified && <span className="check-mark">✓</span>}
            </div>
            <div
              className={`m-row m-chk ${systemsVerified ? "verified" : ""}`}
            >
              SYSTEMS {systemsVerified && <span className="check-mark">✓</span>}
            </div>
            <div
              className={`m-row m-chk ${networkVerified ? "verified" : ""}`}
            >
              NETWORK {networkVerified && <span className="check-mark">✓</span>}
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN TELEMETRY & TACHOMETER STAGE */}
      <main className="exact-main-stage">
        {/* Left Telemetry Card */}
        <aside className="telemetry-card-exact desktop-only-card">
          <div className="track-card-header">
            <div className="track-location-title">SRM AP</div>
            <div className="track-location-country">INDIA</div>
          </div>

          <div className="track-svg-container">
            <svg
              viewBox="0 0 160 80"
              width="100%"
              height="100%"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="trackGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#00f0ff" />
                  <stop offset="100%" stopColor="#ff1801" />
                </linearGradient>
              </defs>
              <path
                d="M 25 55 C 15 55, 10 40, 20 30 C 30 20, 50 25, 65 18 C 80 10, 110 12, 130 22 C 145 30, 150 48, 140 60 C 130 70, 110 65, 95 62 C 80 60, 50 68, 38 65 Z"
                stroke="url(#trackGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g>
                <circle r="3.5" fill="#ff1801" stroke="#ffffff" strokeWidth="1.5">
                  <animateMotion
                    dur="3.6s"
                    repeatCount="indefinite"
                    path="M 25 55 C 15 55, 10 40, 20 30 C 30 20, 50 25, 65 18 C 80 10, 110 12, 130 22 C 145 30, 150 48, 140 60 C 130 70, 110 65, 95 62 C 80 60, 50 68, 38 65 Z"
                  />
                </circle>
              </g>
              <line
                x1="20"
                y1="26"
                x2="28"
                y2="34"
                stroke="#ff1801"
                strokeWidth="3"
              />
            </svg>
          </div>

          <div className="track-telemetry-list">
            <div className="track-data-row">
              <span>LAP</span>
              <span style={{ color: "#fff", fontWeight: 700 }}>01</span>
            </div>
            <div className="track-data-row">
              <span>DRS</span>
              <span className="val-green">READY</span>
            </div>
            <div className="track-data-row">
              <span>ERS</span>
              <span className="val-yellow">CHARGING</span>
            </div>
            <div className="track-data-row">
              <span>TYRE</span>
              <span className="val-red">SOFT</span>
            </div>
          </div>
        </aside>

        {/* Center Tachometer Gauge */}
        <div className="tachometer-center-exact">
          <div className="gauge-housing" />
          <div className="gauge-dial-inner-ring" />

          <svg className="gauge-svg-exact" viewBox="0 0 480 480">
            <defs>
              <filter
                id="exactRedlineGlow"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
              >
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient
                id="gaugeProgressGrad"
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#ff3300" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#ff1801" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Redline sector background arc (11k to 16k) */}
            <path
              d="M 377.88 331.06 A 203 203 0 0 1 96.35 331.06"
              fill="none"
              stroke="#ff1801"
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#exactRedlineGlow)"
              opacity="0.9"
            />
            <path
              d="M 377.88 331.06 A 203 203 0 0 1 96.35 331.06"
              fill="none"
              stroke="#ff1801"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Active progress arc */}
            {fraction > 0.005 && (
              <path
                d={`M ${sx} ${sy} A ${tickRadius} ${tickRadius} 0 ${largeArc} 1 ${ex} ${ey}`}
                fill="none"
                stroke="url(#gaugeProgressGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#exactRedlineGlow)"
              />
            )}

            {/* Ticks and major numbers */}
            {Array.from({ length: 81 }).map((_, i) => {
              const tickRpm = (i / 80) * 16000;
              const tickAngle = -135 + (i / 80) * 270;
              const tickRad = ((tickAngle - 90) * Math.PI) / 180;
              const isEvenMajor = i % 10 === 0;
              const isOddMajor = i % 5 === 0 && !isEvenMajor;
              const tickLen = isEvenMajor ? 18 : isOddMajor ? 12 : 7;
              const strokeWidth = isEvenMajor ? 2.5 : isOddMajor ? 1.8 : 1;
              const tickColor =
                tickRpm >= 11500 ? "#ff1801" : "rgba(255, 255, 255, 0.7)";

              const tx1 = cx + tickRadius * Math.cos(tickRad);
              const ty1 = cy + tickRadius * Math.sin(tickRad);
              const tx2 = cx + (tickRadius - tickLen) * Math.cos(tickRad);
              const ty2 = cy + (tickRadius - tickLen) * Math.sin(tickRad);

              const numVal = Math.round(tickRpm / 1000);
              const nx = cx + textRadius * Math.cos(tickRad);
              const ny = cy + textRadius * Math.sin(tickRad) + 5;
              const isRedNum = numVal >= 12;

              return (
                <React.Fragment key={i}>
                  <line
                    x1={tx1}
                    y1={ty1}
                    x2={tx2}
                    y2={ty2}
                    stroke={tickColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                  />
                  {isEvenMajor && (
                    <text
                      x={nx}
                      y={ny}
                      textAnchor="middle"
                      fontFamily="'Orbitron', sans-serif"
                      fontSize="16"
                      fontWeight="900"
                      fontStyle="italic"
                      fill={isRedNum ? "#ff1801" : "#ffffff"}
                    >
                      {numVal}
                    </text>
                  )}
                </React.Fragment>
              );
            })}

            {/* Active tip bead */}
            {fraction > 0.005 && (
              <g transform={`translate(${ex}, ${ey})`}>
                <circle r="8" fill="#ff1801" opacity="0.6" />
                <circle r="4" fill="#ffffff" />
              </g>
            )}
          </svg>

          {/* Needle Layer */}
          <div className="gauge-needle-wrapper">
            <div
              className="needle-pointer"
              style={{
                transform: `rotate(${needleAngle + redlineVibration}deg)`,
              }}
            >
              <div className="needle-body-glow" />
            </div>
          </div>

          {/* Central Digital Readout */}
          <div className="gauge-center-text-stack">
            <div className="exact-rpm-val">
              {Math.round(rpm).toLocaleString()}
            </div>
            <div className="exact-rpm-unit">RPM</div>
            <div className="exact-pct-val">{Math.round(progress)}%</div>
            <div className="exact-loading-label">LOADING...</div>
          </div>

          {/* Bottom Capsule Progress */}
          <div className="gauge-bottom-progress-bar-container">
            <div className="pill-progress-track">
              <div
                className="pill-progress-fill"
                style={{ width: `${progress.toFixed(1)}%` }}
              />
            </div>
            <div className="pill-slogan">POWERING GREAT IDEAS</div>
          </div>
        </div>

        {/* Right Telemetry Card (Systems Check) */}
        <aside className="telemetry-card-exact desktop-only-card">
          <div className="systems-card-title">SYSTEMS CHECK</div>
          <div className="systems-check-list">
            <div
              className={`system-check-item ${
                engineVerified ? "verified" : ""
              }`}
            >
              <span>ENGINE</span>
              {engineVerified && <span className="check-mark">✓</span>}
            </div>
            <div
              className={`system-check-item ${
                systemsVerified ? "verified" : ""
              }`}
            >
              <span>SYSTEMS</span>
              {systemsVerified && <span className="check-mark">✓</span>}
            </div>
            <div
              className={`system-check-item ${
                networkVerified ? "verified" : ""
              }`}
            >
              <span>NETWORK</span>
              {networkVerified && <span className="check-mark">✓</span>}
            </div>
            <div
              className={`system-check-item ${
                assetsVerified ? "verified" : ""
              }`}
            >
              <span>ASSETS</span>
              {assetsVerified && <span className="check-mark">✓</span>}
            </div>
            <div
              className={`system-check-item ${
                trackReadyVerified ? "verified" : ""
              }`}
            >
              <span>TRACK READY</span>
              {trackReadyVerified ? (
                <span className="check-mark">✓</span>
              ) : (
                <div className="system-spinner" />
              )}
            </div>
          </div>
        </aside>
      </main>

      {/* 3. FLANKING SLOGANS ROW (DESKTOP) */}
      <div className="flanking-slogans-row desktop-only-row">
        <div className="flank-left">
          <div className="passion-block">
            SAME
            <br />
            PASSION
            <br />
            DIFFERENT
            <br />
            TRACK <span className="slash-accent">/</span>
          </div>
          <div className="pole-block">
            IDEAS
            <br />
            IN POLE POSITION
          </div>
        </div>
        <div className="flank-right">
          <div className="future-block">
            FROM
            <br />
            FRESHERS
            <br />
            TO
            <br />
            THE FUTURE
          </div>
          <div className="engineering-block">
            ENGINEERING
            <br />
            A BRIGHTER TOMORROW
          </div>
        </div>
      </div>

      {/* 4. BOTTOM CONTROLS & ENTER SITE CTA */}
      <div className="exact-bottom-actions">
        <button
          type="button"
          onClick={toggleAudio}
          className="button outline-button f1-audio-toggle"
          aria-label={isAudioMuted ? "Unmute Audio" : "Mute Audio"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(10, 12, 16, 0.85)",
            borderColor: "rgba(255, 255, 255, 0.2)",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "4px",
            fontSize: "12px",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.1em",
            cursor: "pointer",
          }}
        >
          {isAudioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          <span>{isAudioMuted ? "AUDIO: OFF" : "AUDIO: ON"}</span>
        </button>

        {isReady && (
          <button
            type="button"
            onClick={handleEnterClick}
            className="button primary-button f1-enter-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#ff1801",
              borderColor: "#ff1801",
              color: "#fff",
              padding: "10px 24px",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: "700",
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: "0.15em",
              boxShadow:
                "0 0 20px rgba(255, 24, 1, 0.6), 0 0 40px rgba(255, 24, 1, 0.3)",
              cursor: "pointer",
              animation: "pulseRed 1.2s infinite ease-in-out",
            }}
          >
            <span>ENTER SITE</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
