import React from "react";
import { pricingPlans } from "../../assets/data";

const PricingSection = () => {

  return (

    <div className="py-24 bg-[#F7F7FF]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center">

          <h2 className="text-3xl font-extrabold text-[#27187E] sm:text-4xl">
            Simple & Transparent Pricing
          </h2>

          <p className="mt-4 text-xl text-[#27187E]/60">
            Choose a plan that fits your needs.
          </p>

        </div>


        <div className="mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {pricingPlans.map((plan, index) => (

            <div
              key={index}
              className={`flex flex-col p-8 rounded-2xl transition-all duration-300
              ${
                plan.highlighted
                ? "bg-[#F7F7FF] shadow-xl scale-105 border-2 border-[#27187E]"
                : "bg-[#F7F7FF] border border-[#27187E]/20 shadow-sm hover:shadow-lg hover:-translate-y-1"
              }`}
            >

              <h3 className="text-xl font-semibold text-[#27187E]">
                {plan.name}
              </h3>

              <p className="mt-4 text-[#27187E]/60">
                {plan.description}
              </p>


              <div className="mt-6">

                <span className="text-4xl font-extrabold text-[#27187E]">
                  ₹{plan.price}
                </span>

                <span className="text-base text-[#27187E]/60">
                  {" "} / month
                </span>

              </div>


              <ul className="mt-8 space-y-4 text-[#27187E]/80 flex-1">

                {plan.features.map((feature, idx) => (

                  <li key={idx} className="flex items-center">

                    <span className="w-2 h-2 bg-[#27187E] rounded-full mr-3"></span>

                    {feature}

                  </li>

                ))}

              </ul>


              <button
                className={`mt-10 w-full py-3 rounded-lg font-semibold transition-all duration-300
                ${
                  plan.highlighted
                  ? "bg-[#27187E] text-[#F7F7FF] hover:opacity-90"
                  : "border border-[#27187E] text-[#27187E] hover:bg-[#27187E] hover:text-[#F7F7FF]"
                }`}
              >

                {plan.cta}

              </button>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default PricingSection;