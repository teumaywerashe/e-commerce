import React from "react";
import { HiShoppingBag, HiOutlineCreditCard } from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";

function FeaturesSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <HiShoppingBag className="text-xl" />
          </div>
          <h4 className="tracking-tight mb-2 uppercase">
            {" "}
            free international shipping
          </h4>
          <p className="text-gray-600text-sm tracking-tight">
            on all over $100
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <HiArrowPathRoundedSquare className="text-xl" />
          </div>
          <h4 className="tracking-tight mb-2 uppercase">45 days return</h4>
          <p className="text-gray-600text-sm tracking-tight">
            Money back guarantee
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <HiOutlineCreditCard className="text-xl" />
          </div>
          <h4 className="tracking-tight mb-2 uppercase">secure checkout</h4>
          <p className="text-gray-600text-sm tracking-tight">
            100% secure chekoout proccess
          </p>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
