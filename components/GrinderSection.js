import React, { useEffect, useRef } from 'react' 

export default function GrinderSection({ particleRef }){
  const wrapRef = useRef(null)
  const videoRef = useRef(null)
  const rootRef = useRef(null)
  const wheelRef = useRef(null)
  const chilliRef = useRef(null)
  const textRef = useRef(null)

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
          const tl = gsap.timeline({
            scrollTrigger:{
              trigger: wrapRef.current,
              start: 'top top',
              end: '+=' + (window.innerHeight * 2.6),
              scrub: 1,
              pin: true,
              anticipatePin: 1
            }
          })

          // Intro text slide-in (left)
          tl.from(textRef.current, { x: -90, opacity: 0, duration: 1.1, ease: 'power3.out' }, 0)

          // Move root into grinder and rotate wheel simultaneously
          tl.to(rootRef.current, { x: -260, y: 18, rotation: -6, duration: 1.4, ease: 'power2.inOut' }, '>-0.2')
          tl.to(wheelRef.current, { rotate: 1080, duration: 1.6, ease: 'power2.inOut' }, '<')

          // Burst of golden dust when root hits the stone
          tl.add(()=>{
            particleRef?.current?.spawn?.({ amount: 420, color:'#D8A700', spread:300, size:5 })
            // brief highlight pulse on wheel
            gsap.to(wheelRef.current, { boxShadow: '0 40px 120px rgba(216,167,0,0.12)', duration: 0.5, yoyo:true, repeat:1, ease:'sine.inOut' })
          }, '+=0.1')

          // Fade the root as it becomes powder
          tl.to(rootRef.current, { opacity: 0, duration: 0.5 }, '+=0.1')

          // chilli / red spice toss
          tl.to(chilliRef.current, { y: 160, rotation: 8, duration: 1.2, ease:'power2.inOut' }, '-=0.4')
          tl.add(()=>{
            particleRef?.current?.spawn?.({ amount:320, color:'#C8322B', spread:320, size:4 })
          }, '-=0.3')

          // cinematic slow-motion camera shake
          tl.to(wrapRef.current, { x: 6, duration: 0.04, repeat:6, yoyo:true, ease:'power1.inOut' }, '-=0.7')
          tl.to(wrapRef.current, { x: 0, duration: 0.25, ease:'power1.out' })

        }, wrapRef)
      }catch(e){ console.warn('grinder init failed', e) }
    })()

    // ensure video attempts to play (muted)
    try{ videoRef.current?.play?.() }catch(e){}

    return ()=> ctx && ctx.revert && ctx.revert()
  },[])

  return (
    <section className="min-h-screen section-sticky relative flex items-center overflow-hidden" ref={wrapRef} aria-labelledby="grinder-heading">
      {/* background video */}
      
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover hero-video" src="/grind.mp4" autoPlay muted loop playsInline />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/80"></div>

   
      {/* subtle grain / dust over entire section */}
      <div className="absolute inset-0 pointer-events-none z-30" aria-hidden>
        <canvas id="grinder-grain" className="w-full h-full mix-blend-screen opacity-30"></canvas>
      </div>
    </section>
  )
}
// export default function GrinderSection({ particleRef }){
  
//   return (
//     <section className="min-h-screen section-sticky relative flex items-center" >

//     </section>
//   )
// }
