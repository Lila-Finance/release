const BannerBottom = () => {
  return (
    <div className=" pb-20">
      {/* Wrapper Start */}
      <div className="w-full flex md:items-center justify-between md:flex-row flex-col gap-y-10">
        {/* left side */}
        <div>
        <a href="https://staging.lila.finance" className="bg-navButtonBg py-2 md:py-3 px-4 md:px-8 text-sm md:text-base xl:text-lg rounded hover:-translate-x-2 duration-300">
            <button>
                Check out our Staging Site!
            </button>
        </a>
        </div>

        {/* Right side */}
        <div>
          {/* header */}
          <div className="flex items-center gap-[91px] border-b border-b-black pb-1.5">
            <p className="text-base md:text-[17px] 2xl:text-lg">Deposit</p>
            <p className="text-base md:text-[17px] 2xl:text-lg opacity-50">
              Trade
            </p>
            <p className="text-base md:text-[17px] 2xl:text-lg">Earn</p>
          </div>

          {/* Content */}
          <div className="pt-1.5">
            <p className="text-base md:text-[17px] 2xl:text-lg">
              Enter a position with your preferred <br /> asset, maturity,
              protocol, and rate
            </p>
          </div>
        </div>
      </div>
      {/* Wrapper End */}
    </div>
  );
};

export default BannerBottom;
