import React from "react";
// Import icons for visual appeal (using Lucide React as an example, adjust if using different icons)
import { CalendarCheck, Car, DollarSign, Headset } from "lucide-react";

// Define features with icons and short descriptions for better context
const features = [
  {
    icon: CalendarCheck,
    title: "Easy Online Booking",
    description:
      "Reserve your perfect vehicle in minutes using our intuitive, streamlined booking process.",
    color: "text-primary",
  },
  {
    icon: Car,
    title: "Verified Fleet",
    description:
      "Every car is thoroughly inspected, clean, and well-maintained for a safe and reliable journey.",
    color: "text-secondary",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description:
      "No hidden fees, no surprises. Affordable daily rates that put you in control of your budget.",
    color: "text-green-500",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Our dedicated support team is ready to assist you anytime, anywhere, for peace of mind.",
    color: "text-red-500",
  },
];

const FeaturesSection = () => (
  <section
    id="features"
    className="py-20 bg-gray-500 dark:bg-darkBg transition-colors duration-300"
  >
    <div className="max-w-[1220px] mx-auto px-6">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-neutral dark:text-white mb-4 text-center">
        Why Choose <span className="text-primary">TravelEase</span>
      </h2>
      <p className="text-lg text-black font-semibold mb-12 text-center max-w-3xl mx-auto">
        We make vehicle rental simple, reliable, and tailored for your journey.
        Explore our core advantages.
      </p>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, i) => (
          // Card Structure
          <div
            key={i}
            className="flex flex-col items-center text-center p-8 
                       bg-black rounded-2xl 
                       shadow-xl hover:shadow-2xl hover:scale-[1.02] 
                       border-t-4 border-primary dark:border-primary
                       transition-all duration-300 group cursor-pointer"
          >
            {/* Icon */}
            <div
              className={`p-4 rounded-full bg-gray-100 dark:bg-darkBg ${feature.color} mb-5`}
            >
              <feature.icon className="w-8 h-8 group-hover:rotate-6 transition-transform duration-300" />
            </div>

            {/* Title */}
            <h3 className="font-bold text-xl mb-2 text-neutral dark:text-white group-hover:text-primary transition-colors">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 dark:text-gray-400 text-base">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
