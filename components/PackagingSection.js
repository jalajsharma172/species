import React, { useEffect, useRef } from 'react'

export default function PackagingSection({ particleRef }){
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
          gsap.from('.pack-1',{ y:60, opacity:0, duration:1, ease:'power3.out', scrollTrigger:{ trigger:wrapRef.current, start:'top 80%', end:'bottom 30%', scrub:true } })
          gsap.from('.pack-2',{ y:100, opacity:0, duration:1.2, ease:'power3.out', scrollTrigger:{ trigger:wrapRef.current, start:'top 80%', end:'bottom 30%', scrub:true } })

        }, wrapRef)

      }catch(e){ console.warn(e) }
    })()

    return ()=> ctx && ctx.revert && ctx.revert()
  },[])

  return (
    <section className="min-h-screen flex items-center justify-center" ref={wrapRef}>
      <div className="container grid grid-cols-3 gap-6 items-center">
        <div className="col-span-2">
          <h3 className="text-4xl font-heading">Packaging — Crafted Precision</h3>
          <p className="mt-4 text-lg text-beige/90">Powder flows into matte pouches which seal and reveal minimal luxury labels.</p>
        </div>
        <div className="col-span-1 flex flex-col gap-6 items-center justify-center">
          <div className="pack-1 product-mock">{/* pouch 1 */}</div>
          <div className="pack-2 product-mock">{/* pouch 2 */}</div>
        </div>
      </div>
    </section>
  )
}
