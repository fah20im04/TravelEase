import React from "react";

const faqs = [
  {
    question: "What documents do I need to rent a vehicle?",
    answer:
      "You must present a valid driver's license, a major credit card in your name for the security deposit, and your digital booking confirmation.",
  },
  {
    question: "Is there a minimum age requirement to rent?",
    answer:
      "The minimum age requirement is generally 21 years old. Drivers under 25 may be subject to a young driver surcharge, depending on the vehicle class.",
  },
  {
    question: "Are your vehicles properly verified for safety?",
    answer:
      "Yes, absolutely. All vehicles listed on TravelEase undergo a rigorous 100-point safety inspection before every rental period to ensure maximum safety and reliability.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Bookings can be canceled up to 48 hours before pickup for a full refund. Cancellations made within 48 hours may be subject to a fee.",
  },
  {
    question: "Do you offer roadside assistance?",
    answer:
      "Yes, 24/7 emergency roadside assistance is included with every rental, ensuring you have peace of mind throughout your journey.",
  },
];

const FAQSection = () => (
  <section id="faq" className="py-20 bg-black">
    <div className="max-w-4xl mx-auto px-6">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-neutral dark:text-white mb-4 text-center">
        Frequently Asked <span className="text-primary">Questions</span>
      </h2>
      <p className="text-lg text-blue-600 mb-12 text-center font-semibold">
        Find quick answers to the most common inquiries about renting with
        TravelEase.
      </p>

      {/* Accordion Container */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          // DaisyUI Collapse/Accordion Structure
          <div
            key={index}
            className="collapse collapse-arrow bg-blue-900 border border-gray-200 dark:border-gray-700 
                       rounded-xl transition duration-300 hover:shadow-md"
          >
            {/* Hidden Checkbox acts as the toggle */}
            <input type="checkbox" className="peer" />

            {/* Collapse Title */}
            <div className="collapse-title text-xl font-semibold text-black dark:text-white p-5 peer-checked:text-black">
              {faq.question}
            </div>

            {/* Collapse Content */}
            <div className="collapse-content px-5 pb-5 pt-0">
              <p className="text-white leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-3">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA for Further Help */}
      <div className="text-center mt-12">
        <p className="text-lg text-neutral dark:text-white mb-4">
          Can't find your answer?
        </p>
        <button className="btn-primary">Contact Support</button>
      </div>
    </div>
  </section>
);

export default FAQSection;
