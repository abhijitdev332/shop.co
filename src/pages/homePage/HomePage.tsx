import React from "react";
import {
  Category,
  Hero,
  ProductList,
  ReviewCard,
} from "../../components/component";
import { useSelector } from "react-redux";

const HomePage = () => {
  const products = useSelector((state) => state.product);
  return (
    <section>
      <div className="lg:container mx-auto">
        <Hero />
        <div className="bg-white">
          <ProductList
            heading="NEW ARRIVALS"
            products={products?.arivalsProducts}
            viewLink="/product/slug?query=arrival"
          />
          <div className="divider w-full"></div>
          <ProductList
            heading="TOP SELLING"
            products={products?.topProducts}
            viewLink="/product/slug?query=top"
          />
          {/* browse by category */}
          <Category />
          {/* customers review */}
          <ReviewSection />
          {/* newsletter section */}
        </div>
      </div>
    </section>
  );
};
function ReviewSection() {
  let reviews = [
    {
      id: 1,
      star: 4,
      customer: "sarah M.",
      verified: true,
      text: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, veritatis qui obcaecati vero corrupti alias. Ipsum itaque quaerat autem quidem fuga natus provident similique tempora, dolor ducimus minima sapiente ipsam!",
    },
    {
      id: 2,
      star: 3.5,
      customer: "alex M.",
      verified: true,
      text: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, veritatis qui obcaecati vero corrupti alias. Ipsum itaque quaerat autem quidem fuga natus provident similique tempora, dolor ducimus minima sapiente ipsam!",
    },
    {
      id: 3,
      star: 4.5,
      customer: "john d.",
      verified: false,
      text: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, veritatis qui obcaecati vero corrupti alias. Ipsum itaque quaerat autem quidem fuga natus provident similique tempora, dolor ducimus minima sapiente ipsam!",
    },
  ];
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
            {reviews.map((rev) => (
              <ReviewCard
                stats={rev.star}
                customerName={rev.customer}
                verified={rev.verified}
                reviewText={rev.text}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
