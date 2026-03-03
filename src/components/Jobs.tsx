import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, DollarSign, Briefcase } from 'lucide-react';

const jobs = [
  {
    title: "Senior Product Designer",
    company: "TechFlow Systems",
    location: "Remote / London",
    salary: "£85k - £110k",
    type: "Full-time",
    tags: ["UI/UX", "Figma", "SaaS"]
  },
  {
    title: "Lead Frontend Engineer",
    company: "GreenScale",
    location: "Berlin, Germany",
    salary: "€90k - €120k",
    type: "Hybrid",
    tags: ["React", "TypeScript", "Next.js"]
  },
  {
    title: "Marketing Director",
    company: "Lumina Health",
    location: "New York, USA",
    salary: "$140k - $180k",
    type: "On-site",
    tags: ["Strategy", "Growth", "B2C"]
  },
  {
    title: "Full Stack Developer",
    company: "Nexus AI",
    location: "Remote",
    salary: "$100k - $150k",
    type: "Full-time",
    tags: ["Node.js", "Python", "AWS"]
  }
];

export const Jobs = () => {
  return (
    <section id="jobs" className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Featured Opportunities</h2>
            <p className="text-slate-600 text-lg">
              Explore our hand-picked roles from industry leaders.
            </p>
          </div>
          <button className="text-brand-blue font-bold hover:underline flex items-center gap-2">
            View all 42 open positions
            <Briefcase size={18} />
          </button>
        </div>
        
        <div className="grid gap-6">
          {jobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
              className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-blue-light group-hover:text-brand-blue transition-colors">
                  <Briefcase size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-brand-blue transition-colors">{job.title}</h3>
                  <p className="text-slate-500 font-medium mb-3">{job.company}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={16} />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <DollarSign size={16} />
                      {job.salary}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={16} />
                      {job.type}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex gap-2">
                  {job.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="w-full sm:w-auto bg-slate-900 text-white px-6 py-3 rounded-full font-bold hover:bg-brand-green transition-colors">
                  Apply Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
