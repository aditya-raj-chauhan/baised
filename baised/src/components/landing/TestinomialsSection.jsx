import React from "react";
import { testimonials } from "../../assets/data";
import { Star } from "lucide-react";

const TestinomialsSection = () => {

  return (

    <div className="py-24 bg-[#F7F7FF]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center">

          <h2 className="text-3xl font-extrabold text-[#27187E] sm:text-4xl">
            What Our Users Say
          </h2>

          <p className="mt-4 text-xl text-[#27187E]/60">
            Trusted by professionals across industries.
          </p>

        </div>


        <div className="mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {testimonials.map((testimonial, index) => (

            <div
              key={index}
              className="flex flex-col p-8 bg-[#F7F7FF] border border-[#27187E]/20 rounded-2xl shadow-sm
                         transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >

              <div className="flex items-center mb-6">

                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div className="ml-4">

                  <h3 className="text-lg font-semibold text-[#27187E]">
                    {testimonial.name}
                  </h3>

                  <p className="text-sm text-[#27187E]/60">
                    {testimonial.role} • {testimonial.company}
                  </p>

                </div>

              </div>


              <p className="text-[#27187E]/80 italic flex-1">

                “{testimonial.quote}”

              </p>


              <div className="flex mt-6">

                {[...Array(testimonial.rating)].map((_, i) => (

                  <Star
                    key={i}
                    size={18}
                    className="text-yellow-500 fill-yellow-500 mr-1"
                  />

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default TestinomialsSection;