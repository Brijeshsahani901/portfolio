import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills, projects , experiences } from './utils/constant';

const Portfolio2 = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👨‍💻' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'contact', label: 'Contact', icon: '📞' }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-24 h-24 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold shadow-2xl shadow-purple-500/30 border-2 border-purple-400/50"
          >
            BK
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Brijesh Kumar
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center space-x-2"
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  delay: index * 0.2 
                }}
                className="w-2 h-2 bg-purple-400 rounded-full"
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear" 
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20"
        ></motion.div>
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear" 
          }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-violet-600 rounded-full blur-3xl opacity-20"
        ></motion.div>
        <motion.div 
          animate={{ 
            x: [0, 60, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity,
            ease: "linear" 
          }}
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-fuchsia-600 rounded-full blur-3xl opacity-20"
        ></motion.div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-80 bg-gray-900/95 backdrop-blur-xl border-r border-purple-500/30 z-50 lg:hidden p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent"
                >
                  Navigation
                </motion.h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 hover:bg-purple-500/20 rounded-xl transition-all duration-300 border border-purple-500/30"
                >
                  <span className="text-2xl">✕</span>
                </motion.button>
              </div>
              <nav className="space-y-3">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsDrawerOpen(false);
                    }}
                    className={`flex items-center space-x-4 w-full text-left p-4 rounded-2xl transition-all duration-300 group ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-purple-500/40 to-violet-500/40 border border-purple-500/50 shadow-lg shadow-purple-500/30'
                        : 'hover:bg-white/10 border border-transparent hover:border-purple-500/30'
                    }`}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </span>
                    <span className="text-lg font-medium group-hover:text-purple-300 transition-colors duration-300">
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sidebar Navigation - Desktop */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="hidden lg:block fixed left-6 top-6 bottom-6 w-80 bg-gray-900/95 backdrop-blur-xl rounded-3xl border border-purple-500/30 shadow-2xl p-8 z-30"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-32 h-32 bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-600 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold shadow-2xl shadow-purple-500/30 border-4 border-white/20"
          >
            BK
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2"
          >
            Brijesh Kumar
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-400 text-sm"
          >
            Full-Stack Developer
          </motion.p>
        </motion.div>

        <nav className="space-y-3 mb-12">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index + 0.8 }}
              whileHover={{ x: 10, backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center space-x-4 w-full text-left p-4 rounded-2xl transition-all duration-300 group border ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-purple-500/40 to-violet-500/40 border-purple-500/50 shadow-lg shadow-purple-500/30'
                  : 'border-transparent hover:border-purple-500/30'
              }`}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </span>
              <span className="text-lg font-medium group-hover:text-purple-300 transition-colors duration-300">
                {item.label}
              </span>
            </motion.button>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center"
        >
          <div className="bg-purple-500/10 rounded-2xl p-4 border border-purple-500/20">
            <p className="text-sm text-gray-300 mb-2">Available for new projects</p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection('contact')}
              className="bg-gradient-to-r from-purple-500 to-violet-500 px-6 py-2 rounded-full font-semibold text-sm shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
            >
              Hire Me
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="lg:ml-96 relative z-10">
        {/* Header - Mobile */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`lg:hidden fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
            isScrolled 
              ? 'bg-gray-900/95 backdrop-blur-xl border-b border-purple-500/30' 
              : 'bg-transparent'
          }`}
        >
          <div className="p-4 flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDrawerOpen(true)}
              className="p-3 bg-purple-500/20 backdrop-blur-sm rounded-2xl border border-purple-500/30 hover:bg-purple-500/30 transition-all duration-300"
            >
              <span className="text-xl">☰</span>
            </motion.button>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent"
            >
              Brijesh Kumar
            </motion.h1>
            <div className="w-12"></div>
          </div>
        </motion.header>

        {/* Sections */}
        <div className="pt-20 lg:pt-6 p-6 max-w-6xl mx-auto">
          {/* Home Section */}
          <AnimatePresence mode="wait">
            {activeSection === 'home' && (
              <motion.section
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen flex items-center justify-center text-center py-20"
              >
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-48 h-48 bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-600 rounded-full mx-auto mb-8 flex items-center justify-center text-5xl font-bold shadow-2xl shadow-purple-500/30 border-4 border-white/20"
                  >
                    BK
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
                  >
                    Brijesh Kumar
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-2xl lg:text-3xl text-gray-300 mb-8 font-light"
                  >
                    Full-Stack Developer
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
                  >
                    Crafting digital experiences with modern technologies. 
                    Passionate about building scalable, user-centric web solutions.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex gap-6 justify-center flex-wrap"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveSection('projects')}
                      className="bg-gradient-to-r from-purple-500 to-violet-500 px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
                    >
                      View My Work
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveSection('contact')}
                      className="border border-purple-500/50 bg-purple-500/10 px-8 py-4 rounded-2xl font-semibold text-lg backdrop-blur-sm hover:bg-purple-500/20 transition-all duration-300"
                    >
                      Get In Touch
                    </motion.button>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {/* About Section */}
            {activeSection === 'about' && (
              <motion.section
                key="about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen py-20"
              >
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-5xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent"
                >
                  About Me
                </motion.h2>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 shadow-2xl"
                  >
                    <h3 className="text-2xl font-semibold mb-6 text-purple-400">Personal Details</h3>
                    <div className="space-y-4 text-gray-300">
                      {[
                        { icon: '📍', label: 'Location', value: 'Delhi, India' },
                        { icon: '📧', label: 'Email', value: 'ningrapper960@gmail.com' },
                        { icon: '📱', label: 'Phone', value: '+91 8512840272' },
                        { icon: '🎂', label: 'Date of Birth', value: '9 June 2000' },
                        { icon: '🇮🇳', label: 'Nationality', value: 'Indian' }
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-center space-x-4 p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <p className="font-semibold text-purple-300">{item.label}</p>
                            <p>{item.value}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-violet-500/30 shadow-2xl"
                  >
                    <h3 className="text-2xl font-semibold mb-6 text-violet-400">Profile</h3>
                    <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                      Dedicated full-stack developer with a strong foundation in computer 
                      applications and a passion for creating efficient, scalable, and 
                      user-centric web solutions. Currently pursuing an MCA degree to 
                      enhance technical expertise and stay aligned with emerging technologies.
                    </p>
                    
                    <div>
                      <h4 className="text-xl font-semibold mb-4 text-fuchsia-400">Core Qualities</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {['Time Management', 'Adaptability', 'Problem-solving', 'Teamwork'].map((quality, index) => (
                          <motion.div
                            key={quality}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            className="bg-gradient-to-r from-purple-500/20 to-violet-500/20 p-3 rounded-2xl text-center border border-purple-500/30 hover:border-violet-500/50 transition-all duration-300"
                          >
                            {quality}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {/* Skills Section */}
            {activeSection === 'skills' && (
              <motion.section
                key="skills"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen py-20"
              >
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-5xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent"
                >
                  Technical Skills
                </motion.h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 group"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-lg group-hover:text-purple-300 transition-colors duration-300">
                          {skill.name}
                        </span>
                        <span className="text-purple-400 font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700/50 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 1.5, type: "spring" }}
                          className={`bg-gradient-to-r ${skill.color} h-3 rounded-full shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Projects Section */}
            {activeSection === 'projects' && (
              <motion.section
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen py-20"
              >
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-5xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent"
                >
                  Featured Projects
                </motion.h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.2 }}
                      whileHover={{ scale: 1.05, y: -10 }}
                      className="bg-gray-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl group hover:shadow-purple-500/20 transition-all duration-500"
                    >
                      <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>
                      <div className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                            {project.image}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold group-hover:text-purple-300 transition-colors duration-300">
                              {project.name}
                            </h3>
                            <p className="text-gray-400 text-sm">{project.description}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech) => (
                            <span key={tech} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs border border-purple-500/30">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full bg-gradient-to-r from-purple-500 to-violet-500 text-center py-3 rounded-2xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
                        >
                          {project.name === 'Portfolio V2' ? 'Coming Soon' : 'Live Demo →'}
                        </motion.a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Experience Section */}
            {activeSection === 'experience' && (
              <motion.section
                key="experience"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen py-20"
              >
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-5xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent"
                >
                  Experience
                </motion.h2>
                
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-900/80 backdrop-blur-xl p-8 rounded-3xl border border-purple-500/30 shadow-2xl mb-8"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-semibold text-purple-400 mb-2">{exp.title}</h3>
                        <p className="text-xl text-violet-400 mb-2">{exp.company}</p>
                        <p className="text-gray-400">{exp.period}</p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="mt-4 lg:mt-0"
                      >
                        <span className="bg-gradient-to-r from-purple-500 to-violet-500 px-6 py-2 rounded-full text-sm font-semibold shadow-lg shadow-purple-500/30">
                          Full Time
                        </span>
                      </motion.div>
                    </div>
                    
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + idx * 0.1 }}
                          className="flex items-start space-x-3 text-gray-300"
                        >
                          <span className="text-purple-400 mt-1">▸</span>
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.section>
            )}

            {/* Education Section */}
            {activeSection === 'education' && (
              <motion.section
                key="education"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen py-20"
              >
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-5xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent"
                >
                  Education
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-900/80 backdrop-blur-xl p-8 rounded-3xl border border-violet-500/30 shadow-2xl max-w-2xl"
                >
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                      🎓
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-violet-400 mb-1">
                        Master of Computer Applications (MCA)
                      </h3>
                      <p className="text-xl text-purple-400 mb-1">IGNOU</p>
                      <p className="text-gray-400">Present</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Currently pursuing MCA to enhance technical expertise and stay aligned with 
                    emerging technologies in the field of computer applications and software development.
                  </p>
                </motion.div>
              </motion.section>
            )}

            {/* Contact Section */}
            {activeSection === 'contact' && (
              <motion.section
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen py-20"
              >
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-5xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent"
                >
                  Let's Connect
                </motion.h2>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 shadow-2xl"
                  >
                    <h3 className="text-2xl font-semibold mb-6 text-purple-400">Get In Touch</h3>
                    <div className="space-y-6">
                      {[
                        { icon: '📧', label: 'Email', value: 'ningrapper960@gmail.com', color: 'purple' },
                        { icon: '📱', label: 'Phone', value: '+91 8512840272', color: 'violet' },
                        { icon: '📍', label: 'Location', value: 'Delhi, India', color: 'fuchsia' }
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          whileHover={{ x: 10 }}
                          className="flex items-center space-x-4 p-4 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-300 group border border-purple-500/20 hover:border-purple-500/40"
                        >
                          <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 border border-purple-500/30">
                            {item.icon}
                          </div>
                          <div>
                            <p className="font-semibold text-purple-300">{item.label}</p>
                            <p className="text-gray-400">{item.value}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-violet-500/30 shadow-2xl"
                  >
                    <h3 className="text-2xl font-semibold mb-6 text-violet-400">Send Message</h3>
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                          <input
                            type="text"
                            className="w-full bg-white/5 border border-purple-500/30 rounded-2xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all duration-300 backdrop-blur-sm"
                            placeholder="Your Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                          <input
                            type="email"
                            className="w-full bg-white/5 border border-purple-500/30 rounded-2xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all duration-300 backdrop-blur-sm"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Subject</label>
                        <input
                          type="text"
                          className="w-full bg-white/5 border border-purple-500/30 rounded-2xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all duration-300 backdrop-blur-sm"
                          placeholder="Project Discussion"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                        <textarea
                          rows="5"
                          className="w-full bg-white/5 border border-purple-500/30 rounded-2xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all duration-300 backdrop-blur-sm resize-none"
                          placeholder="Your message..."
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        className="w-full bg-gradient-to-r from-purple-500 to-violet-500 px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
                      >
                        Send Message
                      </motion.button>
                    </form>
                  </motion.div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Portfolio2;