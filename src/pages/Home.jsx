import Banner from "../components/Banner";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="mb-10">
      <div className="container mx-auto w-11/12 md:w-[85%] 3xl:w-[70%]">
        <Navbar homepage={true} />
        <Banner />
      </div>
    </div>
  );
};

export default Home;
