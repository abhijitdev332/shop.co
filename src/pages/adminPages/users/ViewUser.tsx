import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ImageLetter } from "../../../utils/utils";
import { useGetUserById } from "../../../querys/user/userQuery";
import { LoaderBtn } from "../../../components/component";
const UserProfilePage = () => {
  const { id } = useParams();
  const { data: user } = useGetUserById(id);
  const options = ["USER", "ADMIN", "MODERATOR"];
  const [currentRole, setCurrentRole] = useState("");
  const handleUserUpdate = () => {
    console.log(currentRole);
  };
  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex">
          <div className=" mb-6">
            <p className="text-gray-800 text-2xl font-bold">All Products</p>
            {/* breadcrumbs */}
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link to={"/Admin"}>Admin</Link>
                </li>
                <li>
                  <Link to={-1}>Users</Link>
                </li>
                <li>ViewUser</li>
              </ul>
            </div>
          </div>
        </div>

        {/* main */}
        <div className="wrapper">
          <h2 className="text-2xl font-bold mb-6">User Profile</h2>

          <div className=" p-2">
            {/* Profile Image */}
            <div className="flex items-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border">
                {user?.imgUrl ? (
                  <img src={user?.imgUrl} />
                ) : (
                  <ImageLetter name={user?.username} />
                )}
              </div>
              <div className="ml-6">
                <h3 className="text-xl capitalize font-semibold text-gray-800">
                  Username:{user?.username}
                </h3>
                {user?.roles?.map((role) => (
                  <p className="text-white badge badge-primary">{role}</p>
                ))}
              </div>
            </div>

            {/* User Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Display Name
                </label>
                <p className="mt-1 text-gray-800 px-4 py-2 bg-gray-100 rounded-lg">
                  {user?.username}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="mt-1 text-gray-800 px-4 py-2 bg-gray-100 rounded-lg">
                  {user?.email}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <p className="mt-1 text-gray-800 px-4 py-2 bg-gray-100 rounded-lg">
                  {user?.phoneNumber}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  className="select select-bordered w-full bg-gray-700"
                  name=""
                  id=""
                  onChange={(e) => setCurrentRole(e.target.value)}
                >
                  {options?.map((opti) => (
                    <option
                      value={opti}
                      defaultChecked={opti == user?.roles?.[0]}
                    >
                      {opti}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-center py-5">
              <LoaderBtn handleClick={handleUserUpdate} style="text-white">
                Update
              </LoaderBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
