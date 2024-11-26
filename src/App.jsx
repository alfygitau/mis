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
import CountyProducts from "./pages/products/CountyProducts";
import MarketPoints from "./pages/market-points/MarketPoints";
import AddPriceRange from "./pages/products/AddPriceRange";
import SendOtp from "./pages/auth/SendOtp";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ResetPassword from "./pages/auth/ResetPassword";
import ErrorBoundary from "./components/error/ErrorBoundary";
import AveragePrices from "./pages/products/AveragePrices";
import PricesPerGram from "./pages/products/PricesPerGram";

function App() {
  return (
    <>
      {/* <ErrorBoundary> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/send-one-time-password" element={<SendOtp />} />
        <Route path="/auth/verify-one-time-password" element={<VerifyOtp />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />

        <Route path="/dashboard" element={<Home />}>
          <Route index element={<Homepage />} />

          <Route path="products" element={<Products />} />
          <Route path="products/products-prices" element={<ProductPrices />} />
          <Route path="products/county-products" element={<CountyProducts />} />

          <Route
            path="products/county-product-price-range"
            element={<AddPriceRange />}
          />

          <Route
            path="products/products-average-prices"
            element={<AveragePrices />}
          />
          <Route
            path="products/products-prices-per-kg"
            element={<PricesPerGram />}
          />

          <Route path="markets" element={<Markets />} />
          <Route path="contributors" element={<Contributors />} />

          <Route path="users" element={<Users />} />
          <Route path="market-points" element={<MarketPoints />} />
        </Route>
      </Routes>
      {/* </ErrorBoundary> */}
    </>
  );
}

export default App;
