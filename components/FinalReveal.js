import React from 'react'
import { motion } from 'framer-motion'

export default function FinalReveal({ particleRef }){
  return (
    <section id="final" className="min-h-screen flex items-center justify-center">
      <div className="container grid grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-4xl font-heading">Pure Ingredients. Crafted With Care.</h2>
          <ul className="mt-6 space-y-3 text-lg">
            <li>Farm sourced</li>
            <li>No preservatives</li>
            <li>Authentic taste</li>
          </ul>
          <div className="mt-8">
            <a href="#" className="btn-glow">Experience Authentic Spice</a>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <motion.div className="product-mock" initial={{ rotateY:0 }} whileHover={{ rotateY:8 }} transition={{ type:'spring', stiffness:40 }} onHoverStart={()=>{ particleRef?.current?.spawn({ amount:24, color:'#D8A700', spread:40, size:4 }) }}>
            {/* Replace with high-res product render in production */}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
