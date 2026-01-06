import React from "react";
// Import icons for visual appeal (using Lucide React as an example)
import { CheckCheck, Users, Car } from "lucide-react";

// Define stats with icons for better visual segmentation
const stats = [
  {
    label: "Trips Completed",
    value: "2K+",
    icon: CheckCheck,
  },
  {
    label: "Happy Customers",
    value: "1.5K+",
    icon: Users,
  },
  {
    label: "Vehicles Listed",
    value: "500+",
    icon: Car,
  },
];

const StatsSection = () => (
  <section className="py-10 bg-white dark:bg-darkBg transition-colors duration-300">
    <div className="max-w-[1220px] mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-black ">
        Trusted By Thousands of Travelers
      </h2>

      <div className="bg-primary dark:bg-darkCard text-white p-10 md:p-14 rounded-3xl shadow-2xl shadow-primary/50 dark:shadow-darkCard/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-center">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center p-4 
                          ${
                            i < stats.length - 1
                              ? "md:border-r border-white/30 dark:border-gray-600"
                              : ""
                          }`}
            >
              {/* Icon */}
              <s.icon className="w-10 h-10 text-white mb-3" />

              {/* Value */}
              <h3 className="text-5xl font-extrabold mb-1">{s.value}</h3>

              {/* Label */}
              <p className="text-lg font-medium opacity-90">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default StatsSection;
