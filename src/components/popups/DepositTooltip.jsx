import React from "react";

const DepositTooltip = ({ texts, lastTooltip }) => {
  return (
    <div
      className={`w-[190px] bg-white border border-themeColor px-2 pt-2 pb-1 rounded-[7.5px] text-start absolute -bottom-5 ${
        lastTooltip === true ? "right-1/2" : "left-1/2"
      } z-50`}
    >
      <p className="text-xs">{texts}</p>
    </div>
  );
};

export default DepositTooltip;
