import React from 'react';
import { motion } from 'motion/react';
import { Brain, CreditCard, HeartPulse, Cloud, ShoppingCart, Leaf } from 'lucide-react';

const industries = [
  {
    name: "Artificial Intelligence",
    description: "Machine Learning, NLP, and Generative AI experts.",
    icon: Brain,
    color: "bg-indigo-50 text-indigo-600"
  },
  {
    name: "Fintech",
    description: "Digital banking, payments, and blockchain solutions.",
    icon: CreditCard,
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    name: "Healthtech",
    description: "Telemedicine, health data, and biotech innovation.",
    icon: HeartPulse,
    color: "bg-rose-50 text-rose-600"
  },
  {
    name: "SaaS & Enterprise",
    description: "Cloud-native software and B2B platforms.",
    icon: Cloud,
    color: "bg-blue-50 text-blue-600"
  },
  {
    name: "E-commerce",
    description: "Direct-to-consumer and retail technology.",
    icon: ShoppingCart,
    color: "bg-amber-50 text-amber-600"
  },
  {
    name: "Sustainability",
    description: "Green energy and climate-tech solutions.",
    icon: Leaf,
    color: "bg-teal-50 text-teal-600"
  }
];

export const IndustriesWeServe = () => {
  return (
    <section id="industries" className="section-padding bg-[#F8FAFC] relative overflow-hidden">
      {/* HD Decorative Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white text-slate-600 text-[11px] font-bold uppercase tracking-[0.25em] mb-8 hd-border hd-shadow"
          >
            Market Focus
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tighter">
            Industries <span className="text-brand-blue italic">We Serve</span>
          </h2>
          <p className="text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium tracking-tight">
            We specialize in placing elite talent within the world's most innovative and fast-growing sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[48px] bg-white hd-border hd-shadow hover:shadow-premium transition-all group cursor-default"
            >
              <div className={`w-16 h-16 rounded-3xl ${industry.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg`}>
                <industry.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{industry.name}</h3>
              <p className="text-slate-500 text-base leading-relaxed font-medium">
                {industry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
