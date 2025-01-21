import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { adminProduct } from "../../../querys/admin/adminQuery";

const AllProductsTable = () => {
  const { data, isError, error, isSuccess } = useQuery({
    queryKey: ["products"],
    queryFn: adminProduct,
    staleTime: 0,
  });
  const [products, setProducts] = useState(data?.data?.data || []);

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Toggle product selection
  const toggleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // Select or deselect all products
  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((product) => product?._id));
    }
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* bread */}
      <div className="flex">
        <div className=" mb-6">
          <p className="text-gray-800 text-2xl font-bold">All Products</p>
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link to={"/Admin"}>Admin</Link>
              </li>
              <li>
                <Link to={"/admin"}>Dashbroad</Link>
              </li>
              <li>Products</li>
            </ul>
          </div>
        </div>
        <div className=" ms-auto flex">
          <Link to={"add"}>
            <button className="btn btn-primary">Add Product</button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full rounded">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className=" px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === products?.length}
                  onChange={toggleSelectAll}
                  className="checkbox"
                />
              </th>
              <th className=" px-4 py-2 text-left">Product</th>
              <th className=" px-4 py-2 text-left">SKU</th>
              <th className=" px-4 py-2 text-left">Category</th>
              <th className=" px-4 py-2 text-left">Stock</th>
              <th className=" px-4 py-2 text-left">Price</th>
              <th className=" px-4 py-2 text-left">Status</th>
              <th className=" px-4 py-2 text-left">Added</th>
              <th className=" px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr key={product?._id} className="text-black text-lg">
                {/* Checkbox */}
                <td className=" px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product?._id)}
                    onChange={() => toggleSelectProduct(product?._id)}
                    className="checkbox"
                  />
                </td>

                {/* Product Name */}
                <td className=" px-4 py-2">{product?.name}</td>

                {/* SKU */}
                <td className=" px-4 py-2">{product?.sku}</td>

                {/* Category */}
                <td className=" px-4 py-2">
                  {product?.categoryDetails[0]?.categoryName}
                </td>

                {/* Stock */}
                <td className=" px-4 py-2">{product?.totalStock}</td>

                {/* Price */}
                <td className=" px-4 py-2">
                  ${product?.firstVariant?.sellPrice || 300}
                </td>

                {/* Status */}
                <td className=" px-4 py-2">
                  {product?.totalStock < 10 ? (
                    <span
                      className={`px-2 py-1 rounded text-sm ${"bg-red-100 text-red-800"}`}
                    >
                      Low Stock
                    </span>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded text-sm ${" bg-gray-400"}`}
                    >
                      normal
                    </span>
                  )}
                </td>

                {/* Added Date */}
                <td className=" px-4 py-2">
                  {new Date(product.createdAt).toLocaleDateString("en-GB")}
                </td>

                {/* Actions */}
                <td className=" px-4 py-2">
                  <div className="flex gap-1 ">
                    <Link
                      to={`${product?._id}`}
                      className="btn btn-sm btn-ghost rounded-full"
                    >
                      <IoEye />
                    </Link>
                    <button className="btn btn-sm btn-ghost rounded-full">
                      <MdModeEdit />
                    </button>
                    <button className="btn btn-sm btn-ghost rounded-full">
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProductsTable;
