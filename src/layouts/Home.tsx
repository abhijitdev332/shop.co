import { Footer, Header } from "../includes/includes";
import { Outlet } from "react-router-dom";
import { NewsLetter } from "../components/component";
import { ToastContainer } from "react-toastify";
import DataLoader from "../components/dataLoader/DataLoader";

const Home = () => {
  return (
    <>
      <section>
        <Header />
        <div className="lg:container mx-auto">
          <Outlet />
        </div>
        <div className="bg-white">
          <NewsLetter />
          <Footer />
        </div>
      </section>
      <DataLoader />
      <ToastContainer />
    </>
  );
};

export default Home;
