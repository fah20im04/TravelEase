import React from "react";
// Import icons if you want to add them for categories, e.g., from lucide-react
// import { Car, Wallet, Compass, Users, Tent } from 'lucide-react';

const categories = [
  {
    name: "Luxury",
    description:
      "Indulge in premium comfort and style for your special occasions.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Example luxury car
    alt: "Luxury Car",
  },
  {
    name: "Budget",
    description: "Economical and efficient options for cost-effective travel.",
    image:
      "https://i.ibb.co.com/C5QdN9Nh/jiawei-zhao-5-GRn-B6-Gfjo-U-unsplash.jpg", // Example budget car
    alt: "Budget Car",
  },
  {
    name: "SUV",
    description:
      "Spacious and robust vehicles for family trips and rugged terrains.",
    image:
      "https://i.ibb.co.com/7tZhKLsW/kenny-eliason-y-Dekvy-Z52d-U-unsplash.jpg",
    alt: "SUV",
  },
  {
    name: "Family",
    description:
      "Comfortable and safe choices for memorable journeys with loved ones.",
    image:
      "https://i.ibb.co.com/PzV5PpRm/karan-shiwalkar-Lifww3-JR-u-U-unsplash.jpg",
  },
  {
    name: "Adventure",
    description:
      "Go off the beaten path with our capable and sturdy adventure vehicles.",
    image:
      "https://i.ibb.co.com/qLxwcSRb/gabor-kozmon-Wd-Vlq-4-SEjg-unsplash.jpg",
    alt: "Adventure 4x4",
  },
];

const CategoriesSection = () => (
  <section
    id="categories"
    className="py-20 bg-white dark:bg-darkBg transition-colors duration-300"
  >
    <div className="max-w-7xl mx-auto px-6">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-neutral text-black mb-4 text-center">
        Explore Vehicles by <span className="text-primary">Category</span>
      </h2>
      <p className="text-lg text-blue-600 font-semibold mb-12 text-center max-w-3xl mx-auto">
        Find the perfect ride for every adventure, mood, and budget.
      </p>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {categories.map((category, i) => (
          // Category Card Structure
          <div
            key={i}
            className="card w-full bg-base-100 dark:bg-darkCard shadow-lg 
                       hover:shadow-xl hover:scale-[1.03] 
                       transition-all duration-300 cursor-pointer 
                       overflow-hidden group relative" // Added relative for overlay positioning
          >
            {/* Image (Figure for semantic HTML) */}
            <figure className="h-48 w-full">
              <img
                src={category.image}
                alt={category.alt || category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </figure>

            {/* Content Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 className="card-title text-3xl font-bold mb-1">
                {category.name}
              </h3>
              <p className="text-gray-200 text-sm opacity-90">
                {category.description}
              </p>
              {/* Optional: Add a button or link to view category vehicles */}
              {/* <button className="btn btn-sm btn-outline btn-primary mt-3 self-start opacity-0 group-hover:opacity-100 transition-opacity">
                    View {category.name}
                </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CategoriesSection;
