import React from "react";
import Banner from "../../Banner/Banner";
import VehicleCard from "../Cards/VehicleCard";
import { useTheme } from "../../Theame/ThemeProvider";
import HeroSection from "../../sections/HeroSection";
import FeaturesSection from "../../sections/FeaturesSection";
import CategoriesSection from "../../sections/CategoriesSection";
import CTASection from "../../sections/CTASection";
import FAQSection from "../../sections/FAQSection";
import NewsletterSection from "../../sections/NewsletterSection";
import BlogSection from "../../sections/BlogSection";
import TestimonialsSection from "../../sections/TestimonialsSection";
import StatsSection from "../../sections/StatsSection";
import HighlightsSection from "../../sections/HighlightSection";

const Home = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Banner />
      <h2
        className={`font-bold text-5xl text-center mt-10 transition-colors duration-300 ${
          theme === "dark" ? "text-yellow-400" : "text-primary"
        }`}
      >
        Model Vehicle
      </h2>
      <VehicleCard theme={theme} />
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <HighlightsSection />
      <StatsSection />
      <TestimonialsSection />
      <BlogSection />
      <NewsletterSection />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default Home;
