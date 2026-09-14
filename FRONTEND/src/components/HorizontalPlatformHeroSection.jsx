import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PlatformHeroSection from "../assets/PlatformHeroSection-image.jpg";

import phonePeLogo from "../assets/brands/phonePay-logo.jpg";
import googlePayLogo from "../assets/brands/googlePay-logo.jpg";
import paytmLogo from "../assets/brands/paytm-logo.jpg";
import amazonPayLogo from "../assets/brands/amzonPay-logo.jpg";
import naviLogo from "../assets/brands/navi-logo.jpg";
import othersLogo from "../assets/brands/othes-upi-logo.png";

const platforms = [
  { id: "phonepe", name: "PhonePe", logo: phonePeLogo, angle: 0 },
  { id: "gpay", name: "Google Pay", logo: googlePayLogo, angle: 60 },
  { id: "paytm", name: "Paytm", logo: paytmLogo, angle: 120 },
  { id: "amazon", name: "Amazon Pay", logo: amazonPayLogo, angle: 180 },
  { id: "navi", name: "Navi UPI", logo: naviLogo, angle: 240 },
  { id: "othersLogo", name: "UPI", logo: othersLogo, angle: 300 },
];

export default function HorizontalPlatformHeroSection() {
  return (
    <section className="mx-auto max-w-[84rem] py-8 sm:py-12 px-4 sm:px-6 md:px-8">
      <div className="relative w-full">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-4xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-800 leading-[1.2]">
                Explore your financial insights.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-500">
                Upload your UPI or bank statement to instantly generate a
                complete, easy-to-read report. Select your payment provider
                below to explore how we turn your raw data into meaningful
                charts, category breakdowns, and AI-powered recommendations.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <button 
                  onClick={() => document.getElementById('platform-selection')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Analyze Report
                </button>
                <Link 
                  to="/#sign-in"
                  className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold rounded-full shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Save Data (Sign In)
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right: Visual Graphic */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <style>
              {`
                @keyframes orbit {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes counterOrbit {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(-360deg); }
                }
              `}
            </style>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-xl aspect-square flex items-center justify-center"
            >
              {/* Central Plain Image */}
              <div className="relative w-80 h-80 sm:w-[32rem] sm:h-[32rem] rounded-full overflow-hidden">
                <img
                  src={PlatformHeroSection}
                  alt="Platform Hero Section Image"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Orbiting Container - Same exact size as image so logos sit on perimeter */}
              <div
                className="absolute w-80 h-80 sm:w-[32rem] sm:h-[32rem] pointer-events-none rounded-full"
                style={{ animation: "orbit 30s linear infinite" }}
              >
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    className="absolute inset-0"
                    style={{ transform: `rotate(${platform.angle}deg)` }}
                  >
                    {/* Position at edge */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      {/* Counter-rotate the spoke angle statically */}
                      <div
                        style={{ transform: `rotate(-${platform.angle}deg)` }}
                      >
                        {/* Counter-rotate the orbit animation dynamically */}
                        <div
                          style={{
                            animation: "counterOrbit 30s linear infinite",
                          }}
                        >
                          <div className="w-20 h-20  flex items-center justify-center pointer-events-auto  overflow-hidden ">
                            <img
                              src={platform.logo}
                              alt={platform.name}
                              className="w-full h-full object-contain rounded-2xl"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
