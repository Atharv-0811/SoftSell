'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import ChatWidget from './ChatWidget';

export default function HeroSectionWithChat() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xPos = (clientX / innerWidth - 0.5) * 20;
    const yPos = (clientY / innerHeight - 0.5) * 20;
    
    mouseX.set(xPos);
    mouseY.set(yPos);
  };

  const springConfig = { damping: 30, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  const stats = [
    { id: 1, value: '85%', label: 'Recovery Rate', startValue: 0, endValue: 85, unit: '%' },
    { id: 2, value: '$2.4M', label: 'Saved Last Year', startValue: 0, endValue: 2.4, prefix: '$', unit: 'M' },
    { id: 3, value: '48hrs', label: 'Average Sale Time', startValue: 0, endValue: 48, unit: 'hrs' }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const tiltVariants = {
    hover: {
      rotateX: 5,
      rotateY: -5,
      transition: { duration: 0.3 }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 1.5 + i * 0.1 }
    })
  };

  const [showChatPrompt, setShowChatPrompt] = useState(false);
  const [dismissedPrompt, setDismissedPrompt] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !dismissedPrompt && !isChatOpen) {
        setShowChatPrompt(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    const timer = setTimeout(() => {
      if (!dismissedPrompt && !isChatOpen) {
        setShowChatPrompt(true);
      }
    }, 20000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, [dismissedPrompt, isChatOpen]);

  const handleChatPromptAction = (action) => {
    if (action === 'open') {
      setIsChatOpen(true);
    }
    setShowChatPrompt(false);
    setDismissedPrompt(true);
  };

  const handleChatStateChange = (isOpen) => {
    setIsChatOpen(isOpen);
    if (isOpen) {
      setShowChatPrompt(false);
      setDismissedPrompt(true);
    }
  };

  const companyLogos = [
    { name: 'Microsoft', color: '#00A4EF' },
    { name: 'Adobe', color: '#FF0000' },
    { name: 'Salesforce', color: '#00A1E0' },
    { name: 'Atlassian', color: '#0052CC' },
    { name: 'Slack', color: '#4A154B' }
  ];

  return (
    <>
      <section 
        ref={heroRef}
        className="min-h-screen relative overflow-hidden -mt-24 pt-24"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 bg-opacity-90">
          <motion.div style={{ y: backgroundY }} className="absolute inset-0">
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white bg-opacity-10"
                  style={{
                    width: Math.random() * 100 + 50,
                    height: Math.random() * 100 + 50,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, Math.random() * -100 - 50],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col md:flex-row items-center relative z-10 -mt-16">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{ opacity: contentOpacity }}
          >
            <motion.div 
              className="inline-flex items-center bg-blue-900 bg-opacity-40 backdrop-blur-sm text-blue-100 rounded-full px-4 py-1 text-sm mb-6"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <span className="flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-100"></span>
              </span>
              New: Introducing AI-powered license valuation
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4 text-white leading-tight"
              variants={itemVariants}
            >
              Turn Unused <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-300">Software Licenses</span> into Cash
            </motion.h1>
            
            <motion.p 
              className="text-xl mb-8 text-blue-100 max-w-xl"
              variants={itemVariants}
            >
              SoftSell helps businesses recover value from their unused software licenses with our secure, transparent marketplace.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.a 
                href="#contact" 
                className="bg-white text-blue-600 hover:bg-gray-100 py-4 px-8 rounded-lg font-medium text-center shadow-lg shadow-blue-900/30 relative overflow-hidden group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <span className="relative z-10">Sell My Licenses</span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white z-0"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
                />
                <motion.span 
                  className="absolute -right-1 top-1/2 transform -translate-y-1/2 text-blue-600 opacity-0 group-hover:opacity-100 z-10"
                  initial={{ x: -5 }}
                  whileHover={{ x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.span>
              </motion.a>
              
              <motion.a 
                href="#how-it-works" 
                className="border border-white text-white hover:bg-white hover:text-blue-600 py-4 px-8 rounded-lg font-medium text-center relative overflow-hidden group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <span className="relative z-10">Learn How It Works</span>
                <motion.span 
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 z-0"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
                />
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="mt-16 grid grid-cols-3 gap-4 text-center"
              variants={itemVariants}
            >
              {stats.map((stat) => (
                <motion.div 
                  key={stat.id}
                  className="bg-gradient-to-b from-blue-800/40 to-blue-900/40 backdrop-blur-sm rounded-xl p-4 shadow-lg shadow-blue-900/20 border border-blue-700/30 hover:border-blue-600/50 transition-all duration-300"
                  whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(30, 64, 175, 0.2)" }}
                >
                  <motion.div 
                    className="text-3xl font-bold text-white"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    {stat.prefix || ''}<CountUp from={stat.startValue} to={stat.endValue} />{stat.unit}
                  </motion.div>
                  <p className="text-sm text-blue-200 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 90, delay: 0.6 }}
            style={{ opacity: contentOpacity }}
          >
            <motion.div 
              className="relative perspective-1000"
              style={{ 
                rotateX: springY, 
                rotateY: springX,
                transformStyle: 'preserve-3d',
              }}
              whileHover="hover"
              variants={tiltVariants}
            >

              <motion.div 
                className="relative bg-gradient-to-br from-white/90 to-white/80 backdrop-filter backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/30"
                style={{ transformStyle: 'preserve-3d', transform: 'translateZ(0px)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/10 z-0 pointer-events-none"></div>
                
                <Image 
                  src="/images/dashboard.png" 
                  alt="Software License Dashboard" 
                  width={580} 
                  height={420}
                  className="object-cover relative z-10"
                  priority
                />
                
                <motion.div 
                  className="absolute top-5 right-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full flex items-center shadow-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  variants={pulseVariants}
                >
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span className="text-sm font-medium">License Sold • $1,200</span>
                </motion.div>
                
                {/* Reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 pointer-events-none"></div>
              </motion.div>
              
              {/* Floating license cards with 3D effect */}
              <motion.div 
                className="absolute -left-12 top-1/4 bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-xl text-gray-800 border border-white/50"
                style={{ 
                  transformStyle: 'preserve-3d', 
                  transform: 'translateZ(40px)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.1), 0 3px 10px rgba(0,0,0,0.05)' 
                }}
                initial={{ opacity: 0, x: -40, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.5, type: 'spring', stiffness: 100 }}
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.12), 0 5px 15px rgba(0,0,0,0.06)' }}
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-red-500 rounded-md mr-2"></div>
                  <p className="font-medium">Adobe Creative Cloud</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-green-600 font-medium">5 licenses</p>
                  <p className="text-blue-600 font-bold">$899/ea</p>
                </div>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Last updated 2h ago
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -right-12 bottom-1/4 bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-xl text-gray-800 border border-white/50"
                style={{ 
                  transformStyle: 'preserve-3d', 
                  transform: 'translateZ(60px)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.1), 0 3px 10px rgba(0,0,0,0.05)' 
                }}
                initial={{ opacity: 0, x: 40, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.8, type: 'spring', stiffness: 100 }}
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.12), 0 5px 15px rgba(0,0,0,0.06)' }}
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-md mr-2"></div>
                  <p className="font-medium">Microsoft 365</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-green-600 font-medium">12 licenses</p>
                  <p className="text-blue-600 font-bold">$249/ea</p>
                </div>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Last updated 20m ago
                </div>
              </motion.div>
              
              {/* New floating element: Analytics card */}
              <motion.div 
                className="absolute -bottom-10 left-1/4 bg-white/90 backdrop-blur-md p-3 rounded-lg shadow-xl text-gray-800 border border-white/50"
                style={{ 
                  transformStyle: 'preserve-3d', 
                  transform: 'translateZ(30px)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.1), 0 3px 10px rgba(0,0,0,0.05)' 
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1, type: 'spring', stiffness: 100 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Monthly Revenue</p>
                    <p className="text-sm font-bold">+28% increase</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Trusted by logos with color accents */}
        <motion.div 
          className="max-w-5xl mx-auto pb-10 px-4 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3 }}
        >
          <p className="text-center text-sm font-medium text-blue-100 mb-6">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="flex justify-between items-center gap-8 flex-wrap">
            {companyLogos.map((company, index) => (
              <motion.div 
                key={index} 
                className="text-white font-bold opacity-80 hover:opacity-100 transition-opacity duration-300"
                custom={index}
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
              >
                <span className="relative">
                  {company.name}
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-white"
                    style={{ backgroundColor: company.color }}
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Scrolling indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <p className="text-xs mb-2">Scroll to explore</p>
          <motion.div 
            className="w-5 h-10 border-2 border-white/30 rounded-full flex justify-center p-1"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <motion.div 
              className="w-1 h-2 bg-white/70 rounded-full"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Chat widget */}
      <ChatWidget onStateChange={handleChatStateChange} />
      
      {/* Enhanced chat prompt */}
      <AnimatePresence>
        {showChatPrompt && (
          <motion.div 
            className="fixed bottom-20 right-5 bg-white rounded-xl shadow-2xl p-5 z-40 max-w-sm border border-blue-100"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <button 
              onClick={() => handleChatPromptAction('dismiss')} 
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-3 mr-4 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-base font-medium text-gray-800">Have questions about selling your software licenses?</p>
                <p className="text-sm text-gray-600 mt-2">Our AI assistant can help you understand the process, evaluate your licenses, and get you started right away.</p>
                <div className="mt-4 flex">
                  <motion.button 
                    onClick={() => handleChatPromptAction('open')} 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm py-2 px-4 rounded-lg hover:shadow-lg flex items-center"
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Chat Now
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Animated counter component
function CountUp({ from, to }) {
  const [count, setCount] = useState(from);
  
  useEffect(() => {
    let startTime;
    let animationFrameId;
    const duration = 2000; // 2 seconds
    
    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = from + (to - from) * easeOutQuart(progress);
      
      setCount(Math.floor(currentCount * 10) / 10);
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrameId = requestAnimationFrame(updateCount);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [from, to]);
  
  return parseFloat(count.toFixed(1));
}

// Easing function for smoother animations
function easeOutQuart(x) {
  return 1 - Math.pow(1 - x, 4);
}