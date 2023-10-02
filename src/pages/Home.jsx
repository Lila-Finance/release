import Banner from "../components/Banner";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="pb-10 min-h-screen relative" id="banner">
      <div className="container mx-auto w-11/12 lg:w-[85%] 3xl:w-[70%]">
        <Navbar homepage={true} />
        <Banner />
      </div>

      {/* Additional texts */}
      <div className="w-full absolute bottom-2 left-1/2 -translate-x-1/2">
        <p className="text-base md:text-lg lg:text-xl text-center">
          DeFi Guaranteed Fixed Income and Rate Swap markets
        </p>
      </div>
    </div>
  );
};

export default Home;
