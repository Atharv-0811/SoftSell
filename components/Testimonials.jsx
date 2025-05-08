'use client';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "SoftSell helped us recover over $50,000 from unused enterprise software licenses. The process was seamless and their valuation was higher than competitors.",
    name: "Sarah Johnson",
    role: "CTO",
    company: "TechVista Solutions"
  },
  {
    quote: "When our company downsized, we had dozens of premium licenses sitting idle. SoftSell turned that potential waste into significant recovery capital within days.",
    name: "Michael Chang",
    role: "IT Director",
    company: "Globex Innovations"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">What Our Clients Say</h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Join hundreds of satisfied businesses who've recovered value from unused licenses</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-md"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="mb-4">
                <svg className="w-10 h-10 text-blue-500 mb-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-700 dark:text-gray-300 italic mb-6">{testimonial.quote}</p>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-300 font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}