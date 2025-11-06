import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-[60vh] min-h-[400px] w-full bg-black dark:bg-gray-950 sm:h-[80vh]">
      {/* Background Image - Replace with a real one! */}
      <img
        src="https://images.unsplash.com/photo-1516762689617-e1cff2b48e38?w=1000"
        alt="Streetwear model"
        className="absolute inset-0 h-full w-full object-cover opacity-50 dark:opacity-40"
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl font-extrabold uppercase tracking-widest sm:text-6xl lg:text-7xl">
          Fall '25 Collection
        </h1>
        <p className="mt-4 max-w-md text-lg text-gray-300 dark:text-gray-400">
          New forms. New silhouettes. Redefined for the street.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-block border border-white bg-white px-10 py-3 text-sm font-medium uppercase tracking-wider text-black transition-colors hover:bg-transparent hover:text-white dark:border-gray-300 dark:bg-gray-300 dark:hover:bg-transparent dark:hover:border-white dark:hover:text-white"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Hero;