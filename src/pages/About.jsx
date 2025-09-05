import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background only for About */}
      <div className="absolute inset-0 z-0">
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-gradient-xy opacity-30"></div>

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-white rounded-full opacity-30 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl shadow-2xl">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-6"
        >
          About Our Channel
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center mb-4"
        >
          🚀 Welcome to our YouTube channel! We are passionate about delivering
          high-quality content on{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            Web Development, Programming Tutorials
          </span>{" "}
          and the latest{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            Tech Trends
          </span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center"
        >
          🎯 Our mission is to empower developers and enthusiasts with the
          knowledge and skills they need to succeed in today’s fast-paced tech
          world. Stay tuned for regular updates, in-depth tutorials, and
          engaging discussions. 💖
        </motion.p>
      </div>
    </section>
  );
};

export default About;
