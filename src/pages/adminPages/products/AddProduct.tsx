import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Variant {
  color: string;
  sizes: string[];
  images: File[];
}

const ProductAddPage: React.FC = () => {
  const [productName, setProductName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [sku, setSku] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [variants, setVariants] = useState<Variant[]>([
    {
      color: "",
      sizes: [],
      images: [],
    },
  ]);

  const handleAddVariant = () => {
    setVariants([...variants, { color: "", sizes: [], images: [] }]);
  };

  const handleRemoveVariant = (index: number) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };

  const handleAddSize = (index: number, size: string) => {
    const updatedVariants = [...variants];
    if (!updatedVariants[index].sizes.includes(size)) {
      updatedVariants[index].sizes.push(size);
    }
    setVariants(updatedVariants);
  };

  const handleRemoveSize = (index: number, size: string) => {
    const updatedVariants = [...variants];
    updatedVariants[index].sizes = updatedVariants[index].sizes.filter(
      (s) => s !== size
    );
    setVariants(updatedVariants);
  };

  const handleAddImages = (index: number, files: FileList | null) => {
    if (!files) return;
    const updatedVariants = [...variants];
    updatedVariants[index].images = [
      ...updatedVariants[index].images,
      ...Array.from(files),
    ];
    setVariants(updatedVariants);
  };

  return (
    <section>
      <div className="wrapper p-6">
        <div className="flex">
          <div className=" mb-6">
            <p className="text-gray-800 text-2xl font-bold">All Products</p>
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link to={"/Admin"}>Admin</Link>
                </li>
                <li>
                  <Link to={-1}>Products</Link>
                </li>
                <li>New</li>
              </ul>
            </div>
          </div>
          {/* <div className=" ms-auto flex">
            <Link to={"add"}>
              <button className="btn btn-primary">Add Product</button>
            </Link>
          </div> */}
        </div>
        <div className="mx-auto p-6">
          {/* Top Section with Product Details and Category */}
          <div className="flex justify-between items-start mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex-1 mr-4">
              <h2 className="text-xl font-semibold mb-4">Product Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    SKU Number
                  </label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              </div>
            </div>

            {/* Category Selection */}
            <div className="flex flex-col gap-3">
              <div className="bg-white p-6 rounded-lg shadow-md w-72">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Apparel">Apparel</option>
                  <option value="Home">Home</option>
                </select>
              </div>
              {/*sub category  */}
              <div className="bg-white p-6 rounded-lg shadow-md w-72">
                <label className="block text-sm font-medium text-gray-700">
                  Sub-Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Sub Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Apparel">Apparel</option>
                  <option value="Home">Home</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Variants Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Product Variants</h2>
            {variants.map((variant, index) => (
              <div key={index} className="mb-6 border-b pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Variant {index + 1}</h3>
                  <button
                    onClick={() => handleRemoveVariant(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Remove Variant
                  </button>
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Color
                  </label>
                  <input
                    type="text"
                    value={variant.color}
                    onChange={(e) => {
                      const updatedVariants = [...variants];
                      updatedVariants[index].color = e.target.value;
                      setVariants(updatedVariants);
                    }}
                    className="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Sizes */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Sizes
                  </label>
                  <div className="flex gap-2 mt-2">
                    {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`px-4 py-2 border rounded-lg ${
                          variant.sizes.includes(size)
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                        onClick={() =>
                          variant.sizes.includes(size)
                            ? handleRemoveSize(index, size)
                            : handleAddSize(index, size)
                        }
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Images */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Images
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleAddImages(index, e.target.files)}
                    className="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-4 mt-4">
                    {variant.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={URL.createObjectURL(image)}
                        alt={`Variant ${index} Image ${idx + 1}`}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={handleAddVariant}
              className="mt-4 px-6 py-2 btn btn-primary text-white rounded-lg transition"
            >
              Add Variant
            </button>
          </div>

          {/* Save Button */}
          <div className="mt-6">
            <button className="px-6 py-2 bg-neutral text-white rounded-lg transition">
              Save Product
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductAddPage;
