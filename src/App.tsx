import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { IndustriesWeServe } from './components/TrendingIndustries';
import { SubmitCV } from './components/SubmitCV';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { motion } from 'motion/react';


export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <Services />
        
        <IndustriesWeServe />

        <SubmitCV />

        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
