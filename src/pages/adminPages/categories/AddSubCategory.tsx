import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createSubCategory } from "../../../querys/categoryQuery";
import { toast } from "react-toastify";
import { LoaderBtn } from "../../../components/component";
import { useSelector } from "react-redux";

const AddSubCategory = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { category } = useSelector((store) => store.category);
  const [subCategoryName, setSubCategoryName] = useState<string>("");
  const [categoryId, setCategoryId] = useState("");
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
    mutationKey: ["subcategoryMutate"],
    mutationFn: (data) => createSubCategory(data),
    onSuccess(data) {
      setSubCategoryName("");
      setImage(null);
      setImagePreview("");
      toast.success(data?.data?.message);
      navigate(-1), queryClient.invalidateQueries(["AdminSubCategory"]);
      queryClient.invalidateQueries(["subCategory"]);
    },
  });

  const handleSubmit = () => {
    if (!subCategoryName || !image || !categoryId) {
      toast.info("Please fill all the fields and upload an image.");
      return;
    }
    let formData = new FormData();
    formData.append("image", image);
    formData.append("name", JSON.stringify(subCategoryName));
    formData.append("categoryId", JSON.stringify(categoryId));
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
          <p className="text-gray-800 text-2xl font-bold">Add Subcategory</p>
          {/* breadcrumbs */}
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link to={"/admin/dash"}>Admin</Link>
              </li>
              <li>
                <Link to={-1} state={true}>
                  Sub-Categories
                </Link>
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
          <h3 className="text-lg font-semibold mb-4">Sub Category Image</h3>
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
              Sub Category Name
            </label>
            <input
              type="text"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              placeholder="Enter Sub-category"
              className="mt-2 bg-transparent input input-bordered max-w-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={categoryId}
              className=" mt-2 bg-transparent select select-bordered"
              onChange={(e) => {
                setCategoryId(e.target.value);
              }}
            >
              <option value="" disabled defaultChecked>
                Please select a category
              </option>
              {category?.map((ele) => (
                <option key={ele?._id} value={ele?._id}>
                  {ele?.categoryName}
                </option>
              ))}
            </select>
          </div>
          <LoaderBtn
            pending={isPending}
            handleClick={handleSubmit}
            style={"mt-6 bg-gray-400 outline-0  rounded-lg transition"}
          >
            Save Sub Category
          </LoaderBtn>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategory;
