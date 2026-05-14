import React, { useEffect, useRef, useState, useCallback } from 'react'

export default function RawShowcase({ particleRef }) {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoError, setVideoError] = useState(null)
  const scrollFrameRef = useRef(null)
  const lastScrollRef = useRef(0)
  const scrollProgressRef = useRef(0)
  const targetTimeRef = useRef(0)
  const renderFrameRef = useRef(null)
  const lastUpdateTimeRef = useRef(0)
  const overlayRef = useRef(null)

  // Continuous render loop for smooth video scrubbing
  const renderLoop = useCallback(() => {
    if (videoRef.current && videoReady && videoRef.current.duration) {
      const current = videoRef.current.currentTime
      const target = targetTimeRef.current
      const diff = target - current
      const now = performance.now()

      // Increase throttle to ~12-15fps (80ms) and remove lerping completely.
      // Lerping causes a pile-up of frame decodes which exponentially lags 
      // towards the end of standard MP4 files.
      if (Math.abs(diff) > 0.04 && (now - lastUpdateTimeRef.current > 80)) {
        videoRef.current.currentTime = target
        lastUpdateTimeRef.current = now
      }
    }
    renderFrameRef.current = requestAnimationFrame(renderLoop)
  }, [videoReady])

  // Start the render loop when video is ready
  useEffect(() => {
    if (videoReady) {
      renderFrameRef.current = requestAnimationFrame(renderLoop)
    }
    return () => {
      if (renderFrameRef.current) {
        cancelAnimationFrame(renderFrameRef.current)
      }
    }
  }, [videoReady, renderLoop])

  // Calculate scroll progress and sync video timeline
  const updateVideoTimeline = useCallback(() => {
    if (!videoRef.current || !containerRef.current || !videoReady) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const elementHeight = rect.height

    // Calculate scroll progress: 0 to 1 based on sticky container
    let scrollProgress = 0
    const scrollDistance = elementHeight - windowHeight

    if (scrollDistance > 0) {
      scrollProgress = Math.max(0, Math.min(1, -rect.top / scrollDistance))
    }

    scrollProgressRef.current = scrollProgress

    // Map scroll progress to video timeline
    if (videoRef.current.duration) {
      // Set the target time instead of updating video directly
      targetTimeRef.current = scrollProgress * videoRef.current.duration

      // Update playing state based on scroll
      setIsPlaying(scrollProgress > 0.05 && scrollProgress < 0.95)
    }

    // Update overlay opacity directly for performance (avoids React re-renders)
    if (overlayRef.current) {
      const opacity = isActive && videoReady ? Math.max(0, (scrollProgress - 0.7) * 3.33) : 0;
      overlayRef.current.style.opacity = opacity;
    }
  }, [videoReady, isActive])

  // Smooth scroll listener with requestAnimationFrame
  useEffect(() => {
    const handleScroll = () => {
      if (scrollFrameRef.current) {
        cancelAnimationFrame(scrollFrameRef.current)
      }
      scrollFrameRef.current = requestAnimationFrame(updateVideoTimeline)
      lastScrollRef.current = window.scrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollFrameRef.current) {
        cancelAnimationFrame(scrollFrameRef.current)
      }
    }
  }, [videoReady, updateVideoTimeline])

  // Intersection Observer to detect when container is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting)
        if (entry.isIntersecting && videoRef.current) {
          // Reset or update video position when section comes into view
          requestAnimationFrame(updateVideoTimeline)
        }
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1],
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [videoReady, updateVideoTimeline])

  // Handle video metadata loaded
  const handleVideoLoadedMetadata = useCallback(() => {
    console.log('Video metadata loaded, duration:', videoRef.current?.duration)
    setVideoReady(true)
    setVideoError(null)
    // Small delay to ensure video is fully ready
    setTimeout(() => {
      updateVideoTimeline()
    }, 50)
  }, [updateVideoTimeline])

  // Handle video can play through
  const handleCanPlayThrough = useCallback(() => {
    console.log('Video can play through')
    if (!videoReady) {
      setVideoReady(true)
      setVideoError(null)
    }
  }, [videoReady])

  // Handle video error
  const handleVideoError = useCallback((e) => {
    console.error('Video loading error:', e)
    const error = videoRef.current?.error
    let errorMsg = 'Error loading video'

    if (error) {
      switch (error.code) {
        case error.MEDIA_ERR_ABORTED:
          errorMsg = 'Video loading was aborted'
          break
        case error.MEDIA_ERR_NETWORK:
          errorMsg = 'Network error loading video'
          break
        case error.MEDIA_ERR_DECODE:
          errorMsg = 'Video decode error'
          break
        case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
          errorMsg = 'Video format not supported'
          break
      }
    }

    setVideoError(errorMsg)
    // Mark as ready anyway so user can still interact
    setVideoReady(true)
  }, [])

  // Handle video ended
  const handleVideoEnded = useCallback(() => {
    setIsPlaying(false)
  }, [])

  // Prevent right-click on video
  const handleContextMenu = (e) => {
    e.preventDefault()
  }

  return (
    <>
      {/* Spacer for scroll behavior - gives enough scroll distance to play through video */}
      <div
        ref={containerRef}
        className="relative w-full h-[400vh]"
      >
        {/* Sticky video container */}
        <section
          ref={sectionRef}
          id="raw"
          className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden z-30"
          style={{
            background: 'linear-gradient(135deg, #1a0f0a 0%, #2d1810 50%, #1a0f0a 100%)',
          }}
        >
          {/* Video container */}
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black/20">
            <video
              ref={videoRef}
              onLoadedMetadata={handleVideoLoadedMetadata}
              onCanPlayThrough={handleCanPlayThrough}
              onEnded={handleVideoEnded}
              onError={handleVideoError}
              onContextMenu={handleContextMenu}
              className="w-full h-full object-cover"
              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
              muted
              playsInline
            >
              <source src="/output.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Premium gradient overlay for cinematic effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

            {/* Subtle vignette effect */}
            <div className="absolute inset-0 shadow-inner"
              style={{
                boxShadow: 'inset 0 0 80px rgba(0,0,0,0.6), inset 0 0 40px rgba(0,0,0,0.3)'
              }}
            />
          </div>

          {/* Content overlay (appears as video progresses) */}
          <div ref={overlayRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-100" style={{ opacity: 0 }}>
            <div className="text-center text-white z-10" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
              <h3 className="text-5xl md:text-6xl font-bold mb-4 font-serif">Raw Ingredients</h3>
              <p className="text-lg md:text-xl text-gray-200">Fresh turmeric roots and dried red chillies</p>
            </div>
          </div>

          {/* Scroll indicator (shows on first visit) */}
          {videoReady && scrollProgressRef.current < 0.05 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-pulse">
              <div className="text-white/60 text-xs md:text-sm mb-2 text-center tracking-widest uppercase">Scroll to explore</div>
              <svg className="w-6 h-6 text-white/60 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          )}

          {/* Loading state */}
          {!videoReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-2 border-transparent border-t-yellow-600 rounded-full animate-spin" />
                <p className="text-white/60 text-sm">Loading immersive experience...</p>
                {videoError && (
                  <p className="text-red-400/80 text-xs text-center max-w-xs">{videoError}</p>
                )}
                <button
                  onClick={() => {
                    setVideoReady(true)
                    setVideoError(null)
                  }}
                  className="mt-4 px-4 py-2 text-xs text-white/70 border border-white/20 rounded hover:border-white/40 hover:text-white transition-all"
                >
                  Skip Loading
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Content section that appears after video completes */}
      <section className="relative z-10 min-h-screen bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-6 md:space-y-8">
              <div>
                <p className="text-yellow-600 text-sm md:text-base tracking-widest uppercase mb-4">Premium Quality</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Raw Ingredients
                </h2>
              </div>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Experience the journey from raw turmeric roots to our premium spice blend.
                Each ingredient is carefully selected and processed to maintain maximum flavor and nutritional value.
              </p>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                Fresh turmeric roots and dried red chillies presented with macro texture studies
                and layered parallax for an immersive visual experience.
              </p>
              <div className="pt-4 md:pt-8">
                <button className="px-8 md:px-10 py-3 md:py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-yellow-600/50 transform hover:scale-105">
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
  )
}

// <div className="w-6/12 pr-8">
//         <div className="turmeric-img rounded-2xl overflow-hidden shadow-2xl" style={{height:420, background:'linear-gradient(180deg,#2f1608,#7b3f12)'}}>
//           {/* Replace with a macro closeup image in /public/images/turmeric-root.jpg */}
//         </div>
//       </div>
//       <div className="w-5/12 pl-8">
//         <h3 className="text-4xl font-heading">Raw Ingredients — Macro</h3>
//         <p className="mt-4 text-lg text-beige/90">Fresh turmeric roots and dried red chillies presented with macro texture studies and layered parallax.</p>
//         <div className="mt-8 chilli-img w-48 h-44 rounded-lg bg-gradient-to-tr from-red-800 to-red-400 shadow-lg"></div>
//       </div>
