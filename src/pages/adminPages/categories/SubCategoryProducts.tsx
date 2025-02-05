import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useGetSubCategoryProducts } from "../../../querys/categoryQuery";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
import {
  DeleteModal,
  DropDown,
  TableBody,
  TableCell,
  TableHeader,
} from "../../../components/component";

const SubCategoryProducts = () => {
  const [params] = useSearchParams();
  const { id } = useParams();
  let param = params.get("query");
  const { data } = useGetSubCategoryProducts(param);
  const products = data?.products;
  const queryClient = useQueryClient();
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
  console.log(products);
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
                <li>
                  <Link to={-1} state={true}>
                    Categories
                  </Link>
                </li>
                <li>{param}</li>
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
            <TableHeader
              columns={[
                "Product",
                "SKU",
                "Category",
                "Stock",
                "Price",
                "Status",
                "Added",
                "Action",
              ]}
              input={true}
              oncheck={selectedProducts.length === products?.length}
              onchange={toggleSelectAll}
            />
            <TableBody
              columnsData={products}
              renderItem={(product) => {
                return (
                  <tr key={product?._id} className="text-black text-lg">
                    {/* Checkbox */}

                    {/* Product Name */}
                    <TableCell>
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
                    </TableCell>

                    {/* SKU */}
                    <TableCell>{product?.sku}</TableCell>

                    {/* Category */}
                    <TableCell>{product?.category || "category"}</TableCell>

                    {/* Stock */}
                    <TableCell>{product?.totalStock}</TableCell>

                    {/* Price */}
                    <TableCell>
                      ${product?.firstVariant?.sellPrice || 300}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
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
                    </TableCell>

                    {/* Added Date */}
                    <TableCell>
                      {new Date(product.createdAt).toLocaleDateString("en-GB")}
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <DropDown>
                        <li>
                          <Link
                            to={`/admin/products/${product?._id}`}
                            className="hover:bg-gray-500 text-start font-medium"
                          >
                            <IoEye />
                            View
                          </Link>
                        </li>
                        <li>
                          <button className="hover:bg-gray-500 text-start font-medium">
                            <MdModeEdit />
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            className="hover:bg-gray-500 text-start font-medium"
                            onClick={() => {
                              if (modalRef?.current) {
                                setDeleteSelect(product?._id);
                                modalRef.current?.showModal();
                              }
                            }}
                          >
                            <FaRegTrashAlt />
                            Delete
                          </button>
                        </li>
                      </DropDown>
                    </TableCell>
                  </tr>
                );
              }}
            />
          </table>
        </div>
      </div>
      {/* modal for delete product */}
      <DeleteModal modalRef={modalRef} func={handleDelete} />
    </>
  );
};

export default SubCategoryProducts;
