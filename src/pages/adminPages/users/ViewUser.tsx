import React from "react";

interface UserProfile {
  displayName: string;
  email: string;
  phoneNumber: string;
  role: string;
  profileImage: string; // URL of the profile image
}

const UserProfilePage: React.FC = () => {
  // Example user data (can be replaced with API data)
  const user: UserProfile = {
    displayName: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "1234567890",
    role: "User",
    profileImage: "https://via.placeholder.com/150", // Placeholder image
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Profile</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Profile Image */}
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
          <div className="ml-6">
            <h3 className="text-xl font-semibold text-gray-800">
              {user.displayName}
            </h3>
            <p className="text-gray-600">{user.role}</p>
          </div>
        </div>

        {/* User Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Display Name
            </label>
            <p className="mt-1 text-gray-800 px-4 py-2 bg-gray-100 rounded-lg">
              {user.displayName}
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
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
