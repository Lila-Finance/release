import React from "react";

const PortfolioLiquidStacking = () => {
  return (
    <div className="w-full mt-28">
      {/* heading */}
      <h1 className="text-3xl lg:text-4xl 2xl:text-5xl mt-4">
        Liquid Staking Protocols
      </h1>

      {/* content wrapper */}
      <div className="w-full flex items-center justify-between lg:flex-nowrap flex-wrap gap-12 2xl:gap-[70px] my-14">
        {/* left side */}
        <div className="w-full h-[320px] overflow-y-auto border-2 border-themeColor py-4 px-2">
          {/* heaidng */}
          <div className="px-4">
            <h3 className="text-lg lg:text-xl font-bold">
              Your Fixed Positions
            </h3>
          </div>

          {/* empty text */}
          <div className="mt-20 px-4">
            <p>No Position entered yet.</p>
          </div>
        </div>

        {/* right side */}
        <div className="w-full h-[320px] overflow-y-auto border-2 border-themeColor py-4 px-2">
          {/* heaidng */}
          <div className="px-4">
            <h3 className="text-lg lg:text-xl font-bold">
              Your Amplified Variable Positions
            </h3>
          </div>

          {/* empty text */}
          <div className="mt-20 px-4">
            <p>No Position entered yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioLiquidStacking;
