import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check } from 'lucide-react';

const features = [
  'Trained by hospitality managers',
  'Grooming audits & designer uniform',
  '24×7 concierge supervision',
  'Fluent in English & regional languages',
  'Background-verified'
];

export default function Chauffeurs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 
            className="font-display text-4xl md:text-6xl font-bold mb-4 text-[#C9A961]"
            style={{ 
              textShadow: '0 20px 40px rgba(0, 0, 0, 0.9), 0 10px 20px rgba(0, 0, 0, 0.8), 0 5px 10px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4)',
              filter: 'drop-shadow(0 8px 16px rgba(201, 169, 97, 0.5))'
            }}
          >
            Our Chauffeurs
          </h2>
          <p className="text-2xl text-gray-400">
            Professionally trained. Personally committed.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Enhanced Features list with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotateY: -15 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: -30, rotateY: -15 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative p-10 rounded-3xl glass-gold glow-gold floating-animation h-full flex flex-col justify-center"
          >
            {/* Dynamic background patterns */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold/10 to-transparent rounded-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-velvet-warm/10 to-transparent rounded-full" />
            </div>

            {/* Animated border with enhanced SVG */}
            <motion.div
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="absolute inset-0 pointer-events-none"
            >
              <svg className="absolute inset-0 w-full h-full">
                <rect
                  x="2"
                  y="2"
                  width="calc(100% - 4px)"
                  height="calc(100% - 4px)"
                  rx="20"
                  fill="none"
                  stroke="url(#enhancedGoldGradient)"
                  strokeWidth="3"
                  pathLength="1"
                  className="drop-shadow-lg"
                />
                <defs>
                  <linearGradient id="enhancedGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C9A961" stopOpacity="0.6" />
                    <stop offset="25%" stopColor="#E7D7A7" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#C9A961" stopOpacity="1" />
                    <stop offset="75%" stopColor="#E7D7A7" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#C9A961" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            <div className="space-y-6 relative z-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -20, scale: 0.9 }}
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.6 + (index * 0.15),
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="flex items-start gap-5 group p-3 rounded-2xl hover:glass luxury-ease duration-300"
                >
                  <motion.div 
                    className="flex-shrink-0 w-8 h-8 rounded-2xl glass-gold flex items-center justify-center mt-1 group-hover:glow-gold luxury-ease duration-300"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Check className="w-5 h-5 text-gold group-hover:text-velvet-warm luxury-ease duration-300" />
                  </motion.div>
                  <p className="text-lg text-gray-200 group-hover:text-white luxury-ease duration-300 leading-relaxed">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Chauffeur image with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotateY: 15 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 30, rotateY: 15 }}
            whileHover={{ rotateY: -5, transition: { duration: 0.4 } }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative rounded-3xl overflow-hidden floating-delayed h-full"
          >
            {/* Glass frame */}
            <div className="absolute inset-0 glass-dark rounded-3xl border border-gold/30 z-10" />
            
            <img
              src="https://mocha-cdn.com/019a1c8d-0846-765c-9884-bf1a669bc4f8/20251026_2100_Velvet-Experience-Branding_remix_01k8gj5ynffyybga1jj3ydwztf.png"
              alt="Professional Velvet Experience chauffeur"
              className="w-full h-full min-h-[400px] object-cover rounded-3xl"
            />
            
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-velvet-black/80 via-velvet-black/20 to-transparent rounded-3xl" />
            
            {/* Floating elements */}
            <div className="absolute top-6 right-6 w-12 h-12 glass-gold rounded-2xl flex items-center justify-center floating-animation">
              <div className="w-3 h-3 bg-gold rounded-full animate-pulse" />
            </div>
            
            {/* Enhanced gold accent detail */}
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <motion.div 
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : { width: 0 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="h-2 bg-gradient-to-r from-gold via-velvet-warm to-gold rounded-full relative overflow-hidden"
              >
                <div className="absolute inset-0 shimmer" />
              </motion.div>
              
              {/* Glass info panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="glass-dark rounded-2xl p-4 mt-4 backdrop-blur-md"
              >
                <h4 className="font-display text-xl font-semibold text-gold mb-2">Executive Standard</h4>
                <p className="text-gray-300 text-sm">Professionally trained • Background verified • 24/7 supervised</p>
              </motion.div>
            </div>

            {/* Corner decorative elements */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gold/40 rounded-tl-2xl" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gold/40 rounded-br-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
