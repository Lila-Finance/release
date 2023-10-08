import Card from "../components/Card";
import PositionCard from "../components/PositionCard";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";
import NoPoolsScreen from "../components/NoPoolsScreen";
import addresj from '../addresses/addresj.json';
import LilaPool from "../abi/LilaPool.json";
import LilaPosition from "../abi/LilaPosition.json";
import LilaAddressProvider from "../abi/LilaPoolAddressProvider.json";
import { useAccount, usePublicClient, useContractWrite, useContractEvent } from "wagmi";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import PortfolioSingleAsset from '../components/PortfolioSingleAsset';

const Portfolio = () => {
  // get all pool addresses
    const lilaposaddr = addresj.lilaposaddr;
    const addrprov = addresj.addrprov;
    const [positions, setPositionss] = useState(() => {
        const cachedPos = localStorage.getItem('positions');
        return cachedPos ? JSON.parse(cachedPos) : [];
    });

    const [selected_position, setselected_position] = useState(0);
    const publicClient = usePublicClient();
    const { address } = useAccount();
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
    const getPosition = async (i) => {
        const owner = await publicClient.readContract({
            address: lilaposaddr,
            abi: LilaPosition.abi,
            functionName: "ownerOf",
            args: [i],
            });
        if(owner != address){
            return []
        }
        const pool = await publicClient.readContract({
            address: lilaposaddr,
            abi: LilaPosition.abi,
            functionName: "lilaPool",
            args: [i],
            });
        
        const fixed = await publicClient.readContract({
            address: pool,
            abi: LilaPool.abi,
            functionName: "usersMap",
            args: [i],
            });

        const pool_info = await getPoolInfo(pool);
            
        const startDate = await publicClient.readContract({
            address: pool,
            abi: LilaPool.abi,
            functionName: "poolStartTime",
            args: [],
            });

        const exp = Number(startDate)+Number(pool_info[6])*24*60*60;
        var seconds = new Date().getTime() / 1000;
        // console.log("str:"+Number(startDate))
        // console.log("exp:"+exp)

        let exdate = new Date(exp * 1000);
        let edday = exdate.getUTCDate().toString().padStart(2, '0');  // padStart ensures it's always 2 digits
        let edmonth = (exdate.getUTCMonth() + 1).toString().padStart(2, '0');  // +1 because months are 0-indexed
        let edyear = exdate.getUTCFullYear();
        let edformattedDate = `${edmonth}-${edday}-${edyear}`;

        let sdate = new Date(Number(startDate) * 1000);
        let sday = sdate.getUTCDate().toString().padStart(2, '0');  // padStart ensures it's always 2 digits
        let smonth = (sdate.getUTCMonth() + 1).toString().padStart(2, '0');  // +1 because months are 0-indexed
        let syear = sdate.getUTCFullYear();
        let sformattedDate = `${smonth}-${sday}-${syear}`;

        return [pool, (startDate == 0) ? "Unfilled" : ((exp > seconds) ? "Active" : "Expired"), fixed[4] ? "Fixed" : "Variable", pool_info[1], ethers.formatEther(fixed[0]) + " Dai", (Number(fixed[2])*ethers.formatEther(fixed[0])*pool_info[5]/pool_info[3])+" Dai", Number(fixed[2]), Number(pool_info[6]), sformattedDate, edformattedDate, pool_info, i]

        
    };
    useEffect(() => {
        const getListOfPositions = async () => {
            const positionCount = await publicClient.readContract({
                address: lilaposaddr,
                abi: LilaPosition.abi,
                functionName: "totalSupply",
                args: [],
                });
            
            let poss = [];
            for(let i = 0; i < positionCount; i++){
                let po = await getPosition(i);
                if(po != []){
                    poss.push(po);
                }
            }
            setPositionss(poss);
            localStorage.setItem('positions', JSON.stringify(poss));
            // console.log(poss);
          };
    
          getListOfPositions();
      }, []);
    const {
    data: dataAllow,
    isLoading: isLoadingAllow,
    isSuccess: isSuccessAllow,
    write: withdraw,
    } = useContractWrite({
        address: positions[selected_position] ? positions[selected_position][0] : "0",
        abi: LilaPool.abi,
        functionName: "withdraw",
        args: [positions[selected_position] ? positions[selected_position][11] : 0],
    });

  return (
    <div>
      <div className="container mx-auto w-11/12 md:w-[85%] 3xl:w-[70%]">
        <Navbar />
        {/* <Filter 
            buttons={pool_buttons}
            currentTab={currentFilter}
            setCurrentTab={printFilter}
            key="tab-content-buttons"
        /> */}

        {/* Cards */}
            {positions && positions.length > 0 ? (
                    <PortfolioSingleAsset positions={positions} selected_position={selected_position} setselected_position={setselected_position} withdraw={withdraw}/>
            ) : (
                <NoPoolsScreen></NoPoolsScreen>
            )}

        
      </div>
    </div>
  );
};

export default Portfolio;
