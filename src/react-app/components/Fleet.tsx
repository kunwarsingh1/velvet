import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const fleetCategories = [
  {
    title: 'Ultra Luxury Fleet',
    description: 'Rolls-Royce Ghost • Bentley Flying Spur • Mercedes Maybach S-Class',
    image: 'https://mocha-cdn.com/019a1c8d-0846-765c-9884-bf1a669bc4f8/WhatsApp-Image-2025-10-25-at-23.28.19_2790d5a8.jpg',
    tag: 'Requires 72 hours advance booking'
  },
  {
    title: 'Luxury Fleet',
    description: 'Mercedes GLA200 • Mercedes E-Class • BMW X1 • BMW 3 & 7 Series',
    image: 'https://mocha-cdn.com/019a1c8d-0846-765c-9884-bf1a669bc4f8/WhatsApp-Image-2025-10-25-at-23.28.19_a1d94529.jpg',
    tag: 'Available for direct booking'
  },
  {
    title: 'Luxury Travel Fleet',
    description: 'Toyota Vellfire 7 • Mercedes V220D 7 • Force Urbania 13',
    image: 'https://mocha-cdn.com/019a1c8d-0846-765c-9884-bf1a669bc4f8/WhatsApp-Image-2025-10-25-at-23.28.19_c8087005.jpg',
    tag: 'Perfect for group travel'
  }
];

export default function Fleet() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto carousel functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === fleetCategories.length - 1 ? 0 : prev + 1));
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? fleetCategories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === fleetCategories.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden">

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Main heading with translucent animated black background */}
          <div className="relative inline-block rounded-3xl p-8 mb-6">
            {/* Animated translucent black background */}
            
            
            
            <h2 
              className="font-display text-4xl md:text-6xl font-bold mb-6 text-[#C9A961]"
              style={{ 
                textShadow: '0 20px 40px rgba(0, 0, 0, 0.9), 0 10px 20px rgba(0, 0, 0, 0.8), 0 5px 10px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4)',
                filter: 'drop-shadow(0 8px 16px rgba(201, 169, 97, 0.5))'
              }}
            >
              Our Fleet
            </h2>

          </div>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Proprietary private fleet. Curated for excellence. Reserved for you.
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Carousel Container */}
          <div className="relative h-[600px] md:h-[700px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-full max-w-5xl">
                  {/* Glass card container */}
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="relative rounded-3xl overflow-hidden glass-dark glow-gold floating-animation"
                  >
                    {/* Fleet Image */}
                    <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-br from-velvet-black/80 to-gray-900/80">
                      <img
                        src={fleetCategories[currentIndex].image}
                        alt={fleetCategories[currentIndex].title}
                        className="w-full h-full object-contain"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-velvet-black/90 via-velvet-black/20 to-transparent" />
                      
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 shimmer opacity-30" />
                    </div>

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                      {/* Tag */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="inline-block mb-4"
                      >
                        <div className="glass-gold px-6 py-2 rounded-full text-gold text-sm font-medium">
                          {fleetCategories[currentIndex].tag}
                        </div>
                      </motion.div>

                      {/* Title */}
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="font-display text-3xl md:text-5xl font-bold text-white mb-4"
                      >
                        {fleetCategories[currentIndex].title}
                      </motion.h3>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-gray-300 text-lg md:text-xl max-w-3xl"
                      >
                        {fleetCategories[currentIndex].description}
                      </motion.p>

                      {/* Gold accent line */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.5, delay: 0.6 }}
                        className="h-[2px] bg-gradient-to-r from-gold via-velvet-warm to-gold rounded-full mt-6 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 shimmer" />
                      </motion.div>
                    </div>

                    {/* Corner decorative elements */}
                    <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-gold/40 rounded-tl-2xl" />
                    <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-gold/40 rounded-br-2xl" />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              className="w-14 h-14 rounded-2xl glass-gold hover:glow-gold flex items-center justify-center luxury-ease duration-300 group"
              aria-label="Previous fleet"
            >
              <ChevronLeft className="w-6 h-6 text-gold group-hover:text-velvet-warm luxury-ease duration-300" />
            </motion.button>

            {/* Dots indicator */}
            <div className="flex gap-3">
              {fleetCategories.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  className={`h-2 rounded-full luxury-ease duration-300 ${
                    index === currentIndex
                      ? 'w-12 bg-gold'
                      : 'w-2 bg-gray-600 hover:bg-gold/50'
                  }`}
                  aria-label={`Go to ${fleetCategories[index].title}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="w-14 h-14 rounded-2xl glass-gold hover:glow-gold flex items-center justify-center luxury-ease duration-300 group"
              aria-label="Next fleet"
            >
              <ChevronRight className="w-6 h-6 text-gold group-hover:text-velvet-warm luxury-ease duration-300" />
            </motion.button>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <motion.a
              href="/book"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-gold to-velvet-warm text-velvet-black font-semibold rounded-2xl overflow-hidden glow-gold-intense luxury-ease duration-300 group relative"
            >
                   
              <span className="w-2 h-2 bg-velvet-black rounded-full">Reserve Your Ride</span>
              <div className="w-2 h-2 bg-velvet-black rounded-full group-hover:animate-ping relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-velvet-warm to-gold opacity-0 group-hover:opacity-100 luxury-ease duration-300" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
