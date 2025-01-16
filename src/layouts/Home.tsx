import { Footer, Header } from "../includes/includes";
import InitialData from "../initialData/InitialData";
import { Outlet } from "react-router-dom";
import { NewsLetter } from "../components/component";

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
      <InitialData />
    </>
  );
};

export default Home;
