import { useState } from "react";
import BlackOverlay from "./popups/BlackOverlay";
import PortfolioFixedPositionPopup from "./popups/PortfolioFixedPositionPopup";
import { AnimatePresence } from "framer-motion";
import PortfolioVariablePositionPopup from "./popups/PortfolioVariablePositionPopup";

const PortfolioSingleAsset = ({positions, selected_position, setselected_position, withdraw}) => {
  // first table data
  const firstTableHeading = [
    {
      id: 0,
      title: "Pool Address",
    },
    {
      id: 1,
      title: "Pool Status",
    },
    {
      id: 2,
      title: "Type",
    },
    {
      id: 3,
      title: "Fixed APY",
    },
    {
      id: 4,
      title: "Supplied",
    },
    {
      id: 5,
      title: "Claimed",
    },
    {
      id: 6,
      title: "Claimed Payouts",
    },
    {
      id: 7,
      title: "Start Date",
    },
    {
      id: 8,
      title: "Expiration",
    },
  ];

  // first table datas

  // Toggle Popup
  const [showFixedPositionPopup, setShowFixedPositionPopup] = useState(false);
  const [showVariablePositionPopup, setShowVariablePositionPopup] = useState(false);

  const openPositionPopup = (index) => {
    setselected_position(index);
    setShowFixedPositionPopup(true);
  };

  const closePositionPopup = () => {
    setShowFixedPositionPopup(false);
  };

  return (
    <div className="w-full">
      {/* heading */}
      <h1 className="text-3xl lg:text-4xl 2xl:text-5xl mt-4">
        Single Asset Protocols
      </h1>

      {/* content wrapper */}
      <div className="w-full flex items-center justify-between lg:flex-nowrap flex-wrap gap-12 2xl:gap-[70px] mt-14">
        {/* left side */}
        <div className="w-full h-[320px] overflow-y-auto border-2 border-themeColor py-4 px-2">
          {/* heaidng */}
          <div className="px-4">
            <h3 className="text-lg lg:text-xl font-bold">
              Your Positions
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

                {positions?.map((pool, index) => (
                    <tr
                        onClick={() => openPositionPopup(index)}
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
                    <td className="text-center py-3 pl-4">{pool[2]}</td>
                    <td className="text-center py-3 pl-4">{pool[3]}</td>
                    <td className="text-center py-3 pl-4">{pool[4]}</td>
                    <td className="text-center py-3 pl-4">{pool[5]}</td>
                    <td className="text-center py-3 pl-4">{pool[6]+"/"+pool[7]}</td>
                    <td className="text-center py-3 pl-4">{pool[8]}</td>
                    <td className="text-center py-3 pl-4">{pool[9]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {showFixedPositionPopup === true ? (
          <>
            <BlackOverlay close={closePositionPopup} />
            <PortfolioFixedPositionPopup close={closePositionPopup} position={positions[selected_position]} withdraw={withdraw}/>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioSingleAsset;
