import React from 'react';
import { motion } from 'motion/react';
import { Upload, FileText, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';

export const SubmitCV = () => {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [selectedFileName, setSelectedFileName] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/submit-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: String(formData.get('firstName') || ''),
          lastName: String(formData.get('lastName') || ''),
          email: String(formData.get('email') || ''),
          department: String(formData.get('department') || ''),
        }),
      });
      if (response.ok) setStatus('success');
      else setStatus('error');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="submit-cv" className="section-padding bg-brand-green text-slate-900 overflow-hidden relative">
      {/* 4K HD Decorative Background */}
      <div className="absolute inset-0 opacity-[0.05] grayscale brightness-0 invert pointer-events-none" 
        style={{ 
          backgroundImage: 'url("https://picsum.photos/seed/architecture-abstract/1920/1080")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} 
      />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/10 blur-[120px] rounded-full opacity-40" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-brand-green/10 blur-[120px] rounded-full opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/10 text-slate-900 text-xs font-bold uppercase tracking-widest mb-8 border border-slate-900/10">
              <Sparkles size={14} />
              Join the Elite Network
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter leading-[0.95] text-slate-900">
              Your Next <span className="text-brand-blue">Career</span> Adventure Starts Here.
            </h2>
            
            <p className="text-xl text-slate-800 mb-12 leading-relaxed font-medium">
              At <span className="text-slate-900 font-bold">IH</span>, we don't just collect CVs. We build relationships with elite talent to find the perfect matches.
            </p>
            
            <div className="grid gap-8">
              {[
                { title: "Direct Access", desc: "Get your profile in front of visionary founders directly.", icon: CheckCircle, color: "text-brand-blue" },
                { title: "Global Reach", desc: "We only work with companies that embrace growth and innovation.", icon: CheckCircle, color: "text-brand-blue" },
                { title: "Personal Touch", desc: "We personally review every profile to ensure the best fit.", icon: CheckCircle, color: "text-brand-blue" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className={`${item.color} mt-1`}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-slate-900">{item.title}</h4>
                    <p className="text-slate-700 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* 3D Card Effect */}
            <div className="absolute inset-0 bg-brand-blue/20 blur-[60px] rounded-[40px] -z-10" />
            
            <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl text-slate-900">
              <form 
                name="submit-cv"
                method="POST"
                data-netlify="true"
                className="space-y-8" 
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="submit-cv" />
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">First Name</label>
                    <input 
                      name="firstName"
                      type="text" 
                      required
                      placeholder="Jane"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:border-brand-blue transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Last Name</label>
                    <input 
                      name="lastName"
                      type="text" 
                      required
                      placeholder="Smith"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:border-brand-blue transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input 
                    name="email"
                    type="email" 
                    required
                    placeholder="jane@example.com"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:border-brand-blue transition-all"
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Department</label>
                  <div className="relative">
                    <select name="department" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:border-brand-blue transition-all appearance-none">
                      <option>Engineering</option>
                      <option>Product Management</option>
                      <option>Design & Creative</option>
                      <option>Growth & Marketing</option>
                      <option>Sales & Business Development</option>
                      <option>Operations & Strategy</option>
                      <option>Finance & Fintech</option>
                      <option>Data Science & AI</option>
                      <option>HR & People Ops</option>
                      <option>Legal & Compliance</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <ArrowRight size={16} className="rotate-90" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Upload CV</label>
                  <label
                    htmlFor="cv-upload"
                    className="border-2 border-dashed border-slate-100 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 hover:border-brand-blue hover:bg-slate-50 transition-all cursor-pointer group"
                  >
                    <input
                      id="cv-upload"
                      name="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="sr-only"
                      onChange={(e) => setSelectedFileName(e.target.files?.[0]?.name ?? '')}
                    />
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-brand-blue group-hover:bg-white transition-all shadow-sm">
                      <Upload size={28} />
                    </div>
                    <p className="text-sm text-slate-500 font-bold">
                      {selectedFileName || 'Click to choose your CV'}
                    </p>
                  </label>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === 'loading'}
                  className="w-full bg-brand-blue text-white py-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-brand-blue-dark transition-all shadow-xl shadow-brand-blue/20 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Submitting...' : status === 'success' ? 'Profile Submitted!' : 'Submit Profile'}
                  <FileText size={20} />
                </motion.button>
                {status === 'error' && <p className="text-red-500 text-xs font-bold text-center">Failed to submit profile. Please try again.</p>}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
