import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from 'emailjs-com'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const templateParams = { from_name: formData.name, from_email: formData.email, message: formData.message }

    emailjs.send('service_b13t86p', 'template_4nbppnt', templateParams, 'SHYgX1qGEWCCH2K9V')
      .then(
        () => { setStatus('✅ Message sent successfully!'); setFormData({ name: '', email: '', message: '' }) },
        (error) => { console.error('EmailJS Error:', error); setStatus('❌ Failed to send message. Please try again.') }
      )
  }

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center p-6">
      {/* Background Gradient + Floating Particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-gradient-xy opacity-50"></div>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-white rounded-full opacity-20 animate-float"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDuration: `${5 + Math.random() * 10}s` }}
          />
        ))}
      </div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-2xl bg-black/40 dark:bg-gray-900/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8"
      >
        <h1 className="text-4xl font-bold mb-6 text-white text-center">Contact Us</h1>
        <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
              className="w-full px-4 py-3 border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-black/30 text-white placeholder-gray-300" placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
              className="w-full px-4 py-3 border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-black/30 text-white placeholder-gray-300" placeholder="your@email.com" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">Message</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6}
              className="w-full px-4 py-3 border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-black/30 text-white placeholder-gray-300 resize-none" placeholder="Your message..." />
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit"
            className="w-full bg-blue-500/80 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600/90 transition-colors shadow-lg backdrop-blur-sm">
            Send Message
          </motion.button>
          {status && <p className="text-center mt-4 font-medium text-white">{status}</p>}
        </motion.form>
      </motion.div>
    </section>
  )
}

export default Contact
