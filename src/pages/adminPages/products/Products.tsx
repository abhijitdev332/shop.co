import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { adminProduct } from "../../../querys/admin/adminQuery";
import { deleteProduct } from "../../../querys/productQuery";
import { toast } from "react-toastify";
import { FaRegTrashCan } from "react-icons/fa6";

const AllProductsTable = () => {
  const { data, isError, error, isSuccess } = useQuery({
    queryKey: ["adminproducts"],
    queryFn: adminProduct,
    refetchOnWindowFocus: true,
  });
  const products = data?.data?.data;
  const firstVariant = data?.data?.data?.firstVariant;
  const queryClient = useQueryClient();
  // const [products, setProducts] = useState(data?.data?.data || []);

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [deleteSelect, setDeleteSelect] = useState("");
  const modalRef = useRef(null);
  // Toggle product selection
  const toggleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // Select or deselect all products
  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((product) => product?._id));
    }
  };
  const { mutate: deleteMutation } = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: (id) => deleteProduct(id),
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      if (modalRef?.current) {
        modalRef.current?.close();
      }
      queryClient.invalidateQueries("adminproducts");
    },
  });
  const handleDelete = () => {
    deleteMutation(deleteSelect);
    // setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md">
        {/* bread */}
        <div className="flex">
          <div className=" mb-6">
            <p className="text-gray-800 text-2xl font-bold">All Products</p>
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link to={"/Admin"}>Admin</Link>
                </li>
                <li>
                  <Link to={"/admin"}>Dashbroad</Link>
                </li>
                <li>Products</li>
              </ul>
            </div>
          </div>
          <div className=" ms-auto flex">
            <Link to={"add"}>
              <button className="btn btn-primary">Add Product</button>
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full rounded">
            <thead className="bg-gray-100 text-black">
              <tr>
                <th className=" px-4 py-2 text-left">
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === products?.length}
                      onChange={toggleSelectAll}
                      className="checkbox"
                    />
                    <span>Product</span>
                  </div>
                </th>
                <th className=" px-4 py-2 text-left">SKU</th>
                <th className=" px-4 py-2 text-left">Category</th>
                <th className=" px-4 py-2 text-left">Stock</th>
                <th className=" px-4 py-2 text-left">Price</th>
                <th className=" px-4 py-2 text-left">Status</th>
                <th className=" px-4 py-2 text-left">Added</th>
                <th className=" px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product: any) => (
                <tr key={product?._id} className="text-black text-lg">
                  {/* Checkbox */}

                  {/* Product Name */}
                  <td className=" px-4 py-2">
                    <div className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product?._id)}
                        onChange={() => toggleSelectProduct(product?._id)}
                        className="checkbox"
                      />
                      <div className="flex space-x-3">
                        <div className="avatar">
                          <div className="w-12 rounded-full">
                            <img
                              src={
                                product?.firstVariant?.images?.[0]?.url ||
                                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                              }
                              alt="Tailwind-CSS-Avatar-component"
                            />
                          </div>
                        </div>
                        <p className="inline-flex flex-col">
                          <span className="capitalize font-medium text-lg">
                            {product?.name}
                          </span>
                          <span className="text-sm text-gray-400">
                            {product?.totalVariants} variants
                          </span>
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* SKU */}
                  <td className=" px-4 py-2">{product?.sku}</td>

                  {/* Category */}
                  <td className=" px-4 py-2">
                    {product?.categoryDetails?.[0]?.categoryName || "category"}
                  </td>

                  {/* Stock */}
                  <td className=" px-4 py-2">{product?.totalStock}</td>

                  {/* Price */}
                  <td className=" px-4 py-2">
                    ${product?.firstVariant?.sellPrice || 300}
                  </td>

                  {/* Status */}
                  <td className=" px-4 py-2">
                    {product?.totalStock < 10 ? (
                      <span
                        className={`px-2 py-1 rounded text-sm ${"bg-red-100 text-red-800"}`}
                      >
                        Low Stock
                      </span>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded text-sm ${" bg-gray-400"}`}
                      >
                        normal
                      </span>
                    )}
                  </td>

                  {/* Added Date */}
                  <td className=" px-4 py-2">
                    {new Date(product.createdAt).toLocaleDateString("en-GB")}
                  </td>

                  {/* Actions */}
                  <td className=" px-4 py-2">
                    <div className="flex gap-1 ">
                      <Link
                        to={`${product?._id}`}
                        className="btn btn-sm btn-primary rounded-full"
                      >
                        <IoEye />
                      </Link>
                      <button className="btn btn-sm btn-accent rounded-full">
                        <MdModeEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-error rounded-full"
                        onClick={() => {
                          if (modalRef?.current) {
                            setDeleteSelect(product?._id);
                            modalRef.current?.showModal();
                          }
                        }}
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <dialog id="my_modal_2" className="modal" ref={modalRef}>
        <div className="modal-box bg-white">
          <div className="wrapper">
            <div className="card flex justify-center flex-col gap-3 items-center">
              <div className="flex justify-center border-spacing-1 bg-red-400 w-20 rounded-full p-5">
                <span>
                  <FaRegTrashCan size={30} color="white" />
                </span>
              </div>

              <div className="flex flex-col items-center">
                <h3 className="font-bold text-xl">
                  Delete Product and Variants!!
                </h3>
                <p className="py-4">Press Delete or Cancel !!</p>
              </div>

              <div className="btn-group w-full px-5 flex justify-between">
                <button
                  className="btn btn-outline text-lg font-medium"
                  onClick={() => {
                    if (modalRef?.current) {
                      modalRef.current?.close();
                    }
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-error text-lg font-medium"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default AllProductsTable;
