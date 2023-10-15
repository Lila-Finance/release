import React from "react";
import { NavLink } from "react-router-dom";
import Card from "./Card";
import LineBreak from "./popups/LineBreak";

const Banner = () => {
  return (
    <div className="w-full flex items-center justify-between gap-10 md:flex-row flex-col md:mt-0 mt-4">
      {/* Left Side  */}
      <div className="w-full mt-40">
        {/* title */}
        <h1 className="text-6xl lg:text-7xl font-medium md:text-start text-center">
          $24,245.00
        </h1>
        <h2 className="text-1xl lg:text-2xl leading-[45px] mt-8 mb-10 md:text-start text-center">
            of income payed out by Lila across 3 networks <br></br> and over 14 pools. 
        </h2>

        <h1 className="text-4xl lg:text-5xl font-medium md:text-start text-center mt-16">
          $3,452.00
        </h1>
        <h2 className="text-1xl lg:text-2xl leading-[45px] mt-8 mb-10 md:text-start text-center">
            of value locked now across 3 networks <br></br> and 14 pools. 
        </h2>

        {/* buttons */}
        <div className="md:text-start text-center">
          <NavLink to="/market">
            <button className="bg-themeColor lg:text-lg md:py-[10px] py-2 px-8 md:px-12 rounded-full duration-300 hover:translate-x-3">
              Earn Now
            </button>
          </NavLink>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full flex justify-end mt-40">
        <Card homepage={true} />
      </div>
    </div>
  );
};

export default Banner;
