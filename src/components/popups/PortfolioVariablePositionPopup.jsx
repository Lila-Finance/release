import React from "react";
import FixedEarnPayout from "./FixedEarnPayout";
import LineBreak from "./LineBreak";
import { motion } from "framer-motion";
import VariableEarnPayout from "./VariableEarnPayout";

const PortfolioVariablePositionPopup = ({ close }) => {
  // earn fixed popup details data
  const fixedPDD = [
    {
      id: 1,
      key: "Asset",
      content: "Dai",
    },
    {
      id: 2,
      key: "Protocol",
      content: "AAVE",
    },
    {
      id: 3,
      key: "Length",
      content: "1 Week",
    },
    {
      id: 4,
      key: "Date Deployed",
      content: "Sep 2",
    },
    {
      id: 5,
      key: "Fixed Rate",
      content: "2.5%",
    },
  ];

  // swap nft details
  const swapNFTDetails = [
    {
      id: 1,
      key: "Total Fixed Deposited:",
      content: "100 Dai",
    },
    {
      id: 2,
      key: "Total Variable Deposited:",
      content: "2.5 Dai",
    },
    {
      id: 3,
      key: "Fixed Rate:",
      content: "2.5%",
    },
    {
      id: 4,
      key: "True Variable Rate:",
      content: "2.43%",
    },
    {
      id: 5,
      key: "Deposit Week APY:",
      content: "2.63%",
    },
    {
      id: 6,
      key: "Total Fixed Gas Fees:",
      content: "0.452 Dai",
    },
    {
      id: 7,
      key: "Total Variable Gas Fees:",
      content: "0.452 Dai",
    },
    {
      id: 8,
      key: "My Fixed Deposit:",
      content: "75 Dai",
    },
    {
      id: 9,
      key: "My Variable Deposit:",
      content: "0 Dai",
    },
    {
      id: 10,
      key: "My Fixed Gas Fees:",
      content: "0.374 Dai",
    },
    {
      id: 11,
      key: "My Variable Gas Fees:",
      content: "0 Dai",
    },
  ];

  // value history data
  const valueHistoryData = [
    {
      id: 1,
      key: "True APY:",
      value: "2.01%",
    },
    {
      id: 2,
      key: "Fixed Rate:",
      value: "2.51%",
    },
    {
      id: 3,
      key: "Net APY:",
      value: "-0.5%",
    },
    {
      id: 4,
      key: "Amplifier:",
      value: "40x",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, x: "-50%", y: "-50%" }}
      animate={{ opacity: 1, scale: 0.75, x: "-50%", y: "-50%" }}
      exit={{ opacity: 0, scale: 0.75, x: "-50%", y: "-50%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-[91%] max-w-[670px] h-[80vh] lg:h-auto overflow-y-auto bg-white drop-shadow-buttonShadow px-4 md:px-10 pt-8 pb-0 rounded-[20px] fixed lg:absolute lg:mt-[24vh] left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-50"
    >
      {/* Heading and back button */}
      <div className="w-full flex items-center justify-between md:flex-row flex-col gap-y-4">
        <h2 className="font-bold text-lg md:text-2xl lg:text-[27px] xl:text-2xl">
          Variable Position Info
        </h2>

        <button
          className="text-base lg:text-xl bg-themeColor py-[6px] px-10 rounded-[15px] drop-shadow-buttonShadow hover:-translate-x-2 duration-200"
          onClick={close}
        >
          Back
        </button>
      </div>

      {/* content */}
      <div className="w-full mt-4">
        <h3 className="text-lg md:text-xl xl:text-2xl text-black font-extrabold mb-1">
          Details
        </h3>

        <LineBreak />
      </div>

      {/* details data */}
      <div className="w-full mt-4">
        {fixedPDD?.map((item) => {
          const { content, id, key } = item;

          return (
            <div className="flex items-center justify-between mb-4" key={id}>
              {/* Left Side */}
              <div className="w-full pl-3">
                <p className="text-base lg:text-lg font-semibold">{key}</p>
              </div>

              {/* Right Side */}
              <div className="w-full text-center">
                <p className="text-base lg:text-lg font-normal">{content}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* content */}
      <div className="w-full mt-6">
        <h3 className="text-lg md:text-xl xl:text-2xl text-black font-extrabold mb-1">
          Value History
        </h3>

        <LineBreak />
      </div>

      {/* value history */}
      <div className="w-full flex items-center justify-between md:flex-row flex-col gap-6 gap-y-3 mt-4">
        {/* left side */}
        <div className="w-full md:w-8/12">
          <img src="./images/graph.svg" alt="" />
        </div>

        {/* right side */}
        <div className="w-full md:w-4/12">
          {valueHistoryData?.map((item) => {
            const { id, key, value } = item;

            return (
              <div
                key={id}
                className="flex items-center justify-between gap-4 mb-2"
              >
                {/* Left Side */}
                <div className="w-full">
                  <p className="text-base font-semibold">{key}</p>
                </div>

                {/* Right Side */}
                <div className="w-full text-end">
                  <p className="text-base font-normal">{value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* payout content */}
      <div className="w-full flex items-center justify-between gap-8 md:flex-nowrap flex-wrap mt-8">
        {/* left side */}
        <div className="w-full md:w-9/12">
          <VariableEarnPayout portfolio={true} />
        </div>

        {/* right side */}
        <div className="w-full md:w-3/12">
          <button className="w-6/12 mx-auto md:w-full text-base lg:text-lg bg-claimBtn py-[6px] px-2 rounded-full font-semibold">
            Claim
          </button>
        </div>
      </div>

      {/* Swap NFT content */}
      <div className="flex items-center justify-between mt-12">
        <h3 className="text-lg md:text-xl xl:text-2xl text-black font-extrabold mb-1">
          Lila Swap NFTs
        </h3>

        <img
          src="./images/swap-nft-address.svg"
          alt="nft-address"
          className="cursor-pointer"
        />
      </div>

      {/* Swap nft details */}
      <div className="w-full mt-3">
        <h3 className="text-lg md:text-xl text-black font-extrabold mb-2">
          Lila Swap Details
        </h3>

        <LineBreak />
      </div>

      {/* swap nft items */}
      <div className="w-full mt-4">
        {swapNFTDetails?.map((item) => {
          const { content, id, key } = item;

          return (
            <div className="flex items-center justify-between mb-4" key={id}>
              {/* Left Side */}
              <div className="w-full">
                <p className="text-base lg:text-lg font-semibold">{key}</p>
              </div>

              {/* Right Side */}
              <div className="w-full text-center">
                <p className="text-base lg:text-lg font-normal">{content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PortfolioVariablePositionPopup;
