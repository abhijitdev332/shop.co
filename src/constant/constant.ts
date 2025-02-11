import { IoReceiptSharp } from "react-icons/io5";
import { MdDashboard, MdPeopleAlt, MdStorefront } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
export const sidebarMenu = [
  {
    id: 1,
    tilte: "Dashbroad",
    link: "dash",
    icon: MdDashboard,
  },
  {
    id: 2,
    tilte: "Products",
    link: "products",
    icon: MdStorefront,
  },
  {
    id: 3,
    tilte: "Category",
    link: "category",
    icon: TbCategoryFilled,
  },
  {
    id: 4,
    tilte: "Orders",
    link: "orders",
    icon: IoReceiptSharp,
  },
  {
    id: 5,
    tilte: "Users",
    link: "users",
    icon: MdPeopleAlt,
  },
];
