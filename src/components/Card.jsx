import React, { useEffect, useState } from "react";
import {
  useContractReads,
  useContractRead,
  useContractWrite,
  usePublicClient,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import { parseEther, formatEther, formatUnits } from "viem";
import addresses from "../addresses/addresses.json";
import poolDeployerAbi from "../abi/PoolDeployer.json";
import poolAbi from "../abi/Pool.json";
import IERC20Abi from "../abi/IERC20.json";
import { parse } from "postcss";

const poolDeployerContract = {
  abi: poolDeployerAbi.abi,
  address: addresses.POOL_DEPLOYER_ADDRESS,
};

const Card = ({ homepage, num, type }) => {
  if (homepage) {
    return (
      <div
        className={`${"w-full lg:w-[60%] 3xl:w-7/12 home-card"} border border-themeColor card`}
      >
        {/* Title */}
        <div className="px-6 py-6 border-b border-b-themeColor text-center">
          <p className="text-base leading-none">Dai AAVE 7 Days</p>
        </div>

        {/* Toggle Categories */}
        <div className="px-6 py-[10px] flex items-center justify-between cursor-pointer">
          {/* left side */}
          <div>
            <p className="text-[15px]">Pool Information</p>
          </div>

          {/* right side */}
          <div>
            <i
              className={`fa-solid fa-caret-down text-2xl text-themeColor duration-300`}
            ></i>
          </div>
        </div>

        {/* Categories */}
        <div
          className={`w-full px-6 border-b border-b-themeColor overflow-hidden duration-300 ${"h-auto pt-4"} ${"h-[209px] pt-4 border-t border-t-themeColor"}`}
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
        {/* Input Area */}
        <div className="w-full px-6 py-4 border-b">
          {/* Buttons */}
          <div className="border border-themeColor w-max mx-auto rounded-full">
            <button
              className={`text-[15px] rounded-full py-[1px] w-28 ${"bg-themeColor"}`}
            >
              Fixed
            </button>
            <button className={`text-[15px] rounded-full py-[1px] w-28`}>
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
      </div>
    );
  }
  // states for toggle button
  const [input, setInput] = useState("");
  const { data: address } = useContractRead({
    ...poolDeployerContract,
    functionName: "pools",
    args: [num],
  });

  const { data: tokenAddress } = useContractRead({
    address,
    abi: poolAbi.abi,
    functionName: "tokenAddress",
  });

  const [token, setToken] = useState("");
  const { address: walletAddress } = useAccount();

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

  const publicClient = usePublicClient();

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
        functionName: "lockDuration",
      },
      {
        address,
        abi: poolAbi.abi,
        functionName: "timeSinceStart"
      }

    ],
  });

  const {
    data: dataAllow,
    isLoading: isLoadingAllow,
    write: allow,
  } = useContractWrite({
    address: tokenAddress,
    abi: IERC20Abi.abi,
    functionName: "approve",
    args: [address, parseEther(input)],
  });

  const {
    data: dataFixed,
    write: supplyFixed,
    isSuccess: isSuccessFixed,
  } = useContractWrite({
    address: address,
    abi: poolAbi.abi,
    functionName: "depositFixed",
    args: [parseEther(input)],
  });

  const { data: dataVariable, write: supplyVariable } = useContractWrite({
    address: address,
    abi: poolAbi.abi,
    functionName: "depositVariable",
    args: [parseEther(input)],
  });

  const { isSuccess } = useWaitForTransaction(dataAllow);

  /*async const interest = poolContract.calculateInterest(
    depositData["amount"],
    rate,
    time
  );*/

  useEffect(() => {
    if (isSuccess) {
      if (fixedAmount) {
        supplyFixed();
        alert("Transaction successful");
      } else {
        supplyVariable();
      }
    }
  }, [isSuccess]);

  if (isSuccess) {
    alert("Transaction successful!");
    console.log(isSuccess);
  }

  const supply = async () => {
    if (publicClient) {
      const allowance = await publicClient.readContract({
        address: tokenAddress,
        abi: IERC20Abi.abi,
        functionName: "allowance",
        args: [walletAddress, address],
      });
      if (allowance < parseEther(input)) {
        
        allow();
      } else {
        if (fixedAmount) {
          supplyFixed();
        } else {
          supplyVariable();
        }
        alert("Transaction processing...");
      }
    } else {
      allow();
    }
  };

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [fixedAmount, setFixedAmount] = useState(true);
  const [variableAmount, setVariableAmount] = useState(false);

  let fixed_rate = 0;
  let fixed_limit = 0;
  let fixed_deposited = 0;
  let var_rate = 0;
  let var_limit = 0;
  let var_deposited = 0;
  let pool_time = 0;
  let pool_stopped = false;
  let start_time = 0;

  if (data === undefined) {
    fixed_rate = 0;
    fixed_limit = 0;
    fixed_deposited = 0;
    var_rate = 0;
    var_limit = 0;
    var_deposited = 0;
    pool_time = 0;
    pool_stopped = false;
    start_time = 0;
  } else {
    fixed_rate = (+formatEther(data[4].result[0])).toFixed(2);
    fixed_limit = (+formatEther(data[0].result)).toFixed(2);
    fixed_deposited = (+formatEther(data[2].result)).toFixed(2);
    var_rate = (+formatUnits(data[5].result, 25)).toFixed(2);
    var_limit = (+formatEther(data[1].result)).toFixed(2);
    var_deposited = (+formatEther(data[3].result)).toFixed(2);
    pool_time = Number(data[7].result);
    start_time = Number(data[8].result);
  }

  const daysSinceStart = Math.floor(start_time / (60 * 60 * 24));
  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - daysSinceStart);
  const lockDurationInDays = Math.floor(pool_time / (60 * 60 * 24));
  const finalDate = new Date(startDate);
  finalDate.setDate(finalDate.getDate() + lockDurationInDays);

    //weekday: "short",
  const options = {  year: "numeric", month: "short", day: "numeric" };
  const formattedDate = finalDate.toLocaleDateString("en-US", options);
  // toggle state
  const selectFixedAmount = () => {
    setFixedAmount(true);
    setVariableAmount(false);
  };

  const selectVariableAmount = () => {
    setVariableAmount(true);
    setFixedAmount(false);
  };

  //toggle pool info
  const [showPoolInfo, setShowPoolInfo] = useState(true);
  const togglePoolInfo = () => {
    setShowPoolInfo(!showPoolInfo);
  };

  return (
    <div className={`w-full border border-themeColor card`}>
      {/* Title */}
      <div className="px-6 py-6 border-b border-b-themeColor text-center">
        <p className="text-base leading-none">         
        {token} {Math.round(Number(pool_time) / 86400)} Days
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
        {/* Pool Info heading */}
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

      {/* validate times */}
      <div className="w-full px-6 border-b border-b-themeColor">
        {/* Row 1 */}
        <div className="w-full flex justify-between items-center my-6">
          {/* left */}
          <div className="w-full text-start">Expiry</div>

          {/* right */}
          <div className="w-full text-end">
            <p className="text-[15px]">{formattedDate}</p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="w-full flex justify-between items-center my-6">
          {/* left */}
          <div className="w-full text-start">Payout</div>

          {/* right */}
          <div className="w-full text-end">
            <p className="text-[15px]">0 of 1</p>
          </div>
        </div>
      </div>

      {/* Input Area */}
      {!(fixed_deposited == fixed_limit && var_deposited == var_limit) && (
      <div className="w-full px-6 py-4 border-b">
        {/* Buttons */}
        <div className="border border-themeColor w-max mx-auto rounded-full">
        {/* Buttons for Fixed and Variable */}
          <button
            className={`text-[15px] rounded-full py-[1px] w-28 ${
              fixedAmount === true && "bg-themeColor"
            }`}
            onClick={!homepage ? selectFixedAmount : undefined}
          >
            Fixed
          </button>
          <button
            className={`text-[15px] rounded-full py-[1px] w-28 ${
              variableAmount === true && "bg-themeColor"
            }`}
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
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="outline-none border-none bg-transparent w-full text-sm font-light leading-none"
            disabled={homepage}
          />
          <span
            className="underline underline-offset-2 text-xs leading-none"
            onClick={() => {
              if (fixedAmount) {
                setInput(formatEther(data[0].result - data[2].result).toString());
              } else {
                setInput(formatEther(data[1].result - data[3].result).toString());
              }
            }}
          >
            Max
          </span>
        </div>
        {/* Supply button */}
        <div className="text-center">
          <button
            onClick={supply}
            className="bg-themeColor text-[15px] w-56 py-[5px] leading-none rounded-full outline-none border-none"
          >
            Supply
          </button>
        </div>
      </div>
  )}
    </div>
  );
};

export default Card;
