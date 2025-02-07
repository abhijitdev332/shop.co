import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productModalScheama } from "./schema";
import { ZodError } from "zod";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { RiLoopLeftLine } from "react-icons/ri";
import { LoaderBtn } from "../../../components/component";
import { CreateNewProduct } from "../../../querys/product/productQuery";
import {
  CreateMutipleVariant,
  UploadImagesMutaion,
} from "../../../querys/variant/variantQuery";

const ProductAddPage = () => {
  const QueryClient = useQueryClient();
  const navigate = useNavigate();
  const productMutate = CreateNewProduct();
  const variantMutation = CreateMutipleVariant();
  const uploadImageMutation = UploadImagesMutaion();
  const { category, subCategory } = useSelector((store) => store.category);
  const [productDetailsState, setProductDetailsState] = useState({
    name: "",
    sku: "",
    description: "",
    genderFor: "",
    category: "",
    subCategory: "",
    returnPolicy: 10,
    brand: "",
  });
  const [productAboutDetails, setProductAboutDetails] = useState({});
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
  const detailsModalRef = useRef(null);
  const randomSku = () => {
    let random = Math.floor(100000 + Math.random() * 900000);
    setProductDetailsState((prev) => ({
      ...prev,
      sku: random,
    }));
  };
  const handleProductDetailsChange = (ev) => {
    try {
      setProductDetailsState((prev) => ({
        ...prev,
        [ev.target.name]: ev.target.value,
      }));
    } catch (err) {
      toast.info(err);
    }
  };
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
    const updatedVariants = [...variants];
    updatedVariants[index].images = [
      ...updatedVariants[index].images,
      ...Array.from(files),
    ];
    setVariants(updatedVariants);
  };
  const handleProductMoreData = (data) => {
    setProductAboutDetails({ ...data });
  };
  // const { mutateAsync: productMutate, isError: productErr } = useMutation({
  //   mutationKey: ["productAdd"],
  //   mutationFn: (data) => newProduct(data),
  // });
  // const {
  //   mutateAsync: variantMutation,
  //   isPending,
  //   isError: variantErr,
  // } = useMutation({
  //   mutationKey: ["variantAdd"],
  //   mutationFn: (data) => multipleNewVariant(data),
  //   onSettled: () => {
  //     QueryClient.invalidateQueries("products");
  //   },
  // });
  // const { mutateAsync: imagesMutation, isError: imagesErr } = useMutation({
  //   mutationKey: ["imagesOfVariant"],
  //   mutationFn: (data) => uploadImages(data),
  // });
  const mapAndUploadImages = async (images) => {
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
  const handleProductAdd = async () => {
    try {
      // configured product details
      let sendData = {
        ...productDetailsState,
        productDetails: { ...productAboutDetails },
      };
      // console.log(sendData);
      let productres = await productMutate.mutateAsync(sendData);
      let { _id, sku } = productres?.data?.data;
      // configured variant details
      const transformedVariants = [];
      // loop over variants
      for (let variant of variants) {
        let imageUrls = await mapAndUploadImages(variant?.images);
        variant.sizes.forEach((size) => {
          transformedVariants.push({
            productId: _id, // Link the variant to the product
            color: variant.color,
            size,
            sellPrice: variant.salePrice,
            basePrice: variant.basePrice,
            stock: variant.stock,
            sku: `${sku}-${variant.color}-${size}`,
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
        navigate(-1);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (
      productMutate.isError ||
      variantMutation.isError ||
      uploadImageMutation.isError
    ) {
      toast.error("Something went wrong Please try after someTime!!");
    }
  }, [
    productMutate.isError,
    variantMutation.isError,
    uploadImageMutation.isError,
  ]);

  return (
    <section>
      <div className="wrapper p-6">
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
                  <Link to={-1}>Products</Link>
                </li>
                <li>New</li>
              </ul>
            </div>
          </div>
          {/* breadcumbs end */}
        </div>
        <div className="mx-auto p-6">
          {/* Top Section with Product Details and Category */}
          <div className="flex flex-col md:flex-row gap-3 justify-between items-start mb-4">
            <div className="bg-white w-full md:basis-2/3 p-6 rounded-lg shadow-md flex-1 mr-4">
              <h2 className="text-xl font-semibold mb-4">Product Details</h2>
              <div className="flex justify-end">
                <button
                  className="btn btn-neutral"
                  onClick={() => {
                    if (detailsModalRef.current) {
                      detailsModalRef.current?.showModal();
                    }
                  }}
                >
                  Add MoreDetails
                </button>
              </div>
              {/* modal */}
              <DetailsModal
                detailsModalRef={detailsModalRef}
                productMoreData={handleProductMoreData}
              />
              {/* modal end */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={productDetailsState.name}
                    name="name"
                    onChange={handleProductDetailsChange}
                    className="mt-2 bg-transparent input input-bordered w-full max-w-xs"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    SKU Number
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={productDetailsState.sku}
                    onChange={handleProductDetailsChange}
                    className="mt-2 bg-transparent input input-bordered w-full max-w-xs"
                  />
                  <button
                    className="flex btn btn-sm btn-ghost mt-2 gap-1 items-center font-medium"
                    onClick={randomSku}
                  >
                    <span>
                      <RiLoopLeftLine size={20} />
                    </span>
                    <span>Genarate Random</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={productDetailsState.description}
                    onChange={handleProductDetailsChange}
                    className="mt-2 bg-transparent input input-bordered w-full max-w-xs"
                    rows={4}
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    GenderFor
                  </label>
                  <select
                    className="mt-2 select select-bordered max-w-xs w-full bg-transparent"
                    value={productDetailsState.genderFor}
                    name="genderFor"
                    onChange={handleProductDetailsChange}
                  >
                    <option value="" selected disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={productDetailsState.brand}
                    name="brand"
                    onChange={handleProductDetailsChange}
                    className="mt-2 bg-transparent input input-bordered w-full max-w-xs"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Return Policy
                  </label>
                  <input
                    type="number"
                    value={productDetailsState.returnPolicy}
                    name="returnPolicy"
                    onChange={handleProductDetailsChange}
                    className="mt-2 bg-transparent input input-bordered w-full max-w-xs"
                  />
                </div>
              </div>
            </div>

            {/* Category Selection */}
            <div className="flex  md:flex-col md:basis-1/2 w-full gap-3">
              <div className="bg-white p-6 rounded-lg shadow-md w-72">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={productDetailsState.category}
                  name="category"
                  onChange={handleProductDetailsChange}
                  className="mt-2 select select-bordered w-full max-w-xs bg-transparent"
                >
                  <option value="" selected disabled>
                    Select Category
                  </option>
                  {category?.map((ele) => (
                    <option key={ele?._id} value={ele?._id}>
                      {ele?.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              {/*sub category  */}
              <div className="bg-white p-6 rounded-lg shadow-md w-72">
                <label className="block text-sm font-medium text-gray-700">
                  Sub-Category
                </label>
                <select
                  name="subCategory"
                  value={productDetailsState.subCategory}
                  onChange={handleProductDetailsChange}
                  className="mt-2 select select-bordered w-full max-w-xs bg-transparent"
                >
                  <option value="" selected disabled>
                    Select Sub Category
                  </option>
                  {subCategory?.map((ele) => (
                    <option value={ele?._id}>{ele?.SubCategoryName}</option>
                  ))}
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
                        updatedVariants[index].stock = Number(e.target.value);
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
              pending={variantMutation.isPending}
              handleClick={handleProductAdd}
              style="text-white"
            >
              Save Product
            </LoaderBtn>
            {/* <button
              className="px-6 py-2 "
              onClick={handleProductAdd}
            >
       
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export function DetailsModal({
  productData = null,
  detailsModalRef,
  productMoreData,
}) {
  const productDetails = {
    packOf: "1",
    styleCode: "",
    fabric: "",
    fabricCare: "",
    pattern: "",
    pockets: "1",
    sleeve: "",
    SuitableFor: "",
    fit: "",
  };
  const dressStyle = ["casual", "formal", "party", "gym"];
  const [dressStyleState, setDressStyleState] = useState("casual");
  const [inputStates, setInputsStates] = useState(() => {
    if (productData) {
      return { ...productData };
    } else {
      return {
        packOf: "1",
        styleCode: "casual every day",
        fabric: "cotton",
        fabricCare: "gentle wash",
        pattern: "solid",
        pockets: "1",
        sleeve: "full sleeve",
        SuitableFor: "everyday",
        fit: "slim",
      };
    }
  });
  const handleChange = (ev) => {
    setInputsStates((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };
  const handleAddClick = () => {
    try {
      productModalScheama.parse({ ...inputStates, style: dressStyleState });
      // setInputsStates({ ...productDetails });
      detailsModalRef.current.close();
      productMoreData({ ...inputStates, style: dressStyleState });
    } catch (err) {
      if (err instanceof ZodError) {
        toast.info(err.errors[0].message);
      }
    }
  };

  useEffect(() => {
    productMoreData({ ...inputStates, style: dressStyleState });
  }, []);

  useEffect(() => {
    if (productData) {
      setInputsStates({ ...productData });
    }
  }, [productData]);
  return (
    <>
      <dialog id="my_modal_2" className="modal" ref={detailsModalRef}>
        <div className="modal-box bg-white w-full z-[1]">
          <h2>Add More Details</h2>
          <div className="mt-5">
            {Object.entries(productDetails).map((ele) => {
              return (
                <>
                  <div className="py-3">
                    <label className="block text-sm font-medium text-gray-700">
                      {ele[0].toUpperCase()}
                    </label>
                    <input
                      type="text"
                      name={ele[0]}
                      value={inputStates[ele[0]]}
                      onChange={handleChange}
                      className="mt-2 bg-transparent input input-bordered w-full max-w-sm"
                    />
                  </div>
                </>
              );
            })}
            <div className="py-3">
              <label className="block text-sm font-medium text-gray-700 uppercase">
                Style
              </label>
              <select
                className="select select-bordered w-full max-w-sm bg-transparent mt-2"
                onChange={(e) => setDressStyleState(e.target.value)}
              >
                {dressStyle.map((ele) => (
                  <option value={ele}>{ele}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="btn btn-neutral w-52 text-lg"
              onClick={handleAddClick}
            >
              Add
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop m-0">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default ProductAddPage;
