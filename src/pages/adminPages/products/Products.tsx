import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  status: string;
  added: string;
}

const AllProductsTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Product A",
      sku: "SKU001",
      category: "Electronics",
      stock: 50,
      price: 1200,
      status: "Active",
      added: "2025-01-10",
    },
    {
      id: "2",
      name: "Product B",
      sku: "SKU002",
      category: "Apparel",
      stock: 20,
      price: 800,
      status: "Inactive",
      added: "2025-01-12",
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
                  checked={selectedProducts.length === products.length}
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
                <td className=" px-4 py-2">{product.sku}</td>

                {/* Category */}
                <td className=" px-4 py-2">{product.category}</td>

                {/* Stock */}
                <td className=" px-4 py-2">{product.stock}</td>

                {/* Price */}
                <td className=" px-4 py-2">${product.price.toFixed(2)}</td>

                {/* Status */}
                <td className=" px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      product.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>

                {/* Added Date */}
                <td className=" px-4 py-2">
                  {new Date(product.added).toLocaleDateString()}
                </td>

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

export default AllProductsTable;
