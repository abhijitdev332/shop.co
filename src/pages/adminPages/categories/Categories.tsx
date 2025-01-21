import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { adminCategories } from "../../../querys/admin/adminQuery";

const Categories: React.FC = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["category"],
    queryFn: adminCategories,
    staleTime: 0,
  });
  const [catagories, setCatagories] = useState(data?.data?.data);

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Toggle product selection
  const toggleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // Select or deselect all products
  const toggleSelectAll = () => {
    if (selectedProducts.length === catagories.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(catagories.map((product) => product?._id));
    }
  };

  const handleDelete = (id: string) => {
    catagories((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex">
        <div className=" mb-6">
          <p className="text-gray-800 text-2xl font-bold">All Category</p>
          {/* bread cmubs */}
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link to={"/Admin"}>Admin</Link>
              </li>
              <li>
                <Link to={"/admin"}>Dashbroad</Link>
              </li>
              <li>Categories</li>
            </ul>
          </div>
        </div>
        {/* add button */}
        <div className=" ms-auto flex">
          <Link to={"add"}>
            <button className="btn btn-primary">Add Category</button>
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
                  checked={selectedProducts?.length === catagories?.length}
                  onChange={toggleSelectAll}
                  className="checkbox"
                />
              </th>
              <th className=" px-4 py-2 text-left">Category</th>
              <th className=" px-4 py-2 text-left">Sales</th>
              <th className=" px-4 py-2 text-left">Stock</th>
              <th className=" px-4 py-2 text-left">Added</th>
              <th className=" px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {catagories?.map((cata) => (
              <tr key={cata?._id} className="text-black text-lg">
                {/* Checkbox */}
                <td className=" px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedProducts?.includes(cata?._id)}
                    onChange={() => toggleSelectProduct(cata?._id)}
                    className="checkbox"
                  />
                </td>

                {/* Product Name */}
                <td className=" px-4 py-2">{cata?.categoryName}</td>

                {/* SKU */}
                <td className=" px-4 py-2">{cata?.totalSales}</td>

                {/* Category */}
                <td className=" px-4 py-2">{cata?.totalStock}</td>

                {/* Stock */}
                <td className=" px-4 py-2">{cata?.addedDate}</td>

                {/* Actions */}
                <td className=" px-4 py-2">
                  <div className="flex gap-1 ">
                    <Link
                      to={`${cata?._id}`}
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

export default Categories;
