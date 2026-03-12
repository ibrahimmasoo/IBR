/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';
import { 
  Github, Linkedin, Mail, ArrowDown, ExternalLink, Cpu, Code, Zap, 
  CircuitBoard, Sun, Moon, Languages, MessageSquare, X, Send, Menu,
  Heart, Coffee, CreditCard, Copy, Check
} from 'lucide-react';
import { translations, Language } from './translations';
import { getChatResponse } from './services/chatService';

// --- Contexts ---
const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });
const LanguageContext = createContext({ 
  lang: 'en' as Language, 
  setLang: (l: Language) => {}, 
  t: translations.en 
});

// --- Components ---

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        className="custom-cursor hidden md:block" 
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 2 : 1})`,
          backgroundColor: isHovering ? 'white' : 'transparent'
        }} 
      />
      <div 
        className="custom-cursor-dot hidden md:block" 
        style={{ left: `${position.x}px`, top: `${position.y}px` }} 
      />
    </>
  );
};

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number; key?: React.Key }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

const SectionHeading = ({ title, subtitle, light = false }: { title: string; subtitle?: string; light?: boolean }) => {
  const { theme } = useContext(ThemeContext);
  const isLightMode = theme === 'light';
  
  return (
    <div className="mb-16">
      <FadeIn>
        <h2 className={`text-4xl md:text-6xl font-bold mb-4 ${light ? 'text-black' : 'dark:text-white text-black'}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`text-lg max-w-2xl ${light ? 'text-black/60' : 'dark:text-white/60 text-black/60'}`}>
            {subtitle}
          </p>
        )}
        <div className={`h-1 w-20 mt-6 ${light ? 'bg-black' : 'dark:bg-white bg-black'}`} />
      </FadeIn>
    </div>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { lang, t } = useContext(LanguageContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getChatResponse(userMsg, lang);
    setMessages(prev => [...prev, { role: 'ai', text: response || '...' }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 w-80 md:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col mb-4 overflow-hidden"
          >
            <div className="p-4 bg-black text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="font-medium text-sm">{t.chatTitle}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.length === 0 && (
                <div className="text-center text-black/40 dark:text-white/40 text-sm mt-10">
                  {t.chatPlaceholder}
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                    ? 'bg-black text-white rounded-br-none' 
                    : 'bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-2xl rounded-bl-none">
                    <motion.div 
                      animate={{ opacity: [0.4, 1, 0.4] }} 
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="flex gap-1"
                    >
                      <div className="w-1.5 h-1.5 bg-black/40 dark:bg-white/40 rounded-full" />
                      <div className="w-1.5 h-1.5 bg-black/40 dark:bg-white/40 rounded-full" />
                      <div className="w-1.5 h-1.5 bg-black/40 dark:bg-white/40 rounded-full" />
                    </motion.div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-black/5 dark:border-white/5 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.chatPlaceholder}
                className="flex-1 bg-zinc-100 dark:bg-zinc-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-black dark:bg-white text-white dark:text-black p-2 rounded-full hover:opacity-80 transition-opacity disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { lang, setLang, t } = useContext(LanguageContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'AR' },
    { code: 'tr', label: 'TR' }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference">
      <Link to="/" className="text-xl font-black tracking-tighter text-white group">
        <motion.span 
          whileHover={{ scale: 1.2, rotate: 5 }} 
          className="inline-block"
        >
          IBR
        </motion.span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">{t.navHome}</Link>
        <Link to="/about" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">{t.navAbout}</Link>
        <Link to="/projects" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">{t.navProjects}</Link>
        <Link to="/donation" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">{t.donation}</Link>
        <Link to="/contact" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">{t.navContact}</Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center bg-white/10 rounded-full p-1">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`text-[10px] px-2 py-1 rounded-full transition-all ${
                lang === l.code ? 'bg-white text-black' : 'text-white/60 hover:text-white'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
        
        <button 
          onClick={toggleTheme}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-black z-[60] flex flex-col items-center justify-center gap-8"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 text-white">
              <X className="w-8 h-8" />
            </button>
            <Link onClick={() => setIsMenuOpen(false)} to="/" className="text-4xl font-bold">{t.navHome}</Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/about" className="text-4xl font-bold">{t.navAbout}</Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/projects" className="text-4xl font-bold">{t.navProjects}</Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/donation" className="text-4xl font-bold">{t.donation}</Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/contact" className="text-4xl font-bold">{t.navContact}</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Pages ---

const Home = () => {
  const { t, lang } = useContext(LanguageContext);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const isRTL = lang === 'ar';

  return (
    <div className={isRTL ? 'text-right' : 'text-left'} dir={isRTL ? 'rtl' : 'ltr'}>
      <section id="hero" className="h-screen flex flex-col justify-center items-center relative overflow-hidden bg-black px-6">
        <motion.div style={{ opacity, scale }} className="text-center z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, letterSpacing: "0.05em" }}
            transition={{ duration: 1, delay: 0.2, whileHover: { duration: 0.3 } }}
            className="text-6xl md:text-9xl font-extrabold tracking-tighter mb-4 text-white cursor-default"
          >
            {t.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-3xl font-light text-white/70 mb-8"
          >
            {t.title}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-sm md:text-base uppercase tracking-[0.3em] text-white/40 max-w-md mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <a href="#about" className="group flex flex-col items-center gap-4 text-white/60 hover:text-white transition-colors">
            <span className="text-xs uppercase tracking-widest">{t.explore}</span>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </a>
        </motion.div>
      </section>

      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
};

const About = () => {
  const { t, lang } = useContext(LanguageContext);
  const isRTL = lang === 'ar';
  
  return (
    <section id="about" className="py-32 bg-white dark:bg-zinc-900 text-black dark:text-white px-6 transition-colors duration-300">
      <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className={isRTL ? 'order-1 md:order-2' : ''}>
          <SectionHeading title={t.about} subtitle={t.aboutSubtitle} light={false} />
          <FadeIn delay={0.2}>
            <p className="text-xl leading-relaxed text-black/80 dark:text-white/80 mb-8">{t.aboutP1}</p>
            <p className="text-lg leading-relaxed text-black/60 dark:text-white/60 mb-10">{t.aboutP2}</p>
            <div className="flex gap-6">
              <Link to="/contact" className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:opacity-80 transition-all font-medium">
                {t.getInTouch}
              </Link>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.4}>
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 border-2 border-black dark:border-white translate-x-4 translate-y-4" />
            <div className="relative w-full h-full bg-stone-100 dark:bg-zinc-800 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img src="https://picsum.photos/seed/engineering/800/800" alt="Ibrahim" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const Projects = () => {
  const { t, lang } = useContext(LanguageContext);
  const isRTL = lang === 'ar';

  const projects = [
    {
      title: "Autonomous Drone Controller",
      description: "A custom flight controller built with ESP32, featuring PID stabilization and real-time sensor fusion.",
      tags: ["C++", "ESP32", "Embedded"],
      image: "https://picsum.photos/seed/drone/800/600",
      icon: <Cpu className="w-6 h-6" />
    },
    {
      title: "FPGA Image Processor",
      description: "Hardware-accelerated image filtering implemented in Verilog on a Xilinx Artix-7 FPGA.",
      tags: ["Verilog", "FPGA", "Hardware"],
      image: "https://picsum.photos/seed/fpga/800/600",
      icon: <CircuitBoard className="w-6 h-6" />
    },
    {
      title: "Smart Grid Monitor",
      description: "An IoT system for monitoring power consumption in real-time, using custom-designed PCBs.",
      tags: ["PCB", "IoT", "React"],
      image: "https://picsum.photos/seed/iot/800/600",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Real-time RTOS Kernel",
      description: "A minimalist real-time operating system kernel for ARM Cortex-M microcontrollers.",
      tags: ["C", "ARM", "RTOS"],
      image: "https://picsum.photos/seed/code/800/600",
      icon: <Code className="w-6 h-6" />
    }
  ];

  return (
    <section id="projects" className="py-32 bg-zinc-950 px-6">
      <div className={`max-w-7xl mx-auto ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <SectionHeading title={t.projects} subtitle={t.projectsSubtitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <motion.div 
                whileHover={{ y: -10 }} 
                className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500"
              >
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/10 rounded-lg text-white/60">{project.icon}</div>
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  </div>
                  
                  <p className="text-white/60 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-widest px-2 py-1 bg-white/5 border border-white/10 rounded text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="w-full py-3 border border-white/20 rounded-xl hover:bg-white hover:text-black transition-all duration-300 font-bold uppercase tracking-widest text-xs text-white">
                    {t.viewProject}
                  </button>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const { t, lang } = useContext(LanguageContext);
  const isRTL = lang === 'ar';

  const skills = [
    { name: "Hardware Design", icon: <CircuitBoard className="w-6 h-6" />, items: ["PCB Layout", "FPGA/Verilog", "Digital Logic"] },
    { name: "Embedded Systems", icon: <Cpu className="w-6 h-6" />, items: ["Microcontrollers", "RTOS", "I2C/SPI/UART"] },
    { name: "Programming", icon: <Code className="w-6 h-6" />, items: ["C/C++", "Python", "Assembly", "Rust"] },
    { name: "Innovation", icon: <Zap className="w-6 h-6" />, items: ["IoT", "Robotics", "System Integration"] }
  ];

  return (
    <section id="skills" className="py-32 bg-white dark:bg-zinc-900 text-black dark:text-white px-6 transition-colors duration-300">
      <div className={`max-w-7xl mx-auto ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <SectionHeading title={t.skills} subtitle={t.skillsSubtitle} light={false} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="p-8 border border-black/5 dark:border-white/5 rounded-3xl hover:border-black/20 dark:hover:border-white/20 transition-all group">
                <div className="mb-6 text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-colors">{skill.icon}</div>
                <h3 className="text-xl font-bold mb-4">{skill.name}</h3>
                <ul className="space-y-2">
                  {skill.items.map((item, i) => (
                    <li key={i} className="text-black/60 dark:text-white/60 flex items-center gap-2">
                      <div className="w-1 h-1 bg-black/20 dark:bg-white/20 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { t, lang } = useContext(LanguageContext);
  const isRTL = lang === 'ar';
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-32 bg-black px-6 relative overflow-hidden">
      <div className={`max-w-7xl mx-auto relative z-10 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <FadeIn>
          <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-white text-center">
            {t.connect}
          </h2>
          <p className="text-xl text-white/60 mb-16 max-w-2xl mx-auto text-center">
            {t.connectSubtitle}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Info */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12">
              <a href="mailto:hello@ibrahim.com" className="group flex flex-col items-center lg:items-start gap-4">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 text-white"><Mail className="w-6 h-6" /></div>
                <span className="text-sm uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{t.email}</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center lg:items-start gap-4">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 text-white"><Github className="w-6 h-6" /></div>
                <span className="text-sm uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{t.github}</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center lg:items-start gap-4">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 text-white"><Linkedin className="w-6 h-6" /></div>
                <span className="text-sm uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{t.linkedin}</span>
              </a>
            </div>

            {/* Contact Form */}
            <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">{t.contactName}</label>
                  <input 
                    type="text" 
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    placeholder={t.contactPlaceholderName}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">{t.contactEmail}</label>
                  <input 
                    type="email" 
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    placeholder={t.contactPlaceholderEmail}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">{t.contactMessage}</label>
                  <textarea 
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    placeholder={t.contactPlaceholderMessage}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-white text-black rounded-xl font-bold uppercase tracking-widest hover:bg-white/90 transition-all"
                >
                  {t.contactSubmit}
                </button>
                {isSubmitted && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-500 text-center text-sm font-medium"
                  >
                    {t.contactSuccess}
                  </motion.p>
                )}
              </form>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-xs uppercase tracking-[0.3em]">
        <p>© 2026 Ibrahim Masood</p>
        <p>{t.footer}</p>
      </div>
    </section>
  );
};

const Donation = () => {
  const { t, lang } = useContext(LanguageContext);
  const isRTL = lang === 'ar';
  const [copied, setCopied] = useState(false);
  const cryptoAddress = "0x1234567890abcdef1234567890abcdef12345678";

  const handleCopy = () => {
    navigator.clipboard.writeText(cryptoAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-32 bg-white dark:bg-zinc-900 text-black dark:text-white px-6 min-h-screen transition-colors duration-300">
      <div className={`max-w-7xl mx-auto ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <SectionHeading title={t.donation} subtitle={t.donationSubtitle} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <FadeIn delay={0.1}>
            <div className="p-8 border border-black/5 dark:border-white/5 rounded-3xl hover:border-black/20 dark:hover:border-white/20 transition-all group text-center">
              <div className="mb-6 flex justify-center text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-colors">
                <Coffee className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.buyMeACoffee}</h3>
              <a 
                href="https://buymeacoffee.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:opacity-80 transition-all font-medium"
              >
                {t.donationButton}
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="p-8 border border-black/5 dark:border-white/5 rounded-3xl hover:border-black/20 dark:hover:border-white/20 transition-all group text-center">
              <div className="mb-6 flex justify-center text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-colors">
                <CreditCard className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.paypal}</h3>
              <a 
                href="https://paypal.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:opacity-80 transition-all font-medium"
              >
                {t.donationButton}
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="p-8 border border-black/5 dark:border-white/5 rounded-3xl hover:border-black/20 dark:hover:border-white/20 transition-all group text-center">
              <div className="mb-6 flex justify-center text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-colors">
                <Zap className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.crypto}</h3>
              <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 p-3 rounded-xl overflow-hidden">
                <span className="text-xs text-black/60 dark:text-white/60 truncate flex-1">{cryptoAddress}</span>
                <button 
                  onClick={handleCopy}
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copied && <p className="text-[10px] text-green-500 mt-2">{t.copied}</p>}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const t = translations[lang];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LanguageContext.Provider value={{ lang, setLang, t }}>
        <Router>
          <div className="relative">
            <CustomCursor />
            <Navbar />
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<div className="pt-24"><About /></div>} />
              <Route path="/projects" element={<div className="pt-24"><Projects /></div>} />
              <Route path="/donation" element={<div className="pt-24"><Donation /></div>} />
              <Route path="/skills" element={<div className="pt-24"><Skills /></div>} />
              <Route path="/contact" element={<div className="pt-24"><Contact /></div>} />
            </Routes>

            <ChatBot />
          </div>
        </Router>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}
