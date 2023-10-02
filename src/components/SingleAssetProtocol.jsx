import React from "react";
import Card from "./Card";

const SingleAssetProtocol = ({ showChoosePopup }) => {
  // catrgory data
  const headingCategory = [
    {
      id: 1,
      title: "overnight",
      amount: "3.21%",
    },
    {
      id: 2,
      title: "AAVE",
      amount: "3.21%",
    },
    {
      id: 3,
      title: "GMX",
      amount: "3.21%",
    },
  ];

  // Card Data
  const cardsData = [
    {
      id: 1,
      title: "Dai AAVEv3 1 Week",
      fixedRate: "2.50%",
      swaps: "15",
      fixedDai: "58.03",
      variableDai: "2.23",
      newRate: "2023-09-12 10:00:00",
    },
    {
      id: 2,
      title: "Dai AAVEv3 2 Week",
      fixedRate: "2.50%",
      swaps: "15",
      fixedDai: "58.03",
      variableDai: "2.23",
      newRate: "2023-09-16 10:00:00",
    },
    {
      id: 3,
      title: "Dai AAVEv3 3 Week",
      fixedRate: "2.59%",
      swaps: "17",
      fixedDai: "67.03",
      variableDai: "6.23",
      newRate: "2023-10-20 10:00:00",
    },
  ];

  return (
    <div className="mb-24">
      <div className="w-full mb-4">
        {/* heading */}
        <h1 className="text-3xl lg:text-4xl 2xl:text-5xl text-center mt-8">
          Single Asset Protocols
        </h1>

        {/* Filter categories */}
        <div className="w-full flex items-center justify-center flex-wrap gap-6 md:gap-10 lg:gap-16 mt-8">
          {headingCategory?.map((item) => {
            const { id, amount, title } = item;

            return (
              <button
                key={id}
                className="bg-white drop-shadow-buttonShadow py-2 px-6 rounded-full uppercase text-lg lg:text-xl xl:text-2xl flex items-center gap-4 hover:translate-y-2 duration-300"
              >
                <span>{title}</span>
                <span className="font-bold">{amount}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards */}
      <div className="mt-16  grid grid-cols-1 align-middle items-start md:grid-cols-2 lg:grid-cols-3 gap-10 2xl:gap-24">
        {cardsData?.map((item) => (
          <Card key={item.id} details={item} showPopup={showChoosePopup} />
        ))}
      </div>
    </div>
  );
};

export default SingleAssetProtocol;
