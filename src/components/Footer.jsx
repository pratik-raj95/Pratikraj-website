import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div>
            <h3 className="text-2xl font-bold mb-4">My YouTube Channel</h3>
            <p className="text-gray-300 mb-4">
              Creating amazing content for developers, designers, and tech enthusiasts.
              Subscribe for the latest tutorials and insights.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/videos" className="text-gray-300 hover:text-white transition-colors">Videos</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.youtube.com/@pratikraj95/videos"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a2.997 2.997 0 00-2.108-2.108C19.042 3.5 12 3.5 12 3.5s-7.042 0-9.39.578A2.997 2.997 0 00.502 6.186C0 8.534 0 12 0 12s0 3.466.502 5.814a2.997 2.997 0 002.108 2.108c2.348.578 9.39.578 9.39.578s7.042 0 9.39-.578a2.997 2.997 0 002.108-2.108C24 15.466 24 12 24 12s0-3.466-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              {/* LinkedIn */}
<a
  href="http://linkedin.com/in/pratik-raj95"
  className="text-gray-300 hover:text-white transition-colors"
  aria-label="LinkedIn"
  target="_blank"
  rel="noopener noreferrer"
>
  <svg
    className="h-6 w-6"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zM8.5 8h3.8v2.2h.1c.5-1 1.8-2.2 3.7-2.2 4 0 4.9 2.6 4.9 6V24h-4v-7.8c0-1.9 0-4.3-2.6-4.3-2.6 0-3 2-3 4.1V24h-4V8z"/>
  </svg>
</a>

{/* LeetCode */}
<a
  href="https://leetcode.com/u/PRATIK-RAJ/"
  className="text-gray-300 hover:text-white transition-colors"
  aria-label="LeetCode"
  target="_blank"
  rel="noopener noreferrer"
>
  <svg
    className="h-6 w-6"
    fill="currentColor"
    viewBox="0 0 1024 1024"
  >
    <path d="M512 0C229.25 0 0 229.23 0 512s229.25 512 512 512 512-229.23 512-512S794.75 0 512 0zm0 938.67C276.27 938.67 85.33 747.73 85.33 512S276.27 85.33 512 85.33 938.67 276.27 938.67 512 747.73 938.67 512 938.67z"/>
    <path d="M708.27 332.8L480 512l228.27 179.2-48 61.87L384 512l276.27-241.07 48 61.87z"/>
  </svg>
</a>

              <a
                href="https://github.com/pratik-raj95"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 mt-8 pt-8 text-center"
        >
          <p className="text-gray-300">
            © {new Date().getFullYear()} My YouTube Channel. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
