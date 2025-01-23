import { ProductCard } from "../component";

export function RealativeProducts({
  products = [],
  title = "You might also like",
}) {
  return (
    <section>
      <div className="wrapper py-10 px-5">
        <div className="flex flex-col">
          <h2 className="font-extrabold py-10 text-center uppercase text-3xl">
            {title}
          </h2>
          {/* map the products */}
          <div className="flex gap-7 flex-wrap justify-center">
            {products?.map((ele) => (
              <ProductCard product={ele} />
            ))}
          </div>
          {/* <div className="flex justify-center py-7">
              <Link
                to={viewLink}
                className=" text-black px-7 btn btn-outline rounded-badge"
              >
                View All
              </Link>
            </div> */}
        </div>
      </div>
    </section>
  );
}

export default RealativeProducts;
