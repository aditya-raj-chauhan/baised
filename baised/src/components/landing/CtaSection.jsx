import React from "react";

const CtaSection = ({ onSignUp }) => {

  return (

    <div className="py-24 bg-[#F7F7FF]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div
          className="relative overflow-hidden rounded-3xl
                     bg-gradient-to-r from-[#27187E] via-[#3122A3] to-[#27187E]
                     px-10 py-16 shadow-xl"
        >

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

            <div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F7F7FF] leading-tight">

                Ready to get started?
                <br />
                Create your account today.

              </h2>

            </div>

            <div>

              <button
                onClick={onSignUp}
                className="px-8 py-4 bg-[#F7F7FF] text-[#27187E] font-semibold
                           rounded-xl shadow-md transition-all duration-300
                           hover:bg-[#F7F7FF]/90 hover:shadow-lg"
              >

                Sign up for free

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default CtaSection;