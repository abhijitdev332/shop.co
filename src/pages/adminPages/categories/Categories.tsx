import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { adminCategories } from "../../../querys/admin/adminQuery";
import { getSubsCategory } from "../../../querys/orderQuery";
import {
  deleteCategory,
  deleteSubsCategory,
} from "../../../querys/categoryQuery";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  setCategory,
  setSubCategory,
} from "../../../services/store/category/categorySlice";
import { FaRegTrashCan } from "react-icons/fa6";

const Categories = () => {
  const { state } = useLocation();
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col">
        <div className=" mb-6">
          <p className="text-gray-800 text-2xl font-bold">All Category</p>
          {/* bread cmubs */}
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link to={"/Admin"}>Admin</Link>
              </li>
              <li>
                <Link to={"/admin"}>Dashbroad</Link>
              </li>
              <li>Categories</li>
            </ul>
          </div>
        </div>
        {/* tab list */}
        <div role="tablist" className="tabs tabs-bordered grid-cols-2">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab text-lg font-medium text-black"
            aria-label="Category"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content mt-8">
            <div className="wrapper">
              <CategoryTable />
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab text-lg font-medium text-black"
            aria-label="Sub Category"
          />
          <div role="tabpanel" className="tab-content mt-8">
            <div className="wrapper">
              <SubCategoryTable />
            </div>
          </div>

          {/* <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Tab 3"
          />
          <div role="tabpanel" className="tab-content p-10">
            Tab content 3
          </div> */}
        </div>

        {/* end tab list */}
      </div>
    </div>
  );
};

function CategoryTable() {
  const { data } = useQuery({
    queryKey: ["AdminCategory"],
    queryFn: adminCategories,
  });
  let catagories = data?.data?.data;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
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
    if (selectedProducts.length === catagories.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(catagories.map((product) => product?._id));
    }
  };
  const { mutate: delCategory } = useMutation({
    mutationKey: ["deletecategory"],
    mutationFn: (id) => deleteCategory(id),
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      dispatch(setCategory(data?.data?.data));
      queryClient.invalidateQueries("AdminCategory");
    },
  });
  const handleDelete = () => {
    delCategory(deleteSelect);
    // catagories((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <>
      <div className="wrapper  flex flex-col gap-5">
        {/* add button */}
        <div className="ms-auto flex ">
          <Link to={"add"}>
            <button className="btn btn-primary">Add Category</button>
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full rounded">
            <thead className="bg-gray-100 text-black">
              <tr>
                <th className=" px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedProducts?.length === catagories?.length}
                    onChange={toggleSelectAll}
                    className="checkbox"
                  />
                </th>
                <th className=" px-4 py-2 text-left">Category</th>
                <th className=" px-4 py-2 text-left">Sales</th>
                <th className=" px-4 py-2 text-left">Stock</th>
                <th className=" px-4 py-2 text-left">Added</th>
                <th className=" px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {catagories?.map((cata) => (
                <tr key={cata?._id} className="text-black text-lg">
                  {/* Checkbox */}
                  <td className=" px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedProducts?.includes(cata?._id)}
                      onChange={() => toggleSelectProduct(cata?._id)}
                      className="checkbox"
                    />
                  </td>

                  {/* Product Name */}
                  <td className=" px-4 py-2">{cata?.categoryName}</td>

                  {/* SKU */}
                  <td className=" px-4 py-2">{cata?.totalSales}</td>

                  {/* Category */}
                  <td className=" px-4 py-2">{cata?.totalStock}</td>

                  {/* Stock */}
                  <td className=" px-4 py-2">
                    {new Date(cata?.addedDate).toLocaleDateString("en-GB")}
                  </td>

                  {/* Actions */}
                  <td className=" px-4 py-2">
                    <div className="flex gap-2 ">
                      <Link
                        to={`${cata?._id}`}
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
                            setDeleteSelect(cata?._id);
                            modalRef?.current?.showModal();
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
                  Delete Category and Its AllProducts
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
}

function SubCategoryTable() {
  const { data } = useQuery({
    queryKey: ["AdminSubCategory"],
    queryFn: getSubsCategory,
    refetchOnWindowFocus: true,
  });
  let catagories = data?.data?.data;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
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
    if (selectedProducts.length === catagories.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(catagories.map((product) => product?._id));
    }
  };
  const { mutate } = useMutation({
    mutationKey: ["subcategory"],
    mutationFn: (id) => deleteSubsCategory(id),
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      dispatch(setSubCategory(data?.data?.data));
      queryClient.invalidateQueries("AdminSubCategory");
    },
  });
  const handleDelete = () => {
    mutate(deleteSelect);
    // catagories((prev) => prev.filter((product) => product._id !== id));
  };

  return (
    <>
      <div className="wrapper  flex flex-col gap-5">
        {/* add button */}
        <div className="ms-auto flex ">
          <Link to={"/admin/subcategory/add"}>
            <button className="btn btn-primary">Add Sub-Category</button>
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full rounded">
            <thead className="bg-gray-100 text-black">
              <tr>
                <th className=" px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedProducts?.length === catagories?.length}
                    onChange={toggleSelectAll}
                    className="checkbox"
                  />
                </th>
                <th className=" px-4 py-2 text-left">Category</th>
                {/* <th className=" px-4 py-2 text-left">Sales</th>
                <th className=" px-4 py-2 text-left">Stock</th> */}
                <th className=" px-4 py-2 text-left">Added</th>
                <th className=" px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {catagories?.map((cata) => (
                <tr key={cata?._id} className="text-black text-lg">
                  {/* Checkbox */}
                  <td className=" px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedProducts?.includes(cata?._id)}
                      onChange={() => toggleSelectProduct(cata?._id)}
                      className="checkbox"
                    />
                  </td>
                  {/* Product Name */}
                  <td className=" px-4 py-2">
                    <div className="flex  items-center"></div>
                    <div className="avatar space-x-2">
                      <div className="w-10 rounded-xl">
                        <img src={cata?.subCategoryImage} />
                      </div>
                      <p className="font-medium text-lg capitalize">
                        {cata?.SubCategoryName}
                      </p>
                    </div>
                  </td>
                  {/* SKU */}
                  {/* <td className=" px-4 py-2">{cata?.totalSales}</td>
                  {/* Category */}
                  {/* <td className=" px-4 py-2">{cata?.totalStock}</td> */}
                  {/* Stock */}
                  <td className=" px-4 py-2">
                    {new Date(cata?.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  {/* Actions */}
                  <td className=" px-4 py-2">
                    <div className="flex gap-3 ">
                      <Link
                        to={`/admin/subcategory/${cata?._id}`}
                        className="btn btn-sm btn-primary rounded-full"
                      >
                        <IoEye />
                      </Link>
                      <button className="btn btn-sm btn-accent rounded-full">
                        <MdModeEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-error rounded-full text-white"
                        onClick={() => {
                          if (modalRef?.current) {
                            setDeleteSelect(cata?._id);
                            modalRef?.current?.showModal();
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
                  Delete Category and Its AllProducts
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
}

export default Categories;
