import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { CgAdd } from "react-icons/cg";
import { IoEye } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAdminProduct } from "../../../querys/admin/adminQuery";
import { toast } from "react-toastify";
import { getadminProductskey } from "../../../querys/admin/adminQuery";
import {
  DeleteModal,
  DropDown,
  TableBody,
  TableCell,
  TableHeader,
} from "../../../components/component";
import { AdminPagination } from "../adminPages";
import { DateFormat } from "../../../utils/utils";
import { DeleteProductMutaion } from "../../../querys/product/productQuery";

const productTableHead = [
  "Product",
  "SKU",
  "Category",
  "Stock",
  "Price",
  "Status",
  "Added",
  "Actions",
];
const AllProductsTable = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  let { data: productData, isLoading } = useAdminProduct(
    currentPage * itemsPerPage,
    (currentPage - 1) * itemsPerPage
  );
  const deleteMutation = DeleteProductMutaion();
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
    if (selectedProducts.length === productData?.allProducts?.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(
        productData?.allProducts?.map((product) => product?._id)
      );
    }
  };
  const handleDelete = () => {
    deleteMutation.mutate(deleteSelect);
  };
  // listen to effect
  useEffect(() => {
    if (deleteMutation.isSuccess) {
      toast.success("Delete Successfull!!");
      if (modalRef?.current) {
        modalRef.current?.close();
      }
      queryClient.invalidateQueries(getadminProductskey);
    }
  }, [deleteMutation.isSuccess]);
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
              <button className="btn btn-neutral">Add Product</button>
            </Link>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading && (
            <div className="skeleton h-96 columns-1 w-full bg-gray-200 dark:bg-white "></div>
          )}
          <table className="w-full rounded">
            <TableHeader
              columns={productTableHead}
              input={true}
              oncheck={
                selectedProducts.length === productData?.allProducts?.length
              }
              onchange={toggleSelectAll}
            />
            <TableBody
              columnsData={productData?.allProducts}
              renderItem={(item) => {
                return (
                  <tr key={item?._id} className="text-gray-800 text-base">
                    {/* Checkbox */}

                    {/* Product Name */}
                    <TableCell>
                      <div className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(item?._id)}
                          onChange={() => toggleSelectProduct(item?._id)}
                          className="checkbox"
                        />
                        <div className="flex space-x-3">
                          <div className="avatar">
                            <div className="w-12 rounded-full">
                              <img
                                src={
                                  item?.firstVariant?.images?.[0]?.url ||
                                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                }
                                alt="Tailwind-CSS-Avatar-component"
                              />
                            </div>
                          </div>
                          <p className="inline-flex flex-col">
                            <span className="capitalize text-sm md:text-base text-gray-800 font-medium">
                              {item?.name}
                            </span>
                            <span className="text-sm text-gray-400">
                              {item?.totalVariants} variants
                            </span>
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* SKU */}
                    <TableCell>#{item?.sku}</TableCell>

                    {/* Category */}
                    <TableCell>
                      <span className="rounded p-1 capitalize  text-white bg-gray-700">
                        {item?.categoryDetails?.[0]?.categoryName || "category"}
                      </span>
                    </TableCell>

                    {/* Stock */}
                    <TableCell>
                      {item?.totalStock > 10 ? (
                        <span className="text-green-600 font-medium">
                          {item?.totalStock}
                        </span>
                      ) : (
                        <span className="text-red-500 font-medium">
                          {item?.totalStock}
                        </span>
                      )}
                    </TableCell>

                    {/* Price */}
                    <TableCell>
                      ${item?.firstVariant?.sellPrice || 300}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      {item?.totalStock < 10 ? (
                        <span
                          className={`px-2 py-1 rounded text-sm ${"bg-red-100 text-red-800"}`}
                        >
                          Low Stock
                        </span>
                      ) : (
                        <span
                          className={`px-2 py-1 rounded text-sm ${" bg-green-400"}`}
                        >
                          Good
                        </span>
                      )}
                    </TableCell>

                    {/* Added Date */}
                    <TableCell>{DateFormat(item.createdAt)}</TableCell>

                    {/* Actions */}
                    <TableCell>
                      <DropDown>
                        <li>
                          <Link
                            to={`${item?._id}`}
                            className="hover:bg-gray-500 text-start font-medium"
                          >
                            <IoEye />
                            View
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`variant/add/${item?._id}`}
                            state={{ sku: item?.sku }}
                            className="hover:bg-gray-500 text-start font-medium"
                          >
                            <CgAdd />
                            Add Variant
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`edit/${item?._id}`}
                            className="hover:bg-gray-500 text-start font-medium"
                          >
                            <MdModeEdit />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <button
                            className="hover:bg-gray-500 text-start font-medium"
                            onClick={() => {
                              if (modalRef?.current) {
                                setDeleteSelect(item?._id);
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
        <AdminPagination
          totalPage={Math.ceil(productData?.totalProductsLen / itemsPerPage)}
          currentPage={currentPage}
          setPage={setCurrentPage}
          itemperPage={itemsPerPage}
          totalLen={productData?.totalProductsLen}
        />
      </div>
      {/* modal */}
      <DeleteModal modalRef={modalRef} func={handleDelete} />
    </>
  );
};

export default AllProductsTable;
