import React, { useEffect, useRef } from 'react'

export default function PowderSection(){
  const wrapRef = useRef(null)

  useEffect(()=>{
    let ctx
    (async ()=>{
      try{
        const gsapModule = await import('gsap')
        const ScrollTriggerModule = await import('gsap/ScrollTrigger')
        const gsap = gsapModule.gsap || gsapModule.default || gsapModule
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default || ScrollTriggerModule
        gsap.registerPlugin(ScrollTrigger)

        ctx = gsap.context(()=>{
          gsap.fromTo('.powder-wipe', { clipPath: 'inset(0 100% 0 0)' }, { clipPath:'inset(0 0% 0 0)', ease:'power2.out', scrollTrigger:{ trigger:wrapRef.current, start:'top 80%', end:'top 30%', scrub:0.8 } })
        }, wrapRef)

      }catch(e){ console.warn(e) }
    })()

    return ()=> ctx && ctx.revert && ctx.revert()
  },[])

  return (
    <section className="min-h-screen section-sticky flex items-center justify-center" ref={wrapRef}>
      <div className="container text-center">
        <div className="relative w-full h-96 overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-b from-yellow-900 to-yellow-400">
          <div className="absolute inset-0 powder-wipe" style={{background:'linear-gradient(90deg, rgba(255,240,180,0.95), rgba(200,80,40,0.12))'}}></div>
        </div>
      </div>
    </section>
  )
}
