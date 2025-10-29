import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Monitor, Gift, BookOpen, X } from 'lucide-react';

const experiences = [
  {
    icon: Monitor,
    title: 'In-Car Digital Screen',
    description: 'Curated entertainment & briefing at your fingertips',
    image: 'https://mocha-cdn.com/019a1c8d-0846-765c-9884-bf1a669bc4f8/20251026_2002_Luxurious-Commute-Experience_remix_01k8getd5dfvdve335f21fr731.png'
  },
  {
    icon: Gift,
    title: 'Welcome Gifting Ritual',
    description: 'A considered touch after long journeys',
    image: 'https://mocha-cdn.com/019a1c8d-0846-765c-9884-bf1a669bc4f8/20251026_2005_Velvet-Hamper-in-Car_simple_compose_01k8gf1p39ehzte3yvsd99eqhh.png'
  },
  {
    icon: BookOpen,
    title: 'Luxury Magazines',
    description: 'City guides and select titles for your enjoyment',
    image: 'https://mocha-cdn.com/019a1c8d-0846-765c-9884-bf1a669bc4f8/20251026_2008_Luxury-Magazine-Display_simple_compose_01k8gf6stdf0b8rsqkm4g2aw7e.png'
  }
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedExp, setSelectedExp] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-[#C9A961]">
          Not just a ride
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Every detail thoughtfully curated for your comfort and convenience
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 50, rotateX: 20 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: 20 }}
                whileHover={{ 
                  y: -15, 
                  rotateY: 5,
                  transition: { duration: 0.4 } 
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1]
                }}
                onClick={() => setSelectedExp(index)}
                className="group relative overflow-hidden rounded-3xl cursor-pointer perspective-1000"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Glass morphism container */}
                <div className="absolute inset-0 glass rounded-3xl" />

                {/* Image with enhanced overlay */}
                <div className="relative h-96 overflow-hidden rounded-3xl">
                  <img 
                    src={exp.image} 
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-110 luxury-ease duration-700"
                  />
                  {/* Enhanced gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-velvet-black via-velvet-black/30 to-transparent" />
                  
                  {/* Dynamic shimmer effect */}
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-30 luxury-ease duration-700" />
                  
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 luxury-ease duration-500">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold/60 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
                    <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-velvet-warm/80 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                    <div className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 bg-gold/40 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
                  </div>
                </div>

                {/* Enhanced content with glassmorphism - Only visible on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 luxury-ease duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="glass-dark rounded-2xl p-4 backdrop-blur-md">
                    <motion.div 
                      className="mb-4 w-14 h-14 rounded-2xl glass-gold flex items-center justify-center floating-animation"
                      whileHover={{ rotateY: 180, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-7 h-7 text-gold" />
                    </motion.div>
                    <h3 className="font-display text-2xl font-semibold text-white mb-2 group-hover:text-gold luxury-ease duration-300">
                      {exp.title}
                    </h3>
                    <p className="text-gray-300 group-hover:text-gray-200 luxury-ease duration-300">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Enhanced border with glow */}
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/60 rounded-3xl glow-gold opacity-0 group-hover:opacity-100 luxury-ease duration-400 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        {/* Legal disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-xs text-gray-500 mt-8 italic"
        >
        
        </motion.p>
      </div>

      {/* Modal */}
      {selectedExp !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedExp(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-velvet-deep rounded-2xl overflow-hidden max-w-2xl w-full border border-gold/30"
          >
            <button
              onClick={() => setSelectedExp(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-velvet-black/80 backdrop-blur-sm hover:bg-gold/20 luxury-ease duration-300"
            >
              <X className="w-6 h-6 text-gold" />
            </button>
            
            <img 
              src={experiences[selectedExp].image} 
              alt={experiences[selectedExp].title}
              className="w-full h-64 object-cover"
            />
            
            <div className="p-8">
              <h3 className="font-display text-3xl font-bold text-white mb-4">
                {experiences[selectedExp].title}
              </h3>
              <p className="text-lg text-gray-300">
                {experiences[selectedExp].description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
