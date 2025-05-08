'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import ChatWidget from './ChatWidget';

export default function HeroSectionWithChat() {
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

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', damping: 20, stiffness: 90, delay: 0.4 }
    }
  };

  const floatAnimation = {
    y: [-8, 8],
    transition: {
      y: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const stats = [
    { value: '85%', label: 'Recovery Rate' },
    { value: '$2.4M', label: 'Saved Last Year' },
    { value: '48hrs', label: 'Average Sale Time' }
  ];

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
    
    const timer = setTimeout(() => {
      if (!dismissedPrompt && !isChatOpen) {
        setShowChatPrompt(true);
      }
    }, 20000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
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

  return (
    <>
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white overflow-hidden relative -mt-24">
        {/*background abstract shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white"></div>
          <div className="absolute bottom-10 left-1/4 w-24 h-24 rounded-full bg-white"></div>
          <div className="absolute top-1/3 right-10 w-40 h-40 rounded-full bg-white"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col md:flex-row items-center relative z-10">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              variants={itemVariants}
            >
              Turn Unused Software Licenses into Cash
            </motion.h1>
            <motion.p 
              className="text-xl mb-8"
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
                className="bg-white text-blue-600 hover:bg-gray-100 py-3 px-6 rounded-md font-medium text-center"
                whileHover={{ scale: 1.05, backgroundColor: '#f9fafb' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                Sell My Licenses
              </motion.a>
              <motion.a 
                href="#how-it-works" 
                className="border border-white text-white hover:bg-white hover:text-blue-600 py-3 px-6 rounded-md font-medium text-center mt-4 sm:mt-0"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 1)', color: '#2563eb' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                Learn How It Works
              </motion.a>
            </motion.div>
            
            {/* Stats section */}
            <motion.div 
              className="mt-12 grid grid-cols-3 gap-4 text-center"
              variants={itemVariants}
            >
              {stats.map((stat, index) => (
                <div key={index} className="bg-blue-800 bg-opacity-40 rounded-lg p-3">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-blue-100">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="relative"
              animate={floatAnimation}
            >
              {/* Main dashboard imag */}
              <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
                <Image 
                  src="/images/dashboard.png" 
                  alt="Software License Dashboard" 
                  width={550} 
                  height={400}
                  className="object-cover"
                  priority
                />
                
                {/* Overlay notification */}
                <motion.div 
                  className="absolute top-5 right-5 bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center shadow-md"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium">License Sold • $1,200</span>
                </motion.div>
              </div>
              
              {/* Floating cards */}
              <motion.div 
                className="absolute -left-8 top-1/4 bg-white p-3 rounded-lg shadow-lg text-gray-800"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
              >
                <p className="font-medium text-sm">Adobe Creative Cloud</p>
                <p className="text-xs text-green-600">5 licenses available</p>
              </motion.div>
              
              <motion.div 
                className="absolute -right-10 bottom-1/4 bg-white p-3 rounded-lg shadow-lg text-gray-800"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8 }}
              >
                <p className="font-medium text-sm">Microsoft 365</p>
                <p className="text-xs text-green-600">12 licenses available</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Trusted by logos */}
        <motion.div 
          className="max-w-5xl mx-auto pb-10 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 2 }}
        >
          <p className="text-center text-sm font-medium text-blue-100 mb-4">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="flex justify-between items-center gap-4 flex-wrap">
            {['Microsoft', 'Adobe', 'Salesforce', 'Atlassian', 'Slack'].map((company, index) => (
              <div key={index} className="text-white font-bold opacity-70">
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Chat widget */}
      <ChatWidget onStateChange={handleChatStateChange} />
      
      {/* Chat prompt that appears after scrolling or time delay */}
      <AnimatePresence>
        {showChatPrompt && (
          <motion.div 
            className="fixed bottom-20 right-5 bg-white rounded-lg shadow-lg p-4 z-40 max-w-xs"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <button 
              onClick={() => handleChatPromptAction('dismiss')} 
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Have questions about selling your software licenses?</p>
                <p className="text-xs text-gray-500 mt-1">Our AI assistant can help you get started.</p>
                <button 
                  onClick={() => handleChatPromptAction('open')} 
                  className="mt-3 bg-blue-600 text-white text-sm py-1.5 px-3 rounded hover:bg-blue-700 transition-colors"
                >
                  Chat Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}