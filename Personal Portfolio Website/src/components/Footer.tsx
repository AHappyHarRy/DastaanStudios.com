import { motion } from 'motion/react';
import { Github, Linkedin, Twitter, Instagram, Mail, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  currentSection?: string;
}

export function Footer({ currentSection }: FooterProps) {
  const socialLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/dastaanstudios',
      color: 'hover:text-blue-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/company/dastaanstudios',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/dastaanstudios',
      color: 'hover:text-pink-500'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/dastaanstudios',
      color: 'hover:text-gray-300'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:hello@dastaanstudios.com',
      color: 'hover:text-yellow-400'
    }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'UI/UX Portfolio', href: '#ui-ux' },
    { name: '3D Characters', href: '#3d-characters' },
    { name: 'About Us', href: '#about' },
    { name: 'Team', href: '#team' }
  ];

  return (
    <footer className="relative mt-20 bg-gradient-to-t from-black via-gray-900 to-gray-800 border-t border-yellow-400/20">
      {/* Magical particles for footer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? '#ffd700' : i % 3 === 1 ? '#00ff7f' : '#ff4500',
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Dastaan Studios
            </h3>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Crafting digital stories through innovative design and immersive 3D experiences. 
              Where creativity meets technology to bring virtual worlds to life.
            </p>
            <div className="flex items-center gap-2 text-yellow-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Creative Solutions Through Storytelling</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-green-400">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-green-400">Connect With Us</h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full bg-gray-800/50 border border-gray-700 text-gray-400 transition-all duration-300 ${social.color}`}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -2,
                      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
            <p className="text-gray-400 text-sm">
              Follow our journey as we create amazing digital experiences
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gradient-to-r from-yellow-400/20 via-green-400/20 to-yellow-400/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 text-sm flex items-center gap-2"
            >
              © 2024 Dastaan Studios. Made with 
              <Heart className="w-4 h-4 text-red-500" /> 
              and lots of creativity
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-6 text-sm text-gray-400"
            >
              <a href="#privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-yellow-400 transition-colors">Terms of Service</a>
              <a href="#contact" className="hover:text-yellow-400 transition-colors">Contact</a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}