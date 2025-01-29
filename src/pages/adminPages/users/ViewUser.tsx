import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../../../querys/userQuery";
import { ImageLetter } from "../../../utils/utils";

interface UserProfile {
  displayName: string;
  email: string;
  phoneNumber: string;
  role: string;
  profileImage: string; // URL of the profile image
}

const UserProfilePage = () => {
  const { id } = useParams();
  const { data, error } = useQuery({
    queryKey: ["adminviewUser", id],
    queryFn: () => getUser(id),
  });
  let user = { ...data?.data?.data } || {};
  // Example user data (can be replaced with API data)
  // const user: UserProfile = {
  //   displayName: "John Doe",
  //   email: "john.doe@example.com",
  //   phoneNumber: "1234567890",
  //   role: "User",
  //   profileImage: "https://via.placeholder.com/150", // Placeholder image
  // };
  console.log(user);
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
          {/* <div className=" ms-auto flex">
            <Link to={"add"}>
              <button className="btn btn-primary">Add User</button>
            </Link>
          </div> */}
        </div>

        {/* main */}
        <div className="wrapper">
          <h2 className="text-2xl font-bold mb-6">User Profile</h2>

          <div className=" p-2">
            {/* Profile Image */}
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border">
                {user?.imgUrl ? (
                  <img src={user?.imgUrl} />
                ) : (
                  <ImageLetter name={user?.username} />
                )}
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {user?.username}
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
                  {user.email}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <p className="mt-1 text-gray-800 px-4 py-2 bg-gray-100 rounded-lg">
                  {user.phoneNumber}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <p className="mt-1 text-gray-800 px-4 py-2 bg-gray-100 rounded-lg">
                  {user.roles?.[0]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
