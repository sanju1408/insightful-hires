import React from 'react';
import { motion } from 'motion/react';
import { Mail, Send, Sparkles } from 'lucide-react';

export const Contact = () => {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(formData.get('name') || ''),
          email: String(formData.get('email') || ''),
          message: String(formData.get('message') || ''),
        }),
      });
      if (response.ok) setStatus('success');
      else setStatus('error');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue-light text-brand-blue text-xs font-bold uppercase tracking-widest mb-8 border border-brand-blue/20">
              <Sparkles size={14} />
              Let's Connect
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tighter leading-[0.95]">
              Ready to <span className="text-brand-blue">Scale</span> Your Team?
            </h2>
            
            <p className="text-xl text-slate-500 mb-12 leading-relaxed font-medium">
              We are dedicated to discussing strategic talent acquisition and providing the elite expertise your organization requires. Experience a professional, direct partnership focused on your success.
            </p>
            
            <div className="flex items-center gap-6 p-8 rounded-[32px] bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-brand-blue rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-blue/20">
                <Mail size={28} />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Direct Email</p>
                <p className="text-xl font-bold text-slate-900">hello@insightfulhires.com</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-brand-green p-10 md:p-16 rounded-[40px] shadow-2xl relative overflow-hidden"
          >
            {/* Decorative Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-blue/20 blur-[80px] rounded-full" />
            
            <form 
              name="contact"
              method="POST"
              data-netlify="true"
              className="space-y-8 relative z-10" 
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="contact" />
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-widest">Your Name</label>
                <input 
                  name="name"
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="w-full bg-white/20 border border-white/30 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-700 focus:outline-none focus:border-brand-blue transition-all"
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-widest">Email Address</label>
                <input 
                  name="email"
                  type="email" 
                  required
                  placeholder="john@example.com"
                  className="w-full bg-white/20 border border-white/30 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-700 focus:outline-none focus:border-brand-blue transition-all"
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-widest">Message</label>
                <textarea 
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell me about your hiring needs..."
                  className="w-full bg-white/20 border border-white/30 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-700 focus:outline-none focus:border-brand-blue transition-all resize-none"
                ></textarea>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'loading'}
                className="w-full bg-slate-900 text-white py-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-brand-blue transition-all shadow-xl shadow-slate-900/20 disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                <Send size={20} />
              </motion.button>
              {status === 'error' && <p className="text-red-400 text-xs font-bold text-center">Failed to send message. Please try again.</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
