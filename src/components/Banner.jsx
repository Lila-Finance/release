import React from "react";
import { NavLink } from "react-router-dom";
import Card from "./Card";

const Banner = () => {
  return (
    <div className="w-full flex items-center justify-between gap-10 md:flex-row flex-col md:mt-0 mt-8">
      {/* Left Side  */}
      <div className="w-full">
        {/* title */}
        <h1 className="text-5xl lg:text-6xl font-medium md:text-start text-center">
          Interest Rate Swaps
        </h1>

        {/* subtitle */}
        <h2 className="text-3xl lg:text-4xl leading-[45px] mt-12 mb-10 md:text-start text-center">
          Fixed income DeFi markets: <br />
          saving, lending, market making
        </h2>

        {/* buttons */}
        <div className="md:text-start text-center">
          <NavLink to="/market">
            <button className="bg-themeColor lg:text-lg md:py-[10px] py-2 px-8 md:px-12 rounded-full duration-300 hover:translate-x-3">
              Enter App
            </button>
          </NavLink>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full flex justify-end my-16">
        <Card homepage={true} />
      </div>
    </div>
  );
};

export default Banner;
