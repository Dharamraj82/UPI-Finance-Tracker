import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import logo from "../assets/UPI-Finance-Tracker-logo.webp";

export default function Footer() {
  return (
    <footer className=" border-t border-slate-200 bg-white py-8 relative z-10">
      <div className="max-w-[84rem] mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 gap-4">
        <div className="text-center flex items-center flex-col gap-1.5">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="h-10 w-56 relative flex items-center justify-center overflow-hidden rounded-full bg-white shadow-sm border-[1px] border-gray-400 shrink-0 hover:opacity-90 transition-opacity"
          >
            <img
              src={logo}
              alt="UPI Finance Tracker"
              className="absolute w-[300px] h-[200px] max-w-none object-contain"
            />
          </Link>
          <div className="flex flex-col mt-2 sm:mt-0">
            <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
            <span className="text-xs text-slate-400 mt-0.5 flex items-center justify-center sm:justify-start">
              Developed with{" "}
              <Heart className="w-3 h-3 text-red-500 mx-1 fill-red-500" /> by{" "} <a href="https:github.com/dharamraj82"  target="_blank"  className="hover:text-gray-500 cursor-pointer font-medium ">Dharamraj</a>
            </span>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 font-medium">
            <a href="#" className="hover:text-zinc-950 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-zinc-950 transition-colors">
              Terms of Service
            </a>
            <a href="/#contact" className="hover:text-zinc-950 transition-colors">
              Contact Us
            </a>
            
          </div>
          <div className="max-w-[84rem] mx-auto px-4 sm:px-6 md:px-8 mt-6 text-center md:text-left text-xs text-slate-400 font-medium">
            Note: All processing happens locally in your browser. We never store
            your financial data.
          </div>
        </div>
      </div>
    </footer>
  );
}
