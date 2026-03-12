import React from "react";
import dashboard from "../../assets/dashboard.png";

const HeroSection = ({ onGetStarted, onSignIn }) => {

  return (

    <div className="landing-page-content relative bg-[#F7F7FF]">

      <div className="absolute inset-0 bg-gradient-to-r from-[#27187E]/5 to-[#27187E]/10 opacity-70 z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28 text-center">

          <h1 className="text-4xl tracking-tight font-extrabold text-[#27187E] sm:text-5xl md:text-6xl">

            <span className="block">
              Share Files Securely with
            </span>

            <span className="block text-[#27187E]">
              Biased
            </span>

          </h1>


          <p className="mt-4 text-lg text-[#27187E]/70">
            Because Access Isn’t for Everyone
          </p>


          <div className="mt-8 flex justify-center gap-4 flex-wrap">


            <button
              onClick={onGetStarted}
              className="px-6 py-3 bg-[#27187E] text-[#F7F7FF] rounded-lg shadow-md
                         hover:opacity-90 transition"
            >
              Get Started
            </button>


            <button
              onClick={onSignIn}
              className="px-6 py-3 border border-[#27187E] text-[#27187E]
                         rounded-lg hover:bg-[#27187E] hover:text-[#F7F7FF]
                         transition"
            >
              Sign In
            </button>


          </div>

        </div>


        {/* Dashboard Preview */}

        <div className="relative mt-12">

          <div className="rounded-xl shadow-2xl overflow-hidden bg-[#F7F7FF] border border-[#27187E]/20 p-6">

            <img
              src={dashboard}
              alt="Biased dashboard"
              className="w-full h-auto object-contain"
            />

          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/5 rounded-xl pointer-events-none"></div>

        </div>


        <div className="mt-8 text-center">

          <p className="text-base text-[#27187E]/60">

            All your files are encrypted and stored with enterprise
            security protocols.

          </p>

        </div>

      </div>

    </div>

  );

};

export default HeroSection;