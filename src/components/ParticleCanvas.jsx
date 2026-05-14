import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

const ParticleCanvas = forwardRef((props, ref) => {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const runningRef = useRef(true)

  useImperativeHandle(ref, () => ({
    spawn: (opts = {}) => spawn(opts)
  }))

  function spawn({ x = null, y = null, amount = 80, color = '#D8A700', spread = 200, size = 6 } = {}){
    const canvas = canvasRef.current
    if(!canvas) return
    const rect = canvas.getBoundingClientRect()
    const cx = x === null ? rect.width * 0.5 : x
    const cy = y === null ? rect.height * 0.5 : y

    for(let i=0;i<amount;i++){
      particlesRef.current.push({
        x: cx + (Math.random()-0.5) * spread,
        y: cy + (Math.random()-0.5) * spread,
        vx: (Math.random()-0.5) * 2.5,
        vy: (Math.random()-0.8) * 2.5 - 1,
        life: 60 + Math.random()*40,
        size: size * (0.6 + Math.random()*1.4),
        color: color,
        alpha: 0.9 * (0.6 + Math.random()*0.4)
      })
    }
  }

  useEffect(()=>{
    const canvas = canvasRef.current
    if(!canvas) return
    const ctx = canvas.getContext('2d')
    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    function resize(){
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    let rafId
    function loop(){
      ctx.clearRect(0,0,width,height)
      // subtle blur / glow
      ctx.globalCompositeOperation = 'lighter'
      for(let i = particlesRef.current.length - 1; i >= 0; i--){
        const p = particlesRef.current[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.02 // gravity
        p.life--
        p.alpha *= 0.995
        if(p.life <= 0 || p.alpha < 0.02){ particlesRef.current.splice(i,1); continue }

        const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size*4)
        g.addColorStop(0, hexToRgba(p.color, p.alpha))
        g.addColorStop(0.5, hexToRgba(p.color, p.alpha*0.5))
        g.addColorStop(1, hexToRgba('#000000', 0))
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size*2.2, 0, Math.PI*2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'
      if(runningRef.current) rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return ()=>{
      runningRef.current = false
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  },[])

  function hexToRgba(hex, alpha){
    const c = hex.replace('#','')
    const bigint = parseInt(c,16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return `rgba(${r},${g},${b},${alpha})`
  }

  return (
    <canvas ref={canvasRef} className="w-full h-full block" />
  )
})

export default ParticleCanvas
