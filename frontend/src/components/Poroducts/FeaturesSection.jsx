import React from "react";
import { HiShoppingBag, HiOutlineCreditCard } from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";

const features = [
  {
    icon: <HiShoppingBag className="h-6 w-6 text-accent" />,
    title: "Free International Shipping",
    desc: "On all orders over $100",
  },
  {
    icon: <HiArrowPathRoundedSquare className="h-6 w-6 text-accent" />,
    title: "45-Day Returns",
    desc: "Money back guarantee",
  },
  {
    icon: <HiOutlineCreditCard className="h-6 w-6 text-accent" />,
    title: "Secure Checkout",
    desc: "100% secure payment process",
  },
];

function FeaturesSection() {
  return (
    <section className="py-14 px-4 bg-white border-t border-gray-100">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-4 p-6 rounded-xl bg-gray-50 hover:shadow-md transition-shadow">
            <div className="p-3 bg-blue-50 rounded-xl flex-shrink-0">{f.icon}</div>
            <div>
              <h4 className="font-semibold text-primary text-sm mb-1">{f.title}</h4>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
