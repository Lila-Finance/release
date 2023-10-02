import React from "react";
import Card from "../Card";

const OpenPoolsTab = () => {
  return (
    <div className="w-full grid grid-cols-1 align-middle items-start md:grid-cols-2 lg:grid-cols-3 gap-10 2xl:gap-24">
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default OpenPoolsTab;
