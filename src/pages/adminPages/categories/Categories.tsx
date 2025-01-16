import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const Categories: React.FC = () => {
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Catagoru 1",
      sales: 243,
      stock: 235345,
      added: "2025-01-10",
    },
    {
      id: "1",
      name: "Catagoru 2",
      sales: 2500,
      stock: 2345,
      added: "2025-01-10",
    },
  ]);

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
      setSelectedProducts(products.map((product) => product.id));
    }
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex">
        <div className=" mb-6">
          <p className="text-gray-800 text-2xl font-bold">All Category</p>
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
                  checked={selectedProducts.length === products.length}
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
            {products.map((product) => (
              <tr key={product.id} className="text-black text-lg">
                {/* Checkbox */}
                <td className=" px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleSelectProduct(product.id)}
                    className="checkbox"
                  />
                </td>

                {/* Product Name */}
                <td className=" px-4 py-2">{product.name}</td>

                {/* SKU */}
                <td className=" px-4 py-2">{product.sales}</td>

                {/* Category */}
                <td className=" px-4 py-2">{product.stock}</td>

                {/* Stock */}
                <td className=" px-4 py-2">{product.added}</td>

                {/* Actions */}
                <td className=" px-4 py-2">
                  <div className="flex gap-1 ">
                    <button className="btn btn-sm btn-ghost rounded-full">
                      <IoEye />
                    </button>
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
