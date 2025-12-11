import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function FilterSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [fileter, setFilter] = useState({
    category: "",
    color: "",
    gender: "",
    size: "",
    material: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
  });
const [priceRange,setPriceRange]=useState([0,100])


const categories=['top wear','bottom wear']
const gender=['Men','Women']
const color=["Red","Blue",'Black','Green','Yellow','Gray','White','Pink','Beige','Navy']
const size=['XS','MS','M','L','XL','XXL']

const materials=[
  'Cotten','Wool','Denim','Polyster','Silk','Linen','Viscose','Fleece'
]

const brands=[
  'Urban tread','Modern Fit','Streer style','Beach breeze','Fashionista','Chicstyle'
]


useEffect(()=>{
  const params=Object.fromEntries([...searchParams])

  setFilter({
    category:params.category,
  })
})

  return <div className="">this is the filter sidebar</div>;
}

export default FilterSidebar;
