import { motion } from "framer-motion";

const ChooseMethod = ({ showSwapPopup, showVariableEarn }) => {
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
      animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
      exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-[90%] max-w-[510px] bg-secondaryBG md:p-10 p-6 rounded-[20px] drop-shadow-buttonShadow fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-40"
    >
      {/* image */}
      <div className="flex items-center justify-center">
        <img src="./images/swap.svg" alt="swap" />
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-lg lg:text-xl 2xl:text-2xl font-extrabold text-center">
          Earn through <br className="md:block hidden" />
          interest rate <br className="md:block hidden" /> swap.
        </h2>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between flex-col md:flex-row gap-y-7 gap-12 md:mt-12 mt-6 mb-4">
        {/* Left side */}
        <div className="w-full text-center">
          <button
            className="bg-themeColor w-full md:text-lg lg:text-xl p-3 font-bold rounded-full drop-shadow-buttonShadow mb-2 hover:translate-x-2 duration-200"
            onClick={showSwapPopup}
          >
            Earn Fixed
          </button>

          <p className="text-[11px]">
            Receive fixed payments <br className="md:block hidden" /> at
            guaranteed rate.
          </p>
        </div>
        {/* Left side */}
        <div className="w-full text-center">
          <button
            className="bg-themeColor w-full md:text-lg lg:text-xl p-3 font-bold rounded-full drop-shadow-buttonShadow mb-2 hover:-translate-x-2 duration-200"
            onClick={showVariableEarn}
          >
            Earn Variable
          </button>

          <p className="text-[11px]">
            Earn at an amplified rate <br className="md:block hidden" /> over
            the pool period.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChooseMethod;
