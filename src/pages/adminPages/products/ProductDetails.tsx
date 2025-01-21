import React from "react";
import { Link, useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md">
        {/* bread */}
        <div className="flex">
          <div className=" mb-6">
            <p className="text-gray-800 text-2xl font-bold">Product Details</p>
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link to={"/Admin"}>Admin</Link>
                </li>
                <li>
                  <Link to={-1}>Products</Link>
                </li>
                <li>Details</li>
              </ul>
            </div>
          </div>
          <div className=" ms-auto flex">
            <Link to={"add"}>
              <button className="btn btn-primary">Add Product</button>
            </Link>
          </div>
        </div>
        {/* bread end */}

        <p>product details for {id}</p>
      </div>
    </>
  );
};

export default ProductDetails;
