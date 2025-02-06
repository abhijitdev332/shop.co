import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  CartPage,
  DeclinedPage,
  Login,
  OrdersPage,
  ProfilePage,
  Register,
  SuccessPage,
  OrdersItemPage,
  CartAddress,
  LoaderScreen,
  PaymentPage,
} from "./pages/page";
import { HomePage } from "./pages/page";
import {
  Product,
  CategoryProduct,
  ProductsBySlug,
} from "./components/component";
import {
  AddCategory,
  AddProduct,
  AddUser,
  AllCategory,
  AllOrders,
  AllProducts,
  AllUsers,
  Dashbroad,
  ProductDetails,
  ViewOrder,
  ViewUser,
  CategoryProducts,
  AddSubCategory,
  SubCategoryProducts,
  ProductEdit,
} from "./pages/adminPages/adminPages";
import InitialData from "./initalData/InitialData";
import {
  AdminProtected,
  GuestProtected,
  UserProtected,
} from "./utils/ProtectedRoute";

// lazy loadings
const HomeLayout = lazy(() => import("./layouts/Home"));
const ProductLayout = lazy(() => import("./layouts/Product"));
const AuthLayout = lazy(() => import("./layouts/Auth"));
const UserLayout = lazy(() => import("./layouts/User"));
const AdminLayout = lazy(() => import("./layouts/Admin"));
const ErrorLayout = lazy(() => import("./layouts/Error"));
// funcs
function SuspenseLayout() {
  return (
    <>
      <Suspense fallback={<LoaderScreen />}>
        <Outlet />
      </Suspense>
    </>
  );
}
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<SuspenseLayout />} errorElement={<ErrorLayout />}>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route
          path="cart/order"
          element={
            <GuestProtected>
              <CartAddress />
            </GuestProtected>
          }
        />
        <Route
          path="payment"
          element={
            <GuestProtected>
              <PaymentPage />
            </GuestProtected>
          }
        />
      </Route>
      <Route
        path="/user"
        element={
          <GuestProtected>
            <UserLayout />
          </GuestProtected>
        }
      >
        <Route index element={<ProfilePage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="orders/:id" element={<OrdersItemPage />} />
      </Route>

      <Route
        path="/auth"
        element={
          <UserProtected>
            <AuthLayout />
          </UserProtected>
        }
      >
        <Route index element={<Login />} />
        <Route path="signup" element={<Register />} />
      </Route>
      <Route path="/product" element={<ProductLayout />}>
        <Route path=":id" element={<Product />} />
        <Route path="category/:id?" element={<CategoryProduct />} />
        <Route path="slug" element={<ProductsBySlug />} />
      </Route>
      <Route
        path="/admin"
        element={
          <AdminProtected>
            <AdminLayout />
          </AdminProtected>
        }
      >
        <Route index element={<Dashbroad />} />
        <Route path="products" element={<AllProducts />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<ProductEdit />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="orders" element={<AllOrders />} />
        <Route path="orders/:id" element={<ViewOrder />} />
        <Route path="users" element={<AllUsers />} />
        <Route path="users/add" element={<AddUser />} />
        <Route path="users/:id" element={<ViewUser />} />
        <Route path="category" element={<AllCategory />} />
        <Route path="category/add" element={<AddCategory />} />
        <Route path="category/:id" element={<CategoryProducts />} />
        <Route path="subcategory/add" element={<AddSubCategory />} />
        <Route path="subcategory/:id" element={<SubCategoryProducts />} />
      </Route>
      <Route
        path="/success"
        element={
          <GuestProtected>
            <SuccessPage />
          </GuestProtected>
        }
      />
      <Route
        path="/declined"
        element={
          <GuestProtected>
            <DeclinedPage />
          </GuestProtected>
        }
      />
      <Route path="/*" element={<ErrorLayout />} />
    </Route>
  )
);

function App() {
  return (
    <Suspense fallback={<LoaderScreen />}>
      <RouterProvider router={router} />
      <InitialData />
    </Suspense>
  );
}

export default App;
