import { useEffect, useState } from "react";
import { Link, ScrollRestoration, useSearchParams } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import { List, ProductCard } from "../component";
import { useGetProductBySlug } from "../../querys/product/productQuery";

const ProductBySlug = () => {
  const [params] = useSearchParams();
  let query = params.get("query");
  let itemsPerPage = 5;
  const [currentpage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(5);
  const { data } = useGetProductBySlug(
    query,
    itemsPerPage * currentpage,
    itemsPerPage * (currentpage - 1)
  );
  let products = data?.products;
  let totalLength = data?.totalLength;

  useEffect(() => {
    if (totalLength) {
      setTotalPage(itemsPerPage / totalLength);
    }
  }, [totalLength]);
  return (
    <>
      <main>
        <ScrollRestoration />
        <div className="wrapper px-5 md:px-20">
          <div className="outline outline-1 outline-slate-300"></div>
          <div className="py-3">
            {/* breadcrumbs */}
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>Shop</li>
                <li className="capitalize">{query} </li>
              </ul>
            </div>

            {/* product map list */}
            <List
              data={products}
              title={`${query} Products`}
              renderItem={(item) => <ProductCard product={item} />}
            />

            <Pagination
              currentPage={currentpage}
              setPage={setCurrentPage}
              totalPage={totalPage}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductBySlug;
