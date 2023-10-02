import Pool from "../assets/pool.png";
import { NavLink } from "react-router-dom";

const EmptyTabContent = () => {
  return (
    <div className="w-full">
      {/* Image */}
      <div className="flex items-center justify-center">
        <img src={Pool} alt="pool-image" />
      </div>

      {/* texts */}
      <div className="mt-6 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold">
          Looks a bit empty... <br /> Go to{" "}
          {" "}
          to find Pools.
        </h2>
      </div>
    </div>
  );
};

export default EmptyTabContent;
