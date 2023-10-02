import { useState, useEffect } from "react";


const PoolsAave = ({choosePopup, pools}) => {
  // first table data
  const firstTableHeading = [
    {
        id: 0,
        title: "Address",
    },
    {
      id: 1,
      title: "Fixed APY",
    },
    {
      id: 2,
      title: "Fixed Deposited",
    },
    {
      id: 4,
      title: "Variable Deposited",
    },
    {
      id: 6,
      title: "Payout Count",
    },
    {
      id: 7,
      title: "Duration",
    },
    {
        id: 8,
        title: "Number of Swaps",
    },
  ];

  return (
    <div className="w-full">
      {/* heading */}
      <h1 className="text-3xl lg:text-4xl 2xl:text-5xl mt-4">
        Single Asset Pools
      </h1>

      {/* content wrapper */}
      <div className="w-full flex items-center justify-between lg:flex-nowrap flex-wrap gap-12 2xl:gap-[70px] mt-14">
        {/* left side */}
        <div className="w-full h-[320px] overflow-y-auto border-2 border-themeColor py-4 px-2">
          {/* heaidng */}
          <div className="px-4">
            <h3 className="text-lg lg:text-xl font-bold">
              Aave Pools
            </h3>
          </div>

          {/* Table */}
          <div className="mt-3">
            <table className="w-full">
              <tbody>
                <tr className="w-full">
                  {firstTableHeading?.map((item, idx) => (
                    <td
                      key={item.id}
                      className={`text-base xl:text-lg font-medium  ${
                        idx === 0 ? "text-start pl-4" : "text-center"
                      }`}
                    >
                      {item.title}
                    </td>
                  ))}
                </tr>

                {pools?.map((pool, index) => (
                    <tr
                        onClick={() => choosePopup(index)}
                        key={pool.id}  // you might want to use a unique identifier from the pool object as the key
                        className="bg-white hover:drop-shadow-buttonShadow duration-200 cursor-pointer"
                    >

                    <td className="text-start py-3 pl-4">
                        <a target="_blank" href={`https://sepolia.etherscan.io/${pool[0]}`}>
                            {pool[0].slice(0, 10)}...
                            <i class="fa fa-external-link" aria-hidden="true"></i>
                        </a>
                    </td>
                    <td className="text-start py-3 pl-4">{pool[1]}</td>
                    <td className="text-center py-3 pl-4">{pool[2]+" Dai / "+pool[3]+" Dai"}</td>
                    <td className="text-center py-3 pl-4">{pool[4]+" Dai / "+ pool[5]+" Dai"}</td>
                    <td className="text-center py-3 pl-4">{pool[6]}</td>
                    <td className="text-center py-3 pl-4">{pool[7]+" Days"}</td>
                    <td className="text-center py-3 pl-4">{pool[8]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};

export default PoolsAave;
