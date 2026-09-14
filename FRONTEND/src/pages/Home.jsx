import React from 'react';
import Hero from '../components/Hero';
import ImacDisplay from '../components/ImacDisplay';
import HowItWorks from '../components/HowItWorks';
import AboutUs from '../components/AboutUs';
import Contact from '../components/Contact';
import SignIn from '../components/SignIn';

import heroBg from '../assets/hero-bg-image.jpg';

export default function Home() {
  return (
    <div className="relative font-sans selection:bg-indigo-500/30">
      
      {/* Background Wrapper (Hero bg image transitioning to white) */}
      <div className="absolute inset-0 z-0 flex flex-col pointer-events-none">
        {/* Top Image Section */}
        <div 
          className="h-[800px] w-full bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          {/* Subtle gradient overlay to ensure text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-transparent to-white/90"></div>
        </div>
        {/* Bottom White Section */}
        <div className="flex-grow bg-white"></div>
      </div>

      {/* Main Layout Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-grow pt-24 pb-12 ">
          <Hero />
          <ImacDisplay />
          <HowItWorks />
          <AboutUs />
          <SignIn />
          <Contact />
        </main>
      </div>
    </div>
  );
}
