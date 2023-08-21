import Card from "../components/Card";
import Navbar from "../components/Navbar";
import addresses from "../addresses/addresses.json";
import abi from "../abi/PoolDeployer.json";
import { useContractRead } from "wagmi";
import { useEffect } from "react";

const Market = () => {
  const { data } = useContractRead({
    address: addresses.POOL_DEPLOYER_ADDRESS,
    abi: abi.abi,
    functionName: "getPoolLength",
    args: [],
  });

//   console.log(data);

  return (
    <div>
      <div className="container mx-auto w-11/12 md:w-[85%] 3xl:w-[70%]">
        <Navbar />
        {/* <a href="https://sepoliafaucet.com/" target="_blank">Sepolia ETH Faucet</a>
        <br />
        <a href="https://staging.aave.com/faucet/" target="_blank">Token Faucets</a> */}
        {/* Cards */}
        <div className="mt-16 mb-[10vh] lg:mb-[20vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 2xl:gap-24">
          {parseInt(data) > 0 ? (
            Array(parseInt(data))
              .fill()
              .map((_, i) => <Card key={i} num={i} />)
          ) : (
            <div className="text-center text-2xl font-bold">
              No Pools available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Market;
