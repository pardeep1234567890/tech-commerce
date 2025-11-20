import { Users, Target, Zap } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-black dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase tracking-widest text-black dark:text-white">
            ABOUT AURA
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            We are not a brand. We are a concept. Built on minimalism, defined by the street.
          </p>
        </div>

        {/* Image Section - Placeholder */}
        <div className="my-12">
          <div className="aspect-h-3 aspect-w-4 w-full overflow-hidden rounded-lg bg-gray-200">
            {/* You could replace this with a real image from placehold.co or Unsplash */}
            <img
              src="https://placehold.co/1200x800/1a1a1a/ffffff?text=AURA+Collective"
              alt="Aura Apparel workspace"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="mx-auto max-w-prose text-center">
          <h2 className="text-2xl font-bold uppercase tracking-wider text-black dark:text-white">
            Our Mission
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            In a world of noise, we strive for signal. Aura Apparel was founded on the idea that
            true style comes from confidence, not complexity. Our pieces are designed to be the
            "foundation" of your wardrobe—timeless, durable, and versatile.
          </p>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <Zap size={40} className="text-black dark:text-white" />
            <h3 className="mt-4 text-xl font-medium text-black dark:text-white">Built to Last</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Premium materials, from heavyweight cotton to durable ripstop.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Target size={40} className="text-black dark:text-white" />
            <h3 className="mt-4 text-xl font-medium text-black dark:text-white">Minimal Design</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              No large logos. No loud graphics. Just clean silhouettes.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Users size={40} className="text-black dark:text-white" />
            <h3 className="mt-4 text-xl font-medium text-black dark:text-white">For the Collective</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              A community of individuals who value substance over hype.
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AboutPage;