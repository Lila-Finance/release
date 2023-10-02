import React, { useState } from "react";
import DepositTooltip from "./DepositTooltip";

const VariableEarnPayout = ({ portfolio }) => {
  const [prefilTooltip, setPrefilTooltip] = useState(false);
  const [principalTooltip, setPrincipalTooltip] = useState(false);
  return (
    <div
      className={`w-full relative flex items-center justify-between mt-3 ${
        portfolio === true ? "before:w-[93%]" : "before:w-[90%]"
      } before:h-1 before:bg-themeColor before:absolute before:top-[14px] before:left-2`}
    >
      {/* Prefill */}
      <div
        className="text-center relative"
        onMouseLeave={() => setPrefilTooltip(false)}
      >
        <div
          className={`w-[30px] h-[30px] mx-auto border-[3px] border-themeColor rounded-full ${
            portfolio === true ? "bg-themeColor" : "bg-white"
          } relative z-30 cursor-pointer`}
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

      {/* Amplified */}
      <div
        className="text-center relative"
        onMouseLeave={() => setPrincipalTooltip(false)}
      >
        <div
          className={`w-[30px] h-[30px] mx-auto border-[3px] border-themeColor rounded-full ${
            portfolio === true ? "bg-themeColor" : "bg-white"
          } relative z-30 cursor-pointer`}
          onMouseOver={() => setPrincipalTooltip(true)}
        ></div>
        {portfolio === false ? (
          <p className="text-sm lg:text-base">Amplified</p>
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

export default VariableEarnPayout;
