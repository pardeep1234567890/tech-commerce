import { motion } from 'framer-motion';
import { Users, Target, Zap, Shield, Heart, Globe } from 'lucide-react';

const AboutPage = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  return (
    <div className="bg-white dark:bg-black dark:text-white overflow-hidden">

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-black dark:bg-gray-950">
        {/* Background with overlay */}
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&h=1080&fit=crop"
            alt="Aura Apparel"
            className="absolute inset-0 h-full w-full object-cover opacity-60 dark:opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 dark:from-black/80 dark:via-black/50 dark:to-black/90"></div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-400 mb-4">
              Established 2024
            </p>
            <h1 className="text-5xl font-bold uppercase tracking-widest text-white sm:text-7xl lg:text-8xl">
              <span className="block">We Are</span>
              <span className="block mt-2 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                AURA
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 max-w-2xl text-lg text-gray-300 dark:text-gray-400 font-light tracking-wide"
          >
            Not a brand. A concept. Built on minimalism, defined by the streets.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-16 bg-gradient-to-b from-white to-transparent opacity-30"
            />
          </motion.div>
        </div>
      </section>

      {/* ===== INTRO STORY SECTION ===== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <img
                  src="https://plus.unsplash.com/premium_photo-1664202526367-53d9916b0a57?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Streetwear fashion"
                  className="h-64 w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                <img
                  src="https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Minimalist style"
                  className="h-48 w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Urban aesthetic"
                  className="h-48 w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                <img
                  src="https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Clean design"
                  className="h-64 w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold uppercase tracking-wider text-black dark:text-white">
                The Story
              </h2>
              <div className="mt-2 w-20 h-1 bg-black dark:bg-white"></div>

              <div className="mt-8 space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  <strong className="text-black dark:text-white">Aura Apparel</strong> was born from a simple observation:
                  in a world of noise, true style speaks quietly. We saw streetwear becoming louder, more complex,
                  more about branding than being.
                </p>
                <p>
                  We chose a different path. Aura is built on the belief that confidence doesn't need validation,
                  that the best pieces are the ones that let you be the statement.
                </p>
                <p>
                  Every garment is designed to be a foundation—timeless, versatile, built to age with you.
                  Not fast fashion. Not hype. Just pieces you'll reach for, year after year.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-10 grid grid-cols-3 gap-6 border-t border-gray-200 dark:border-gray-800 pt-8"
              >
                <div>
                  <p className="text-3xl font-bold text-black dark:text-white">50+</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">Products</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-black dark:text-white">10K+</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">Community</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-black dark:text-white">100%</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">Commitment</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== VALUES SECTION ===== */}
      <section className="bg-gray-50 dark:bg-gray-900 py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold uppercase tracking-wider text-black dark:text-white">
              Our Values
            </h2>
            <div className="mt-2 w-20 h-1 bg-black dark:bg-white mx-auto"></div>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
              The principles that guide every decision, every design, every stitch.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Value 1 */}
            <motion.div
              variants={fadeInUp}
              className="group p-8 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wide text-black dark:text-white">
                Built to Last
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Premium heavyweight cotton, durable ripstop, reinforced seams. We don't do disposable.
              </p>
            </motion.div>

            {/* Value 2 */}
            <motion.div
              variants={fadeInUp}
              className="group p-8 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wide text-black dark:text-white">
                Minimal Design
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                No large logos. No loud graphics. Clean silhouettes that let you stand out.
              </p>
            </motion.div>

            {/* Value 3 */}
            <motion.div
              variants={fadeInUp}
              className="group p-8 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wide text-black dark:text-white">
                The Collective
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                A community of individuals who value substance over hype. You're not alone.
              </p>
            </motion.div>

            {/* Value 4 */}
            <motion.div
              variants={fadeInUp}
              className="group p-8 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wide text-black dark:text-white">
                Ethical Production
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Fair wages, safe conditions, transparent supply chains. Style with integrity.
              </p>
            </motion.div>

            {/* Value 5 */}
            <motion.div
              variants={fadeInUp}
              className="group p-8 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black mb-6">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wide text-black dark:text-white">
                Crafted with Care
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Every piece is tested, refined, and perfected before it reaches you.
              </p>
            </motion.div>

            {/* Value 6 */}
            <motion.div
              variants={fadeInUp}
              className="group p-8 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black mb-6">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wide text-black dark:text-white">
                Globally Inspired
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Street culture from Tokyo to Brooklyn. Urban aesthetics without borders.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== MISSION SECTION ===== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black dark:bg-gray-950 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold uppercase tracking-wider">
              Our Mission
            </h2>
            <div className="mt-2 w-20 h-1 bg-white mx-auto"></div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-xl text-gray-300 dark:text-gray-400 leading-relaxed"
          >
            In a world of noise, we strive for signal. Aura Apparel was founded on the idea that
            <span className="text-white font-medium"> true style comes from confidence, not complexity</span>.
            Our pieces are designed to be the foundation of your wardrobe—timeless, durable, and versatile.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <blockquote className="border-l-4 border-white pl-6 text-left italic text-gray-300 dark:text-gray-400">
              "We don't chase trends. We don't do drops. We build pieces that outlast seasons."
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* ===== COMMUNITY SECTION ===== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold uppercase tracking-wider text-black dark:text-white">
              Join The Collective
            </h2>
            <div className="mt-2 w-20 h-1 bg-black dark:bg-white mx-auto"></div>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
              Be part of a movement that values authenticity over algorithms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            <a
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-white bg-black dark:bg-white dark:text-black transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-200 hover:px-10"
            >
              Shop Now
            </a>
            <a
              href="/new"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-black dark:text-white border-2 border-black dark:border-white transition-all duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:px-10"
            >
              New Arrivals
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER IMAGE ===== */}
      <section className="relative h-96 overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          src="https://images.unsplash.com/photo-1614631446501-abcf76949eca?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Aura Collective"
          className="h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold uppercase tracking-widest text-white"
          >
            Aura
          </motion.p>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
