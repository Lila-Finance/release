import React, { useState, useEffect } from "react";
import LineBreak from "./LineBreak";
import { motion } from "framer-motion";
import FixedEarnPayout from "./FixedEarnPayout";
import VariableEarnPayout from "./VariableEarnPayout";


const FixedEarningPopup = ({
  getBalance,
  approveDaiF,
  supplyDaiF,
  isLoadingAllow,
  setdaiManout,
  backToChooseScreen,
  pools,
  selected_pool
}) => {
  // earn fixed popup details data
  const cD = new Date(Date.now());
  const currentDate = `${cD.getMonth() + 1}-${cD.getDate()}-${cD.getFullYear()}`;
//   console.log(currentDate);
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
      content: pools[selected_pool][7],
    },
    {
      id: 4,
      key: "Date Deployed",
      content: currentDate,
    },
    {
      id: 5,
      key: "Fixed Rate",
      content: pools[selected_pool][1],
    },
  ];
//   console.log("isLoadingDeposit?:"+isLoadingDeposit);
//   const balance = await getBalance();
//   console.log(balance);

  const [balance, setBalance] = useState('Loading...');

  useEffect(() => {
    // Define an async function
    const fetchAndSetBalance = async () => {
      try {
        const fetchedBalance = await getBalance();
        setBalance(fetchedBalance);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
        setBalance("Error fetching balance");
      }
    };
    fetchAndSetBalance();
  }, []);

  const [daiAmount, setDaiAmount] = useState("0");
  const [approveDai, setApproveDai] = useState(true);
  const [supplyDai, setSupplyDai] = useState(false);
  const [supplyingDai, setSupplyingDai] = useState(false);
  const [check, setCheck] = useState(false);

  // approved dai function
  const daiApprove = () => {
    approveDaiF(pools[selected_pool][0], daiAmount);

    setApproveDai(false);
    // setSupplyDai(true);
    setCheck(true);
  };

  if(check){
    if(!isLoadingAllow){
        setSupplyDai(true);
        setCheck(false);
    }
  }
//   if(supplyingDai){
//     if(!isLoadingDeposit){
//         setSupplyingDai(false);
//     }
//   }

  const clickSupplyDai = async () => {
    setApproveDai(false);
    setSupplyDai(false);
    // 
    setSupplyingDai(true);
    const wentthrough = await supplyDaiF(pools[selected_pool][0], daiAmount, true);
    
    // setTimeout(() => {
    //   setEarnFixed(false);
    //   setSuccessfullyEarned(true);
    // }, 3000);
  };

  // set max dai amount
const maxAmount = async () => {
    setDaiAmount(Math.min(pools[selected_pool][3]-pools[selected_pool][2], Number(balance)));
    setdaiManout((Math.min(pools[selected_pool][3]-pools[selected_pool][2], Number(balance))).toString())
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
      animate={{ opacity: 1, scale: 0.9, x: "-50%", y: "-50%" }}
      exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-[80%] max-w-[1140px] lg:h-auto h-[75vh] overflow-y-auto lg:overflow-y-hidden bg-secondaryBG drop-shadow-buttonShadow rounded-[20px] fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 px-4 lg:px-10 pt-8 lg:pb-8 pb-8"
    >
      {/* Heading and back button */}
      <div className="w-full flex items-center justify-between md:flex-row flex-col gap-y-4">
        <h2 className="font-bold text-lg md:text-2xl lg:text-[27px] xl:text-2xl">
          Earn Fixed on Dai AAVE 1 Week
        </h2>

        <button
          className="text-base lg:text-xl bg-themeColor py-[6px] px-10 rounded-[15px] drop-shadow-buttonShadow hover:-translate-x-2 duration-200"
          onClick={backToChooseScreen}
        >
          Back
        </button>
      </div>

      {/* Content */}
      <div className="w-full flex items-start justify-between flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20 mt-8">
        {/* left Side */}
        <div className="w-full lg:w-7/12">
          {/* details tab start */}
          <div className="w-full mb-8">
            {/* Heading */}
            <div className="w-full">
              <h3 className="text-lg md:text-xl lg:text-[22px] xl:text-[26px] text-black font-extrabold mb-2">
                Details
              </h3>

              <LineBreak />
            </div>

            {/* details data */}
            <div className="w-full mt-4">
              {fixedPDD?.map((item) => {
                const { content, id, key } = item;

                return (
                  <div
                    className="flex items-center justify-between mb-4"
                    key={id}
                  >
                    {/* Left Side */}
                    <div className="w-full pl-3">
                      <p className="text-lg lg:text-xl font-semibold">{key}</p>
                    </div>

                    {/* Right Side */}
                    <div className="w-full text-center">
                      <p className="text-lg lg:text-xl font-normal">
                        {content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* details tab end */}

          {/* Value History tab start */}
          
          {/* Value History tab end */}
        </div>

        {/* right Side */}
        <div
          className={`w-full lg:w-5/12 px-4 lg:px-10 py-7 rounded-[15px] bg-white ${
            supplyDai === true ? "drop-shadow-buttonShadow" : "shadow-md"
          }`}
        >
          {/* heading */}
          <div className="text-center">
            <h1 className="text-lg md:text-xl lg:text-[22px] xl:text-[26px] text-black font-extrabold">
              Deposit as Fixed
            </h1>
          </div>

          {/* Description */}
          <div className="mt-6">
            {/* Available to Deposit: */}
            <div className="w-full">
              <p className="text-base lg:text-lg">Available to Deposit:</p>
              <p className="text-lg lg:text-2xl font-semibold">{balance} Dai</p>
            </div>

            {/* Max Single Deposit: */}
            <div className="w-full mt-2">
              <p className="text-base lg:text-lg">Max Single Deposit:</p>
              <p className="text-lg lg:text-2xl font-semibold">{pools[selected_pool][3]-pools[selected_pool][2]}</p>
            </div>
          </div>

          {/* Die Amount */}
          <div className="w-full border-2 border-themeColor rounded-[15px] px-3 flex items-center justify-between mt-5 mb-7">
            {/* left side */}
            <div className="w-8/12 flex flex-col">
              <label htmlFor="amount" className="text-[11px] text-labelColor">
                Dai Amount
              </label>
              <input
                type="number"
                id="amount"
                value={daiAmount}
                onChange={(e) => {setDaiAmount(e.target.value); setdaiManout((e.target.value).toString());}}
                className="text-lg lg:text-xl w-full outline-none border-none"
              />
            </div>

            {/* right side */}
            <div className="w-4/12 text-end">
              <button
                onClick={maxAmount}
                className="bg-transparent border border-themeColor outline-none px-7 py-[2px] text-sm rounded-full hover:bg-themeColor duration-200"
              >
                Max
              </button>
            </div>
          </div>

          {/* Payouts */}
          <div className="w-full">
            {/* heading */}
            {/* <div>
              <h2 className="text-lg lg:text-2xl font-semibold">Payouts</h2>
            </div> */}

            {/* fixed earn Procedour */}
            {/* <FixedEarnPayout /> */}

            {/* Others */}
            <div className="mt-6">
              {/* Amount 1 */}
              <div className="flex items-center justify-between">
                {/* Left side */}
                <div className="w-full">
                  <p className="text-base lg:text-lg text-black">
                    Total Fixed Income:
                  </p>
                </div>
                {/* Right side */}
                <div className="w-full text-end">
                  <p className="text-base lg:text-lg text-black font-semibold">
                    {Number(daiAmount) * parseFloat(pools[selected_pool][1].replace('%', ''))/100} Dai
                  </p>
                </div>
              </div>

              {/* Amount 2 */}
              <div className="flex items-center justify-between mt-2">
                {/* Left side */}
                <div className="w-full">
                  <p className="text-base lg:text-lg text-black">
                    Fixed Payments:
                  </p>
                </div>
                {/* Right side */}
                <div className="w-full text-end">
                  <p className="text-base lg:text-lg text-black font-semibold">
                    {pools[selected_pool][6]+" Days"}
                  </p>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="mt-6 text-center">
              <p className="text-xs md:text-sm">
                You will receive a tradable NFT position.
              </p>

              {approveDai === true ? (
                <button
                  className="w-full md:w-9/12 px-4 py-2 bg-themeColor rounded-[15px] text-base lg:text-lg mt-1 font-medium"
                  onClick={daiApprove}
                >
                  Approve DAI to continue
                </button>
              ) : null}
              
              {isLoadingAllow === true ? (
                <button className="w-full md:w-9/12 px-4 py-2 bg-buttonBG rounded-[15px] text-base lg:text-lg mt-1 font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    <p>Approving DAI</p>
                  </div>
                </button>
              ) : null}

              {supplyDai === true ? (
                <button
                  className="w-full md:w-9/12 px-4 py-2 bg-themeColor rounded-[15px] text-base lg:text-lg mt-1 font-medium"
                  onClick={clickSupplyDai}
                >
                  Supply DAI
                </button>
              ) : null}

              {supplyingDai === true ? (
                <button className="w-full md:w-9/12 px-4 py-2 bg-buttonBG rounded-[15px] text-base lg:text-lg mt-1 font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    <p>Supplying DAI</p>
                  </div>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FixedEarningPopup;
