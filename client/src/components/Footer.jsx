import { Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          
          <div className="flex space-x-6 md:order-2">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <Github size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <Instagram size={20} />
            </a>
          </div>

          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Aura Apparel. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;