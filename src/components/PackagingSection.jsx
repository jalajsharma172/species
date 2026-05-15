import React from "react";

export default function PackagingSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* GIF Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/gif/prepgf.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: `
            brightness(1.08)
            contrast(0.92)
            saturate(0.82)
          `,
          transform: "scale(1.02)",
          zIndex: 0,
        }}
      />

      {/* Top Soft Blend Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(
              to bottom,
              rgba(245, 220, 170, 0.28) 0%,
              rgba(245, 220, 170, 0.12) 18%,
              rgba(245, 220, 170, 0) 40%  
            )
          `,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
