import { useRelativeProducts } from "../../querys/product/productQuery";
import { ProductCard } from "../component";

export function RealativeProducts({
  productId = "",
  title = "Relative Products",
}) {
  const { data: products } = useRelativeProducts(productId);

  return (
    <section>
      <div className="wrapper py-5 px-1 md:py-10 md:px-5">
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
        </div>
      </div>
    </section>
  );
}

export default RealativeProducts;
