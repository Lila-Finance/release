import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import PoolsAave from "../components/PoolsAave";
import BlackOverlay from "../components/popups/BlackOverlay";
import { AnimatePresence } from "framer-motion";
import ChooseMethod from "../components/popups/ChooseMethod";
import FixedEarningPopup from "../components/popups/FixedEarningPopup";
import DepositSuccessPopup from "../components/popups/DepositSuccessPopup";
import VariableEarningPopup from "../components/popups/VariableEarningPopup";
import DepositSuccessPopupV from "../components/popups/DepositSuccessPopupV";
import { useAccount, usePublicClient, useContractWrite, useContractEvent } from "wagmi";
import IERC20Abi from "../abi/IERC20.json";
import LilaAddressProvider from "../abi/LilaPoolAddressProvider.json";
import LilaPool from "../abi/LilaPool.json";
import {ethers} from "ethers";
import addresj from "../addr/addresj.json" 

const Pools = () => {
  const addrprov = addresj.addrprov;
  const [pools, setPools] = useState([]);
  const [selected_pool, setselected_pool] = useState(0);
  const [allowing, setAllowing] = useState(false);
    // Get the max amount of this token
  
    const publicClient = usePublicClient();
    
    const { address } = useAccount();
    
    const getAddressBalance = async () => {

        if (publicClient) {
            let walletAddress = address;
    // 0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357
            const allowance = await publicClient.readContract({
                address: "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357",
                abi: IERC20Abi.abi,
                functionName: "balanceOf",
                args: [walletAddress],
            });
            const v = ethers.formatEther(allowance);
            return (v);
        }

        return null;
    };

    const [daiAmount, setDaiAmount] = useState("0");

    const getValue = useCallback(() => {
        // console.log("getting value" + Number(daiAmount));
        if (daiAmount == ""){
            return "0"
        }
        return daiAmount;
    }, [daiAmount]);

    const {
        data: dataAllow,
        isLoading: isLoadingAllow,
        isSuccess: isSuccessAllow,
        write: allow,
    } = useContractWrite({
        address: "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357",
        abi: IERC20Abi.abi,
        functionName: "approve",
        args: [pools[selected_pool] ? pools[selected_pool][0] : "0", ethers.parseEther(getValue())],
    });
    const {
    data: dataVaraible,
    write: supplyVariable,
    isSuccess: isSuccessVaraible,
    isLoading: isLoadingDeposit
    } = useContractWrite({
    address: pools[selected_pool] ? pools[selected_pool][0] : "0",
    abi: LilaPool.abi,
    functionName: "deposit",
    args: [ethers.parseEther(getValue()), false],
    });

    const {
        data: dataFixed,
        write: supplyFixed,
        isSuccess: isSuccessFixed,
    } = useContractWrite({
        address: pools[selected_pool] ? pools[selected_pool][0] : "0",
        abi: LilaPool.abi,
        functionName: "deposit",
        args: [ethers.parseEther(getValue()), true],
    });

    const approveDai = async (addr, amount) => {
        setAllowing(true);
        // console.log(pools[selected_pool] ? pools[selected_pool][0] : "0");
        let walletAddress = address;
        if (publicClient) {
            const allowance = await publicClient.readContract({
            address: "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357",
            abi: IERC20Abi.abi,
            functionName: "allowance",
            args: [walletAddress, pools[selected_pool] ? pools[selected_pool][0] : "0"],
            });
            setDaiAmount((amount).toString());
            // console.log(allowance + " < " + ethers.parseEther((amount).toString()));
            if (allowance < ethers.parseEther((amount).toString())) {    
                // console.log("have to allow");
                // console.log("pool"+pools[selected_pool][0]);
                allow();
            }else{
                setAllowing(false);
            }
        } 
    };
    
    if(isSuccessAllow && allowing){
        const goat = async () => {
            let walletAddress = address;
            if (publicClient) {
                const allowance = await publicClient.readContract({
                    address: "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357",
                    abi: IERC20Abi.abi,
                    functionName: "allowance",
                    args: [walletAddress, pools[selected_pool] ? pools[selected_pool][0] : "0"],
                });
                if(allowance >= ethers.parseEther(daiAmount)){
                    setAllowing(false);
                }
            }
        }
    
        let iterationCount = 0;
    
        const intervalId = setInterval(() => {
            if (!allowing || iterationCount >= 18) {
                clearInterval(intervalId);  // Stop the interval
                return;
            }
    
            goat();
    
            iterationCount++;
        }, 10000);  // 10 seconds
    }    

    const supplyDai = async (addr, amount, fixed) => {
        // console.log("Supplying dai "+ addr +" am"+amount);
        if(fixed){
            supplyFixed();
        }else{
            supplyVariable();
        }

    };

    const getPoolInfo = async (addre) => {

        if (publicClient) {
            const fixedLimit = await publicClient.readContract({
                address: addre,
                abi: LilaPool.abi,
                functionName: "fixedLimit",
                args: [],
            });
            const fixedDepo = await publicClient.readContract({
                address: addre,
                abi: LilaPool.abi,
                functionName: "totalFixedDeposits",
                args: [],
            });
            const varLimit = await publicClient.readContract({
                address: addre,
                abi: LilaPool.abi,
                functionName: "variableLimit",
                args: [],
            });
            const varDepo = await publicClient.readContract({
                address: addre,
                abi: LilaPool.abi,
                functionName: "totalVariableDeposits",
                args: [],
            });
            const payouts = await publicClient.readContract({
                address: addre,
                abi: LilaPool.abi,
                functionName: "payoutCount",
                args: [],
            });
            const duration = await publicClient.readContract({
                address: addre,
                abi: LilaPool.abi,
                functionName: "timeLength",
                args: [],
            });
            const fixedLimitForm = ethers.formatEther(fixedLimit);
            const fixedDepoForm = ethers.formatEther(fixedDepo);
            const varLimitForm = ethers.formatEther(varLimit);
            const varDepoForm = ethers.formatEther(varDepo);

            return [addre, (varLimitForm*100/fixedLimitForm)+"%", fixedDepoForm, fixedLimitForm, varDepoForm, varLimitForm, Number(payouts), (Number(duration)/60/60/24), "15"]
        }

        return null;
    };

  useEffect(() => {
    // Define an async function
    const getListOfPools = async () => {
        const poolsCount = await publicClient.readContract({
            address: addrprov,
            abi: LilaAddressProvider.abi,
            functionName: "getOpenPools",
            args: [],
            });

            // console.log(poolsCount);
            let final_pools = [];
        for(let i = 0; i < poolsCount; i++){
            const ithpools = await publicClient.readContract({
                address: addrprov,
                abi: LilaAddressProvider.abi,
                functionName: "getPool",
                args: [i],
                });
            
            // console.log(ithpools);
            const pool = await getPoolInfo(ithpools);
            final_pools.push(pool)
            
        }
        setPools(final_pools);
      };

      getListOfPools();
  }, []);

  // Choose Earn Popup state
  const [earnChoose, setEarnChoose] = useState(false);

  // show choose popup
  const showChoosePopup = (poolid) => {
    setselected_pool(poolid);
    setEarnChoose(true);
  };

  const closeChoosePopup = () => {
    setEarnChoose(false);
  };

  // Earn fixed popup functionalities
  const [earnFixed, setEarnFixed] = useState(false);
  const [successfullyEarned, setSuccessfullyEarned] = useState(false);

  const showSwapPopup = () => {
    setEarnFixed(true);
    setEarnChoose(false);
  };

  const closeSwapPopup = () => {
    setEarnFixed(false);
    setSuccessfullyEarned(false);
  };

  const backToChooseScreen = () => {
    setEarnChoose(true);
    setEarnFixed(false);
    setVariableEarn(false);
  };

  // Variable Earn popup functionalities
  const [variableEarn, setVariableEarn] = useState(false);
  const [successfullyEarnedVariable, setSuccessfullyEarnedVariable] = useState(false);

  const showVariableEarn = () => {
    setEarnChoose(false);
    setVariableEarn(true);
  };

  const closeSwapPopupVariable = () => {
    setVariableEarn(false);
    setSuccessfullyEarnedVariable(false);
  };

  const backToChooseScreenVaribale = () => {
    setEarnChoose(true);
    setVariableEarn(false);
  };

  useContractEvent({
    address: pools[selected_pool] ? pools[selected_pool][0] : "0",
    abi: LilaPool.abi,
    eventName: 'Deposit',
    listener(log) {
      if(log[0].args['poolAddr'] == pools[selected_pool][0] && log[0].args['who'] == address){
            // console.log(log[0]);
            setEarnFixed(false);
            setVariableEarn(false);
            setSuccessfullyEarned(true);
      }
    },
 });

  return (
    <div>
      <div className="container mx-auto w-11/12 lg:w-[85%] 3xl:w-[70%]">
        <Navbar />
        
        <PoolsAave choosePopup={showChoosePopup} pools={pools}/>

        <AnimatePresence initial={false}>
          {/* Method Popup */}
          {earnChoose === true ? (
            <>
              <BlackOverlay close={closeChoosePopup} />
              <ChooseMethod
                showSwapPopup={showSwapPopup}
                showVariableEarn={showVariableEarn}
              />
            </>
          ) : null}

          {earnFixed === true ? (
            <>
              <BlackOverlay close={closeSwapPopup} />
              <FixedEarningPopup
                getBalance={getAddressBalance}
                approveDaiF={approveDai}
                supplyDaiF={supplyDai}
                isLoadingAllow={allowing}
                setdaiManout={setDaiAmount}
                setEarnFixed={setEarnFixed}
                setSuccessfullyEarned={setSuccessfullyEarned}
                backToChooseScreen={backToChooseScreen}
                pools={pools}
                selected_pool={selected_pool}
              />
            </>
          ) : null}

          {variableEarn === true ? (
            <>
              <BlackOverlay close={closeSwapPopupVariable} />
              <VariableEarningPopup
                    getBalance={getAddressBalance}
                    approveDaiF={approveDai}
                    supplyDaiF={supplyDai}
                    isLoadingAllow={allowing}
                    setdaiManout={setDaiAmount}
                    backToChooseScreen={backToChooseScreen}
                    pools={pools}
                    selected_pool={selected_pool}                
              />
            </>
          ) : null}

          {successfullyEarned === true ? (
            <>
              <BlackOverlay close={closeSwapPopup} />
              <DepositSuccessPopup closeSwapPopup={closeSwapPopup} amount={getValue()}/>
            </>
          ) : null}

          {successfullyEarnedVariable === true ? (
            <>
              <BlackOverlay close={closeSwapPopupVariable} />
              <DepositSuccessPopupV close={closeSwapPopupVariable} />
            </>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Pools;
