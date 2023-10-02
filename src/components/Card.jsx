import React, { useState } from "react";
import Counter from "./Counter";

const Card = ({ details, showPopup }) => {
  const { title, fixedRate, swaps, fixedDai, variableDai, newRate } = details;

  // show tooltip
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="bg-white drop-shadow-buttonShadow rounded-cardRadius">
      {/* Heading */}
      <div className="w-full text-center py-4">
        <h2 className="lg:text-2xl font-bold">{title}</h2>
      </div>

      {/* LineBreak */}
      <div className="h-[13px] w-full bg-lineBreakColor"></div>

      {/* statistics 1 */}
      <div className="px-4 py-5 flex items-center justify-between">
        {/* Left side */}
        <div className="w-full text-center">
          <h2 className="text-2xl lg:text-3xl 2xl:text-[35px] font-bold text-black">
            {fixedRate}
          </h2>
          <p className="text-base lg:text-lg">Fixed Rate</p>
        </div>

        {/* Right side */}
        <div className="w-full text-center">
          <h2 className="text-2xl lg:text-3xl 2xl:text-[35px] font-bold text-black">
            {swaps}
          </h2>
          <p className="text-base lg:text-lg">Swaps</p>
        </div>
      </div>

      {/* LineBreak */}
      <div className="h-[13px] w-full bg-lineBreakColor"></div>

      {/* Statics 2 */}
      <div className="w-full p-4">
        {/* Heading */}
        <div
          className="flex items-center relative"
          onMouseLeave={() => setShowTooltip(false)}
        >
          <span className="text-[13px] mb-1">Deposits Till Next Swap</span>
          <img
            src="./images/question-mark.svg"
            alt="question-mark"
            className="w-7 cursor-pointer"
            onMouseOver={() => setShowTooltip(true)}
          />

          {/* tooltip card */}
          {showTooltip === true ? (
            <div className="w-full max-w-[245px] bg-white rounded-tl-[7.5px] rounded-tr-[7.5px] rounded-br-[7.5px] rounded-bl-0 border border-themeColor p-2 absolute -right-14 bottom-4">
              <h3 className="text-xs font-bold">How do Deposits work?</h3>
              <p className="text-[11px] leading-[130%] mt-1">
                When Fixed and Variable deposits reach their limit, both start
                to earn their respective returns. If pools don't fill before the
                new rate, your money is returned. Meanwhile, you earn the
                protocol's true APY while waiting for your pool to fill.
              </p>
            </div>
          ) : null}
        </div>

        {/* Numbers */}
        <div className="w-full px-4 mt-2 mb-6 lg:mb-10 flex items-center justify-between gap-4">
          {/* Left Side */}
          <div className="w-full">
            <p className="text-sm lg:text-[15px]">Fixed</p>
            <h2 className="text-lg lg:text-xl xl:text-[28px] font-medium mt-[2px]">
              {fixedDai} Dai
            </h2>
          </div>

          {/* Right Side */}
          <div className="w-full">
            <p className="text-sm lg:text-[15px]">Variable</p>
            <h2 className="text-lg lg:text-xl xl:text-[28px] font-medium mt-[2px]">
              {variableDai} Dai
            </h2>
          </div>
        </div>

        {/* Button */}
        <div className="w-full text-center">
          <button
            className="bg-themeColor w-8/12 py-1 r rounded-full text-base md:text-lg lg:text-xl hover:translate-x-2 duration-200"
            onClick={showPopup}
          >
            Enter Swap
          </button>
        </div>
      </div>

      {/* New Rate */}
      <div className="flex items-center justify-between px-4 flex-wrap md:flex-nowrap lg:flex-wrap xl:flex-nowrap gap-y-2 pb-4 pt-7">
        {/* left side */}
        <div className="w-full">
          <p className="text-base md:text-lg 2xl:text-xl text-black">
            New Fixed Rate:
          </p>
        </div>

        {/* Right SIde */}
        <div className="w-full">
          <Counter launchDate={newRate} />
        </div>
      </div>
    </div>
  );
};

export default Card;
