import React, { useState, useEffect } from "react";
import { useContractReads, useContractRead, useContractWrite } from "wagmi";
import { parseEther, formatEther, formatUnits } from "viem";
import addresses from "../addresses/addresses.json";
import poolDeployerAbi from "../abi/PoolDeployer.json";
import poolAbi from "../abi/Pool.json";
import nftAbi from "../abi/FixedNFT.json";
import IERC20Abi from "../abi/IERC20.json";

const poolDeployerContract = {
  abi: poolDeployerAbi.abi,
  address: addresses.POOL_DEPLOYER_ADDRESS,
};

const Card = ({ homepage, poolAddress, NFTAddress, id, type, num }) => {
  const address = poolAddress;

  const { data: tokenAddress } = useContractRead({
    address,
    abi: poolAbi.abi,
    functionName: "tokenAddress",
  });

  const [token, setToken] = useState("");

  useEffect(() => {
    if (tokenAddress) {
      if (tokenAddress === addresses.DAI_ADDRESS) {
        setToken("DAI");
      } else if (tokenAddress === addresses.WBTC_ADDRESS) {
        setToken("WBTC");
      } else if (tokenAddress === addresses.WETH_ADDRESS) {
        setToken("WETH");
      }
    }
  }, [tokenAddress]);

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address,
        abi: poolAbi.abi,
        functionName: "fixedPoolLimit",
      },
      {
        address,
        abi: poolAbi.abi,
        functionName: "variablePoolLimit",
      },
      {
        address,
        abi: poolAbi.abi,
        functionName: "totalDepositedFixed",
      },
      {
        address,
        abi: poolAbi.abi,
        functionName: "totalDepositedVariable",
      },
      {
        address,
        abi: poolAbi.abi,
        functionName: "interests",
      },
      {
        address,
        abi: poolAbi.abi,
        functionName: "getInterestRate",
      },
      {
        address,
        abi: poolAbi.abi,
        functionName: "poolDeployTime"
      },
      {
        address,
        abi: poolAbi.abi,
        functionName: "poolStopped"
      },
      {
        address,
        abi: poolAbi.abi,
        functionName: "lockDuration",
      },
      {
        address,
        abi: poolAbi.abi,
        functionName: "timeSinceStart"
      },
    ],
  });

  const { data: nftData } = useContractRead({
    address: NFTAddress,
    abi: nftAbi.abi,
    functionName: "getDepositData",
    args: [id],
  });

  let tokenId = 2;

  //write contract for withdraw
  const { write: withdrawFixed } = useContractWrite({
    address: poolAddress,
    abi: poolAbi.abi,
    functionName: "withdrawFixed",
    args: [id],
  });

  const { write: withdrawVariable } = useContractWrite({
    address: poolAddress,
    abi: poolAbi.abi,
    functionName: "withdrawVariable",
    args: [id],
  });

  console.log(nftData);

  const [fixed_rate, setFixedRate] = useState(0);
  const [fixed_limit, setFixedLimit] = useState(0);
  const [fixed_deposited, setFixedDeposited] = useState(0);
  const [var_rate, setVarRate] = useState(0);
  const [var_limit, setVarLimit] = useState(0);
  const [var_deposited, setVarDeposited] = useState(0);
  const [pool_time, setPoolTime] = useState(0);
  const [pool_status, setPoolStatus] = useState(0);
  const [lock_duration, setLockDuration] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [start_time, setRunTime] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  function formatTime(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
  }

  // const [varInterest, setInterest] = useState(0);
  useEffect(() => {
    if (data === undefined) {
      setFixedRate(0);
      setFixedLimit(0);
      setFixedDeposited(0);
      setVarRate(0);
      setVarLimit(0);
      setVarDeposited(0);
      setPoolTime(0);
      setPoolStatus(false); 
      setLockDuration(0);
      setRunTime(0);
      setInterest(0);
    } else {
      setFixedRate((+formatEther(data[4].result[0])).toFixed(2));
      setFixedLimit((+formatEther(data[0].result)).toFixed(2));
      setFixedDeposited((+formatEther(data[2].result)).toFixed(2));
      setVarRate((+formatUnits(data[5].result, 25)).toFixed(2));
      setVarLimit((+formatEther(data[1].result)).toFixed(2));
      setVarDeposited((+formatEther(data[3].result)).toFixed(2));
      setPoolTime(Number(data[9].result));
      setPoolStatus(data[7].result);
      setLockDuration((+formatEther(data[8].result)).toFixed(2));
      setRunTime(Number(data[9].result));
    }
  }, [data]);

  useEffect(() => {
    // Calculate the initial time remaining when the component mounts
    const initialTimeRemaining = pool_time - lock_duration;
    setTimeRemaining(initialTimeRemaining);

    // Update the time remaining every second
    const interval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => {
        // Decrease the time remaining by 1 second
        const updatedTimeRemaining = prevTimeRemaining - 1;

        // If the time remaining is less than or equal to 0, clear the interval
        if (updatedTimeRemaining <= 0) {
          clearInterval(interval);
        }
        return updatedTimeRemaining;
      });
    }, 1000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [lock_duration, pool_time]);

  const nft_amount = nftData != null ? formatEther(nftData.amount) : "null";
  //toggle pool info
  const [showPoolInfo, setShowPoolInfo] = useState(false);
  const togglePoolInfo = () => {
    setShowPoolInfo(!showPoolInfo);
  };

  const getExpiryDate = () => {
    let lock_duration = 2592000;
    const daysSinceStart = Math.floor(start_time / (60 * 60 * 24));
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - daysSinceStart);
    const lockDurationInDays = Math.floor( lock_duration / (60 * 60 * 24));
    const finalDate = new Date(startDate);
    finalDate.setDate(finalDate.getDate() + lockDurationInDays);

    const options = {  year: "numeric", month: "short", day: "numeric" };
    const formattedDate = finalDate.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  const renderTimeRemaining = () => {
    if (timeRemaining <= 0) {
      // Time remaining is negative or zero, show "Expiry" and the formatted date
      return (
        <>
          <div className="w-full text-start">Expiry</div>
          <div className="w-full text-end">
            <p className="text-[15px]">{getExpiryDate()}</p>
          </div>
        </>
      );
    } else {
      // Time remaining is positive, show the formatted time remaining
      return (
        <>
          <div className="w-full text-start">Time Until Maturity</div>
          <div className="w-full text-end">
            <p className="text-[15px]">{formatTime(timeRemaining)}</p>
          </div>
        </>
      );
    }
  };

  return (
    <div
      className={`${
        homepage === true ? "w-full lg:w-[60%] 3xl:w-7/12 home-card" : "w-full"
      } border border-themeColor card`}
    >
      {/* Title */}
      <div className="px-6 py-6 border-b border-b-themeColor text-center">
        <p className="text-base leading-none">
        {type.charAt(0).toUpperCase() + type.slice(1)} {token} {Math.round(Number(data[8].result) / 86400)} Days
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
            <p className="text-[15px]">{}</p>
          </div>
        </div>
        {/* Row 3 */}
        <div className="w-full flex justify-between items-center my-6">
          {/* left */}
          <div className="w-full text-start">Payout</div>

          {/* right */}
          <div className="w-full text-end">
            {console.log(pool_status)}
            <p className="text-[15px]">0 of 1</p>
          </div>
        </div>
     

        {/* Row 3 */}
        <div className="w-full flex justify-between items-center my-6">
          {renderTimeRemaining()}
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
                href={`https://sepolia.etherscan.io/nft/${NFTAddress}/${id}`}
              >
                {NFTAddress.slice(0, 10)}...
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
