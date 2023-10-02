import React, { useState } from "react";
import DepositTooltip from "./DepositTooltip";

const FixedEarnPayout = ({ portfolio }) => {
  const [prefilTooltip, setPrefilTooltip] = useState(false);
  const [fixedTooltip, setFixedTooltip] = useState(false);
  const [principalTooltip, setPrincipalTooltip] = useState(false);

  return (
    <div className="w-full relative flex items-center justify-between mt-3 before:w-[92%] before:h-1 before:bg-themeColor before:absolute before:top-[14px] before:left-2">
      {/* Prefill */}
      <div
        className="text-center relative"
        onMouseLeave={() => setPrefilTooltip(false)}
      >
        <div
          className={`w-[30px] h-[30px] mx-auto border-[3px] ${
            portfolio === true ? "bg-themeColor" : "bg-white"
          } border-themeColor rounded-full relative z-30 cursor-pointer`}
          onMouseOver={() => setPrefilTooltip(true)}
        ></div>
        {portfolio === false ? (
          <p className="text-sm lg:text-base">Prefill</p>
        ) : null}

        {/* tooltip */}
        {prefilTooltip === true ? (
          <DepositTooltip texts="Cash out earned interest for the time spent waiting for your pool to fill." />
        ) : null}
      </div>

      {/* Fixed */}
      <div
        className="text-center relative"
        onMouseLeave={() => setFixedTooltip(false)}
      >
        <div
          className={`w-[30px] h-[30px] mx-auto border-[3px] ${
            portfolio === true ? "bg-themeColor" : "bg-white"
          } border-themeColor rounded-full relative z-30 cursor-pointer`}
          onMouseOver={() => setFixedTooltip(true)}
        ></div>
        {portfolio === false ? (
          <p className="text-sm lg:text-base">Fixed</p>
        ) : null}

        {/* Tooltip */}
        {fixedTooltip === true ? (
          <DepositTooltip texts="Once pool fills, claim your weekly fixed income for duration." />
        ) : null}
      </div>

      {/* Principal */}
      <div
        className="text-center relative"
        onMouseLeave={() => setPrincipalTooltip(false)}
      >
        <div
          className={`w-[30px] h-[30px] mx-auto border-[3px] ${
            portfolio === true ? "bg-themeColor" : "bg-white"
          } border-themeColor rounded-full relative z-30 cursor-pointer`}
          onMouseOver={() => setPrincipalTooltip(true)}
        ></div>
        {portfolio === false ? (
          <p className="text-sm lg:text-base">Principal</p>
        ) : null}

        {/* tooltip */}
        {principalTooltip === true ? (
          <DepositTooltip
            texts="Once pool fills, claim your weekly fixed income for duration."
            lastTooltip={true}
          />
        ) : null}
      </div>
    </div>
  );
};

export default FixedEarnPayout;
