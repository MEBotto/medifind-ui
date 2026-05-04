import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./pages/(dashboard)/layout";
import Login from "./pages/login";
import Register from "./pages/register";
import DashboardIndex from "./pages/(dashboard)";
import Account from "./pages/(dashboard)/account";
import Checkout from "./pages/(dashboard)/checkout";
import Orders from "./pages/(dashboard)/my_orders";
import Pharmacies from "./pages/(dashboard)/pharmacies";
import Reports from "./pages/(dashboard)/reports";
import Cart from "./pages/(dashboard)/cart";
import MyProducts from "./pages/(dashboard)/my_products";
import { Toaster } from "sonner"

function App() {
  return (
    <>
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
      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
