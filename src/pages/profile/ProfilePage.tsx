import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  image: z.instanceof(File).optional(), // Optional image upload
});

type ProfileFormInputs = z.infer<typeof profileSchema>;
const userDetails = {
  name: "John Doe",
  email: "johndoe@example.com",
  image: "https://via.placeholder.com/150",
};
const imageUrl =
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Fetch user details
  // const { isLoading, isError } = useQuery("userDetails", async () => {
  //   const response = await PrivateAxios.get("/user/profile"); // Replace with your API endpoint
  //   return response.data;
  // });

  // Update user details mutation
  const updateProfileMutation = useMutation();
  // async (formData: FormData) => {
  //   const response = await PrivateAxios.put("/user/profile", formData, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });
  //   return response.data;
  // },
  // {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("userDetails"); // Refresh user details after update
  //   },
  // }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userDetails?.name,
      email: userDetails?.email,
    },
  });

  // Handle form submission
  const onSubmit = async (data: ProfileFormInputs) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }
    updateProfileMutation.mutate(formData);
  };

  // Handle image preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setValue("image", file);
    }
  };
  return (
    <section>
      <div className="wrapper md:px-20">
        <div className="py-3">
          {/* breadcrums */}
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/user"}>User</Link>
              </li>
              <li>Profile</li>
            </ul>
          </div>
          {/* profile  */}
          <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Your Profile
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Profile Image */}
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border">
                  <img
                    src={previewImage || imageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Profile Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                    onInput={handleImageChange}
                    {...register("image")}
                  />
                </div>
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className={`w-full bg-transparent mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-500 focus:ring-red-400"
                      : "focus:ring-blue-400"
                  }`}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className={`w-full bg-transparent mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-400"
                      : "focus:ring-blue-400"
                  }`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-2 btn btn-neutral transition duration-200"
                disabled={updateProfileMutation.isLoading}
              >
                {updateProfileMutation.isLoading
                  ? "Updating..."
                  : "Update Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
