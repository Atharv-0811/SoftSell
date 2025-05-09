'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const licenseTypes = [
  'Enterprise Software',
  'Creative Suite',
  'Development Tools',
  'Database Management',
  'Operating Systems',
  'Cloud Services',
  'Security Solutions',
  'Other'
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      
      if (!formData.company.trim()) {
        newErrors.company = 'Company is required';
      }
    } else if (step === 2) {
      if (!formData.licenseType) {
        newErrors.licenseType = 'Please select a license type';
      }
      
      if (!formData.message.trim()) {
        newErrors.message = 'Message is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleNext = () => {
    if (validateStep(1)) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep(2)) {
      setIsSubmitting(true);
      
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          licenseType: '',
          message: ''
        });
        
        setTimeout(() => {
          setIsSubmitted(false);
          setCurrentStep(1);
        }, 5000);
      }, 1500);
    }
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Let's Talk About Your <span className="text-blue-600 dark:text-blue-400">Software Licenses</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Ready to sell your licenses? We're here to provide you with the best quote.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="bg-blue-600 text-white md:w-1/3 p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <svg className="w-6 h-6 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-blue-200">contact@softsell.com</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-6 h-6 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      <div>
                        <p className="font-semibold">Phone</p>
                        <p className="text-blue-200">+91 1234567890</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-6 h-6 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <div>
                        <p className="font-semibold">Location</p>
                        <p className="text-blue-200">Bangalore, India</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-blue-500">
                  <h4 className="font-semibold mb-2">We buy all types of licenses</h4>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {licenseTypes.slice(0, 4).map((type, index) => (
                      <span key={index} className="bg-blue-700 px-3 py-1 rounded-full text-sm font-medium">{type}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right Column - Form */}
              <div className="md:w-2/3 p-8">
                {isSubmitted ? (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">Your message has been received. We'll be in touch within 24 hours.</p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {currentStep === 1 ? 'Your Details' : 'License Information'}
                      </h3>
                      <div className="flex space-x-2">
                        <div className={`w-3 h-3 rounded-full ${currentStep === 1 ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                        <div className={`w-3 h-3 rounded-full ${currentStep === 2 ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                      </div>
                    </div>
                    
                    <form>
                      {currentStep === 1 ? (
                        <div className="space-y-6">
                          <div>
                            <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Name</label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-slate-700 dark:text-white ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'}`}
                              placeholder="John Smith"
                            />
                            {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Email</label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-slate-700 dark:text-white ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'}`}
                              placeholder="john@company.com"
                            />
                            {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                          </div>
                          
                          <div>
                            <label htmlFor="company" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Company</label>
                            <input
                              type="text"
                              id="company"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-slate-700 dark:text-white ${errors.company ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'}`}
                              placeholder="Acme Inc."
                            />
                            {errors.company && <p className="mt-1 text-red-500 text-sm">{errors.company}</p>}
                          </div>
                          
                          <motion.button
                            type="button"
                            onClick={handleNext}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium mt-4"
                            whileTap={{ scale: 0.98 }}
                          >
                            Continue
                          </motion.button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div>
                            <label htmlFor="licenseType" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">License Type</label>
                            <select
                              id="licenseType"
                              name="licenseType"
                              value={formData.licenseType}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-slate-700 dark:text-white ${errors.licenseType ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'}`}
                            >
                              <option value="">Select License Type</option>
                              {licenseTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                              ))}
                            </select>
                            {errors.licenseType && <p className="mt-1 text-red-500 text-sm">{errors.licenseType}</p>}
                          </div>
                          
                          <div>
                            <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Message</label>
                            <textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              rows="5"
                              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-slate-700 dark:text-white ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'}`}
                              placeholder="Tell us about your software licenses, quantities, and any other relevant details..."
                            ></textarea>
                            {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
                          </div>
                          
                          <div className="flex space-x-4">
                            <motion.button
                              type="button"
                              onClick={handleBack}
                              className="w-1/3 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-white py-3 px-6 rounded-md font-medium"
                              whileTap={{ scale: 0.98 }}
                            >
                              Back
                            </motion.button>
                            
                            <motion.button
                              type="button"
                              onClick={handleSubmit}
                              className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center"
                              whileTap={{ scale: 0.98 }}
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Submitting...
                                </>
                              ) : (
                                'Get a Quote'
                              )}
                            </motion.button>
                          </div>
                        </div>
                      )}
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
            We typically respond to all inquiries within 24 hours during business days.
          </div>
        </div>
      </div>
    </section>
  );
}