import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, ScrollRestoration, useSearchParams } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import { getProductsByslug } from "../../querys/productQuery";
import { List, ProductCard, ProductList } from "../component";
import { current } from "@reduxjs/toolkit";

const ProductBySlug = () => {
  const [params] = useSearchParams();
  let query = params.get("query");
  let itemsPerPage = 5;
  const [currentpage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(5);
  const { data, isPending, error } = useQuery({
    queryKey: ["products", query, currentpage],
    queryFn: () =>
      getProductsByslug({
        query,
        limit: itemsPerPage * currentpage,
        skip: itemsPerPage * (currentpage - 1),
      }),
  });
  let products = data?.data?.data;

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
