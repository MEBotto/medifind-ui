import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
const DashboardLayout = lazy(() => import("./pages/(dashboard)/layout"));
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const DashboardIndex = lazy(() => import("./pages/(dashboard)"));
const Account = lazy(() => import("./pages/(dashboard)/account"));
const Checkout = lazy(() => import("./pages/(dashboard)/checkout"));
const Orders = lazy(() => import("./pages/(dashboard)/my_orders"));
const Pharmacies = lazy(() => import("./pages/(dashboard)/pharmacies"));
const Reports = lazy(() => import("./pages/(dashboard)/reports"));
const Cart = lazy(() => import("./pages/(dashboard)/cart"));
const MyProducts = lazy(() => import("./pages/(dashboard)/my_products"));


function App() {
  return (
    <>
      <Suspense fallback={null}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardLayout />} >
          <Route index element={<DashboardIndex />} />
          <Route path="account" element={<Account />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} />
          <Route path="pharmacies" element={<Pharmacies />} />
          <Route path="reports" element={<Reports />} />
          <Route path="my_products" element={<MyProducts />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
      </Suspense>
      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
