import '../styles/globals.css'
import Head from 'next/head'
import { useEffect } from 'react'

export default function App({ Component, pageProps }){
  useEffect(()=>{
    // Initialize GSAP ScrollTrigger client-side. Lenis (smooth scroller) is optional
    // and removed from dependencies to avoid build-time resolution issues. If you
    // want to add a smooth scroller, reinstall and adapt the integration.
    async function initSmooth(){
      try{
        const gsapModule = await import('gsap');
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        const gsap = gsapModule.gsap || gsapModule.default || gsapModule;
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default || ScrollTriggerModule;
        gsap.registerPlugin(ScrollTrigger);
        // Use native scroll; components will use ScrollTrigger with the default scroller.
      }catch(e){
        console.warn('ScrollTrigger init failed', e);
      }
    }
    initSmooth();

    return ()=>{}
  },[])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Spice Journey — Premium Spices</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
