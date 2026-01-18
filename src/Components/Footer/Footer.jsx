import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Github,
  X,
} from "lucide-react";

// Helper for social icons
const IconButton = ({ icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition flex items-center justify-center"
  >
    {icon}
  </a>
);

const Footer = () => {
  const [modal, setModal] = useState(null); // null, "privacy", "terms", "contact", "help"

  // Modal content mapping
  const modalContent = {
    privacy: {
      title: "Privacy Policy",
      body: `
At TravelEase, your privacy is our priority. We collect only the necessary information to provide a seamless experience and never share it with third parties without your consent.

Information collected may include your name, email, booking history, and payment details. We use this data to manage bookings, improve services, and communicate important updates.

We employ strict security measures to protect your data from unauthorized access or disclosure. By using our platform, you agree to the collection and use of information in accordance with this Privacy Policy.

For questions regarding your personal data, please contact our support team.
      `,
    },
    terms: {
      title: "Terms & Conditions",
      body: `
Welcome to TravelEase. By using our platform, you agree to comply with the following terms and conditions:

1. Users must provide accurate and complete information when registering.
2. Booking a vehicle is a binding agreement; cancellations may be subject to fees.
3. Users must respect vehicle owners and follow local laws and regulations.
4. TravelEase reserves the right to modify or terminate services at any time.
5. All disputes will be handled under applicable local laws.

By using TravelEase, you acknowledge that you have read, understood, and agreed to these terms.
      `,
    },
    contact: {
      title: "Contact Us",
      body: `
You can reach TravelEase support using the following channels:

Email: support@travelease.com
Phone: +880 123 456 789
Address: 123 TravelEase Street, Dhaka, Bangladesh

Our support team is available 24/7 to assist you with bookings, cancellations, or general inquiries.
      `,
    },
    help: {
      title: "Help Center",
      body: `
Welcome to the TravelEase Help Center. Here you can find answers to frequently asked questions:

- How do I book a vehicle?
- How can I cancel or modify a booking?
- What payment methods are accepted?
- How do I contact vehicle owners?

For detailed support, please email support@travelease.com or use our live chat feature.
      `,
    },
  };

  return (
    <>
      {/* ================= FOOTER ================= */}
      <footer className="bg-neutral dark:bg-darkBg text-white px-6 py-14 mt-20">
        <div className="max-w-[1220px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* BRAND */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-primary">
                TravelEase
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Your trusted travel partner—helping you explore the world with
                ease, comfort, and style.
              </p>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                Quick Links
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <a href="#hero" className="hover:text-primary transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-primary transition">
                    Why Choose Us
                  </a>
                </li>
                <li>
                  <a
                    href="#categories"
                    className="hover:text-primary transition"
                  >
                    Vehicles
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-primary transition">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* SUPPORT */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">Support</h3>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <a href="#faq" className="hover:text-primary transition">
                    FAQ
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setModal("terms")}
                    className="hover:text-primary transition text-left"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setModal("privacy")}
                    className="hover:text-primary transition text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setModal("help")}
                    className="hover:text-primary transition text-left"
                  >
                    Help Center
                  </button>
                </li>
              </ul>
            </div>

            {/* SOCIAL */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                Follow Us
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <IconButton
                  icon={<Facebook size={20} />}
                  href="https://www.facebook.com/fah20im04"
                />
                <IconButton
                  icon={<Instagram size={20} />}
                  href="https://www.instagram.com/fanion_04/"
                />
                <IconButton
                  icon={<Youtube size={20} />}
                  href="https://youtube.com/travelease"
                />
                <IconButton
                  icon={<X size={20} />}
                  href="https://x.com/travelease"
                />
                <IconButton
                  icon={<Linkedin size={20} />}
                  href="https://www.linkedin.com/in/fahim-ahmed-ayon/"
                />
                <IconButton
                  icon={<Github size={20} />}
                  href="https://github.com/fah20im04"
                />
              </div>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="text-center border-t border-white/10 mt-12 pt-6 text-gray-400 text-sm">
            © {new Date().getFullYear()} TravelEase — All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* ================= MODAL ================= */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setModal(null)} // Close on clicking overlay
        >
          <div
            className="bg-black max-w-3xl w-full rounded-xl p-6 shadow-lg overflow-y-auto max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setModal(null)}
              className="absolute top-4 right-4 text-gray-700 dark:text-gray-200 hover:text-red-500"
            >
              <X size={24} />
            </button>

            {/* Modal content */}
            <h2 className="text-2xl font-bold mb-4 text-blue-700">
              {modalContent[modal].title}
            </h2>
            <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
              {modalContent[modal].body}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
