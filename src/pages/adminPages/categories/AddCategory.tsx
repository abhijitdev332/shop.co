import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createCategory } from "../../../querys/categoryQuery";
import { toast } from "react-toastify";
import { LoaderBtn } from "../../../components/component";

const AddCategory = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageUpload = (file: File | null) => {
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  // mutations
  const {
    mutate: categoryMutate,
    error,
    isPending,
  } = useMutation({
    mutationKey: ["categoryMutate"],
    mutationFn: (data) => createCategory(data),
    onSuccess() {
      setCategoryName("");
      setImage(null);
      setImagePreview("");
      navigate(-1), queryClient.invalidateQueries("AdminCategory");
    },
  });
  const handleSubmit = () => {
    if (!categoryName || !image) {
      toast.info("Please fill all the fields and upload an image.");
      return;
    }
    let formData = new FormData();
    formData.append("image", image);
    formData.append("name", JSON.stringify(categoryName));
    // Simulate saving the category
    categoryMutate(formData);
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.message);
    }
  }, [error]);
  return (
    <div className="p-6">
      <div className="flex">
        <div className=" mb-6">
          <p className="text-gray-800 text-2xl font-bold">Add Category</p>
          {/* breadcrumbs */}
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link to={"/admin/dash"}>Admin</Link>
              </li>
              <li>
                <Link to={-1}>Categories</Link>
              </li>
              <li>New</li>
            </ul>
          </div>
        </div>
      </div>

      {/* add ccata */}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {/* Left Card - Image Upload */}
        <div className="bg-white p-6  rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Category Image</h3>
          <div className="w-48 h-48 border rounded-lg overflow-hidden flex ">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Category Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <label
                htmlFor="file"
                className="w-full flex justify-center items-center"
              >
                <span className="text-gray-500">No Image Uploaded</span>
              </label>
            )}
          </div>
          <input
            id="file"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files?.[0] || null)}
            className="mt-4 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
        </div>

        {/* Right Card - Category Details */}
        <div className="bg-white p-6 md:col-span-2 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Category Details</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="mt-2  bg-transparent input input-bordered"
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter category description"
              className="mt-2 px-4 py-2 bg-transparent border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={6}
            />
          </div> */}
          <LoaderBtn
            pending={isPending}
            handleClick={handleSubmit}
            style={"mt-6 px-6 py-2  text-white rounded-lg transition"}
          >
            Save Category
          </LoaderBtn>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
