import { motion } from "framer-motion";
import { Code2, Smartphone, BarChart3 } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description:
        "Modern and responsive websites using React, TailwindCSS, and more.",
      icon: <Code2 className="w-8 h-8 text-white" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "App Development",
      description:
        "Cross-platform mobile apps with seamless UI and performance.",
      icon: <Smartphone className="w-8 h-8 text-white" />,
      color: "from-green-400 to-blue-500",
    },
    {
      title: "SEO & Marketing",
      description:
        "Boost your online presence and reach the right audience.",
      icon: <BarChart3 className="w-8 h-8 text-white" />,
      color: "from-yellow-400 to-orange-500",
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background only for Services */}
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
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4"
        >
          Our Services
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
        >
          We provide high-quality services to help you grow your business and
          online presence.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.06, y: -5 }}
              className="relative p-8 rounded-3xl bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl shadow-xl border border-white/20 hover:shadow-2xl cursor-pointer transition-all duration-300"
            >
              <div
                className={`w-20 h-20 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300`}
              >
                {service.icon}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {service.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
