import React from "react";
// Using Lucide React for the quote icon
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Booking was incredibly smooth and the car was spotless. TravelEase truly lives up to its name—stress was nonexistent!",
    name: "Aisha K.",
    vehicle: "Toyota Camry",
    rating: 5,
  },
  {
    quote:
      "I found a great deal on a sturdy SUV for our weekend trip to the mountains. The support team was responsive and helpful.",
    name: "Marcus P.",
    vehicle: "Ford Explorer",
    rating: 4,
  },
  {
    quote:
      "Affordable, transparent pricing, and zero hassle at pickup. This is my new go-to for rental vehicles.",
    name: "Chloe D.",
    vehicle: "Tesla Model 3",
    rating: 5,
  },
  {
    quote:
      "The wide selection meant I could get the perfect van for moving day. Excellent service and vehicle condition.",
    name: "Ben L.",
    vehicle: "Cargo Van",
    rating: 4,
  },
  {
    quote:
      "The wide selection meant I could get the perfect van for moving day. Excellent service and vehicle condition.",
    name: "Ben L.",
    vehicle: "Cargo Van",
    rating: 4,
  },
  {
    quote:
      "The wide selection meant I could get the perfect van for moving day. Excellent service and vehicle condition.",
    name: "Ben L.",
    vehicle: "Cargo Van",
    rating: 4,
  },
];

const TestimonialCard = ({ quote, name, vehicle, rating }) => (
  <div
    className="card w-full h-full bg-black p-8 rounded-xl shadow-xl flex-shrink-0 
              border-t-4 border-primary dark:border-primary transition duration-300 hover:shadow-2xl"
  >
    <div className="flex items-start mb-4">
      <Quote className="w-8 h-8 text-primary opacity-70 mr-3 mt-1 flex-shrink-0" />

      {/* Quote Text */}
      <p className="text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed">
        "{quote}"
      </p>
    </div>

    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
      <div>
        {/* User Info */}
        <p className="font-bold text-neutral dark:text-white text-md">{name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Rented: {vehicle}
        </p>
      </div>

      <div className="flex items-center text-secondary">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <span key={i} className="text-xl">
              ★
            </span>
          ))}
        <span className="text-gray-500 dark:text-gray-400 ml-2">
          ({rating}.0)
        </span>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => (
  <section className="py-20 bg-gray-50 dark:bg-darkBg transition-colors duration-300">
    <div className="max-w-[1220px] mx-auto px-6">
      <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 text-center">
        What Our <span className="text-primary">Travelers Say</span>
      </h2>
      <p className="text-lg text-blue-600 mb-12 text-center font-semibold max-w-3xl mx-auto">
        Don't just take our word for it—read real feedback from happy customers.
      </p>

      <div className="flex overflow-x-auto gap-8 p-4 no-scrollbar">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0"
            style={{ minWidth: "300px" }}
          >
            <TestimonialCard {...t} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
