import { Category, Hero, List, ProductCard } from "../../components/component";
import { useSelector } from "react-redux";

const HomePage = () => {
  const products = useSelector((state) => state.product);
  return (
    <section>
      <div className="lg:container mx-auto">
        <Hero />
        <div className="bg-white">
          <List
            title="New Arrivals"
            exstyle="flex justify-center"
            data={products?.arivalsProducts}
            renderItem={(product) => <ProductCard product={product} />}
            viewLink="/product/slug?query=arrival"
          />

          <div className="divider w-full"></div>
          <List
            title="TOP SELLING"
            exstyle="flex justify-center"
            data={products?.topProducts}
            renderItem={(item) => <ProductCard product={item} />}
            viewLink="/product/slug?query=top"
          />
          {/* browse by category */}
          <Category />
          {/* customers review */}
          {/* <ReviewSection products={products?.topProducts} /> */}
          {/* newsletter section */}
        </div>
      </div>
    </section>
  );
};
function ReviewSection({ products = [] }) {
  return (
    <section>
      <div className="wrapper px-5 md:px-20 py-10">
        <div className="flex flex-col gap-7">
          <div className="flex py-7 gap-3 flex-col items-center">
            <h2 className="uppercase font-extrabold text-black  text-3xl">
              our happy customers
            </h2>
            {/* scroller */}
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            {/* {reviews.map((rev) => (
              <ReviewCard
                stats={rev.star}
                customerName={rev.customer}
                verified={rev.verified}
                reviewText={rev.text}
              />
            ))} */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
