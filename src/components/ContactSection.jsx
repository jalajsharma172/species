import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const contactLinks = [
  {
    label: "Email Us",
    value: "hello@spicejourney.in",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
    color: "#D8A700",
  },
  {
    label: "Call Us",
    value: "+91 98765 43210",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
        />
      </svg>
    ),
    color: "#C62828",
  },
  {
    label: "Our Location",
    value: "Rajasthan, India",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    ),
    color: "#7A8B2E",
  },
];

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-yellow-600/60 focus:bg-white/10 transition-all duration-300 text-sm backdrop-blur-sm";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative overflow-hidden py-24"
      style={{ backgroundImage: "url('/images/backkground.png')" }}
    >
      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Ambient floating orbs */}
      <motion.div
        className="absolute top-24 left-16 w-48 h-48 rounded-full blur-3xl opacity-20"
        style={{ background: "#D8A700" }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.28, 0.15],
          x: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-64 h-64 rounded-full blur-3xl opacity-15"
        style={{ background: "#C62828" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.22, 0.1],
          x: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl opacity-5"
        style={{ background: "#D8A700" }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rotating decorative ring */}
      <motion.div
        className="absolute right-[-120px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-yellow-600/10 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-6 md:px-10 relative z-10 max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="uppercase tracking-[0.3em] text-sm text-white/50 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.p>
          <motion.h2
            className="text-5xl md:text-6xl font-heading text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Let's Spice Up
            <br />
            <span style={{ color: "#D8A700" }}>Your World.</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT — Contact info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <p className="text-white/60 text-lg leading-relaxed max-w-md">
              Whether you're a retailer, distributor, or simply a spice
              enthusiast — we'd love to hear from you. Reach out and experience
              the difference of authentic, farm-sourced Indian spices.
            </p>

            <div className="space-y-4 mt-8">
              {contactLinks.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 * i, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 group cursor-default"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${item.color}18`,
                      border: `1px solid ${item.color}35`,
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest">
                      {item.label}
                    </p>
                    <p className="text-white/90 text-sm mt-0.5 font-medium">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 pt-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-white/20 text-xs tracking-widest uppercase">
                Follow Us
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {["Instagram", "WhatsApp", "LinkedIn"].map((s, i) => (
                <motion.a
                  key={s}
                  href="#"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-full text-xs text-white/60 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-all duration-300 backdrop-blur-sm"
                >
                  {s}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glass card */}
            <div
              className="relative rounded-2xl p-8 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Card inner glow */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(216,167,0,0.4), transparent)",
                }}
              />

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={form.name}
                          onChange={handleChange}
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused(null)}
                          className={inputClass}
                          required
                        />
                        {focused === "name" && (
                          <motion.div
                            layoutId="focusRing"
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            style={{
                              boxShadow: "0 0 0 1px rgba(216,167,0,0.5)",
                            }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={form.email}
                          onChange={handleChange}
                          onFocus={() => setFocused("email")}
                          onBlur={() => setFocused(null)}
                          className={inputClass}
                          required
                        />
                        {focused === "email" && (
                          <motion.div
                            layoutId="focusRing"
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            style={{
                              boxShadow: "0 0 0 1px rgba(216,167,0,0.5)",
                            }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </div>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject (e.g. Bulk Order, Partnership)"
                        className={inputClass}
                        onFocus={() => setFocused("subject")}
                        onBlur={() => setFocused(null)}
                      />
                      {focused === "subject" && (
                        <motion.div
                          layoutId="focusRing"
                          className="absolute inset-0 rounded-xl pointer-events-none"
                          style={{ boxShadow: "0 0 0 1px rgba(216,167,0,0.5)" }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </div>

                    <div className="relative">
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Tell us about your spice requirements..."
                        value={form.message}
                        onChange={handleChange}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        className={`${inputClass} resize-none`}
                        required
                      />
                      {focused === "message" && (
                        <motion.div
                          layoutId="focusRing"
                          className="absolute inset-0 rounded-xl pointer-events-none"
                          style={{ boxShadow: "0 0 0 1px rgba(216,167,0,0.5)" }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-4 rounded-xl font-medium text-black text-sm tracking-wide transition-all duration-300"
                      style={{
                        background:
                          "linear-gradient(135deg, #D8A700 0%, #e6b800 50%, #c49600 100%)",
                        boxShadow: "0 8px 32px rgba(216,167,0,0.35)",
                      }}
                    >
                      Send Message →
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center py-12 text-center gap-5"
                  >
                    {/* Animated checkmark */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: 0.2,
                      }}
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(216,167,0,0.15)",
                        border: "1px solid rgba(216,167,0,0.4)",
                      }}
                    >
                      <svg
                        className="w-8 h-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#D8A700"
                        strokeWidth={2}
                      >
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        />
                      </svg>
                    </motion.div>

                    <div>
                      <h3 className="text-2xl font-heading text-white mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                        Thank you,{" "}
                        <span className="text-yellow-400">{form.name}</span>.
                        We'll get back to you with the finest response — just
                        like our spices.
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: "", email: "", message: "" });
                      }}
                      className="mt-2 px-6 py-2.5 rounded-full text-xs text-white/60 border border-white/15 bg-white/5 hover:bg-white/10 hover:text-white transition-all"
                    >
                      Send Another
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
