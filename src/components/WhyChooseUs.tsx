import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Target, Zap, Users } from 'lucide-react';

const reasons = [
  {
    title: "Expert Vetting",
    description: "We don't just match keywords. Our consultants conduct deep technical and cultural assessments for every candidate.",
    icon: ShieldCheck,
    color: "bg-brand-blue-light text-brand-blue"
  },
  {
    title: "Personal Approach",
    description: "We limit our client list to ensure every search gets the dedicated attention it deserves. Quality over quantity.",
    icon: Target,
    color: "bg-brand-green-light text-brand-green"
  },
  {
    title: "Speed to Hire",
    description: "Our pre-vetted talent network allows us to present qualified candidates within 48 hours of starting a search.",
    icon: Zap,
    color: "bg-brand-blue-light text-brand-blue"
  },
  {
    title: "Long-term Partners",
    description: "We track placement success for 12 months. If it's not a perfect fit, we'll find a replacement at no extra cost.",
    icon: Users,
    color: "bg-brand-green-light text-brand-green"
  }
];

export const WhyChooseUs = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Why Choose Us</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            We are more than just a recruitment agency. We are your strategic growth partner.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:border-brand-blue/20 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl ${reason.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <reason.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{reason.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
