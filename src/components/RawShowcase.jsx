import React, { useEffect, useRef, useState, useCallback } from "react";

// Floating dust/spice particle
function DustParticle({ style }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: style.size,
        height: style.size,
        left: style.left,
        bottom: "-10px",
        background: style.color,
        opacity: 0,
        animation: `dustRise ${style.duration}s ease-in ${style.delay}s infinite`,
        filter: "blur(0.6px)",
      }}
    />
  );
}

function generateParticles(count = 28) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: `${Math.random() * 3 + 1.5}px`,
    left: `${Math.random() * 100}%`,
    duration: 5 + Math.random() * 6,
    delay: Math.random() * 6,
    color: [
      "rgba(234,179,8,0.55)",
      "rgba(180,83,9,0.45)",
      "rgba(253,224,71,0.5)",
      "rgba(220,130,50,0.4)",
      "rgba(255,255,255,0.25)",
    ][Math.floor(Math.random() * 5)],
  }));
}

const PARTICLES = generateParticles(28);

export default function RawShowcase({ particleRef }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const [showParticles, setShowParticles] = useState(false);

  // Ambient effects always-on once video is ready
  useEffect(() => {
    if (videoReady) {
      setTimeout(() => setShowParticles(true), 400);
    }
  }, [videoReady]);

  // ─── Video event handlers ─────────────────────────────────────────────────
  const handleVideoLoadedMetadata = useCallback(() => {
    setVideoReady(true);
    setVideoError(null);
  }, []);

  const handleCanPlayThrough = useCallback(() => {
    if (!videoReady) setVideoReady(true);
  }, [videoReady]);

  const handleVideoError = useCallback(() => {
    const error = videoRef.current?.error;
    let errorMsg = "Error loading video";
    if (error) {
      const map = {
        [MediaError.MEDIA_ERR_ABORTED]: "Video loading was aborted",
        [MediaError.MEDIA_ERR_NETWORK]: "Network error loading video",
        [MediaError.MEDIA_ERR_DECODE]: "Video decode error",
        [MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED]: "Video format not supported",
      };
      errorMsg = map[error.code] || errorMsg;
    }
    setVideoError(errorMsg);
    setVideoReady(true);
  }, []);

  const handleContextMenu = (e) => e.preventDefault();

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes dustRise {
          0%   { transform: translateY(0) translateX(0) scale(1);   opacity: 0; }
          10%  { opacity: 1; }
          60%  { opacity: 0.7; }
          100% { transform: translateY(-60vh) translateX(var(--drift, 30px)) scale(0.3); opacity: 0; }
        }
        @keyframes ambientBreath {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%       { opacity: 0.55; transform: scale(1.015); }
        }
        @keyframes scanlineSweep {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 0.06; }
          90%  { opacity: 0.06; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes vignettePulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 0.85; }
        }
        @keyframes liveDot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="raw"
        className="relative w-full h-screen flex items-center justify-center overflow-hidden z-30"
        style={{
          background:
            "linear-gradient(135deg, #1a0f0a 0%, #2d1810 50%, #1a0f0a 100%)",
        }}
      >
        {/* ── Video layer ── */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black/20">
          <video
            ref={videoRef}
            onLoadedMetadata={handleVideoLoadedMetadata}
            onCanPlayThrough={handleCanPlayThrough}
            onError={handleVideoError}
            onContextMenu={handleContextMenu}
            className="w-full h-full object-cover"
            style={{ willChange: "transform", transform: "translateZ(0)" }}
            muted
            autoPlay
            loop
            playsInline
          >
            <source src="/output.mp4" type="video/mp4" />
          </video>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

          {/* Pulsing vignette */}
          <div
            className="absolute inset-0"
            style={{
              boxShadow:
                "inset 0 0 80px rgba(0,0,0,0.6), inset 0 0 40px rgba(0,0,0,0.3)",
              animation: videoReady
                ? "vignettePulse 3.5s ease-in-out infinite"
                : "none",
            }}
          />

          {/* Scanline sweep */}
          {videoReady && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 49%, rgba(255,220,80,0.07) 50%, transparent 51%)",
                animation: "scanlineSweep 7s linear infinite",
              }}
            />
          )}

          {/* Warm amber breathing glow */}
          {videoReady && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(180,83,9,0.18) 0%, transparent 70%)",
                animation: "ambientBreath 3.5s ease-in-out infinite",
              }}
            />
          )}

          {/* Floating dust particles */}
          {showParticles &&
            PARTICLES.map((p) => <DustParticle key={p.id} style={p} />)}
        </div>

        {/* ── Centre text ── */}
        {videoReady && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{ animation: "ambientBreath 5s ease-in-out infinite" }}
          >
            <div
              className="text-center text-white z-10"
              style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}
            >
              <h3 className="text-5xl md:text-6xl font-bold mb-4 font-serif"></h3>
            </div>
          </div>
        )}

        {/* ── Live badge ── */}
        {videoReady && (
          <div
            className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full pointer-events-none"
            style={{
              background: "rgba(0,0,0,0.45)",
              border: "1px solid rgba(234,179,8,0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-yellow-400"
              style={{ animation: "liveDot 1.2s ease-in-out infinite" }}
            />
            <span className="text-yellow-400/80 text-xs tracking-widest uppercase font-medium">
              Live
            </span>
          </div>
        )}

        {/* ── Loading state ── */}
        {!videoReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-transparent border-t-yellow-600 rounded-full animate-spin" />
              <p className="text-white/60 text-sm">
                Loading immersive experience...
              </p>
              {videoError && (
                <p className="text-red-400/80 text-xs text-center max-w-xs">
                  {videoError}
                </p>
              )}
              <button
                onClick={() => {
                  setVideoReady(true);
                  setVideoError(null);
                }}
                className="mt-4 px-4 py-2 text-xs text-white/70 border border-white/20 rounded hover:border-white/40 hover:text-white transition-all"
              >
                Skip Loading
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ── Post-video content section ── */}
      <section className="relative z-10 min-h-screen bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-6 md:space-y-8">
              <div>
                <p className="text-yellow-600 text-sm md:text-base tracking-widest uppercase mb-4">
                  Premium Quality
                </p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Raw Ingredients
                </h2>
              </div>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Experience the journey from raw turmeric roots to our premium
                spice blend. Each ingredient is carefully selected and processed
                to maintain maximum flavor and nutritional value.
              </p>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                Fresh turmeric roots and dried red chillies presented with macro
                texture studies and layered parallax for an immersive visual
                experience.
              </p>
              <div className="pt-4 md:pt-8">
                <button
                  onClick={() => (window.location.href = "#final")}
                  className="px-8 md:px-10 py-3 md:py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-yellow-600/50 transform hover:scale-105"
                >
                  Explore Products
                </button>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/truck.png"
                alt="Turmeric Roots - Premium Quality Ingredients"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
