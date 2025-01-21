import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { adminAllUser } from "../../../querys/admin/adminQuery";

const UsersTable: React.FC = () => {
  const { data, isError, isPending, error } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: adminAllUser,
    staleTime: 0,
  });
  const [users, setusers] = useState(data?.data?.data || []);

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Toggle product selection
  const toggleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // Select or deselect all products
  const toggleSelectAll = () => {
    if (selectedProducts.length === users?.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(users?.map((product) => product.id));
    }
  };

  const handleDelete = (id: string) => {
    setuse((prev) => prev.filter((product) => product.id !== id));
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
              <li>Users</li>
            </ul>
          </div>
        </div>
        <div className=" ms-auto flex">
          <Link to={"add"}>
            <button className="btn btn-primary">Add User</button>
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
                  checked={selectedProducts.length === users?.length}
                  onChange={toggleSelectAll}
                  className="checkbox"
                />
              </th>
              <th className=" px-4 py-2 text-left">UserName</th>
              <th className=" px-4 py-2 text-left">Access</th>
              <th className=" px-4 py-2 text-left">Date Added</th>
              <th className=" px-4 py-2 text-left">Status</th>
              <th className=" px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((eachUser) => (
              <tr key={eachUser.id} className="text-black text-lg">
                {/* Checkbox */}
                <td className=" px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(eachUser?._id)}
                    onChange={() => toggleSelectProduct(eachUser?._id)}
                    className="checkbox"
                  />
                </td>

                {/* Product Name */}
                <td className=" px-4 py-2">
                  <div className="inline-flex gap-2">
                    <Link to={eachUser?._id}>
                      <div className="avatar">
                        <div className="w-14 rounded-full">
                          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                      </div>
                    </Link>

                    <div className="inline-flex flex-col">
                      <p>{eachUser?.name}</p>
                      <span>{eachUser?.email}</span>
                    </div>
                  </div>
                </td>

                {/* SKU */}
                <td className=" px-4 py-2">
                  <div className="flex gap-2">
                    {eachUser?.roles?.map((role) => (
                      <span className="badge  badge-primary">{role}</span>
                    ))}
                  </div>
                </td>

                {/* Category */}
                <td className=" px-4 py-2">{eachUser?.status}</td>

                {/* Stock */}
                <td className=" px-4 py-2">{eachUser?.added}</td>

                {/* Price */}

                {/* Actions */}
                <td className=" px-4 py-2">
                  <div className="flex gap-1 ">
                    <button className="btn btn-sm btn-ghost rounded-full">
                      <IoEye />
                    </button>
                    {/* <button className="btn btn-sm btn-ghost rounded-full">
                      <MdModeEdit />
                    </button> */}
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

export default UsersTable;
