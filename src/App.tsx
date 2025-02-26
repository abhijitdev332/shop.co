import { lazy, Suspense, useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  CartPage,
  Login,
  OrdersPage,
  ProfilePage,
  Register,
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
  VariantAddPage,
} from "./pages/adminPages/adminPages";
import InitialData from "./initalData/InitialData";
import {
  AdminProtected,
  GuestProtected,
  OfflineStatusProtected,
  UserProtected,
} from "./utils/ProtectedRoute";
import { SnackBar } from "./includes/includes";
import { enableFullscreen } from "./utils/utils";

// lazy loadings
const HomeLayout = lazy(() => import("./layouts/Home"));
const ProductLayout = lazy(() => import("./layouts/Product"));
const AuthLayout = lazy(() => import("./layouts/Auth"));
const UserLayout = lazy(() => import("./layouts/User"));
const AdminLayout = lazy(() => import("./layouts/Admin"));
const ErrorLayout = lazy(() => import("./layouts/Error"));
const OfflineLayout = lazy(() => import("./layouts/Offline"));
// funcs
function SuspenseLayout() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // Prevent the default prompt
      event.preventDefault();
      // Save the event to trigger it later
      setDeferredPrompt(event);

      // Automatically show the prompt after a delay or some other condition
      setTimeout(() => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          // Handle user response
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
              console.log("User accepted the install prompt");
            } else {
              console.log("User dismissed the install prompt");
            }
            // Reset the deferredPrompt so it doesn't show again
            setDeferredPrompt(null);
          });
        }
      }, 1000); // You can adjust the timeout as needed
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, [deferredPrompt]);
  useEffect(() => {
    let abort = new AbortController();
    window.addEventListener(
      "load",
      () => {
        enableFullscreen();
      },
      { signal: abort.signal }
    );

    return () => {
      abort.abort();
    };
  }, []);
  return (
    <>
      <Suspense fallback={<LoaderScreen />}>
        <Outlet />
        <SnackBar />
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
        <Route path="dash" element={<Dashbroad />} />
        <Route path="products" element={<AllProducts />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<ProductEdit />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="products/variant/add/:id" element={<VariantAddPage />} />
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
        path="/offline"
        element={
          <OfflineStatusProtected>
            <OfflineLayout />
          </OfflineStatusProtected>
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
