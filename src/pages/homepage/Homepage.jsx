import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Label,
} from "recharts";
import {
  getCountyPricesComparison,
  getCountyPriceTrends,
  getDailyPrices,
  getMarketPriceSummaries,
  getMarketPriceTrends,
  getSummaries,
} from "../../sdk/summary/summary";
import { toast } from "react-toastify";
import {
  getAllMarkets,
  getCounties,
  getCountyMarkets,
} from "../../sdk/market/market";
import {
  getAllCountyProducts,
  getAllProducts,
  getMyOwnCountyProducts,
} from "../../sdk/products/products";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const navigate = useNavigate();

  const [summaries, setSummaries] = useState({});
  const [priceCounties, setPriceCounties] = useState([]);
  const [county, setCounty] = useState("13");
  const today = new Date().toISOString().split("T")[0];
  const [priceDate, setPriceDate] = useState(getTodayDate);
  const [dailyPrices, setDailyPrices] = useState([]);
  const [markets, setMarkets] = useState([]);

  const [countyProduct, setCountyProduct] = useState("84");
  const [countyId, setCountyId] = useState("13");
  const [countyStartDate, setCountyStartDate] = useState("2024-05-01");
  const [countyEndDate, setCountyEndDate] = useState(today);
  const [countyPriceTrends, setCountyPriceTrends] = useState([]);
  const [countyProducts, setCountyProducts] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2025-09-01");
  const [selectedWards, setSelectedWards] = useState([]);

  const [countyComparisonStartDate, setCountyComparisonStartDate] =
    useState("2024-05-01");
  const [countyComparisonEndDate, setCountyComparisonEndDate] =
    useState(getTodayDate);
  const [countyComparisonProductId, setCountyComparisonProductId] =
    useState("17");
  const [countyPricesComparison, setCountyPricesComparison] = useState([]);

  const [marketPricesStartDate, setMarketPricesStartDate] =
    useState("2024-05-01");
  const [marketPricesEndDate, setMarketPricesEndDate] = useState(getTodayDate);
  const [marketPricesCountyId, setMarketPricesCountyId] = useState("13");
  const [marketPricesProductId, setMarketPricesProductId] = useState("84");
  const [marketPricesComparison, setMarketPricesComparison] = useState([]);

  const [marketPricesTrendsStartDate, setMarketPricesTrendsStartDate] =
    useState("2024-05-01");
  const [marketPricesTrendsEndDate, setMarketPricesTrendsEndDate] =
    useState(getTodayDate);
  const [marketPricesTrendsCountyId, setMarketPricesTrendsCountyId] =
    useState("13");
  const [marketPricesTrendsProductId, setMarketPricesTrendsProductId] =
    useState("84");
  const [marketPricesTrendsMarketId, setMarketPricesTrendsMarketId] =
    useState("80");
  const [marketPricesTrendsComparison, setMarketPricesTrendsComparison] =
    useState([]);

  const [allCountyProducts, setAllCountyProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [countyMarkets, setCountyMarkets] = useState([]);
  const [allMyCountyProducts, setAllMyCountyProducts] = useState([]);

  const getAllCounties = async () => {
    try {
      const response = await getCounties();
      if (response.status === 200) {
        setPriceCounties(response.data.data.counties);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const handleCountyChange = (value) => {
    setCounty(value);
  };
  const handleMarketCountyChange = (value) => {
    fetchProducts(value);
    setMarketPricesCountyId(value);
  };
  const handleMarketTrendsCountyChange = (value) => {
    setMarketPricesTrendsCountyId(value);
  };

  const fetchSummary = async () => {
    try {
      const response = await getSummaries();
      if (response.status === 200) {
        setSummaries(response.data.data.summaries);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const fetchDailyPricesSummaries = async () => {
    try {
      const response = await getDailyPrices(priceDate, county);
      if (response.status === 200) {
        console.log(response.data.data.dailyPrices);
        setDailyPrices(response.data.data.dailyPrices);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const fetchCountyProductPrices = async () => {
    try {
      const response = await getCountyPriceTrends(
        countyProduct,
        countyId,
        countyStartDate,
        countyEndDate
      );
      if (response.status === 200) {
        setCountyPriceTrends(response.data.data.pricesTrend);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const fetchProducts = async (value = 13) => {
    try {
      const response = await getMyOwnCountyProducts(value);
      if (response.status === 200) {
        setCountyProducts(response.data.data.countyProducts);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const fetchProductsByCounty = async () => {
    try {
      const response = await getMyOwnCountyProducts(marketPricesTrendsCountyId);
      if (response.status === 200) {
        setAllMyCountyProducts(response.data.data.countyProducts);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    fetchProductsByCounty();
  }, [marketPricesTrendsCountyId]);

  const fetchAllCountyProducts = async () => {
    try {
      const response = await getAllCountyProducts();
      if (response.status === 200) {
        setAllCountyProducts(response.data.data.countyProducts);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const fetchCountyComparisonProductPrices = async () => {
    try {
      const response = await getCountyPricesComparison(
        countyComparisonProductId,
        countyComparisonStartDate,
        countyComparisonEndDate
      );
      if (response.status === 200) {
        setCountyPricesComparison(response.data.data.pricesComparison);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const fetchMarketPricesComparison = async () => {
    try {
      const response = await getMarketPriceSummaries(
        marketPricesCountyId,
        marketPricesProductId,
        marketPricesStartDate,
        marketPricesEndDate
      );
      if (response.status === 200) {
        setMarketPricesComparison(response.data.data.marketPrices);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const fetchMarketPriceTrends = async () => {
    try {
      const response = await getMarketPriceTrends(
        marketPricesTrendsCountyId,
        marketPricesTrendsProductId,
        marketPricesTrendsMarketId,
        marketPricesTrendsStartDate,
        marketPricesTrendsEndDate
      );
      if (response.status === 200) {
        setMarketPricesTrendsComparison(response.data.data.marketPricesTrends);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const fetchMarkets = async () => {
    try {
      const response = await getAllMarkets();
      if (response.status === 200) {
        setMarkets(response.data.data.markets);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
  const fetchMarketsByCounty = async () => {
    try {
      const response = await getCountyMarkets(marketPricesTrendsCountyId);
      if (response.status === 200) {
        setMarkets(response.data.data.markets);
        setCountyMarkets(response.data.data.markets);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    fetchMarketsByCounty();
  }, [marketPricesTrendsCountyId]);

  const fetchAllMyProducts = async () => {
    try {
      const response = await getAllProducts();
      if (response.status === 200) {
        setAllProducts(response.data.data.products);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    fetchSummary();
    getAllCounties();
    fetchMarkets();
    fetchProducts();
    fetchAllCountyProducts();
    fetchAllMyProducts();
  }, []);

  useEffect(() => {
    fetchDailyPricesSummaries();
  }, [priceDate, county]);

  useEffect(() => {
    fetchCountyProductPrices();
  }, [countyProduct, countyId, countyStartDate, countyEndDate]);

  useEffect(() => {
    fetchCountyComparisonProductPrices();
  }, [
    countyComparisonStartDate,
    countyComparisonProductId,
    countyComparisonEndDate,
  ]);

  useEffect(() => {
    fetchMarketPriceTrends();
  }, [
    marketPricesTrendsCountyId,
    marketPricesTrendsProductId,
    marketPricesTrendsMarketId,
    marketPricesTrendsStartDate,
    marketPricesTrendsEndDate,
  ]);

  useEffect(() => {
    fetchMarketPricesComparison();
  }, [
    marketPricesCountyId,
    marketPricesProductId,
    marketPricesStartDate,
    marketPricesEndDate,
  ]);
  return (
    <div className="w-full mb-[20px]">
      <div className="flex w-full sm:flex-col sm:gap-[20px] mt-[30px] justify-between">
        <div className="flex items-center w-[49%] sm:w-[100%] justify-between">
          <div
            onClick={() => navigate("/dashboard/products")}
            className="h-[80px] cursor-pointer w-[30%] sm:w-[30%] bg-white shadow-md flex items-center gap-[10px] p-[15px]"
          >
            <div className="w-[40%] sm:hidden">
              <div className="h-[60px] w-full rounded bg-[#C3B00A] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 2048 2048"
                >
                  <path
                    fill="#fff"
                    d="M128 1792q0 27 10 50t27 40t41 28t50 10h640l257 128H256q-53 0-99-20t-82-55t-55-81t-20-100V256q0-49 21-95t57-82t82-57t96-22h1408v681l-128-64V128H256q-23 0-46 11t-41 30t-29 41t-12 46v1316q29-17 61-26t67-10h512v128H256q-27 0-50 10t-40 27t-28 41t-10 50m1920-777v762l-576 287l-576-287v-762l576-287zm-576-144l-369 184l369 184l369-184zm-448 827l384 191v-539l-384-192zm896 0v-540l-384 192v539z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex w-[60%] sm:w-[100%] h-[60px] flex-col justify-between items-center">
              <p className="text-[11px] font-bold text-center truncate w-full">
                VALUE
                <br /> CHAINS
              </p>
              <div className="flex w-full items-center justify-center">
                <p className="text-[18px] text-center text-[#A19E3B] font-semibold">
                  {summaries?.products}
                </p>
              </div>
            </div>
          </div>
          <div
            onClick={() => navigate("/dashboard/markets")}
            className="h-[80px] cursor-pointer w-[30%] sm:w-[30%] bg-white shadow-md flex items-center gap-[10px] p-[15px]"
          >
            <div className="w-[40%] sm:hidden">
              <div className="h-[60px] w-full rounded bg-[#49B847] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 48 48"
                >
                  <g
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                  >
                    <path d="M38 14H10a2 2 0 0 0-2 2v26a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V16a2 2 0 0 0-2-2" />
                    <path d="M17 18v-7a7 7 0 1 1 14 0v7" />
                  </g>
                </svg>
              </div>
            </div>
            <div className="flex w-[60%] sm:w-[100%] flex-col gap-[10px] ijustify-between items-center">
              <p className="text-[11px] font-bold text-center truncate w-full">
                MARKETS
              </p>
              <div className="flex w-full items-center justify-center">
                <p className="text-[18px] text-[#A19E3B] font-semibold">
                  {summaries?.markets}
                </p>
              </div>
            </div>
          </div>
          <div
            onClick={() => navigate("/dashboard/contributors")}
            className="h-[80px] cursor-pointer w-[30%] sm:w-[30%] bg-white shadow-md flex items-center gap-[10px] p-[15px]"
          >
            <div className="w-[40%] sm:hidden">
              <div className="h-[60px] w-full rounded bg-[#94C9E2] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 20c0-1.742-1.67-3.223-4-3.773M15 20c0-2.21-2.686-4-6-4s-6 1.79-6 4m12-7a4 4 0 0 0 0-8m-6 8a4 4 0 1 1 0-8a4 4 0 0 1 0 8"
                  />
                </svg>
              </div>
            </div>
            <div className="flex w-[60%] sm:w-[100%] flex-col gap-[10px] justify-between items-center">
              <p className="text-[11px] font-bold text-center truncate w-full">
                FSCs
              </p>
              <div className="flex w-full items-center justify-center">
                <p className="text-[18px] text-[#A19E3B] font-semibold">
                  {summaries?.activeFsc}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center w-[49%] sm:w-[100%] justify-between">
          <div
            onClick={() => navigate("/dashboard/products/products-prices")}
            className="h-[80px] cursor-pointer w-[30%] sm:w-[30%] bg-white shadow-md flex items-center gap-[10px] p-[15px]"
          >
            <div className="w-[40%] sm:hidden">
              <div className="h-[60px] w-[100%] rounded bg-[#00599A] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#fff"
                    d="M19.388.405a.605.605 0 0 0-1.141.399c.929 2.67-.915 4.664-2.321 5.732l-.568-.814c-.191-.273-.618-.5-.95-.504l-3.188.014a2.16 2.16 0 0 0-1.097.338L.729 12.157a1.01 1.01 0 0 0-.247 1.404l4.269 6.108c.32.455.831.4 1.287.082l9.394-6.588c.27-.191.582-.603.692-.918l.998-3.145c.11-.314.043-.793-.148-1.066l-.346-.496c1.888-1.447 3.848-4.004 2.76-7.133m-4.371 9.358a1.61 1.61 0 0 1-2.24-.396a1.614 1.614 0 0 1 .395-2.246a1.61 1.61 0 0 1 1.868.017c-.272.164-.459.26-.494.275a.606.606 0 0 0 .259 1.153q.13 0 .257-.059q.292-.137.619-.33a1.62 1.62 0 0 1-.664 1.586"
                  />
                </svg>
              </div>
            </div>
            <div className="flex w-[60%] sm:w-[100%] h-[60px] flex-col justify-between items-center">
              <p className="text-[11px] font-bold text-center w-full">
                FARM
                <br /> PRICES
              </p>
              <div className="flex w-full items-center justify-center">
                <p className="text-[16px] text-[#A19E3B] font-semibold">
                  {summaries?.farmPricesEntries}
                </p>
              </div>
            </div>
          </div>
          <div
            onClick={() => navigate("/dashboard/products/products-prices")}
            className="h-[80px] cursor-pointer w-[30%] sm:w-[30%] bg-white shadow-md flex items-center gap-[10px] p-[15px]"
          >
            <div className="w-[40%] sm:hidden">
              <div className="h-[60px] w-[100%] rounded bg-[#413324] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#fff"
                    d="M12.825 10.653c.118-.258.445-.497.727-.529s.539-.29.571-.572c.034-.28.272-.608.529-.727a.69.69 0 0 0 .369-.72c-.058-.278.068-.663.276-.854a.69.69 0 0 0 .127-.801a1.02 1.02 0 0 1 0-.897a.69.69 0 0 0-.127-.801c-.208-.193-.333-.577-.276-.854a.69.69 0 0 0-.369-.722a1.03 1.03 0 0 1-.529-.727a.69.69 0 0 0-.571-.572a1.02 1.02 0 0 1-.727-.528a.69.69 0 0 0-.722-.366a1.02 1.02 0 0 1-.854-.278c-.193-.21-.553-.266-.8-.127s-.652.139-.898 0a.68.68 0 0 0-.801.125a1.02 1.02 0 0 1-.854.278a.685.685 0 0 0-.72.367c-.119.256-.446.495-.728.527a.69.69 0 0 0-.572.573a1.02 1.02 0 0 1-.529.726a.69.69 0 0 0-.366.722c.055.277-.07.662-.278.854s-.266.552-.127.801c.139.246.139.651 0 .897a.69.69 0 0 0 .127.802c.209.19.333.575.278.854a.69.69 0 0 0 .366.72c.258.119.495.447.528.727c.034.282.29.54.572.572s.609.272.728.529a.69.69 0 0 0 .72.366c.278-.055.663.069.854.278a.69.69 0 0 0 .801.127c.246-.139.651-.139.898 0s.607.081.8-.127c.193-.21.576-.333.854-.278a.69.69 0 0 0 .723-.365M10 9.399a3.4 3.4 0 1 1 0-6.8a3.4 3.4 0 0 1 0 6.8m-4.025 2.01l-1.243 7.049l3.128-.464l2.781 1.506l1.238-7.021a6.7 6.7 0 0 1-5.904-1.07m7.986.048a7 7 0 0 1-.99.597l-.748 4.236l3.369-1.828z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex w-[60%] sm:w-[100%] h-[60px] flex-col justify-between items-center">
              <p className="text-[11px] font-bold text-center w-full">
                RETAIL
                <br /> PRICES
              </p>
              <div className="flex w-full items-center justify-center">
                <p className="text-[18px] text-[#A19E3B] font-semibold">
                  {summaries?.retailPricesEntries}
                </p>
              </div>
            </div>
          </div>
          <div
            onClick={() => navigate("/dashboard/products/products-prices")}
            className="h-[80px] cursor-pointer w-[30%] sm:w-[30%] bg-white shadow-md flex items-center gap-[10px] p-[15px]"
          >
            <div className="w-[40%] sm:hidden">
              <div className="h-[60px] w-[100%] rounded bg-[#FCB040] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path
                      stroke="#fff"
                      stroke-width="1.5"
                      d="M9.781 3.89c.564-.48.846-.72 1.14-.861a2.5 2.5 0 0 1 2.157 0c.295.14.577.38 1.14.861c.225.192.337.287.457.367a2.5 2.5 0 0 0 .908.376c.141.028.288.04.582.064c.739.058 1.108.088 1.416.197a2.5 2.5 0 0 1 1.525 1.524c.109.309.138.678.197 1.416c.023.294.035.441.063.583c.064.324.192.633.376.907c.08.12.176.232.367.457c.48.564.721.846.862 1.14a2.5 2.5 0 0 1 0 2.157c-.14.294-.381.576-.862 1.14a5 5 0 0 0-.367.457a2.5 2.5 0 0 0-.376.907c-.028.142-.04.289-.063.583c-.059.738-.088 1.108-.197 1.416a2.5 2.5 0 0 1-1.525 1.524c-.308.11-.677.139-1.416.197c-.294.024-.44.036-.582.064a2.5 2.5 0 0 0-.908.376a5 5 0 0 0-.456.367c-.564.48-.846.72-1.14.861a2.5 2.5 0 0 1-2.157 0c-.295-.14-.577-.38-1.14-.861a5 5 0 0 0-.457-.367a2.5 2.5 0 0 0-.908-.376a5 5 0 0 0-.582-.064c-.739-.058-1.108-.088-1.416-.197a2.5 2.5 0 0 1-1.525-1.524c-.109-.308-.138-.678-.197-1.416a5 5 0 0 0-.063-.583a2.5 2.5 0 0 0-.376-.907c-.08-.12-.176-.232-.367-.457c-.48-.564-.721-.846-.862-1.14a2.5 2.5 0 0 1 0-2.157c.141-.294.381-.576.862-1.14c.191-.225.287-.337.367-.457a2.5 2.5 0 0 0 .376-.907c.028-.142.04-.289.063-.583c.059-.738.088-1.107.197-1.416A2.5 2.5 0 0 1 6.42 4.894c.308-.109.677-.139 1.416-.197c.294-.024.44-.036.582-.064a2.5 2.5 0 0 0 .908-.376c.12-.08.232-.175.456-.367Z"
                    />
                    <path
                      stroke="#fff"
                      stroke-linecap="round"
                      stroke-width="1.5"
                      d="m9 15l6-6"
                    />
                    <path
                      fill="#fff"
                      d="M15.5 14.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div className="flex w-[60%] sm:w-[100%] h-[60px] flex-col justify-between items-center">
              <p className="text-[11px] truncate font-bold text-center w-full">
                WHOLESALE
                <br /> PRICES
              </p>
              <div className="flex w-full items-center justify-center">
                <p className="text-[18px] text-[#A19E3B] font-semibold">
                  {summaries?.wholesalePricesEntries}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex h-[600px] sm:h-full my-[20px] w-full flex justify-between sm:flex-col sm:gap-[20px]">
          <div className="w-[49%] shadow-md sm:w-[100%] bg-white h-full p-[20px]">
            <p className="text-center text-[15px] font-semibold my-[10px]">
              Daily value chains prices
            </p>
            <div className="flex items-center my-[20px] px-[30px] gap-[30px]">
              <input
                className="h-[40px] w-[49%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                type="date"
                name="pricedate"
                id="pricedate"
                value={priceDate}
                onChange={(e) => setPriceDate(e.target.value)}
              />
              <select
                type="text"
                value={county}
                onChange={(e) => handleCountyChange(e.target.value)}
                placeholder="Enter your county"
                className="h-[40px] w-[49%] text-[#000] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              >
                {priceCounties?.length > 0 &&
                  priceCounties?.map((county) => (
                    <option key={county.countyId} value={county.countyId}>
                      {county.countyName}
                    </option>
                  ))}
              </select>
            </div>
            {dailyPrices?.length > 0 ? (
              <ResponsiveContainer width="100%" height="80%">
                <BarChart
                  width={500}
                  height={300}
                  data={dailyPrices}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="product" tick={{ fontSize: "11px" }}>
                    <Label
                      value="Value Chains"
                      offset={-5}
                      position="insideBottom"
                      style={{ fill: "#00599A", fontSize: "11px" }}
                    />
                  </XAxis>
                  <YAxis>
                    <Label
                      value="Price per kg (Ksh)"
                      angle={-90}
                      position="insideLeft"
                      style={{ fill: "#00599A", fontSize: "11px" }}
                    />
                  </YAxis>
                  <XAxis dataKey="product" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="farmPrice" name="Farm Price" fill="#B9B436" />
                  <Bar
                    dataKey="retailPrice"
                    name="Retail Price"
                    fill="#94C9E2"
                  />
                  <Bar
                    dataKey="wholesalePrice"
                    name="Wholesale Price"
                    fill="#FCB040"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="p-[30px]">
                <p>No data on daily value chains prices</p>
              </div>
            )}
          </div>
          <div className="w-[49%] shadow-md sm:w-[100%] bg-white h-full p-[20px]">
            <p className="text-center my-[10px] font-semibold">
              Markets price comparison
            </p>
            <div className="flex items-center my-[20px] justify-between px-[30px] gap-[10px]">
              <input
                className="h-[40px] w-[30%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                type="date"
                name="pricedate"
                id="pricedate"
                value={marketPricesStartDate}
                onChange={(e) => setMarketPricesStartDate(e.target.value)}
              />
              <input
                className="h-[40px] w-[30%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                type="date"
                name="pricedate"
                id="pricedate"
                value={marketPricesEndDate}
                onChange={(e) => setMarketPricesEndDate(e.target.value)}
              />
              <select
                type="text"
                value={marketPricesCountyId}
                onChange={(e) => handleMarketCountyChange(e.target.value)}
                placeholder="Enter your county"
                className="h-[40px] w-[49%] text-[#000] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              >
                {priceCounties?.length > 0 &&
                  priceCounties?.map((county) => (
                    <option key={county.countyId} value={county.countyId}>
                      {county.countyName}
                    </option>
                  ))}
              </select>
              <select
                value={marketPricesProductId}
                onChange={(e) => setMarketPricesProductId(e.target.value)}
                placeholder="Enter county product"
                className="h-[40px] w-[30%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              >
                <option value="">Select value chain</option>
                {countyProducts?.length > 0 &&
                  countyProducts?.map((product) => (
                    <option
                      key={product?.countyProductId}
                      value={product?.countyProductId}
                    >
                      {product?.product}
                    </option>
                  ))}
              </select>
            </div>
            {marketPricesComparison?.length > 0 &&
            marketPricesComparison[0]?.marketName ? (
              <ResponsiveContainer width="100%" height="80%">
                <BarChart
                  width={500}
                  height={300}
                  data={marketPricesComparison}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="marketName" tick={{ fontSize: "10px" }}>
                    <Label
                      value="Markets"
                      offset={-5}
                      position="insideBottom"
                      style={{ fill: "#00599A", fontSize: "11px" }}
                    />
                  </XAxis>
                  <YAxis>
                    <Label
                      value="Price (Ksh)"
                      angle={-90}
                      position="insideLeft"
                      style={{ fill: "#00599A", fontSize: "11px" }}
                    />
                  </YAxis>
                  <XAxis dataKey="marketName" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="averageFarmPrice"
                    name="Farm Price"
                    fill="#B9B436"
                  />
                  <Bar
                    dataKey="averageRetailPrice"
                    name="Retail Price"
                    fill="#94C9E2"
                  />
                  <Bar
                    dataKey="averageWholesalePrice"
                    name="Wholesale Price"
                    fill="#FCB040"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="p-[30px]">
                <p>No data on market prices comparison</p>
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-[600px] my-[20px]">
          <div className="w-[100%] shadow-md sm:w-[100%] bg-white h-full p-[20px]">
            <p className="text-center text-[15px] font-semibold my-[10px]">
              County price trends
            </p>
            <div className="flex items-center my-[20px] px-[30px] gap-[30px]">
              <input
                className="h-[40px] w-[24%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                type="date"
                name="pricedate"
                id="pricedate"
                value={countyStartDate}
                onChange={(e) => setCountyStartDate(e.target.value)}
              />
              <input
                className="h-[40px] w-[24%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                type="date"
                name="pricedate"
                id="pricedate"
                value={countyEndDate}
                onChange={(e) => setCountyEndDate(e.target.value)}
              />
              <select
                type="text"
                value={county}
                onChange={(e) => handleCountyChange(e.target.value)}
                placeholder="Enter your county"
                className="h-[40px] w-[24%] text-[#000] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              >
                {priceCounties?.length > 0 &&
                  priceCounties?.map((county) => (
                    <option key={county.countyId} value={county.countyId}>
                      {county.countyName}
                    </option>
                  ))}
              </select>
              <select
                value={countyProduct}
                onChange={(e) => setCountyProduct(e.target.value)}
                placeholder="Enter county product"
                className="h-[40px] w-[24%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              >
                {countyProducts?.length > 0 &&
                  countyProducts?.map((product) => (
                    <option
                      key={product?.countyProductId}
                      value={product?.countyProductId}
                    >
                      {product?.product}
                    </option>
                  ))}
              </select>
            </div>
            {countyPriceTrends?.length > 0 ? (
              <ResponsiveContainer width="100%" height="80%">
                <LineChart
                  width={400}
                  height={300}
                  data={countyPriceTrends}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: "10px" }}>
                    <Label
                      value="Date"
                      offset={-5}
                      position="insideBottom"
                      style={{ fill: "#00599A", fontSize: "11px" }}
                    />
                  </XAxis>
                  <YAxis>
                    <Label
                      value="Price (Ksh)"
                      angle={-90}
                      position="insideLeft"
                      style={{ fill: "#00599A", fontSize: "11px" }}
                    />
                  </YAxis>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="farmPrice"
                    stroke="#94C9E2"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="retailPrice"
                    stroke="#C3B00A"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="wholesalePrice"
                    stroke="#FCB040"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="p-[30px]">
                <p>No data on county price trends</p>
              </div>
            )}
          </div>
        </div>
        <div className="h-[600px] my-[20px] w-full">
          <div className="w-[100%] shadow-md sm:w-[100%] bg-white h-full p-[20px]">
            <p className="text-center text-[15px] font-semibold">
              Market price trends
            </p>
            <div className="flex items-center my-[20px] px-[10px] gap-[10px]">
              <input
                className="h-[40px] w-[19%] text-[14px]  border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                type="date"
                name="pricedate"
                id="pricedate"
                value={marketPricesTrendsStartDate}
                onChange={(e) => setMarketPricesTrendsStartDate(e.target.value)}
              />
              <input
                className="h-[40px] w-[19%] text-[14px]  border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                type="date"
                name="pricedate"
                id="pricedate"
                value={marketPricesTrendsEndDate}
                onChange={(e) => setMarketPricesTrendsEndDate(e.target.value)}
              />
              <select
                value={marketPricesTrendsCountyId}
                onChange={(e) => handleMarketTrendsCountyChange(e.target.value)}
                placeholder="Enter your county"
                className="h-[40px] w-[19%] text-[#000] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              >
                {priceCounties?.length > 0 &&
                  priceCounties?.map((county) => (
                    <option key={county.countyId} value={county.countyId}>
                      {county.countyName}
                    </option>
                  ))}
              </select>
              <select
                value={marketPricesTrendsMarketId}
                onChange={(e) => setMarketPricesTrendsMarketId(e.target.value)}
                placeholder="Enter your county"
                className="h-[40px] w-[19%] text-[#000] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              >
                <option value="">Select market</option>
                {countyMarkets?.length > 0 &&
                  countyMarkets?.map((market) => (
                    <option key={market.marketId} value={market.marketId}>
                      {market.title}
                    </option>
                  ))}
              </select>
              <select
                value={marketPricesTrendsProductId}
                onChange={(e) => setMarketPricesTrendsProductId(e.target.value)}
                placeholder="Enter county product"
                className="h-[40px] w-[19%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              >
                <option value="">Select commodity</option>
                {allMyCountyProducts?.length > 0 &&
                  allMyCountyProducts?.map((product) => (
                    <option
                      key={product?.countyProductId}
                      value={product?.countyProductId}
                    >
                      {product?.product}
                    </option>
                  ))}
              </select>
            </div>
            {marketPricesTrendsComparison?.length > 0 ? (
              <ResponsiveContainer width="100%" height="80%">
                <LineChart
                  width={400}
                  height={300}
                  data={marketPricesTrendsComparison}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="priceDate" tick={{ fontSize: "10px" }}>
                    <Label
                      value="Date"
                      offset={-5}
                      position="insideBottom"
                      style={{ fill: "#00599A", fontSize: "11px" }}
                    />
                  </XAxis>
                  <YAxis>
                    <Label
                      value="Price (Ksh)"
                      angle={-90}
                      position="insideLeft"
                      style={{ fill: "#00599A", fontSize: "11px" }}
                    />
                  </YAxis>
                  <XAxis dataKey="priceDate" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="farmPrice"
                    stroke="#94C9E2"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="retailPrice"
                    stroke="#C3B00A"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="wholesalePrice"
                    stroke="#FCB040"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="p-[10px]">
                <p>No data on market price trends</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex h-[600px] sm:h-[600px] my-[20px] w-full flex justify-between sm:flex-col sm:gap-[20px]">
          <div className="w-[100%] shadow-md sm:w-[100%] bg-white h-full p-[20px]">
            <p className="text-center my-[10px] font-semibold">
              County value chains price comparison
            </p>
            <div className="flex items-center my-[20px] justify-between px-[30px] gap-[10px]">
              <input
                className="h-[40px] w-[30%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                type="date"
                name="pricedate"
                id="pricedate"
                value={countyComparisonStartDate}
                onChange={(e) => setCountyComparisonStartDate(e.target.value)}
              />
              <input
                className="h-[40px] w-[30%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                type="date"
                name="pricedate"
                id="pricedate"
                value={countyComparisonEndDate}
                onChange={(e) => setCountyComparisonEndDate(e.target.value)}
              />
              <select
                value={countyComparisonProductId}
                onChange={(e) => setCountyComparisonProductId(e.target.value)}
                placeholder="Enter county product"
                className="h-[40px] w-[30%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              >
                {allProducts?.length > 0 &&
                  allProducts?.map((product) => (
                    <option key={product?.productId} value={product?.productId}>
                      {product?.productName}
                    </option>
                  ))}
              </select>
            </div>
            {countyPricesComparison?.length > 0 ? (
              <ResponsiveContainer width="100%" height="80%">
                <BarChart
                  width={500}
                  height={300}
                  data={countyPricesComparison}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="county" tick={{ fontSize: "10px" }}>
                    <Label
                      value="Counties"
                      offset={-5}
                      position="insideBottom"
                      style={{ fill: "#00599A", fontSize: "11px" }}
                    />
                  </XAxis>
                  <YAxis>
                    <Label
                      value="Price (Ksh)"
                      angle={-90}
                      position="insideLeft"
                      style={{ fill: "#00599A", fontSize: "11px" }}
                    />
                  </YAxis>
                  <XAxis dataKey="county" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="farmPrice" name="Farm Price" fill="#B9B436" />
                  <Bar
                    dataKey="retailPrice"
                    name="Retail Price"
                    fill="#94C9E2"
                  />
                  <Bar
                    dataKey="wholesalePrice"
                    name="Wholesale Price"
                    fill="#FCB040"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="p-[30px]">
                <p>No data on county price comparison</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
