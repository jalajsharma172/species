import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    id: "haldi",
    name: "Turmeric Powder",
    image: "/images/s3.png",
    color: "#D8A700",
  },
  {
    id: "chilli",
    name: "Red Chilli Powder",
    image: "/images/Red.png",
    color: "#C62828",
  },
  {
    id: "coriander",
    name: "Coriander Powder",
    image: "/images/s1.png",
    color: "#7A8B2E",
  },
];

export default function FinalReveal({ particleRef }) {
  const [activeProduct, setActiveProduct] = useState(products[0]);

  return (
    <section
      id="final"
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/backkground.png')",
      }}
    >
      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* Floating ambient particles */}
      <motion.div
        className="absolute top-20 left-1/4 w-3 h-3 rounded-full blur-sm opacity-40"
        style={{ background: activeProduct.color }}
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-24 right-1/4 w-4 h-4 rounded-full blur-md opacity-30"
        style={{ background: activeProduct.color }}
        animate={{
          y: [0, 40, 0],
          x: [0, -25, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-5 sm:px-8 md:px-10 grid lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="uppercase tracking-[0.3em] text-sm text-white/60 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Premium Indian Spice Atelier
          </motion.p>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl leading-tight font-heading text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Pure Ingredients.
            <br />
            Crafted With Care.
          </motion.h2>

          <motion.ul
            className="mt-8 space-y-4 text-lg text-white/80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <li>Farm sourced</li>
            <li>No preservatives</li>
            <li>Authentic taste</li>
          </motion.ul>

          {/* Product Buttons */}
          <div className="flex gap-4 mt-10 flex-wrap">
            {products.map((product) => (
              <motion.button
                whileHover={{
                  scale: 1.08,
                  y: -3,
                }}
                whileTap={{ scale: 0.95 }}
                key={product.id}
                onClick={() => setActiveProduct(product)}
                className={`px-5 py-3 rounded-full border transition-all duration-300 backdrop-blur-md
                ${
                  activeProduct.id === product.id
                    ? "bg-white text-black border-white shadow-2xl"
                    : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                }`}
              >
                {product.name}
              </motion.button>
            ))}
          </div>

          <motion.div className="mt-8 md:mt-10" whileHover={{ scale: 1.05 }}>
            <a
              href="#contact"
              className="px-6 md:px-8 py-3 md:py-4 bg-white text-black rounded-full text-base md:text-lg font-medium inline-block shadow-xl"
            >
              Experience Authentic Spice
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT PRODUCT SHOWCASE */}
        <div className="flex items-center justify-center relative min-h-[340px] sm:min-h-[500px] lg:min-h-[700px]">
          {/* Dynamic Glow */}
          <motion.div
            className="absolute w-[240px] h-[240px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] rounded-full blur-3xl opacity-30"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: activeProduct.color,
            }}
          />

          {/* Rotating Ring */}
          <motion.div
            className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[520px] lg:h-[520px] border border-white/10 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{
                opacity: 0,
                scale: 0.7,
                rotateY: -25,
                y: 120,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateY: 0,
                y: [0, -18, 0],
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                rotateY: 20,
                y: -80,
              }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 0.8 },
                rotateY: { duration: 0.8 },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              whileHover={{
                rotateY: 12,
                rotateX: 6,
                scale: 1.05,
                y: -25,
              }}
              onHoverStart={() => {
                particleRef?.current?.spawn({
                  amount: 40,
                  color: activeProduct.color,
                  spread: 70,
                  size: 5,
                });
              }}
              className="relative z-10"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Floating Product Image */}
              <motion.img
                src={activeProduct.image}
                alt={activeProduct.name}
                className="w-[220px] sm:w-[320px] lg:w-[430px] object-contain drop-shadow-[0_35px_70px_rgba(0,0,0,0.55)]"
                animate={{
                  rotate: [0, 1.5, -1.5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
