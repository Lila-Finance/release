import React from "react";

const TabText = () => {
  return (
    <div className="py-16 text-center">
      <p className="md:text-lg lg:text-xl leading-[160%]">
        These are your positions in pools that have not been filled yet,{" "}
        <br className="md:block hidden" />
        if they expire before being filled up, your deposits are refunded
      </p>
    </div>
  );
};

export default TabText;
