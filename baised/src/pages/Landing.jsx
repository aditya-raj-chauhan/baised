import React from "react";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import PricingSection from "../components/landing/PricingSection";
import TestinomialsSection from "../components/landing/TestinomialsSection";
import CtaSection from "../components/landing/CtaSection";
import FooterSection from "../components/landing/FooterSection";
import { features } from "../assets/data";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {

  const { openSignIn, openSignUp } = useClerk();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleGetStarted = () => {

    if(isSignedIn){
      navigate("/dashboard");
    }else{
      openSignUp();
    }

  };

  const handleSignIn = () => {
    openSignIn();
  };

  return (

    <div className="landing-page bg-[#F7F7FF] text-[#27187E] min-h-screen flex flex-col">

      <HeroSection
        onGetStarted={handleGetStarted}
        onSignIn={handleSignIn}
      />

      <FeaturesSection features={features} />

      <PricingSection />

      <TestinomialsSection />

      <CtaSection onSignUp={handleGetStarted} />

      <FooterSection />

    </div>

  );

};

export default Landing;