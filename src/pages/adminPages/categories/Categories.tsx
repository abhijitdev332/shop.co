import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Children, useEffect, useRef, useState } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { adminCategories } from "../../../querys/admin/adminQuery";
import {
  getSubsCategory,
  updateCategory,
  updateSubCategory,
} from "../../../querys/categoryQuery";
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
import { DropDown, LoaderBtn, Modal } from "../../../components/component";
import Dropdown from "../../../components/dropdown/Dropdown";
import { AdminPagination } from "../adminPages";

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
            defaultChecked={!state}
          />
          <div role="tabpanel" className="tab-content ">
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
            defaultChecked={state}
          />
          <div role="tabpanel" className="tab-content">
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
  const [selectUpdateCata, setSelectedUpdateCata] = useState({});
  const modalRef = useRef(null);
  const updateModal = useRef(null);
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
  // update mutaion
  const updateMutaion = useMutation({
    mutationKey: ["updateCategory", selectUpdateCata?.id],
    mutationFn: (data) => updateCategory(selectUpdateCata?.id, data),
    onSuccess: (data) => {
      toast.success(data.data?.message);
      updateModal.current?.close();
      queryClient.invalidateQueries(["AdminCategory"]);
    },
  });

  const { mutate: delCategory } = useMutation({
    mutationKey: ["deletecategory"],
    mutationFn: (id) => deleteCategory(id),
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      dispatch(setCategory(data?.data?.data));
      queryClient.invalidateQueries("AdminCategory");
    },
  });
  // delete click
  const handleDelete = () => {
    delCategory(deleteSelect);
  };

  return (
    <>
      <div className="wrapper  py-3 flex flex-col gap-5 h-full overflow-hidden">
        {/* add button */}
        <div className="ms-auto flex ">
          <Link to={"add"}>
            <button className="btn btn-neutral">Add Category</button>
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full rounded">
            <thead className="sticky top-0 z-10 bg-gray-100 p-2">
              <tr>
                <th className=" px-4 py-2 text-left">
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      checked={selectedProducts?.length === catagories?.length}
                      onChange={toggleSelectAll}
                      className="checkbox"
                    />
                    <span>Category</span>
                  </div>
                </th>
                <th className=" px-4 py-2 text-left">Sales</th>
                <th className=" px-4 py-2 text-left">Stock</th>
                <th className=" px-4 py-2 text-left">Added</th>
                <th className=" px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {catagories?.map((cata) => (
                <tr key={cata?._id} className="text-gray-800 text-base">
                  {/* Product Name */}
                  <td className=" px-4 py-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedProducts?.includes(cata?._id)}
                        onChange={() => toggleSelectProduct(cata?._id)}
                        className="checkbox"
                      />
                      <div className="avatar">
                        <div className="w-12 rounded-full">
                          <Link to={`${cata?._id}?query=${cata?.categoryName}`}>
                            <img
                              src={
                                cata?.categoryImage ||
                                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                              }
                            />
                          </Link>
                        </div>
                      </div>

                      <p className="capitalize  text-gray-800 text-sm md:text-base">
                        {cata?.categoryName}
                      </p>
                    </div>
                  </td>

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
                    <DropDown>
                      <li>
                        <Link
                          to={`${cata?._id}?query=${cata?.categoryName}`}
                          className="font-medium hover:bg-gray-300"
                        >
                          <IoEye />
                          View
                        </Link>
                      </li>
                      <li>
                        <button
                          className="font-medium hover:bg-gray-300"
                          onClick={() => {
                            if (updateModal?.current) {
                              setSelectedUpdateCata({
                                name: cata?.categoryName,
                                image: cata?.categoryImage,
                                id: cata?._id,
                              });
                              updateModal?.current?.showModal();
                            }
                          }}
                        >
                          <MdModeEdit />
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          className="font-medium hover:bg-gray-300"
                          onClick={() => {
                            if (modalRef?.current) {
                              setDeleteSelect(cata?._id);
                              modalRef?.current?.showModal();
                            }
                          }}
                        >
                          <FaRegTrashAlt />
                          Delete
                        </button>
                      </li>
                    </DropDown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <AdminPagination totalPage={5} />
      </div>
      {/* modal */}
      <Modal modalRef={modalRef}>
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
      </Modal>

      {/* updatemodal */}
      <Modal modalRef={updateModal}>
        <UpdateCategoryModal
          modalRef={updateModal}
          category={selectUpdateCata}
          func={updateMutaion}
        />
      </Modal>
    </>
  );
}

function SubCategoryTable() {
  const { data } = useQuery({
    queryKey: ["AdminSubCategory"],
    queryFn: () => getSubsCategory(),
  });
  let catagories = data?.data?.data;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectUpdateCata, setSelectedUpdateCata] = useState({});
  const [deleteSelect, setDeleteSelect] = useState("");
  const modalRef = useRef(null);
  const updateModal = useRef(null);
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

  // update mutaion
  const updateMutaion = useMutation({
    mutationKey: ["updateSubcategory"],
    mutationFn: (data) => updateSubCategory(selectUpdateCata?.id, data),
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      updateModal.current?.close();
      queryClient.invalidateQueries(["AdminSubCategory"]);
    },
  });
  const { mutate: deleteMutaion } = useMutation({
    mutationKey: ["subcategory"],
    mutationFn: (id) => deleteSubsCategory(id),
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      dispatch(setSubCategory(data?.data?.data));
      queryClient.invalidateQueries("AdminSubCategory");
    },
  });
  const handleDelete = () => {
    deleteMutaion(deleteSelect);
  };

  return (
    <>
      <div className="py-3 h-full flex flex-col gap-5">
        {/* add button */}
        <div className="ms-auto flex ">
          <Link to={"/admin/subcategory/add"}>
            <button className="btn btn-neutral">Add Sub-Category</button>
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full rounded">
            <thead className="bg-gray-100 sticky top-0 p-2 z-10">
              <tr>
                <th className=" px-4 py-2">
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      checked={selectedProducts?.length === catagories?.length}
                      onChange={toggleSelectAll}
                      className="checkbox"
                    />

                    <span>Category</span>
                  </div>
                </th>
                <th className=" px-4 py-2 text-left">Added</th>
                <th className=" px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {catagories?.map((cata) => (
                <tr key={cata?._id} className="text-gray-800 text-base">
                  {/* Product Name */}
                  <td className=" px-4 py-2">
                    <div className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        checked={selectedProducts?.includes(cata?._id)}
                        onChange={() => toggleSelectProduct(cata?._id)}
                        className="checkbox"
                      />

                      <div className="flex  items-center"></div>
                      <div className="avatar space-x-2">
                        <div className="w-10 rounded-xl">
                          <Link
                            to={`/admin/subcategory/${cata?._id}?query=${cata?.SubCategoryName}`}
                          >
                            <img src={cata?.subCategoryImage} />
                          </Link>
                        </div>
                        <p className="text-gray-800 text-sm md:text-base capitalize">
                          {cata?.SubCategoryName}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className=" px-4 py-2">
                    {new Date(cata?.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  {/* Actions */}
                  <td className=" px-4 py-2">
                    <Dropdown>
                      <li>
                        <Link
                          to={`/admin/subcategory/${cata?._id}?query=${cata?.SubCategoryName}`}
                          className="hover:bg-gray-300 font-medium"
                        >
                          <IoEye />
                          View
                        </Link>
                      </li>
                      <li>
                        <button
                          className="hover:bg-gray-300 font-medium"
                          onClick={() => {
                            if (updateModal?.current) {
                              setSelectedUpdateCata({
                                name: cata?.SubCategoryName,
                                image: cata?.subCategoryImage,
                                id: cata?._id,
                              });
                              updateModal?.current?.showModal();
                            }
                          }}
                        >
                          <MdModeEdit />
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          className="hover:bg-gray-300 font-medium"
                          onClick={() => {
                            if (modalRef?.current) {
                              setDeleteSelect(cata?._id);
                              modalRef?.current?.showModal();
                            }
                          }}
                        >
                          <FaRegTrashAlt />
                          Delete
                        </button>
                      </li>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <AdminPagination totalPage={5} />
      </div>
      {/* modal */}
      <Modal modalRef={modalRef}>
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
      </Modal>
      <Modal modalRef={updateModal}>
        <UpdateCategoryModal
          modalRef={updateModal}
          category={selectUpdateCata}
          func={updateMutaion}
        />
      </Modal>
    </>
  );
}

function UpdateCategoryModal({
  func,
  category,
  modalRef,
  children,
  ...others
}) {
  const [categoryState, setCategoryState] = useState({
    name: category?.name,
    image: category?.image,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const handleImageChange = (ev) => {
    setImagePreview(URL.createObjectURL(ev.target.files[0]));
    setCategoryState((prev) => ({ ...prev, image: ev.target.files }));
  };
  const handleClick = () => {
    if (categoryState.name == "") {
      return toast.info("Please  name Fleids");
    }
    let formdata = new FormData();
    if (categoryState.image instanceof FileList) {
      formdata.append("image", categoryState.image[0]);
      formdata.append("name", categoryState.name);
      return func?.mutate(formdata);
    }
    formdata.append("name", categoryState.name);
    return func?.mutate(formdata);
  };

  useEffect(() => {
    setCategoryState({
      name: category?.name,
      image: category?.image,
    });
    setImagePreview(null);
  }, [category]);

  return (
    <>
      <div className="card flex justify-center flex-col gap-3 items-center p-6">
        <div className="flex justify-center border-spacing-1 bg-blue-400 w-20 rounded-full p-5">
          <span>
            <FaEdit size={30} color="white" />
          </span>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="font-bold text-xl">Update Category</h3>
          <p className="py-4">Modify the category name and press Update!</p>
          <div className="flex flex-col gap-4 w-full items-center">
            <img
              src={imagePreview || categoryState.image}
              alt="categoryimage"
              className="w-32 h-32 rounded-lg"
            />
            <input
              type="file"
              name="image"
              className="file-input bg-transparent file-input-bordered w-full max-w-xs"
              onInput={handleImageChange}
            />
            <input
              type="text"
              name="name"
              onChange={(e) =>
                setCategoryState((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              className="input input-bordered bg-transparent w-full max-w-xs"
              placeholder="Category Name"
              value={categoryState.name}
            />
          </div>
        </div>
        {children}

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
          <LoaderBtn
            pending={func?.isPending}
            className="btn btn-neutral text-white text-lg font-medium"
            handleClick={handleClick}
          >
            Update
          </LoaderBtn>
        </div>
      </div>
    </>
  );
}

export default Categories;
