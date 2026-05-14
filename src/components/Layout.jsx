import React from 'react'
import ParticleCanvas from './ParticleCanvas'

function SiteNav(){
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="container flex items-center justify-between py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-yellow-700/90 flex items-center justify-center text-xs font-medium">S</div>
          <div className="text-beige/90 font-semibold">Saffrona</div>
        </div>

        <nav className="hidden md:flex items-center gap-8 uppercase text-sm tracking-widest text-beige/70">
          <a className="nav-link" href="#journey">Journey</a>
          <a className="nav-link" href="#craft">Craft</a>
          <a className="nav-link" href="#products">Products</a>
        </nav>

        <div className="hidden md:block">
          <a href="#origin" className="btn-glow" style={{padding:'0.6rem 1rem', border:'1px solid rgba(255,255,255,0.05)'}}>Origin Story</a>
        </div>
      </div>
    </header>
  )
}

export default function Layout({ children, particleRef }){
  return (
    <div className="min-h-screen relative bg-earth spotlight grain">
      <SiteNav />
      {children}
      <div className="canvas-overlay">
        <ParticleCanvas ref={particleRef} />
      </div>
    </div>
  )
}
