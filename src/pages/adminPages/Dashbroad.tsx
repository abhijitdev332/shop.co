import { useState } from "react";
import cl from "classnames";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BsCartCheckFill,
  BsFillEyeFill,
  BsPersonCheckFill,
} from "react-icons/bs";
import { FaMoneyBill, FaRegTrashAlt } from "react-icons/fa";
import { AdminPagination } from "./adminPages";
import { MdCurrencyExchange } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { topSelling } from "../../querys/productQuery";
import {
  adminTopCategories,
  useAdminOrders,
  useAdminStats,
} from "../../querys/admin/adminQuery";
import { Link } from "react-router-dom";
const Dashbroad = () => {
  const stats = useAdminStats();
  console.log(stats);
  return (
    <section>
      <div className="wrapper px-5 py-7 text-black">
        {/* greet */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold ">Welcome Back Admin</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            necessitatibus?
          </p>
        </div>
        <div className="flex gap-3 justify-between p-5">
          <DashCard
            title={"income"}
            count={235346}
            currency={true}
            icon={<FaMoneyBill color="blue" />}
          />
          <DashCard
            title={"Orders"}
            count={2356}
            icon={<BsCartCheckFill color="green" />}
          />
          <DashCard
            title={"Expenses"}
            count={23236}
            icon={<MdCurrencyExchange color="crimson" />}
          />
          <DashCard
            title={"customers"}
            count={2356}
            icon={<BsPersonCheckFill color="purple" />}
          />
        </div>
        <div className="flex gap-2">
          <Card style={"w-full h-full"}>
            <SalesChart />
          </Card>
        </div>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  h-80">
          <Card>
            <ExpenseChart />
          </Card>
          <Card>
            <TopProduct />
          </Card>
          <Card>
            <TopCategory />
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-5">
          <Card style="p-0 basis-2/3">
            <RecentOrders />
          </Card>
          <Card style="basis-1/3"></Card>
        </div>
      </div>
    </section>
  );
};

function DashCard({
  icon = "",
  title,
  count,
  currency = false,
  style = "",
  children,
}) {
  return (
    <div
      className={cl(
        "stats shadow rounded-btn  bg-white text-black w-60",
        style
      )}
    >
      <div className="stat gap-1">
        <div className="stat-title text-black font-medium flex items-center gap-1 capitalize">
          <span>{icon}</span>
          <span>{title}</span>
        </div>
        <div className="stat-value font-medium text-3xl">
          {currency ? "$" : ""}
          {count}
        </div>
        <div className="stat-desc flex gap-1 text-slate-800 font-medium">
          <span className="text-green-500">10%</span>
          <span>+$150 today</span>
        </div>
      </div>
    </div>
  );
}

function Card({ style = "", children }) {
  return (
    <div
      className={cl(
        "w-full overflow-y-auto overflow-x-hidden  rounded-xl  bg-gray-50 shadow outline outline-1 p-3 ",
        style
      )}
    >
      {children}
    </div>
  );
}
function SalesChart() {
  const data = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Apr",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "June",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "July",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Aug",
      uv: 4590,
      pv: 8000,
      amt: 2100,
    },
    {
      name: "Sep",
      uv: 4300,
      pv: 3950,
      amt: 2100,
    },
    {
      name: "Oct",
      uv: 3390,
      pv: 4100,
      amt: 2000,
    },
    {
      name: "Nov",
      uv: 4050,
      pv: 5000,
      amt: 2700,
    },
    {
      name: "Dec",
      uv: 3430,
      pv: 4150,
      amt: 2150,
    },
  ];
  return (
    <div className="wrapper w-full h-full">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#52ca9a" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#32ca9e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="0 0" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
          <Area
            type="monotone"
            dataKey="amt"
            stroke="#52ca2a"
            fillOpacity={1}
            fill="url(#colorAmt)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
function TopProduct() {
  const { data, error } = useQuery({
    queryKey: ["products", "top"],
    queryFn: topSelling,
  });
  let products = data?.data?.data || [];
  // let products = [
  //   {
  //     img: "",
  //     productName: "product 1",
  //     subCategory: "sub 1",
  //     SaleAmount: 23507,
  //   },
  //   {
  //     img: "",
  //     productName: "product 2",
  //     subCategory: "sub 2",
  //     SaleAmount: 23507,
  //   },
  // ];

  return (
    <div className="p-3">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold ">Top Product</h2>
        {/* <p>Lorem ipsum dolor sit amet consectetur.</p> */}
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto overflow-x-hidden py-2">
        {products.map((ele) => (
          <>
            <div className="flex">
              <img
                src={ele?.firstVariantImages?.[0]?.url}
                alt="product image"
                className="w-8 h-8 rounded-full"
              />
              <p className="inline-flex flex-col px-2">
                <span
                  className="text-sm text-ellipsis font-medium capitalize "
                  title={ele?.name}
                >
                  {ele?.name}
                </span>
                <span className="text-xs font-medium text-gray-500 capitalize">
                  Sold:{ele?.totalProductSales}
                </span>
              </p>
              <p className="ms-auto">${ele?.firstVariantSellPrice}</p>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
function TopCategory() {
  const { data, error } = useQuery({
    queryKey: ["topcategories", "topsaleCategory"],
    queryFn: adminTopCategories,
  });
  let categoryData = data?.data?.data;
  // let categoryData = [
  //   {
  //     img: "",
  //     categoryName: "T-shirts",
  //     totalSales: 234,
  //     SaleAmount: 23507,
  //     status: "grow",
  //     stat: "+12",
  //     bg: "green",
  //   },
  //   {
  //     img: "",
  //     categoryName: "Shirts",
  //     totalSales: 134,
  //     SaleAmount: 2507,
  //     status: "loss",
  //     stat: "-10",
  //     bg: "red",
  //   },
  //   {
  //     img: "",
  //     categoryName: "Shorts",
  //     totalSales: 234,
  //     SaleAmount: 23507,
  //     status: "netural",
  //     stat: "15",
  //     bg: "gray",
  //   },
  // ];

  return (
    <div className="p-3">
      <div className="flex flex-col">
        <h2 className="font-bold text-xl">Top Category</h2>
        {/* <p>Lorem ipsum dolor sit amet consectetur.</p> */}
      </div>
      <div className="flex flex-col gap-3 py-3 overflow-y-auto overflow-x-hidden">
        {categoryData?.map((ele) => (
          <>
            <div className="flex">
              <div className="rounded-full">
                <img
                  src={ele?.categoryImage}
                  alt="product image"
                  className="w-8 h-8 rounded-full"
                />
              </div>

              <p className="inline-flex px-2 flex-col  gap-1">
                {/* <span>{ele.productName}</span> */}
                <span className="font-medium capitalize text-start">
                  {ele?.categoryName}
                </span>

                <span className="text-xs text-gray-500 font-bold">
                  Date: {new Date(ele?.createdAt).toLocaleDateString("en-GB")}
                </span>
              </p>
              <div className="ms-auto flex items-center gap-2">
                <p>{ele?.totalSold}</p>
                {/* <p
                  className={cl(
                    "badge badge-sm",
                    ele?.totalSold>30?

                  )}
                >
                  {ele.stat}
                </p> */}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
function ExpenseChart() {
  const data02 = [
    {
      name: "Group A",
      value: 2400,
    },
    {
      name: "Group B",
      value: 4567,
    },
    {
      name: "Group C",
      value: 1398,
    },
    {
      name: "Group D",
      value: 9800,
    },
    {
      name: "Group E",
      value: 3908,
    },
    {
      name: "Group F",
      value: 4800,
    },
  ];
  return (
    <div className="wrapper w-full h-full">
      <div className="flex flex-col">
        <h2 className="text-lg font-bold">All Expenses</h2>
        <p className="text-sm">Lorem ipsum dolor sit amet consectetur.</p>
      </div>
      <ResponsiveContainer width={300}>
        <PieChart>
          <Pie
            data={data02}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

const RecentOrders = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: orders } = useAdminOrders(currentPage, itemsPerPage);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDelete = (id: string) => {
    // setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    // setOrders((prev) =>
    //   prev.map((order) =>
    //     order.id === id ? { ...order, status: newStatus } : order
    //   )
    // );
  };

  return (
    <>
      {/* Header */}
      <div className="flex  justify-between items-center mb-6">
        <h2 className="text-xl space-x-2 font-bold text-gray-800">
          <span>Recent Orders</span>
          <span className="rounded-btn text-xs bg-green-200 px-2 py-1">
            +20 Orders
          </span>
        </h2>
        <div className="flex items-center space-x-4">
          {/* Date Filter */}
          {/* <div
            role="tablist"
            className="tabs tabs-boxed tabs-md bg-slate-200 font-medium"
          >
            <a role="tab" className="tab text-xs">
              5 Hours
            </a>
            <a role="tab" className="tab text-xs tab-active bg-white">
              3 Hours
            </a>
            <a role="tab" className="tab text-xs">
              2 Hours
            </a>
            <a role="tab" className="tab text-xs">
              1 Hour
            </a>
            <a role="tab" className="tab text-xs">
              3 Minute
            </a>
          </div> */}
          {/* See More Button */}
          <Link
            to={"orders"}
            className="btn btn-neutral text-white btn-md  transition"
          >
            See More
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto dark:bg-slate-900 dark:text-white text-black">
        <table className="table">
          {/* head */}
          <thead className=" text-black font-medium space-y-6 sticky top-0 z-10 p-2 border-b-2">
            <th className="font-medium text-inherit">Product</th>
            <th className="font-medium text-inherit">Customer</th>
            <th className="font-medium text-inherit">Total</th>
            <th className="font-medium text-inherit">Status</th>
            <th className="font-medium text-inherit">Action</th>
          </thead>
          <tbody>
            {orders?.map((ele) => (
              <tr>
                {/* <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th> */}
                <td>
                  <div className="flex gap-1">
                    <div className="avatar">
                      <div className="mask mask-squircle h-10 w-10">
                        <img
                          src={ele?.firstProduct?.variantImages?.[0].url}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <p className="inline-flex flex-col gap-1">
                      <span className="text-sm capitalize font-medium">
                        {ele?.firstProduct?.productName}
                      </span>
                      <span className="text-xs">
                        +{ele?.products?.length}Products
                      </span>
                    </p>
                  </div>
                </td>
                <td>
                  <div className="inline-flex flex-col gap-1">
                    <p className="font-medium">{ele?.userDetails?.username}</p>
                    <span className="text-sm">{ele?.userDetails?.email}</span>
                  </div>
                </td>
                <td>{ele?.totalAmount}</td>
                <td>
                  {ele?.status == "pending" ? (
                    <span className="badge rounded-btn badge-lg capitalize">
                      {ele?.status}
                    </span>
                  ) : (
                    <span className="badge badge-success capitalize rounded-btn badge-lg">
                      {ele?.status}
                    </span>
                  )}
                </td>
                <td>
                  <div className="flex gap-1">
                    <button className="btn btn-sm btn-ghost rounded-full">
                      <BsFillEyeFill />
                    </button>
                    {/* <button className="btn btn-sm btn-ghost hover:bg-red-500 rounded-full">
                      <FaRegTrashAlt />
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
      <AdminPagination
        currentPage={currentPage}
        setPage={setCurrentPage}
        totalPage={10}
      />
    </>
  );
};

export default Dashbroad;
