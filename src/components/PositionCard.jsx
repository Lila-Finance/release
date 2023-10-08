import React, { useState, useEffect } from "react";
import { useContractReads, useContractRead, useContractWrite } from "wagmi";
import { parseEther, formatEther, formatUnits } from "viem";
import addresj from "../addresses/addresj.json"


const Card = ({ homepage, position }) => {
    console.log(position);
//   const address = poolAddress;
    const pool = position[10];
//   const { data: tokenAddress } = useContractRead({
//     address,
//     abi: poolAbi.abi,
//     functionName: "tokenAddress",
//   });

  const [token, setToken] = useState("");

//   useEffect(() => {
//     if (tokenAddress) {
//       if (tokenAddress === addresses.DAI_ADDRESS) {
//         setToken("DAI");
//       } else if (tokenAddress === addresses.WBTC_ADDRESS) {
//         setToken("WBTC");
//       } else if (tokenAddress === addresses.WETH_ADDRESS) {
//         setToken("WETH");
//       }
//     }
//   }, [tokenAddress]);

//   const { data, isError, isLoading } = useContractReads({
//     contracts: [
//       {
//         address,
//         abi: poolAbi.abi,
//         functionName: "fixedPoolLimit",
//       },
//       {
//         address,
//         abi: poolAbi.abi,
//         functionName: "variablePoolLimit",
//       },
//       {
//         address,
//         abi: poolAbi.abi,
//         functionName: "totalDepositedFixed",
//       },
//       {
//         address,
//         abi: poolAbi.abi,
//         functionName: "totalDepositedVariable",
//       },
//       {
//         address,
//         abi: poolAbi.abi,
//         functionName: "interests",
//       },
//       {
//         address,
//         abi: poolAbi.abi,
//         functionName: "getInterestRate",
//       },
//       {
//         address,
//         abi: poolAbi.abi,
//         functionName: "poolDeployTime"
//       },
//       {
//         address,
//         abi: poolAbi.abi,
//         functionName: "poolStopped"
//       },
//       {
//         address,
//         abi: poolAbi.abi,
//         functionName: "lockDuration",
//       },
//       {
//         address,
//         abi: poolAbi.abi,
//         functionName: "timeSinceStart"
//       },
//     ],
//   });

//   const { data: nftData } = useContractRead({
//     address: NFTAddress,
//     abi: nftAbi.abi,
//     functionName: "getDepositData",
//     args: [id],
//   });

//   let tokenId = 2;

//   //write contract for withdraw
//   const { write: withdrawFixed } = useContractWrite({
//     address: poolAddress,
//     abi: poolAbi.abi,
//     functionName: "withdrawFixed",
//     args: [id],
//   });

//   const { write: withdrawVariable } = useContractWrite({
//     address: poolAddress,
//     abi: poolAbi.abi,
//     functionName: "withdrawVariable",
//     args: [id],
//   });

//   console.log(nftData);


  const [pool_status, setPoolStatus] = useState(0);
  const [lock_duration, setLockDuration] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  let fixed_rate = 0;
  let fixed_limit = pool[3];
  let fixed_deposited = pool[2];
  let var_rate = pool[1];
  let var_limit = pool[5];
  let var_deposited = pool[4];
  let pool_time = 0;
  let pool_stopped = false;
  let start_time = 0;

  const nft_amount = position[4];
  //toggle pool info
  const [showPoolInfo, setShowPoolInfo] = useState(false);
  const togglePoolInfo = () => {
    setShowPoolInfo(!showPoolInfo);
  };

  let days = Math.round(Number(lock_duration) / 86400);

  return (
    <div
      className={`${
        homepage === true ? "w-full lg:w-[60%] 3xl:w-7/12 home-card" : "w-full"
      } border border-themeColor card`}
    >
      {/* Title */}
      <div className="px-6 py-6 border-b border-b-themeColor text-center">
        <p className="text-base leading-none">
        {"Aave"} {"DAI"} 7 Days
        </p>
      </div>
      {/* Toggle Categories */}
      <div
        className="px-6 py-[10px] flex items-center justify-between cursor-pointer"
        onClick={togglePoolInfo}
      >
        {/* left side */}
        <div>
          <p className="text-[15px]">Pool Information</p>
        </div>

        {/* right side */}
        <div>
          <i
            className={`fa-solid fa-caret-down text-2xl text-themeColor duration-300 ${
              showPoolInfo === true ? "rotate-180" : ""
            }`}
          ></i>
        </div>
      </div>
      {/* Pool Info */}
      <div
        className={`w-full px-6 border-b border-b-themeColor overflow-hidden duration-300 ${
          showPoolInfo === true
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
              <p className="text-[15px]">{fixed_rate}%</p>
            </div>

            {/* right */}
            <div className="w-full text-end">
              <p className="text-[15px]">{var_rate}%</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="w-full flex justify-between items-center my-6">
            {/* left */}
            <div className="w-full text-start">Limit</div>

            {/* middle */}
            <div className="w-full text-center">
              <p className="text-[15px]">{fixed_limit}</p>
            </div>

            {/* right */}
            <div className="w-full text-end">
              <p className="text-[15px]">{var_limit}</p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="w-full flex justify-between items-center my-6">
            {/* left */}
            <div className="w-full text-start">Deposits</div>

            {/* middle */}
            <div className="w-full text-center">
              <p className="text-[15px]">{fixed_deposited}</p>
            </div>

            {/* right */}
            <div className="w-full text-end">
              <p className="text-[15px]">{var_deposited}</p>
            </div>
          </div>
        </div>
      </div>

      {/* NFT address */}
      <div className="w-full px-6 border-b border-b-themeColor">
        {/* Row 1 */}
        <div className="w-full flex justify-between items-center my-6">
          {/* left */}
          <div className="w-full text-start">Amt. Deposited</div>

          {/* right */}
          <div className="w-full text-end">
            <p className="text-[15px]">{nft_amount}</p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="w-full flex justify-between items-center my-6">
          {/* left */}
          <div className="w-full text-start">Interest Earned</div>

          {/* right */}
          <div className="w-full text-end">
            <p className="text-[15px]">{position[5]}</p>
          </div>
        </div>
        {/* Row 3 */}
        <div className="w-full flex justify-between items-center my-6">
          {/* left */}
          <div className="w-full text-start">Payout</div>

          {/* right */}
          <div className="w-full text-end">
            <p className="text-[15px]">{position[6]} of {position[7]}</p>
          </div>
        </div>
     

        {/* Row 3 */}
        <div className="w-full flex justify-between items-center my-6">
          {/* {renderTimeRemaining()} */}
        </div>
        
      </div>

      {/* validate times */}

      <div className="w-full px-6 border-b border-b-themeColor">
        {/* Row 1 */}
        <div className="w-full flex justify-between items-center my-6">
          {/* left */}
          <div className="w-full text-start">View Position</div>

          {/* right */}
          <div className="w-full text-end">
            <p className="text-[15px]">
              <a
                target="_blank"
                href={`https://sepolia.etherscan.io/nft/${addresj.lilaposaddr}/${position[11]}`}
              >
                {addresj.lilaposaddr.slice(0, 10)}...
                <i class="fa fa-external-link" aria-hidden="true"></i>
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="w-full px-6 py-4 border-b">
        {/* button */}
        <div className="text-center">
          <button
            className={`${
              timeRemaining === 0 ? "bg-themeColor" : "bg-gray-300"
            } text-[15px] w-56 py-[5px] leading-none rounded-full outline-none border-none`}
            onClick={ () => {
              if (timeRemaining === 0 ) {
                if (type === "fixed") {
                  withdrawFixed();
                } else {
                  withdrawVariable();
                }
              }
            }}
          >
            Claim Interest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
