import React, { useEffect, useRef } from 'react'

export default function RawShowcase({ particleRef }){
  return (
    <section id="raw" className="min-h-screen section-sticky container flex items-center justify-between py-28 relative">
    <img src="/truck.png" alt="Turmeric Root"  />

    </section>
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
