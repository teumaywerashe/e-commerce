import React from "react";
import menscollectioImage from "../../assets/mens-collection.webp";
import womenscollectioImage from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

function GenderCollectionSection() {
  return (
    <section className="py-16 px-4 lg:p-10">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        <div className="relative flex-1  ">
          <img src={menscollectioImage} alt="Men's Collection" className="w-full object-cover h-[700px]"/>
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2>Men's Collection</h2>
            <Link to='/collections/all?gender=Men' className="text-gray-500 underline">Shop Now</Link>
          </div>
        </div>
         <div className="relative flex-1  ">
          <img src={womenscollectioImage} alt="Men's Collection" className="w-full object-cover h-[700px]"/>
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2>Women's Collection</h2>
            <Link to='/collections/all?gender=Women' className="text-gray-500 underline">Shop Now</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GenderCollectionSection;
