import { useState } from "react";
import cl from "classnames";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
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
import { FaMoneyBill } from "react-icons/fa";
import { AdminPagination } from "./adminPages";
import { MdPendingActions } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import {
  adminTopCategories,
  useAdminOrders,
  useAdminOrdersByCountry,
  useAdminOrderStats,
  useAdminStats,
} from "../../querys/admin/adminQuery";
import { Link } from "react-router-dom";
import { TableBody, TableCell, TableHeader } from "../../components/component";
import { useTopSelling } from "../../querys/product/productQuery";
import Badge from "../../components/button/Badge";
const Dashbroad = () => {
  const times = ["7d", "1m", "1y"];
  const [selectedTime, setSelectedTime] = useState("7d");
  const { data: stats } = useAdminStats();
  const { data: orderStats } = useAdminOrderStats(selectedTime);
  const handleTabClick = (time) => {
    setSelectedTime(time);
  };
  return (
    <section>
      <div className="wrapper grid gap-5 px-5 py-7 text-black">
        {/* greet */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold ">Welcome Back Admin</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            necessitatibus?
          </p>
        </div>
        {/* dashcards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-between md:p-5">
          <DashCard
            title={"income"}
            count={stats?.totalSaleAmount}
            today={stats?.todaySaleAmount}
            currency={true}
            icon={<FaMoneyBill color="blue" size={20} />}
          />
          <DashCard
            title={"Orders"}
            count={stats?.totalOrders}
            today={stats?.todayOrders}
            icon={<BsCartCheckFill color="green" size={20} />}
          />
          <DashCard
            title={"Pending Orders"}
            today={stats?.todayOrderStatus?.pending}
            count={stats?.orderStatus?.pending}
            icon={<MdPendingActions color="#fb4141" size={20} />}
          />
          <DashCard
            title={"customers"}
            count={stats?.totalCustomers}
            today={stats?.todayCustomers}
            icon={<BsPersonCheckFill color="#287f8a" size={20} />}
          />
        </div>
        {/* sales chart */}

        <div className="flex flex-col md:px-5 gap-2">
          <div
            role="tablist"
            className="tabs tabs-boxed bg-transparent border space-x-3 w-fit ms-auto"
          >
            {times?.map((tab) => (
              <a
                role="tab"
                className={cl(
                  "tab text-black",
                  selectedTime == tab ? "bg-primary text-gray-200" : ""
                )}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </a>
            ))}
          </div>
          <Card style={"w-full h-full"}>
            <SalesChart orderStats={orderStats} />
          </Card>
        </div>
        <div className="grid  gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          <Card>
            <ExpenseChart orderStatus={stats?.orderStatus} />
          </Card>
          <Card>
            <TopProduct />
          </Card>
          <Card>
            <TopCategory />
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-5">
          <Card style="p-0 basis-2/3">
            <RecentOrders />
          </Card>
          <Card style="basis-1/3 h-fit">
            <OrdersByCountry />
          </Card>
        </div>
      </div>
    </section>
  );
};

function DashCard({
  icon = "",
  title,
  count,
  today = 0,
  currency = false,
  style = "",
  children,
}) {
  return (
    <div
      className={cl(
        "stats w-full shadow rounded-btn  bg-white text-black",
        style
      )}
    >
      <div className="stat gap-1">
        <div className="stat-title text-gray-900 flex items-center gap-1 capitalize overflow-hidden">
          <span>{icon}</span>
          <span className="text-wrap">{title}</span>
        </div>
        <div className="stat-value font-medium text-3xl">
          {currency ? "$" : ""}
          {count}
        </div>
        <div className="stat-desc flex gap-1 text-slate-800 font-medium">
          {/* <span className="text-green-500">10%</span> */}
          {today !== "" && (
            <span>
              <span className={cl(today > 0 ? "text-green-600 py-3" : "")}>
                {currency ? "+ $" : "+"}
                {today} today
              </span>
            </span>
          )}
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
function SalesChart({ orderStats }) {
  return (
    <div className="wrapper w-full h-full">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={orderStats}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey={"_id"} />
          <YAxis />
          <CartesianGrid strokeDasharray="0 0" />
          <Tooltip />
          {/* <Area
            type="monotone"
            dataKey="totalSales"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          /> */}
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
function TopProduct() {
  const { data: products } = useTopSelling();

  return (
    <div className="p-3">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold ">Top Product</h2>
        {/* <p>Lorem ipsum dolor sit amet consectetur.</p> */}
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto overflow-x-hidden py-2">
        {products?.products.map((ele) => (
          <>
            <div className="flex text-gray-800 text-sm md:text-base">
              <img
                src={ele?.firstVariantImages?.[0]?.url}
                alt="product image"
                className="w-8 h-8 rounded-full"
              />
              <p className="inline-flex flex-col px-2">
                <span
                  className="text-sm text-ellipsis text-inherit capitalize "
                  title={ele?.name}
                >
                  {ele?.name}
                </span>
                <span className="text-xs font-medium text-gray-700 capitalize">
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
        <h2 className="font-bold text-xl text-gray-800">Top Category</h2>
        {/* <p>Lorem ipsum dolor sit amet consectetur.</p> */}
      </div>
      <div className="flex flex-col gap-3 py-3 overflow-y-auto overflow-x-hidden">
        {categoryData?.map((ele) => (
          <>
            <div className="flex text-gray-800 text-sm md:text-base">
              <div className="rounded-full">
                <img
                  src={ele?.categoryImage}
                  alt="product image"
                  className="w-8 h-8 rounded-full"
                />
              </div>

              <p className="inline-flex px-2 flex-col  gap-1">
                {/* <span>{ele.productName}</span> */}
                <span className="text-inherit capitalize text-start">
                  {ele?.categoryName}
                </span>

                <span className="text-xs text-gray-700 font-bold">
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
function ExpenseChart({ orderStatus = {} }) {
  let orderData = [
    { name: "Pending", value: orderStatus?.pending || 0 },
    { name: "Delivered", value: orderStatus?.delivered || 0 },
    { name: "Shipped", value: orderStatus?.shipped || 0 },
  ];
  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];
  if (!orderData) {
    return <div className="w-52 h-52 skeleton"></div>;
  }

  return (
    <div className="wrapper w-full h-[300px]">
      <div className="flex flex-col">
        <h2 className="text-lg font-bold">All Order Stats</h2>
        <p className="text-sm">Lorem ipsum dolor sit amet consectetur.</p>
      </div>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <PieChart>
          <Pie
            data={orderData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {orderData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip key={"name"} />
          <Legend verticalAlign="top" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
const RecentOrders = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useAdminOrders(currentPage, itemsPerPage);
  const [selectedDate, setSelectedDate] = useState<string>("");

  return (
    <>
      {/* Header */}
      <div className="flex  justify-between items-center mb-6">
        <h2 className="text-xl space-x-2 font-bold text-gray-800">
          <span>Recent Orders</span>
          {/* <span className="rounded-btn text-xs bg-green-200 px-2 py-1">
            +20 Orders
          </span> */}
        </h2>
        <div className="flex items-center space-x-4">
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
        {isLoading && (
          <div className="skeleton h-96 columns-1 w-full bg-gray-200 dark:bg-white "></div>
        )}
        <table className="table">
          {/* head */}
          <TableHeader
            columns={["Product", "Customer", "Total", "Status", "Action"]}
            style={"!text-black"}
          />

          <TableBody
            columnsData={data?.orders}
            renderItem={(ele) => {
              return (
                <tr className={cl("text-gray-800 text-base")}>
                  <TableCell>
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
                        <span className="text-sm capitalize text-gray-800">
                          {ele?.firstProduct?.productName}
                        </span>
                        <span className="text-xs text-inherit">
                          +{ele?.products?.length}Products
                        </span>
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="inline-flex flex-col gap-1 text-xs">
                      <p className="text-inherit">
                        {ele?.userDetails?.username}
                      </p>
                      <span className="text-inherit">
                        {ele?.userDetails?.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>${ele?.totalAmount}</TableCell>
                  <TableCell>
                    <Badge status={ele?.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Link
                        to={`orders/${ele?._id}`}
                        className="btn btn-sm btn-ghost rounded-full"
                      >
                        <BsFillEyeFill />
                      </Link>
                    </div>
                  </TableCell>
                </tr>
              );
            }}
          />
        </table>
      </div>
      <AdminPagination
        currentPage={currentPage}
        setPage={setCurrentPage}
        totalPage={Math.ceil(data?.totalOrders / itemsPerPage)}
        itemperPage={itemsPerPage}
        totalLen={data?.totalOrders}
      />
    </>
  );
};
const OrdersByCountry = () => {
  const { data: byCountry } = useAdminOrdersByCountry();

  return (
    <>
      <div className="p-3 h-fit">
        <div className="flex flex-col">
          <h2 className="font-bold text-xl">Orders By Country</h2>
          {/* <p>Lorem ipsum dolor sit amet consectetur.</p> */}
        </div>
        <div className="flex flex-col gap-3 py-3 overflow-y-auto overflow-x-hidden">
          {byCountry?.map((ele) => (
            <>
              <div className="flex text-gray-800 text-sm md:text-base">
                {/* <div className="rounded-full">
                  <img
                    src={ele?.categoryImage}
                    alt="product image"
                    className="w-8 h-8 rounded-full"
                  />
                </div> */}

                <p className="inline-flex px-2 flex-col  gap-1">
                  {/* <span>{ele.productName}</span> */}
                  <span className="font-medium capitalize  text-xl text-start">
                    {ele?._id}
                  </span>

                  <span className="text-xs text-gray-500 font-bold">
                    Sales: {ele?.totalOrders}
                  </span>
                </p>
                <div className="ms-auto flex items-center text-inherit gap-2">
                  <p>${ele?.totalSales}</p>
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
    </>
  );
};

export default Dashbroad;
