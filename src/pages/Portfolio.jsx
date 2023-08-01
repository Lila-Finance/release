import Card from "../components/Card";
import PositionCard from "../components/PositionCard";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";
import NoPoolsScreen from "../components/NoPoolsScreen";
import addresses from "../addresses/addresses.json";
import abi from "../abi/PoolDeployer.json";
import poolAbi from "../abi/Pool.json";
import fixedNFTAbi from "../abi/FixedNFT.json";
import variableNFTAbi from "../abi/VariableNFT.json";
import {
  useContractRead,
  useContractReads,
  useAccount,
  usePublicClient,
} from "wagmi";
import { useEffect, useState } from "react";

const Portfolio = () => {
  // get all pool addresses
  const { address } = useAccount();
  const { data: length } = useContractRead({
    address: addresses.POOL_DEPLOYER_ADDRESS,
    abi: abi.abi,
    functionName: "getPoolLength",
    args: [],
  });

  const { data: poolAddresses } = useContractReads({
    contracts: [...Array(parseInt(length ?? 0))].map((_, i) => ({
      address: addresses.POOL_DEPLOYER_ADDRESS,
      abi: abi.abi,
      functionName: "pools",
      args: [i],
    })),
  });

  const { data: fixedNftAddresses } = useContractReads({
    contracts: poolAddresses?.map((pool) => ({
      address: pool?.result,
      abi: poolAbi.abi,
      functionName: "fixedNFT",
    })),
  });

  const { data: variableNftAddresses } = useContractReads({
    contracts: poolAddresses?.map((pool) => ({
      address: pool?.result,
      abi: poolAbi.abi,
      functionName: "variableNFT",
    })),
  });

  const { data: fixedNftIds } = useContractReads({
    contracts: fixedNftAddresses?.map((fixedNFT) => ({
      address: fixedNFT?.result,
      abi: fixedNFTAbi.abi,
      functionName: "balanceOf",
      args: [address],
    })),
  });

  const { data: variableNftIds } = useContractReads({
    contracts: variableNftAddresses?.map((variableNFT) => ({
      address: variableNFT?.result,
      abi: variableNFTAbi.abi,
      functionName: "balanceOf",
      args: [address],
    })),
  });

  //public client
  const publicClient = usePublicClient();

  const [fixedNFTs, setFixedNFTs] = useState([]);
  const [variableNFTs, setVariableNFTs] = useState([]);

  useEffect(() => {
    async function run() {
      let fixedNFTotals = fixedNftAddresses.map((fixedNFT, i) => {
        return {
          poolAddress: poolAddresses[i]?.result,
          NFTAddress: fixedNFT?.result,
          total: Number(fixedNftIds[i]?.result),
        };
      });
      // flatten by result from fixedNftIds so id goes from 0 to total
      let fixedNFTs = [];
      console.log(fixedNFTotals);
      for (const fixedNFTotal of fixedNFTotals) {
        for (let i = 0; i < fixedNFTotal.total; i++) {
          const id = await publicClient?.readContract({
            address: fixedNFTotal.NFTAddress,
            abi: fixedNFTAbi.abi,
            functionName: "tokenOfOwnerByIndex",
            args: [address, i],
          });
          fixedNFTs.push({
            poolAddress: fixedNFTotal.poolAddress,
            NFTAddress: fixedNFTotal.NFTAddress,
            id,
          });
        }
      }
      console.log(fixedNFTs);
      setFixedNFTs(fixedNFTs);
    }
    if (fixedNftAddresses && fixedNftIds) {
      run();
    }
  }, [fixedNftAddresses, fixedNftIds]);

  useEffect(() => {
    async function run() {
      let variableNFTotals = variableNftAddresses.map((variableNFT, i) => {
        return {
          poolAddress: poolAddresses[i]?.result,
          NFTAddress: variableNFT?.result,
          total: Number(variableNftIds[i]?.result),
        };
      });
      // flatten by result from variableNftIds so id goes from 0 to total
      let variableNFTs = [];
      for (const variableNFTotal of variableNFTotals) {
        for (let i = 0; i < variableNFTotal.total; i++) {
          const id = await publicClient?.readContract({
            address: variableNFTotal.NFTAddress,
            abi: variableNFTAbi.abi,
            functionName: "tokenOfOwnerByIndex",
            args: [address, i],
          });
          variableNFTs.push({
            poolAddress: variableNFTotal.poolAddress,
            NFTAddress: variableNFTotal.NFTAddress,
            id,
          });
        }
      }
      setVariableNFTs(variableNFTs);
    }

    if (variableNftAddresses && variableNftIds) {
      run();
    }
  }, [variableNftAddresses, variableNftIds]);

  //toggle pool info
  const [pastPools, setShowPastPools] = useState(false);
  const togglePastPools = () => {
    setShowPastPools(!pastPools);
  };

  const pool_buttons = [
    {
      id: 1,
      title: "All",
    },
    {
      id: 2,
      title: "Unfilled Pools",
    },
    {
      id: 3,
      title: "Active Pools",
    },
    {
      id: 4,
      title: "Past Pools",
    },
  ];

  const [currentFilter, setCurrentFilter] = useState(0);

  const printFilter = (i) => {
    setCurrentFilter(i);
    console.log(currentFilter);
  };

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
        {fixedNFTs.length === 0 && variableNFTs.length === 0 ? (
            <NoPoolsScreen />
          ) : (
            <div className="mt-16 mb-[10vh] lg:mb-[15vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 2xl:gap-24">
              {fixedNFTs.map((fixedNFT) => (
                <PositionCard
                  key={fixedNFT.id} // Consider adding keys for list items for better performance
                  poolAddress={fixedNFT.poolAddress}
                  NFTAddress={fixedNFT.NFTAddress}
                  id={fixedNFT.id}
                  type="fixed"
                />
              ))}
              {variableNFTs.map((variableNFT) => (
                <PositionCard
                  key={variableNFT.id} // Consider adding keys for list items for better performance
                  poolAddress={variableNFT.poolAddress}
                  NFTAddress={variableNFT.NFTAddress}
                  id={variableNFT.id}
                  type="variable"
                />
              ))}
              </div>
          )
        }
        
      </div>
    </div>
  );
};

export default Portfolio;
