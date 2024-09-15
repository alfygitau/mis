import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Homepage from "./pages/homepage/Homepage";
import Register from "./pages/auth/Register";
import Home from "./layout/Home";
import Products from "./pages/products/Products";
import Markets from "./pages/markets/Markets";
import Contributors from "./pages/contributors/Contributors";
import Users from "./pages/users/Users";
import ProductPrices from "./pages/products/ProductPrices";
import AddProduct from "./pages/products/AddProduct";
import AddMarket from "./pages/markets/AddMarket";
import AddContributor from "./pages/contributors/AddContributor";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        <Route path="/dashboard" element={<Home />}>
          <Route index element={<Homepage />} />

          <Route path="products" element={<Products />} />
          <Route path="products/products-prices" element={<ProductPrices />} />
          <Route path="products/add-product" element={<AddProduct />} />

          <Route path="markets" element={<Markets />} />
          <Route path="markets/add-market" element={<AddMarket />} />

          <Route path="contributors" element={<Contributors />} />
          <Route path="contributors/add-fsc" element={<AddContributor />} />

          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
