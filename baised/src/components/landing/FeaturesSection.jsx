import React from "react";

const FeaturesSection = ({ features }) => {

  return (

    <div className="py-20 bg-[#F7F7FF]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center">

          <h2 className="text-3xl font-extrabold text-[#27187E] sm:text-4xl">
            Everything You Need for File Sharing
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-xl text-[#27187E]/60">
            Biased provides all the tools you need to manage your digital content.
          </p>

        </div>


        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature, index) => (

            <div
              key={index}
              className="group p-8 bg-[#F7F7FF] border border-[#27187E]/20 rounded-2xl shadow-sm
                         transition-all duration-300 ease-in-out
                         hover:shadow-lg hover:-translate-y-1"
            >

              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#27187E]/10
                              transition-all duration-300 group-hover:scale-110">

                <feature.icon
                  size={28}
                  style={{ color: "#27187E" }}
                  className="transition-transform duration-300 group-hover:rotate-6"
                />

              </div>


              <h3 className="mt-6 text-lg font-semibold text-[#27187E]
                             transition-colors duration-300 group-hover:text-[#27187E]">

                {feature.title}

              </h3>


              <p className="mt-3 text-[#27187E]/70 leading-relaxed">

                {feature.description}

              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default FeaturesSection;