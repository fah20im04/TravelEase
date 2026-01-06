import React from "react";
import { Mail } from "lucide-react";

const NewsletterSection = () => (
  // Use a bold, contrasting background (like primary color) for the entire banner
  <section className="mt-8 py-20 bg-blue-900">
    <div className="max-w-4xl mx-auto px-6 text-white dark:text-gray-100 text-center">
      {/* Icon and Main Heading */}
      <div className="flex items-center justify-center mb-4">
        <Mail className="w-8 h-8 mr-3 text-white" />
        <h2 className="text-4xl md:text-5xl font-extrabold">
          Never Miss a Deal!
        </h2>
      </div>

      {/* Subheading/Value Proposition */}
      <p className="text-xl mb-8 opacity-90">
        Sign up to our newsletter and get exclusive access to **limited-time
        vehicle deals** and the latest travel guides.
      </p>

      {/* Subscription Form */}
      <div className="flex flex-col md:flex-row justify-center gap-3">
        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email address"
          className="input input-lg w-full md:w-96 text-white
                     border-none rounded-xl focus:ring-2 focus:ring-blue-500 
                     bg-black "
        />

        <button className="btn btn-lg bg-black text-white border-0 hover:bg-black/80 dark:bg-primary dark:text-white dark:hover:bg-primary/90">
          Subscribe Now
        </button>
      </div>

      {/* Privacy Note */}
      <p className="text-sm mt-4 opacity-70">
        We respect your privacy. You can unsubscribe at any time.
      </p>
    </div>
  </section>
);

export default NewsletterSection;
