import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    tagline: "Fall / Winter 2026",
    title1: "New Forms.",
    title2: "New Silhouettes.",
    subtitle: "Redefined for the street. Built for the collective.",
    cta1: "Shop Collection",
    cta1Link: "/shop",
    cta2: "Explore New",
    cta2Link: "/new",
    image: "https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    tagline: "Spring / Summer 2026",
    title1: "Minimal",
    title2: "Essentials.",
    subtitle: "Timeless pieces for your everyday rotation.",
    cta1: "Shop Essentials",
    cta1Link: "/shop",
    cta2: "View Lookbook",
    cta2Link: "/new",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    tagline: "The Collective",
    title1: "Built to",
    title2: "Last Forever.",
    subtitle: "Premium materials. Ethical production. No compromises.",
    cta1: "Our Story",
    cta1Link: "/about",
    cta2: "Shop Now",
    cta2Link: "/shop",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Slide variants for animation
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 1.1,
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
  };

  return (
    <div
      className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-black text-white sm:h-[85vh]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title1}
              className="h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Tagline */}
              <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.3em] text-gray-300 mb-6">
                {slides[currentSlide].tagline}
              </p>

              {/* Title */}
              <h1 className="text-5xl font-bold uppercase tracking-widest text-white sm:text-7xl lg:text-8xl font-display">
                <span className="block">{slides[currentSlide].title1}</span>
                <span className="block mt-1 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                  {slides[currentSlide].title2}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-8 max-w-xl text-base sm:text-lg text-gray-300 font-light tracking-wide">
                {slides[currentSlide].subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-wrap gap-4 justify-center">
                <Link
                  to={slides[currentSlide].cta1Link}
                  className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-black overflow-hidden bg-white transition-all duration-300 hover:bg-gray-100 hover:px-10"
                >
                  <span className="relative z-10">{slides[currentSlide].cta1}</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-200"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Link>

                <Link
                  to={slides[currentSlide].cta2Link}
                  className="group inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-white border-2 border-white/80 transition-all duration-300 hover:bg-white/10 hover:border-white hover:px-10"
                >
                  {slides[currentSlide].cta2}
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white/70 hover:text-white transition-colors duration-300 hover:bg-white/10 rounded-full"
        aria-label="Previous slide"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white/70 hover:text-white transition-colors duration-300 hover:bg-white/10 rounded-full"
        aria-label="Next slide"
      >
        <ChevronRight size={32} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/10">
        <motion.div
          key={currentSlide}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-white"
        />
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"
      />
    </div>
  );
};

export default Hero;
