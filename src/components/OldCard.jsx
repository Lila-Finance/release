import React, { useState } from "react";

const Card = ({ homepage }) => {
  // state for toggle categories
  const [showCategory, setShowCategory] = useState(false);

  // Show Supply
  const [showSupply, setShowSupply] = useState(false);

  // states for toggle button
  const [fixedAmount, setFixedAmount] = useState(true);
  const [variableAmount, setVariableAmount] = useState(false);

  // Toggle categories
  const toggleCategory = () => {
    setShowCategory(!showCategory);
  };

  // toggle supply area
  const toggleSupply = () => {
    setShowSupply(true);
  };

  // toggle state
  const selectFixedAmount = () => {
    setFixedAmount(true);
    setVariableAmount(false);
  };

  const selectVariableAmount = () => {
    setVariableAmount(true);
    setFixedAmount(false);
  };
  return (
    <div
      className={`${
        homepage === true ? "w-full lg:w-[60%] 3xl:w-7/12 home-card" : "w-full"
      } border border-themeColor card`}
    >
      {/* Title */}
      <div className="px-6 py-6 border-b border-b-themeColor text-center">
        <p className="text-base leading-none">Dai AAVE 7 Days</p>
      </div>

      {/* Toggle Categories */}
      {!homepage ? (
        <div
          className="px-6 py-[10px] flex items-center justify-between cursor-pointer"
          onClick={!homepage ? toggleCategory : null}
        >
          {/* left side */}
          <div>
            <p className="text-[15px]">Pool Information</p>
          </div>

          {/* right side */}
          <div>
            <i
              className={`fa-solid fa-caret-down text-2xl text-themeColor duration-300 ${
                showCategory === true ? "rotate-180" : ""
              }`}
            ></i>
          </div>
        </div>
      ) : null}

      {/* Categories */}

      <div
        className={`w-full px-6 border-b border-b-themeColor overflow-hidden duration-300 ${
          homepage ? "h-auto pt-4" : ""
        } ${
          showCategory === true
            ? "h-[209px] pt-4 border-t border-t-themeColor"
            : "h-0"
        }`}
      >
        {/* category heading */}
        <div className="w-full flex justify-between items-center">
          {/* left */}
          <div className="w-full">&nbsp;</div>

          {/* middle */}
          <div className="w-full text-center">
            <p className="text-[15px]">Fixed</p>
          </div>

          {/* right */}
          <div className="w-full text-end">
            <p className="text-[15px]">Variable</p>
          </div>
        </div>

        {/* Data rows */}
        <div>
          {/* Row 1 */}
          <div className="w-full flex justify-between items-center my-6">
            {/* left */}
            <div className="w-full text-start">APR</div>

            {/* middle */}
            <div className="w-full text-center">
              <p className="text-[15px]">2.50%</p>
            </div>

            {/* right */}
            <div className="w-full text-end">
              <p className="text-[15px]">3.00%</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="w-full flex justify-between items-center my-6">
            {/* left */}
            <div className="w-full text-start">Limit</div>

            {/* middle */}
            <div className="w-full text-center">
              <p className="text-[15px]">50,000</p>
            </div>

            {/* right */}
            <div className="w-full text-end">
              <p className="text-[15px]">1,250</p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="w-full flex justify-between items-center my-6">
            {/* left */}
            <div className="w-full text-start">Deposits</div>

            {/* middle */}
            <div className="w-full text-center">
              <p className="text-[15px]">xx,xxx</p>
            </div>

            {/* right */}
            <div className="w-full text-end">
              <p className="text-[15px]">x,xxx</p>
            </div>
          </div>
        </div>
      </div>

      {/* validate times */}
      <div className="w-full px-6 border-b border-b-themeColor">
        {/* Row 1 */}
        <div className="w-full flex justify-between items-center my-6">
          {/* left */}
          <div className="w-full text-start">Expired</div>

          {/* right */}
          <div className="w-full text-end">
            <p className="text-[15px]">Jan. 01, 2024 </p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="w-full flex justify-between items-center my-6">
          {/* left */}
          <div className="w-full text-start">Payout</div>

          {/* right */}
          <div className="w-full text-end">
            <p className="text-[15px]">X of Y</p>
          </div>
        </div>
      </div>

      {!showSupply && !homepage ? (
        <div className="w-full px-6 py-4 text-center">
          <button
            className={`text-[15px] rounded-full py-[2px] w-44 bg-themeColor`}
            onClick={toggleSupply}
          >
            Supply More
          </button>
        </div>
      ) : (
        ""
      )}

      {/* Input Area */}
      {showSupply === true ? (
        <div className="w-full px-6 py-4 border-b">
          {/* Buttons */}
          <div className="border border-themeColor w-max mx-auto rounded-full relative isolate">
            {/* Background Overlay */}
            <div
              className={`w-28 h-full absolute top-0 bg-themeColor rounded-full -z-10 duration-200 ${
                fixedAmount ? "left-0" : variableAmount ? "left-[50%]" : ""
              }`}
            ></div>

            <button
              className={`text-[15px] rounded-full py-[1px] w-28`}
              onClick={!homepage ? selectFixedAmount : undefined}
            >
              Fixed
            </button>
            <button
              className={`text-[15px] rounded-full py-[1px] w-28`}
              onClick={!homepage ? selectVariableAmount : undefined}
            >
              Variable
            </button>
          </div>

          {/* Amount Box */}
          <div className="w-full mx-auto border border-themeColor rounded-full py-[3px] px-4 flex items-center justify-between gap-2 my-4">
            <input
              type="number"
              placeholder="0000.00"
              className="outline-none border-none bg-transparent w-full text-sm font-light leading-none"
              disabled={homepage}
            />
            <span className="underline underline-offset-2 text-xs leading-none">
              Max
            </span>
          </div>

          {/* button */}
          <div className="text-center">
            <button className="bg-themeColor text-[15px] w-56 py-[5px] leading-none rounded-full outline-none border-none">
              Supply
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {homepage ? (
        <div className="w-full px-6 py-4 border-b">
          {/* Buttons */}
          <div className="border border-themeColor w-max mx-auto rounded-full relative isolate">
            {/* Background Overlay */}
            <div
              className={`w-28 h-full absolute top-0 bg-themeColor rounded-full -z-10 duration-200 ${
                fixedAmount ? "left-0" : variableAmount ? "left-[50%]" : ""
              }`}
            ></div>

            <button
              className={`text-[15px] rounded-full py-[1px] w-28`}
              onClick={!homepage ? selectFixedAmount : undefined}
            >
              Fixed
            </button>
            <button
              className={`text-[15px] rounded-full py-[1px] w-28`}
              onClick={!homepage ? selectVariableAmount : undefined}
            >
              Variable
            </button>
          </div>

          {/* Amount Box */}
          <div className="w-full mx-auto border border-themeColor rounded-full py-[3px] px-4 flex items-center justify-between gap-2 my-4">
            <input
              type="number"
              placeholder="0000.00"
              className="outline-none border-none bg-transparent w-full text-sm font-light leading-none"
              disabled={homepage}
            />
            <span className="underline underline-offset-2 text-xs leading-none">
              Max
            </span>
          </div>

          {/* button */}
          <div className="text-center">
            <button className="bg-themeColor text-[15px] w-56 py-[5px] leading-none rounded-full outline-none border-none">
              Supply
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Card;
