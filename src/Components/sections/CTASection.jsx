import React from "react";

const CTASection = () => (
  // Use slightly larger vertical padding for a powerful, full-width banner
  <section className="py-24 bg-primary dark:bg-darkCard transition-colors duration-300">
    <div className="max-w-6xl mx-auto px-6 text-white dark:text-gray-100 text-center">
      {/* Primary Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
        Ready to Hit the Road?
      </h2>

      {/* Secondary Value Proposition */}
      <p className="text-xl md:text-2xl mb-8 opacity-90 font-light">
        Join TravelEase today and find your perfect rental car in minutes—not
        hours.
      </p>

      {/* Action Button */}
      <a
        href="/register"
        // Applying styles for a visually inverted button (white background, primary text)
        // This makes the CTA pop against the primary background color.
        className="btn-lg inline-block 
                   bg-white text-primary dark:bg-primary dark:text-white
                   shadow-xl hover:shadow-2xl hover:scale-[1.05]
                   transition-all duration-300 font-bold"
      >
        Start Your Journey Now
      </a>
    </div>
  </section>
);

export default CTASection;
