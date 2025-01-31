import { Footer, Header } from "../includes/includes";
import InitialData from "../initalData/InitialData";
import { Outlet } from "react-router-dom";
import { NewsLetter } from "../components/component";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import { LoaderScreen } from "../pages/page";

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
      <Suspense fallback={<LoaderScreen />}>
        <InitialData />
      </Suspense>
      <ToastContainer />
    </>
  );
};

export default Home;
