'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Welcome to SoftSell! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  //example questions
  const exampleQuestions = [
    'How do I sell my license?',
    'What types of software do you support?',
    'How long does the selling process take?',
    'What fees does SoftSell charge?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function fetchAIResponse(userMessage) {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: [...messages, { role: 'user', content: userMessage }]
        }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return "I'm sorry, I'm having trouble connecting to my services. Please try again later or contact our support team.";
    }
    
    // // MOCK RESPONSES
    // const mockResponses = {
    //   'how do i sell my license?': "Selling your license is easy! First, register an account on SoftSell, then click 'Sell My License' and follow the verification process. We'll handle the marketplace listing and secure transfer once a buyer is found. You'll receive payment within 3-5 business days after the sale completes.",
      
    //   'what types of software do you support?': "SoftSell supports a wide range of enterprise software licenses including Microsoft, Adobe, Salesforce, Atlassian, Oracle, SAP, Autodesk, and many more. We specialize in B2B software that allows license transfers according to their terms of service.",
      
    //   'how long does the selling process take?': "The average time from listing to completed sale is about 48 hours. Popular software licenses often sell within 24 hours. The verification process takes 1-2 hours, and payment processing takes 2-3 business days after the sale.",
      
    //   'what fees does softsell charge?': "SoftSell charges a 15% commission on successful sales. There are no upfront fees, listing fees, or charges if your license doesn't sell. The commission is only taken when your license sells successfully.",
    // };

    // await new Promise(resolve => setTimeout(resolve, 1000));
    
    // const userMessageLower = userMessage.toLowerCase();
    // let response = '';
    
    // for (const [key, value] of Object.entries(mockResponses)) {
    //   if (userMessageLower.includes(key)) {
    //     response = value;
    //     break;
    //   }
    // }
    
    // if (!response) {
    //   response = "That's a great question! While I'm just a demo assistant, our team would be happy to help with this. Would you like to know more about how to sell licenses or about our fees and process instead?";
    // }
    
    // setIsLoading(false);
    // return response;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    
    // Get AI response
    const aiResponse = await fetchAIResponse(userMessage);
    setMessages(prev => [...prev, { role: 'system', content: aiResponse }]);
  };

  const handleExampleClick = (question) => {
    setInput(question);
  };

  return (
    <>
      {/* Chat button */}
      <motion.div
        className="fixed bottom-5 right-5 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
        </button>
      </motion.div>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-5 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-50 flex flex-col"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Chat header */}
            <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <h3 className="font-medium">SoftSell Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50" style={{ maxHeight: '350px' }}>
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`mb-3 ${message.role === 'user' ? 'text-right' : ''}`}
                >
                  <div 
                    className={`inline-block rounded-lg px-4 py-2 max-w-[85%] ${
                      message.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="mb-3">
                  <div className="inline-block rounded-lg px-4 py-2 bg-gray-200 text-gray-800">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Example questions */}
            <div className="px-4 py-2 bg-gray-100 overflow-x-auto whitespace-nowrap">
              <div className="flex gap-2">
                {exampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(question)}
                    className="px-3 py-1 text-xs bg-white border border-gray-200 rounded-full hover:bg-gray-50 text-gray-600 whitespace-nowrap"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Chat input */}
            <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}