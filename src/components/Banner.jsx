import React from "react";
import { NavLink } from "react-router-dom";

const Banner = () => {
  return (
    <>
      {/* Logo */}
      <div className="mt-24 flex items-center justify-center">
        <img
          src="./images/logo.svg"
          alt="site_logo"
          className="mix-blend-color-burn"
        />
      </div>

      {/* Subheading and button */}
      <div className="text-center mt-4 mb-20 lg:mb-40">
        <h1 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl text-black font-medium">
          Rate Swaps
        </h1>

        {/* button */}
        <NavLink to="/pools">
          <button className="text-base md:text-xl lg:text-2xl text-white bg-black py-3 px-8 rounded-full mt-16 lg:mt-28 hover:translate-x-5 duration-300">
            <span>Enter App</span>
            <i className="fa-solid fa-arrow-right ml-2 lg:text-xl"></i>
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default Banner;
