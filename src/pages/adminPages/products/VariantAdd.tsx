import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderBtn } from "../../../components/component";
import {
  CreateMutipleVariant,
  UploadImagesMutaion,
} from "../../../querys/variant/variantQuery";
import { getadminProductskey } from "../../../querys/admin/adminQuery";
import { getProductByIdKey } from "../../../querys/product/productQuery";

const VariantAddPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const variantMutation = CreateMutipleVariant();
  const uploadImageMutation = UploadImagesMutaion();
  const [variants, setVariants] = useState([
    {
      color: "",
      sizes: [],
      images: [],
      stock: 0,
      basePrice: 0,
      salePrice: 0,
    },
  ]);
  const handleAddVariant = () => {
    setVariants([
      ...variants,
      {
        color: "",
        sizes: [],
        images: [],
        stock: 0,
        basePrice: 0,
        salePrice: 0,
      },
    ]);
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
    if (files.length > 4) {
      return toast.info("You can only upload 4 image of a variant!!.");
    }
    const updatedVariants = [...variants];
    updatedVariants[index].images = [
      ...updatedVariants[index].images,
      ...Array.from(files),
    ];
    setVariants(updatedVariants);
  };
  //upload images foreach variant
  const mapAndUploadImages = async (images: FileList | null) => {
    if (images?.length <= 0) {
      return toast.error("Please upload atleast one image");
    }
    const formData = new FormData();
    // Append files to FormData
    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      // upload images through from data
      let resData = await uploadImageMutation.mutateAsync(formData);
      if (resData.status == 201) {
        return resData?.data?.data;
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };
  // api request to add variants
  const handleVariantAdd = async () => {
    try {
      // configured variant details
      const transformedVariants = [];
      // loop over variants
      for (let variant of variants) {
        let imageUrls = await mapAndUploadImages(variant?.images);
        variant.sizes.forEach((size) => {
          transformedVariants.push({
            productId: id, // Link the variant to the product
            color: variant.color,
            size,
            sellPrice: variant.salePrice,
            basePrice: variant.basePrice,
            stock: variant.stock,
            sku: `${state?.sku}-${variant.color}-${size}`,
            images: imageUrls?.map((img, index) => ({
              public_id: img.publicId || `image_${index}`, // Use `public_id` or a fallback
              url: img.url, // Uploaded image URL
            })),
          });
        });
      }

      let variationRes = await variantMutation.mutateAsync(transformedVariants);
      if (variationRes.status == 201) {
        toast.success("Product Created Successfully");
        queryClient.invalidateQueries(
          getadminProductskey,
          getProductByIdKey,
          id
        );
        navigate(-1);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section>
      <div className="wrapper p-6">
        <div className="flex">
          <div className=" mb-6">
            <p className="text-gray-800 text-2xl font-bold">Add Variants</p>
            {/* breadcrumbs */}
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link to={"/Admin"}>Admin</Link>
                </li>
                <li>
                  <Link to={-1}>Products</Link>
                </li>
                <li>Add Variant</li>
              </ul>
            </div>
            {/* bread end */}
          </div>
          {/* breadcumbs end */}
        </div>
        <div className="mx-auto p-6">
          {/* Top Section with Product Details and Category */}
          <div className="flex flex-col md:flex-row gap-3 justify-between items-start mb-4">
            <div className="bg-white w-full md:basis-2/3 p-6 rounded-lg shadow-md flex-1 mr-4">
              {/* Product Variants Section */}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Product Variants</h2>
                {variants.map((variant, index) => (
                  <div key={index} className="mb-6 border-b pb-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">
                        Variant {index + 1}
                      </h3>
                      {/* remove button */}
                      <button
                        onClick={() => handleRemoveVariant(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Remove Variant
                      </button>
                    </div>

                    {/* Color */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="">
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
                          className="mt-2 bg-transparent input input-bordered w-full max-w-sm"
                        />
                      </div>

                      <div className="">
                        <label className="block text-sm font-medium text-gray-700">
                          Stock
                        </label>
                        <input
                          type="text"
                          value={variant.stock}
                          onChange={(e) => {
                            const updatedVariants = [...variants];
                            if (isNaN(e.target.value)) {
                              return toast.info("Please enter valid number");
                            }
                            updatedVariants[index].stock = Number(
                              e.target.value
                            );
                            setVariants(updatedVariants);
                          }}
                          className="mt-2 bg-transparent input input-bordered w-full max-w-sm"
                        />
                      </div>
                    </div>
                    {/* color end */}
                    {/* pricess */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="">
                        <label className="block text-sm font-medium text-gray-700">
                          BasePrice
                        </label>
                        <input
                          type="text"
                          value={variant.basePrice}
                          onChange={(e) => {
                            const updatedVariants = [...variants];
                            if (isNaN(e.target.value)) {
                              return toast.info("Please enter valid number");
                            }
                            let price = Number(e.target.value);
                            updatedVariants[index].basePrice = price;
                            setVariants(updatedVariants);
                          }}
                          className="mt-2 bg-transparent input input-bordered w-full max-w-sm"
                        />
                      </div>

                      <div className="">
                        <label className="block text-sm font-medium text-gray-700">
                          SalePrice
                        </label>
                        <input
                          type="text"
                          value={variant.salePrice}
                          onChange={(e) => {
                            const updatedVariants = [...variants];
                            if (isNaN(e.target.value)) {
                              return toast.info("Please enter valid number");
                            }
                            let price = Number(e.target.value);
                            updatedVariants[index].salePrice = price;
                            setVariants(updatedVariants);
                          }}
                          className="mt-2 bg-transparent input input-bordered w-full max-w-sm"
                        />
                      </div>
                    </div>
                    {/* end pricess */}
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
                        className="mt-2 file-input file-input-bordered  bg-white w-full max-w-xs"
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
                {/* add variant */}
                <button
                  onClick={handleAddVariant}
                  className="mt-4 btn btn-neutral transition"
                >
                  Add Variant
                </button>
              </div>

              {/* Save Button */}
              <div className="mt-6">
                <LoaderBtn
                  pending={
                    variantMutation.isPending || uploadImageMutation.isPending
                  }
                  handleClick={handleVariantAdd}
                  style="text-white"
                >
                  Add Variant
                </LoaderBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VariantAddPage;
