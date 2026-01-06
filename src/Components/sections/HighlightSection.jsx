import React from "react";
// You might want to import an arrow icon for navigation if you add custom scroll buttons
// import { ChevronLeft, ChevronRight } from 'lucide-react';

const destinations = [
  {
    name: "Golden Gate Bridge, SF",
    description: "Experience iconic views of San Francisco's landmark bridge.",
    image:
      "https://i.ibb.co.com/mV2dQM30/maarten-van-den-heuvel-g-ZXx8l-KAb7-Y-unsplash.jpg",
    alt: "Golden Gate Bridge in San Francisco",
  },
  {
    name: "Rocky Mountains, CO",
    description:
      "Adventure awaits in the majestic peaks and serene wilderness.",
    image:
      "https://i.ibb.co.com/tPZDLkkp/demian-tejeda-benitez-py9xv-AAxi-BQ-unsplash.jpg",
    alt: "Rocky Mountains in Colorado",
  },
  {
    name: "Miami Beach, FL",
    description:
      "Sun, sand, and vibrant nightlife. Your perfect beach getaway.",
    image:
      "https://i.ibb.co.com/qLFXrYSY/antonio-cuellar-KDS5l-Crj-ew-unsplash.jpg",
    alt: "Miami Beach, Florida",
  },
  {
    name: "Grand Canyon, AZ",
    description: "Witness the awe-inspiring grandeur of nature's masterpiece.",
    image:
      "https://i.ibb.co.com/yBZ3xfVp/omer-nezih-gerek-ZZn-H4-GOz-Dgc-unsplash.jpg",
    alt: "Grand Canyon National Park, Arizona",
  },
  {
    name: "Yellowstone NP, WY",
    description: "Geysers, wildlife, and breathtaking landscapes.",
    image:
      "https://i.ibb.co.com/39TmnMvc/denys-nevozhai-LMU2w-K4-J7k-unsplash.jpg",
    alt: "Yellowstone National Park",
  },
  {
    name: "New Orleans, LA",
    description: "Immerse yourself in jazz, history, and unique culture.",
    image:
      "https://i.ibb.co.com/9HnhnrrX/stella-he-cy-Zu-N-AVi-JQ-unsplash.jpg",
    alt: "New Orleans French Quarter",
  },
];

const DestinationCard = ({ name, description, image, alt }) => (
  <div
    className="card w-72 bg-base-100 dark:bg-darkCard shadow-lg 
                  hover:shadow-xl hover:scale-[1.03] 
                  transition-all duration-300 cursor-pointer 
                  overflow-hidden flex-shrink-0 relative"
  >
    {" "}
    <figure className="h-48 w-full">
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    </figure>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
      <h3 className="card-title text-2xl font-bold mb-1">{name}</h3>
      <p className="text-gray-200 text-sm opacity-90">{description}</p>
      <button className="btn btn-sm btn-primary mt-3 self-start opacity-0 group-hover:opacity-100 transition-opacity">
        Explore
      </button>
    </div>
  </div>
);

const HighlightsSection = () => (
  <section className="py-4 bg-gray-50 dark:bg-darkBg transition-colors duration-300">
    <div className="max-w-[1220px] mx-auto px-6">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 text-center">
        Explore Our <span className="text-primary">Top Destinations</span>
      </h2>
      <p className="text-lg text-blue-600 font-semibold mb-12 text-center max-w-3xl mx-auto">
        Discover incredible places and find the perfect vehicle to make your
        journey unforgettable.
      </p>

      {/* Destination Cards (Horizontal Scroll) */}
      <div className="flex overflow-x-auto gap-8 p-4 no-scrollbar">
        {" "}
        {/* Added no-scrollbar for cleaner look */}
        {destinations.map((destination, i) => (
          <DestinationCard key={i} {...destination} />
        ))}
      </div>
    </div>
  </section>
);

export default HighlightsSection;
