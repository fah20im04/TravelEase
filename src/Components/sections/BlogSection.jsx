import React from "react";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "Rental Pickup Pro-Tips: Inspecting Your Vehicle",
    date: "December 15, 2025",
    excerpt:
      "A quick guide to checking your rental for existing damage and understanding the fuel policy before you drive off.",
    image: "https://i.ibb.co.com/CpPk3Z7c/images.jpg",
    category: "Logistics",
  },
  {
    title: "Choosing the Right Car: SUV vs. Sedan for Holiday Travel",
    date: "November 28, 2025",
    excerpt:
      "We break down the pros and cons to help you select the ideal vehicle size and type for your vacation itinerary.",
    image: "https://i.ibb.co.com/DgRGVtZf/images-1.jpg",
    category: "Vehicle Selection",
  },
  {
    title: "How to Maximize Your Mileage on a Rented Car",
    date: "November 1, 2025",
    excerpt:
      "Expert tips on driving techniques and maintenance checks to save money and fuel during your road trip.",
    image:
      "https://i.ibb.co.com/GQPdVHnM/signing-car-rental-agreement-contract-260nw-386895070.webp",
    category: "Money Savers",
  },
];
// -------------------------------------------------------------------

const BlogCard = ({ title, date, excerpt, image, category }) => (
  <div
    className="card w-full bg-black shadow-lg rounded-xl overflow-hidden 
               transition-all duration-300 hover:shadow-2xl hover:translate-y-[-5px] cursor-pointer"
  >
    {/* Image Container */}
    <figure className="h-48 w-full overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </figure>

    {/* Card Body */}
    <div className="p-6">
      {/* Category and Date */}
      <div className="flex justify-between items-center text-sm mb-3">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20">
          {category}
        </span>
        <span className="text-gray-500 dark:text-gray-400">{date}</span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-3 text-neutral dark:text-white line-clamp-2">
        {title}
      </h3>

      {/* Excerpt */}
      <p className="text-gray-600 dark:text-gray-400 text-base mb-4 line-clamp-3">
        {excerpt}
      </p>

      {/* Read More Link */}
      <div className="flex items-center text-primary font-semibold hover:underline">
        Read More
        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </div>
);

const BlogSection = () => (
  <section className="bg-gray-100 mb-10 dark:bg-darkCard transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-6">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 text-center">
        Rental & Travel <span className="text-primary">Guides</span>
      </h2>
      <p className="text-lg font-semibold text-blue-600 mb-12 text-center max-w-3xl mx-auto">
        Your resource for hassle-free car renting, smarter road trips, and
        essential travel advice.
      </p>

      {/* Blog Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post, i) => (
          <BlogCard key={i} {...post} />
        ))}
      </div>
    </div>
  </section>
);

export default BlogSection;
