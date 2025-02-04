import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { LoaderBtn } from "../../../components/component";
import { userSchema } from "./userSchema";
import { CreateUserMutaion } from "../../../querys/user/userQuery";

// Validation schema using Zod
type UserFormInputs = z.infer<typeof userSchema>;
const UserAddPage = () => {
  const newUserMutation = CreateUserMutaion();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserFormInputs>({
    resolver: zodResolver(userSchema),
  });

  const profileImage = watch("profileImage");

  // Update image preview when a file is selected
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImagePreview(URL.createObjectURL(files[0]));
      setValue("profileImage", files[0]); // Update form value for profileImage
    }
  };
  const onSubmit = (data: UserFormInputs) => {
    let spread = structuredClone(data);
    delete spread.profileImage;
    let formData = new FormData();
    formData.append("image", profileImage);
    formData.append("data", JSON.stringify(spread));
    newUserMutation.mutate(formData);
  };
  useEffect(() => {
    if (newUserMutation.isSuccess) {
      toast.success(newUserMutation.data?.message);
      queryClient.invalidateQueries("adminUsers");
      navigate(-1);
    }
  }, [newUserMutation.isSuccess]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex">
        <div className=" mb-6">
          <p className="text-gray-800 text-2xl font-bold">All Products</p>
          {/* breadcumbs */}
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link to={"/Admin"}>Admin</Link>
              </li>
              <li>
                <Link to={-1}>Users</Link>
              </li>
              <li>New User</li>
            </ul>
          </div>
          {/* end breadcrumbs */}
        </div>
      </div>
      {/* form fleids */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Left Card - Profile Image */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Profile Image</h3>
          <div className="w-48 h-48 border rounded-lg overflow-hidden flex items-center justify-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <label
                htmlFor="file"
                className="w-full h-full flex justify-center items-center"
              >
                <span className="text-gray-500">No Image Uploaded</span>
              </label>
            )}
          </div>
          <input
            id="file"
            type="file"
            accept="image/*"
            {...register("profileImage")}
            onChange={handleImageChange}
            className="mt-4 file-input file-input-bordered w-full max-w-sm bg-white"
          />
          {errors.profileImage && (
            <p className="text-red-500 text-sm mt-2">
              {errors.profileImage.message}
            </p>
          )}
        </div>

        {/* Right Card - User Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">User Details</h3>

          {/* Display Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Display Name
            </label>
            <input
              type="text"
              {...register("displayName")}
              placeholder="Enter display name"
              className={`mt-2 input input-bordered w-full  bg-transparent ${
                errors.displayName
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.displayName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.displayName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter email address"
              className={`mt-2 input input-bordered w-full  bg-transparent ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              {...register("phoneNumber")}
              placeholder="Enter phone number"
              className={`mt-2 input input-bordered w-full bg-transparent ${
                errors.phoneNumber
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-2">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              {...register("role")}
              className={`mt-2 select select-bordered w-full bg-transparent ${
                errors.role
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Moderator">Moderator</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-2">{errors.role.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter password"
              className={`mt-2 input input-bordered w-full bg-transparent ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <LoaderBtn
            pending={newUserMutation.isPending}
            style="mt-6 btn  btn-netural transition"
            type="submit"
          >
            Save User
          </LoaderBtn>
        </div>
      </form>
    </div>
  );
};

export default UserAddPage;
