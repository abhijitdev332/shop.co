import { useState, useRef, useEffect } from "react";
import { BsTrashFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DetailsModal } from "./AddProduct";
import {
  getProductByIdKey,
  UpdateProductMutation,
  useGetProductById,
} from "../../../querys/product/productQuery";
import {
  DeleteVariantMutaion,
  UpdateVariantMutation,
} from "../../../querys/variant/variantQuery";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderBtn } from "../../../components/component";
import { getadminProductskey } from "../../../querys/admin/adminApi";

const ProductEdit = () => {
  const { id } = useParams();
  const { data: productData } = useGetProductById(id);
  const variantDeleteMutation = DeleteVariantMutaion();
  const productUpdateMutaion = UpdateProductMutation();
  const variantUpdateMutaion = UpdateVariantMutation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // lcoal state
  const [productDetails, setProductDetails] = useState({
    name: productData?.matchedProduct?.name || "",
    description: productData?.matchedProduct?.description || "",
    genderFor: productData?.matchedProduct?.genderFor || "",
    brand: productData?.matchedProduct?.brand || "",
    returnPolicy: productData?.matchedProduct?.returnPolicy || 10,
  });
  const [variants, setVariants] = useState(productData?.productVariants || []);
  const [productMoreData, setProductMoreData] = useState({});
  const modalRef = useRef(null);
  const [isPending, setIsPending] = useState(false);
  // Handle input changes for product details
  const handleProductChange = (e) => {
    setProductDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleVariantChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setVariants((prevVariants) => {
      const updatedVariants = [...prevVariants]; // Copy existing variants
      updatedVariants[index] = {
        ...updatedVariants[index], // Copy the specific variant
        [field]: value, // Update the field dynamically
      };
      return updatedVariants;
    });
  };
  const handleVariantImageChange = (index, event) => {
    // if (event.target.files && event.target.files[0]) {
    //   const imageUrl = URL.createObjectURL(event.target.files[0]);
    //   setProductDetails((prev) => {
    //     const updatedVariants = [...prev.variants];
    //     updatedVariants[index] = { ...updatedVariants[index], image: imageUrl };
    //     return { ...prev, variants: updatedVariants };
    //   });
    // }
  };
  const handleProductMoreData = (data) => {
    setProductMoreData(data);
  };
  const handleProductUpdate = () => {
    let variantDataformat = [];
    let productDataFormat = {
      ...productDetails,
      productDetails: { ...productMoreData },
    };
    for (const variant of variants) {
      variantDataformat.push({
        _id: variant?._id,
        sku: variant?.sku,
        data: {
          color: variant?.color,
          size: variant?.size,
          stock: variant?.stock,
          // discount: variant?.discount,
          basePrice: variant?.basePrice,
          sellPrice: variant?.sellPrice,
        },
      });
    }
    productUpdateMutaion.mutate({ id: id, data: { ...productDataFormat } });
    variantUpdateMutaion.mutate({ variants: variantDataformat });
  };
  const handleVariantDelete = (variantId) => {
    variantDeleteMutation.mutate(variantId);
  };
  // check for sucess and invalidate query
  useEffect(() => {
    if (variantDeleteMutation.isSuccess || productUpdateMutaion.isSuccess) {
      queryClient.invalidateQueries([
        getProductByIdKey,
        id,
        getadminProductskey,
      ]);
    }
  }, [variantDeleteMutation.isSuccess, productUpdateMutaion.isSuccess]);
  // if updated navigate
  useEffect(() => {
    if (productUpdateMutaion.isSuccess) {
      navigate(-1);
    }
  }, [productUpdateMutaion.isSuccess]);
  // check for productdata
  useEffect(() => {
    if (productData?.matchedProduct) {
      setProductDetails({
        name: productData.matchedProduct?.name || "",
        description: productData.matchedProduct?.description || "",
        genderFor: productData.matchedProduct?.genderFor || "",
        brand: productData.matchedProduct?.brand || "",
        returnPolicy: productData?.matchedProduct?.returnPolicy || 10,
      });
      setVariants(productData?.productVariants || []);
    }
  }, [productData]);

  return (
    <section>
      <div className="p-6">
        <div className="flex">
          <div className=" mb-6">
            <p className="text-gray-800 text-2xl font-bold">Product Edit</p>
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link to={"/Admin"}>Admin</Link>
                </li>
                <li>
                  <Link to={-1}>Products</Link>
                </li>
                <li>Edit</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center mb-6">
          <div className="flex justify-end">
            <button
              className="btn btn-neutral"
              onClick={() => {
                if (modalRef.current) {
                  modalRef.current?.showModal();
                }
              }}
            >
              Edit MoreDetails
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Product Details</h3>
          {/* modal  */}
          <DetailsModal
            productData={productData?.matchedProduct?.productDetails}
            detailsModalRef={modalRef}
            productMoreData={handleProductMoreData}
          />
          {/* modal end  */}
          {/* Name & SKU */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Product Name</label>
              <input
                type="text"
                name="name"
                value={productDetails.name}
                onChange={handleProductChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Brand</label>
              <input
                type="text"
                name="sku"
                value={productDetails.brand}
                onChange={handleProductChange}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Description & Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={productDetails.description}
                onChange={handleProductChange}
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium">Gender</label>
              <select
                name="genderFor"
                value={productDetails.genderFor}
                onChange={handleProductChange}
                className="select select-bordered w-full"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          {/* return policy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Return Policy
              </label>
              <input
                type="number"
                value={productDetails.returnPolicy}
                name="returnPolicy"
                onChange={handleProductChange}
                className="mt-2 bg-transparent input input-bordered w-full max-w-xs"
              />
            </div>
          </div>

          {/* Category & Subcategory */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium">Category</label>
              <input
                type="text"
                name="category"
                value={productDetails.category}
                onChange={handleProductChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Subcategory</label>
              <input
                type="text"
                name="subCategory"
                value={productDetails.subCategory}
                onChange={handleProductChange}
                className="input input-bordered w-full"
              />
            </div>
          </div> */}
        </div>

        {/* Variants */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-semibold mb-4">Variants</h3>

          {variants.map((variant, index) => (
            <div key={index} className="border-b pb-4 mb-4">
              <h4 className="text-lg font-medium capitalize">
                Variant:{variant?.sku}
              </h4>
              <div className="flex justify-end">
                <button
                  className="ms-auto hover:scale-125 duration-300 bg-red-500 p-2 rounded-full"
                  onClick={() => handleVariantDelete(variant?._id)}
                >
                  <BsTrashFill size={25} color="white" />
                </button>
              </div>

              {/* Color & Size */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block text-sm font-medium">Color</label>
                  <input
                    type="text"
                    value={variant.color}
                    onChange={(e) =>
                      handleVariantChange(index, "color", e.target.value)
                    }
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Size</label>
                  <input
                    type="text"
                    value={variant.size}
                    onChange={(e) =>
                      handleVariantChange(index, "size", e.target.value)
                    }
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {/* Base Price & Sell Price */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block text-sm font-medium">
                    Base Price
                  </label>
                  <input
                    type="number"
                    value={variant.basePrice}
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        "basePrice",
                        Number(e.target.value)
                      )
                    }
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Sell Price
                  </label>
                  <input
                    type="number"
                    value={variant.sellPrice}
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        "sellPrice",
                        Number(e.target.value)
                      )
                    }
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              {/* Stock & Discount */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block text-sm font-medium">Stock</label>
                  <input
                    type="number"
                    value={variant.stock}
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        "stock",
                        Number(e.target.value)
                      )
                    }
                    className="input input-bordered w-full"
                  />
                </div>
                {/* <div>
                  <label className="block text-sm font-medium">
                    Discount (%)
                  </label>
                  <input
                    type="text"
                    value={variant.discount || 0}
                    onChange={(e) =>
                      handleVariantChange(index, "discount", e.target.value)
                    }
                    className="input input-bordered w-full"
                  />
                </div> */}
              </div>

              {/* Image Upload */}
              {/* <div className="mt-4">
                <label className="block text-sm font-medium">Add Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleVariantImageChange(index, e)}
                  className="file-input file-input-bordered w-full"
                  placeholder="Add Image"
                />
              </div> */}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <LoaderBtn
            pending={productUpdateMutaion?.isPending}
            handleClick={handleProductUpdate}
          >
            Update Product
          </LoaderBtn>
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
