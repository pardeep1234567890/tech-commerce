import { motion } from 'framer-motion';
import { Github, Twitter, Instagram, Mail, Heart, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    shop: [
      { name: 'All Products', href: '/shop' },
      { name: 'New Arrivals', href: '/new' },
      { name: 'Featured', href: '/' },
    ],
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-800"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section + Newsletter */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-bold uppercase tracking-widest text-black dark:text-white font-display">
              AURA
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Redefining streetwear with minimalist aesthetics and premium quality.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-2">
                Stay in the loop
              </p>
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 min-w-0 rounded-l-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-black dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="rounded-r-lg bg-black dark:bg-white px-3 py-2 text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  <Send size={16} />
                </motion.button>
              </form>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xs text-green-600 dark:text-green-400"
                >
                  Thanks for subscribing!
                </motion.p>
              )}
            </div>

            {/* Social Links */}
            <div className="mt-6 flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="mailto:hello@auraapparel.com"
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Contact Us
            </h3>
            <div className="mt-4 space-y-3">
              <a
                href="mailto:hello@auraapparel.com"
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <Mail size={16} />
                hello@auraapparel.com
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Mon – Fri, 10AM – 6PM IST
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                We typically respond within 24 hours.
              </p>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              &copy; {currentYear} Aura Apparel. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-center text-sm text-gray-500 dark:text-gray-400">
              Made with <Heart size={14} className="text-red-500 fill-red-500" /> by Pardeep Yadav
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
