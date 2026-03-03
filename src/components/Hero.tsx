import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkles, Globe, Zap } from 'lucide-react';

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [0.08, 0.02]);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070" 
          alt="Global Professional Background" 
          className="w-full h-full object-cover scale-110 opacity-10"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
      </motion.div>

      {/* 4K HD Background Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0F172A 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-brand-blue/10 blur-[160px] rounded-full animate-pulse opacity-60" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[80%] bg-brand-green/10 blur-[160px] rounded-full animate-pulse opacity-60" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-[100px] font-bold text-slate-800 leading-[0.88] mb-10 tracking-[-0.05em]"
            >
              We <motion.span animate={{ color: ['#0066FF', '#0044CC', '#0066FF'] }} transition={{ duration: 6, repeat: Infinity }} className="text-brand-blue italic">Focus</motion.span>.<br />
              We <motion.span animate={{ color: ['#00FF00', '#00CC00', '#00FF00'] }} transition={{ duration: 6, repeat: Infinity, delay: 3 }} className="text-brand-green">Provide</motion.span>.
            </motion.h1>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: [1, 1.03, 1],
                }}
                transition={{ 
                  delay: 0.3,
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-brand-green text-slate-900 text-[11px] font-bold uppercase tracking-[0.25em] shadow-premium"
              >
                <motion.div
                  animate={{ rotate: [0, 20, -20, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles size={16} className="text-brand-green" />
                </motion.div>
                Talent Expert
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-2.5"
              >
                {['Engineering', 'Product', 'Design', 'Data'].map((dept, i) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-slate-500 text-[10px] font-bold uppercase tracking-wider hd-border hd-shadow">
                    {dept}
                  </span>
                ))}
                <span className="px-4 py-2 rounded-full bg-brand-blue/5 text-brand-blue text-[10px] font-bold uppercase tracking-wider hd-border border-brand-blue/20">
                  +6 More
                </span>
              </motion.div>
            </div>
            
            <p className="text-2xl text-slate-500 mb-14 max-w-xl leading-relaxed font-medium tracking-tight">
              At <span className="text-slate-900 font-bold">IH</span>, we focus on finding elite talent and we provide visionary companies with precise, professional solutions.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <motion.a 
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-brand-blue text-white px-12 py-6 rounded-[24px] font-bold text-lg flex items-center justify-center gap-3 hover:bg-brand-blue-dark transition-all shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] group"
              >
                Hire Top Talent
                <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
              </motion.a>
              
              <motion.a 
                href="#submit-cv"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-brand-green text-slate-900 px-12 py-6 rounded-[24px] font-bold text-lg flex items-center justify-center gap-3 hover:bg-brand-green-dark transition-all hd-border hd-shadow"
              >
                Submit CV
              </motion.a>
            </div>

            <div className="mt-20 grid grid-cols-3 gap-12 border-t border-slate-200/60 pt-10">
              {[
                { val: "100%", label: "Success" },
                { val: "48h", label: "Response" },
                { val: "Elite", label: "Network" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + (i * 0.15) }}
                >
                  <p className="text-4xl font-bold text-slate-900 tracking-tighter mb-1">{stat.val}</p>
                  <p className="text-[11px] text-slate-400 uppercase font-black tracking-[0.2em]">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <div className="relative perspective-2000 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, rotateY: 25, rotateX: 15, scale: 0.85 }}
              animate={{ opacity: 1, rotateY: -8, rotateX: 8, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <div className="relative rounded-[60px] overflow-hidden shadow-[0_80px_150px_-30px_rgba(0,0,0,0.3)] border-[16px] border-white bg-slate-100 aspect-[4/5.5]">
                <img 
                  src="https://picsum.photos/seed/executive-leadership-meeting/1200/1600" 
                  alt="Professional Leadership 4K" 
                  className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                  referrerPolicy="no-referrer"
                />
                
                {/* 4K Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />
              </div>

              {/* 4K Floating Elements */}
              <motion.div 
                animate={{ 
                  y: [0, -30, 0],
                  rotate: [0, 3, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-12 z-20 bg-white/95 backdrop-blur-2xl p-8 rounded-[40px] shadow-premium border border-white/50 max-w-[260px]"
              >
                <motion.div 
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-14 h-14 bg-brand-blue rounded-2xl flex items-center justify-center text-white mb-5 shadow-xl shadow-brand-blue/30"
                >
                  <Globe size={28} />
                </motion.div>
                <p className="text-lg font-bold text-slate-900 mb-2 tracking-tight">Global Search</p>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">Connecting talents across the globe.</p>
              </motion.div>

              <motion.div 
                animate={{ 
                  y: [0, 35, 0],
                  rotate: [0, -4, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-16 -left-16 z-30 bg-white backdrop-blur-3xl p-10 rounded-[48px] shadow-[0_40px_80px_-15px_rgba(16,185,129,0.2)] border border-brand-green/20 max-w-[280px]"
              >
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      '0 0 0px rgba(16,185,129,0)',
                      '0 0 30px rgba(16,185,129,0.4)',
                      '0 0 0px rgba(16,185,129,0)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="w-16 h-16 bg-brand-green rounded-3xl flex items-center justify-center text-white mb-6 shadow-2xl shadow-brand-green/40"
                >
                  <Zap size={32} fill="currentColor" />
                </motion.div>
                <p className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Fast Matchmaking</p>
                <p className="text-base text-slate-500 leading-relaxed font-medium">Top 3 vetted candidates delivered within 48 hours.</p>
              </motion.div>
            </motion.div>

            {/* Background Decorative HD Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] border border-slate-200/30 rounded-full -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-slate-100/20 rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
