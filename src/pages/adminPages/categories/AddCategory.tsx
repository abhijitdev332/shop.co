import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageUpload = (file: File | null) => {
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!categoryName || !description || !image) {
      alert("Please fill all the fields and upload an image.");
      return;
    }

    // Simulate saving the category
    console.log({
      categoryName,
      description,
      image,
    });
    alert("Category added successfully!");
  };
  return (
    <div className="p-6">
      <div className="flex">
        <div className=" mb-6">
          <p className="text-gray-800 text-2xl font-bold">All Category</p>
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link to={"/Admin"}>Admin</Link>
              </li>
              <li>
                <Link to={-1}>Categories</Link>
              </li>
              <li>New</li>
            </ul>
          </div>
        </div>
        {/* <div className=" ms-auto flex">
          <Link to={"add"}>
            <button className="btn btn-primary">Add Category</button>
          </Link>
        </div> */}
      </div>
      {/* add ccata */}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {/* Left Card - Image Upload */}
        <div className="bg-white p-6  rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Category Image</h3>
          <div className="w-48 h-48 border rounded-lg overflow-hidden flex items-center justify-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Category Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-500">No Image Uploaded</span>
            )}
          </div>
          <input
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
              className="mt-2 px-4 bg-transparent py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
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
          </div>
          <button
            onClick={handleSubmit}
            className="mt-6 px-6 py-2  btn btn-neutral text-white rounded-lg transition"
          >
            Save Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
