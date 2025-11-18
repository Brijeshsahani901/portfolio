import React, { useState, Suspense, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX, HiDownload, HiMail, HiChevronDown } from "react-icons/hi";
import {
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaTwitter,
  FaCode,
} from "react-icons/fa";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Environment,
  Html,
  Stars,
} from "@react-three/drei";
import * as THREE from "three";
import { Link } from "react-router-dom";

const RESUME_URL = "/assets/CV_Brijesh_Kumar_20_08_2025.pdf";

export default function Portfolio() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const toggleDrawer = () => setDrawerOpen((v) => !v);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "experience",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const skills = [
    { name: "React.js", level: 95, color: "from-cyan-400 to-blue-500" },
    { name: "Next.js", level: 90, color: "from-gray-100 to-gray-900" },
    { name: "Node.js", level: 88, color: "from-green-400 to-green-600" },
    { name: "Laravel", level: 85, color: "from-red-400 to-red-600" },
    { name: "MongoDB", level: 82, color: "from-green-500 to-green-700" },
    { name: "Tailwind", level: 95, color: "from-teal-400 to-cyan-500" },
    { name: "TypeScript", level: 80, color: "from-blue-500 to-blue-700" },
    { name: "GraphQL", level: 75, color: "from-pink-500 to-purple-600" },
  ];

  const projects = [
    {
      title: "Islamic Matrimony",
      url: "https://islamic-matrimony.vercel.app",
      desc: "Full-stack matrimonial web app with real-time messaging and advanced matching algorithms",
      tech: ["Next.js", "Node.js", "MongoDB", "Socket.io"],
      image: "/api/placeholder/400/250",
    },
    {
      title: "Guthbandhan",
      url: "https://guthbandhan.com",
      desc: "Community portal with event management and social features",
      tech: ["React", "Laravel", "MySQL", "Redis"],
      image: "/api/placeholder/400/250",
    },
    {
      title: "Critical Minerals Dashboard",
      url: "https://criticalmineralsdashboard.com",
      desc: "Data visualization dashboard with interactive charts and real-time analytics",
      tech: ["React", "D3.js", "Python", "PostgreSQL"],
      image: "/api/placeholder/400/250",
    },
  ];

  const experiences = [
    {
      company: "Tech Solutions Inc",
      role: "Full Stack Developer",
      period: "2022 - Present",
      description:
        "Led development of multiple web applications using React and Node.js, improving performance by 40%",
      achievements: [
        "Reduced load times by 40%",
        "Mentored 3 junior developers",
        "Implemented CI/CD pipeline",
      ],
    },
    {
      company: "Startup XYZ",
      role: "Frontend Developer",
      period: "2021 - 2022",
      description:
        "Built responsive web interfaces and collaborated with design team to implement pixel-perfect UIs",
      achievements: [
        "Improved SEO scores by 60%",
        "Built 15+ reusable components",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen w-full text-slate-100 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-30">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />

        {/* Dynamic gradient orbs that follow mouse */}
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          animate={{
            x: mousePosition.x * 100,
            y: mousePosition.y * 100,
          }}
          transition={{ type: "spring", damping: 10 }}
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(168,85,247,0.2) 50%, transparent 70%)",
          }}
        />

        <motion.div
          className="absolute w-80 h-80 rounded-full blur-3xl opacity-15"
          animate={{
            x: mousePosition.x * -80,
            y: mousePosition.y * -80,
          }}
          transition={{ type: "spring", damping: 10, delay: 0.1 }}
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.25) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* 3D Background */}
      <div className="fixed inset-0 -z-20 opacity-60">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <FloatingScene />
            <Stars radius={100} depth={50} count={2000} factor={4} />
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.5}
              enablePan={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
            <Environment preset="dawn" />
          </Suspense>
        </Canvas>
      </div>

      {/* HEADER */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[94%] max-w-6xl z-50">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="backdrop-blur-2xl bg-white/8 rounded-2xl border border-white/10 p-3 flex items-center justify-between shadow-2xl"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl font-extrabold shadow-lg shadow-indigo-500/25">
              BK
            </div>
            <div>
              <div className="text-sm font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Brijesh Kumar
              </div>
              <div className="text-xs text-white/70">Full‑Stack Developer</div>
            </div>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-1">
            {["about", "skills", "projects", "experience", "contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === item
                      ? "bg-white/10 text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              )
            )}
            <Link
              to="/portfolio"
              className="ml-2 flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-cyan-500/25"
            >
              View Sidebar Portfolio
            </Link>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={RESUME_URL}
              download
              className="ml-2 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/25"
            >
              <HiDownload className="text-sm" /> Resume
            </motion.a>
          </nav>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden"
          >
            <button
              onClick={toggleDrawer}
              aria-label="menu"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
            >
              {drawerOpen ? <HiX size={20} /> : <HiMenu size={20} />}
            </button>
          </motion.div>
        </motion.div>
      </header>

      {/* MAIN CONTENT */}
      <main className="pt-32 pb-20">
        {/* HERO SECTION */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-block mb-6"
                >
                  <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-medium backdrop-blur-sm">
                    🚀 Available for new projects
                  </span>
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="block">Hello, I'm</span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Brijesh Kumar
                  </span>
                </h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 text-xl text-slate-300 max-w-2xl"
                >
                  I craft{" "}
                  <span className="text-cyan-400 font-semibold">
                    high-performance web applications
                  </span>{" "}
                  with modern technologies, focusing on exceptional user
                  experiences and scalable architecture.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start"
                >
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={RESUME_URL}
                    download
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/25"
                  >
                    <HiDownload /> Download CV
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#projects"
                    className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all backdrop-blur-sm"
                  >
                    <FaCode /> View Projects
                  </motion.a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex gap-6 text-2xl mt-8 justify-center lg:justify-start"
                >
                  {[
                    { icon: FaGithub, url: "#", label: "GitHub" },
                    { icon: FaLinkedin, url: "#", label: "LinkedIn" },
                    { icon: FaTwitter, url: "#", label: "Twitter" },
                    { icon: FaGlobe, url: "#", label: "Website" },
                  ].map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      aria-label={social.label}
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm border border-white/10"
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <social.icon />
                    </motion.a>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="grid grid-cols-3 gap-4 mt-12 max-w-md mx-auto lg:mx-0"
                >
                  <StatsCard label="Experience" value="2+ yrs" delay={0.1} />
                  <StatsCard label="Projects" value="12+" delay={0.2} />
                  <StatsCard label="Technologies" value="15+" delay={0.3} />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="relative"
              >
                <div className="relative backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-8 shadow-2xl">
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl blur-xl -z-10" />

                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Let's Build Something Amazing
                  </h3>

                  <div className="mt-6 space-y-4">
                    <InfoItem label="Email" value="ninjarapper960@gmail.com" />
                    <InfoItem label="Phone" value="+91 8512840272" />
                    <InfoItem label="Location" value="New Delhi, India" />
                    <InfoItem
                      label="Status"
                      value="Available for projects"
                      status="available"
                    />
                  </div>

                  <motion.div
                    className="flex gap-3 mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="mailto:ninjarapper960@gmail.com"
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/25"
                    >
                      <HiMail /> Email Me
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={RESUME_URL}
                      download
                      className="flex-1 flex items-center justify-center gap-2 border border-white/20 bg-white/5 px-4 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all"
                    >
                      <HiDownload /> Resume
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex justify-center mt-16"
            >
              <motion.a
                href="#about"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                <HiChevronDown size={24} />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <Section id="about" title="About Me" delay={0.1}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            <div>
              <p className="text-lg text-slate-300 leading-relaxed">
                I'm a passionate{" "}
                <span className="text-cyan-400 font-semibold">
                  Full-Stack Developer
                </span>{" "}
                with over 2 years of experience building digital products that
                users love. I specialize in creating fast, accessible, and
                visually stunning web applications using modern technologies.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed mt-4">
                My expertise spans the entire development lifecycle, from
                concept to deployment, with a strong focus on{" "}
                <span className="text-purple-400 font-semibold">
                  clean architecture
                </span>
                ,{" "}
                <span className="text-green-400 font-semibold">
                  automated testing
                </span>
                , and{" "}
                <span className="text-blue-400 font-semibold">
                  exceptional user experiences
                </span>
                .
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 gap-4 mt-8"
              >
                <TechHighlight
                  icon="⚡"
                  title="Fast"
                  description="Optimized performance"
                />
                <TechHighlight
                  icon="🎯"
                  title="Reliable"
                  description="Production-ready code"
                />
                <TechHighlight
                  icon="🔧"
                  title="Maintainable"
                  description="Clean architecture"
                />
                <TechHighlight
                  icon="🚀"
                  title="Scalable"
                  description="Growth-ready solutions"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
                <h4 className="text-lg font-semibold mb-4">Tech Stack</h4>
                <div className="grid grid-cols-2 gap-3">
                  {skills.slice(0, 6).map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 rounded-lg bg-white/5 border border-white/10 text-center text-sm hover:bg-white/10 transition-all cursor-pointer"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {skill.name}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Section>

        {/* SKILLS SECTION */}
        <Section id="skills" title="Skills & Expertise" delay={0.2}>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </Section>

        {/* PROJECTS SECTION */}
        <Section id="projects" title="Featured Projects" delay={0.3}>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </Section>

        {/* EXPERIENCE SECTION */}
        <Section id="experience" title="Experience" delay={0.4}>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <ExperienceCard
                  key={exp.company}
                  experience={exp}
                  index={index}
                />
              ))}
            </div>
          </div>
        </Section>

        {/* CONTACT SECTION */}
        <Section id="contact" title="Get In Touch" delay={0.5}>
          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Let's work together
              </h3>
              <p className="text-slate-300">
                I'm always interested in new opportunities and challenges.
                Whether you have a project in mind or just want to connect, feel
                free to reach out!
              </p>

              <div className="space-y-4">
                <ContactInfo
                  icon="📧"
                  label="Email"
                  value="ninjarapper960@gmail.com"
                />
                <ContactInfo icon="📱" label="Phone" value="+91 8512840272" />
                <ContactInfo
                  icon="📍"
                  label="Location"
                  value="New Delhi, India"
                />
              </div>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {[FaGithub, FaLinkedin, FaTwitter, FaGlobe].map(
                  (Icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/10"
                    >
                      <Icon />
                    </motion.a>
                  )
                )}
              </motion.div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6"
              onSubmit={(e) => {
                e.preventDefault();
                // Add your form submission logic here
                alert("Thank you! I will get back to you soon.");
              }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  required
                  placeholder="Your Name"
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                />
                <input
                  required
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
              </div>
              <input
                placeholder="Subject"
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
              <textarea
                required
                rows={5}
                placeholder="Your Message"
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-4 rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/25"
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </Section>

        <footer className="text-center mt-20 text-white/40 pb-10">
          <p>
            © {new Date().getFullYear()} Brijesh Kumar. Crafted with passion and
            modern tech.
          </p>
        </footer>
      </main>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={toggleDrawer}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed right-0 top-0 h-full w-80 bg-slate-900/95 backdrop-blur-2xl p-6 z-50 lg:hidden border-l border-white/10"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold">
                    BK
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Brijesh Kumar</div>
                    <div className="text-xs text-white/60">Full-Stack Dev</div>
                  </div>
                </div>
                <button
                  onClick={toggleDrawer}
                  className="p-2 rounded-lg hover:bg-white/10 transition"
                >
                  <HiX size={20} />
                </button>
              </div>

              <nav className="space-y-2">
                {["about", "skills", "projects", "experience", "contact"].map(
                  (item) => (
                    <a
                      key={item}
                      href={`#${item}`}
                      onClick={toggleDrawer}
                      className={`block px-4 py-3 rounded-xl text-lg font-medium transition-all ${
                        activeSection === item
                          ? "bg-white/10 text-white"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </a>
                  )
                )}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/portfolio"
                    className="ml-2 flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-cyan-500/25"
                  >
                    View Sidebar Portfolio
                  </Link>
                </motion.div>
              </nav>

              <div className="absolute bottom-6 left-6 right-6">
                <a
                  href={RESUME_URL}
                  download
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-3 rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all"
                >
                  <HiDownload /> Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------- COMPONENTS -------------------- */

function Section({ id, title, children, delay = 0 }) {
  return (
    <section id={id} className="py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
        >
          {title}
        </motion.h2>
        {children}
      </div>
    </section>
  );
}

function StatsCard({ label, value, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="text-center p-4 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
    >
      <div className="text-2xl font-bold text-cyan-400">{value}</div>
      <div className="text-sm text-white/70 mt-1">{label}</div>
    </motion.div>
  );
}

function InfoItem({ label, value, status }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/10">
      <span className="text-white/70">{label}</span>
      <span
        className={`font-medium ${
          status === "available" ? "text-green-400" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function TechHighlight({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className="text-center p-4 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
    >
      <div className="text-2xl mb-2">{icon}</div>
      <div className="font-semibold text-white">{title}</div>
      <div className="text-sm text-white/60 mt-1">{description}</div>
    </motion.div>
  );
}

function SkillBar({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-4 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{skill.name}</span>
        <span className="text-sm text-white/60">{skill.level}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
          className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
        />
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group cursor-pointer"
    >
      <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 h-full">
        <div className="h-48 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-semibold text-white">
              {project.title}
            </h3>
          </div>
        </div>

        <div className="p-6">
          <p className="text-slate-300 mb-4">{project.desc}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, techIndex) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs bg-white/5 rounded-full border border-white/10 text-white/80"
              >
                {tech}
              </span>
            ))}
          </div>

          <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 text-cyan-400 font-semibold text-sm hover:text-cyan-300 transition-colors"
          >
            View Project <HiChevronDown className="rotate-270" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

function ExperienceCard({ experience, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">{experience.role}</h3>
        <span className="text-cyan-400 font-medium">{experience.period}</span>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-green-400 rounded-full" />
        <span className="text-white/80 font-medium">{experience.company}</span>
      </div>

      <p className="text-slate-300 mb-4">{experience.description}</p>

      <div className="space-y-2">
        {experience.achievements.map((achievement, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            <span className="text-sm text-white/70">{achievement}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ContactInfo({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 p-3 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="text-sm text-white/60">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  );
}

/* -------------------- 3D COMPONENTS -------------------- */

function FloatingScene() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main floating orb */}
      <mesh position={[-2, 1, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color={new THREE.Color(0x3b82f6)}
          emissive={new THREE.Color(0x1d4ed8)}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Secondary floating shapes */}
      <mesh position={[2, -1, 1]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color={new THREE.Color(0x8b5cf6)}
          emissive={new THREE.Color(0x7c3aed)}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Small floating cube */}
      <mesh position={[0, 2, -1]} rotation={[Math.PI / 6, Math.PI / 6, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color={new THREE.Color(0x06b6d4)}
          emissive={new THREE.Color(0x0891b2)}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Floating HTML label */}
      <Html position={[0, -2.5, 0]} center>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white text-sm font-medium shadow-lg"
        >
          👋 Hello World!
        </motion.div>
      </Html>
    </group>
  );
}
