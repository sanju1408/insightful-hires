import React from 'react';
import { motion } from 'motion/react';
import { Globe, Zap } from 'lucide-react';

const services = [
  {
    title: "Global Search",
    description: "We find elite talent across the globe, vetted for technical skill and perfect culture fit.",
    icon: Globe,
    color: "bg-brand-blue-light text-brand-blue"
  },
  {
    title: "Rapid Matching",
    description: "Stop waiting weeks. We deliver a curated shortlist of the top 3 candidates within 48 hours.",
    icon: Zap,
    color: "bg-brand-green-light text-brand-green"
  }
];

export const Services = () => {
  return (
    <section id="services" className="section-padding bg-white relative overflow-hidden">
      {/* HD Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-slate-50/50 -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tighter">
              Expert <span className="text-brand-blue italic">Solutions</span>
            </h2>
            <p className="text-2xl text-slate-500 leading-relaxed font-medium tracking-tight">
              At <span className="text-slate-900 font-bold">IH</span>, we focus on quality over quantity. We provide a personal touch that big agencies can't match.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -12 }}
              className="p-12 rounded-[48px] bg-white hd-border hd-shadow hover:shadow-premium transition-all group"
            >
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 2 }}
                className={`w-20 h-20 rounded-3xl ${service.color} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-xl`}
              >
                <service.icon size={40} />
              </motion.div>
              <h3 className="text-3xl font-bold text-slate-900 mb-5 tracking-tight">{service.title}</h3>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
