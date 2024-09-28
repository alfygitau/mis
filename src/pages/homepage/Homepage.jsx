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
import { getAllMarkets, getCounties } from "../../sdk/market/market";
import { getAllCountyProducts } from "../../sdk/products/products";

const Homepage = () => {
  const [summaries, setSummaries] = useState({});
  const [priceCounties, setPriceCounties] = useState([]);
  const [county, setCounty] = useState("13");
  const today = new Date().toISOString().split("T")[0];
  const [priceDate, setPriceDate] = useState("2024-09-21");
  const [dailyPrices, setDailyPrices] = useState([]);
  const [markets, setMarkets] = useState([]);

  const [countyProduct, setCountyProduct] = useState("2");
  const [countyId, setCountyId] = useState("13");
  const [countyStartDate, setCountyStartDate] = useState("2024-05-01");
  const [countyEndDate, setCountyEndDate] = useState(today);
  const [countyPriceTrends, setCountyPriceTrends] = useState([]);
  const [countyProducts, setCountyProducts] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2025-09-01");
  const [selectedWards, setSelectedWards] = useState([]);

  const [countyComparisonStartDate, setCountyComparisonStartDate] =
    useState("2024-05-01");
  const [countyComparisonEndDate, setCountyComparisonEndDate] = useState(today);
  const [countyComparisonProductId, setCountyComparisonProductId] =
    useState("2");
  const [countyPricesComparison, setCountyPricesComparison] = useState([]);

  const [marketPricesStartDate, setMarketPricesStartDate] =
    useState("2024-05-01");
  const [marketPricesEndDate, setMarketPricesEndDate] = useState("2024-09-22");
  const [marketPricesCountyId, setMarketPricesCountyId] = useState("13");
  const [marketPricesProductId, setMarketPricesProductId] = useState("2");
  const [marketPricesComparison, setMarketPricesComparison] = useState([]);

  const [marketPricesTrendsStartDate, setMarketPricesTrendsStartDate] =
    useState("2024-05-01");
  const [marketPricesTrendsEndDate, setMarketPricesTrendsEndDate] =
    useState("2024-09-22");
  const [marketPricesTrendsCountyId, setMarketPricesTrendsCountyId] =
    useState("13");
  const [marketPricesTrendsProductId, setMarketPricesTrendsProductId] =
    useState("2");
  const [marketPricesTrendsMarketId, setMarketPricesTrendsMarketId] =
    useState("1");
  const [marketPricesTrendsComparison, setMarketPricesTrendsComparison] =
    useState([]);

  const getAllCounties = async () => {
    try {
      const response = await getCounties();
      if (response.status === 200) {
        setPriceCounties(response.data.data.counties);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleCountyChange = (value) => {
    setCounty(value);
  };
  const handleMarketCountyChange = (value) => {
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
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchDailyPricesSummaries = async () => {
    try {
      const response = await getDailyPrices(priceDate, county);
      if (response.status === 200) {
        setDailyPrices(response.data.data.dailyPrices);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
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
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getAllCountyProducts();
      if (response.status === 200) {
        setCountyProducts(response.data.data.countyProducts);
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

  useEffect(() => {
    fetchSummary();
    getAllCounties();
    fetchMarkets();
    fetchProducts();
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
    <div className="w-full">
      <div className="h-[60px] w-full flex justify-between items-center">
        <p className="text-[15px] font-bold">SUMMARY</p>
      </div>
      <div className="flex items-center w-full sm:flex-wrap sm:gap-[20px] justify-between">
        <div className="h-[150px] w-[24%] sm:w-[250px] bg-white shadow-md flex items-center gap-[10px] p-[15px]">
          <div className="w-[30%]">
            <div className="h-[60px] w-[60px] rounded-[5px] bg-[#E8EFFB] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 2048 2048"
              >
                <path
                  fill="currentColor"
                  d="M128 1792q0 27 10 50t27 40t41 28t50 10h640l257 128H256q-53 0-99-20t-82-55t-55-81t-20-100V256q0-49 21-95t57-82t82-57t96-22h1408v681l-128-64V128H256q-23 0-46 11t-41 30t-29 41t-12 46v1316q29-17 61-26t67-10h512v128H256q-27 0-50 10t-40 27t-28 41t-10 50m1920-777v762l-576 287l-576-287v-762l576-287zm-576-144l-369 184l369 184l369-184zm-448 827l384 191v-539l-384-192zm896 0v-540l-384 192v539z"
                />
              </svg>
            </div>
          </div>
          <div className="flex w-[70%] flex-col gap-[10px] items-start">
            <p className="text-[14px] truncate w-full">ACTIVE PRODUCTS</p>
            <div className="flex w-full items-center justify-between">
              <p className="text-[18px] font-bold">{summaries?.products}</p>
            </div>
            <p className="text-[14px] w-full truncate">
              Total number of products
            </p>
          </div>
        </div>
        <div className="h-[150px] w-[24%] sm:w-[250px] bg-white shadow-md flex items-center gap-[10px] p-[15px]">
          <div className="w-[30%]">
            <div className="h-[60px] w-[60px] rounded-[5px] bg-[#FCF5E5] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 2048 2048"
              >
                <path
                  fill="currentColor"
                  d="M128 1792q0 27 10 50t27 40t41 28t50 10h640l257 128H256q-53 0-99-20t-82-55t-55-81t-20-100V256q0-49 21-95t57-82t82-57t96-22h1408v681l-128-64V128H256q-23 0-46 11t-41 30t-29 41t-12 46v1316q29-17 61-26t67-10h512v128H256q-27 0-50 10t-40 27t-28 41t-10 50m1920-777v762l-576 287l-576-287v-762l576-287zm-576-144l-369 184l369 184l369-184zm-448 827l384 191v-539l-384-192zm896 0v-540l-384 192v539z"
                />
              </svg>
            </div>
          </div>
          <div className="flex w-[70%] flex-col gap-[10px] items-start">
            <p className="text-[14px] truncate w-full">ACTIVE MARKETS</p>
            <div className="flex w-full items-center justify-between">
              <p className="text-[18px] font-bold">{summaries?.markets}</p>
            </div>
            <p className="text-[14px] w-full truncate">
              Total number of markets
            </p>
          </div>
        </div>
        <div className="h-[150px] w-[24%] sm:w-[250px] bg-white shadow-md flex items-center gap-[10px] p-[15px]">
          <div className="w-[30%]">
            <div className="h-[60px] w-[60px] rounded-[5px] bg-[#E5F6FB] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 2048 2048"
              >
                <path
                  fill="currentColor"
                  d="M128 1792q0 27 10 50t27 40t41 28t50 10h640l257 128H256q-53 0-99-20t-82-55t-55-81t-20-100V256q0-49 21-95t57-82t82-57t96-22h1408v681l-128-64V128H256q-23 0-46 11t-41 30t-29 41t-12 46v1316q29-17 61-26t67-10h512v128H256q-27 0-50 10t-40 27t-28 41t-10 50m1920-777v762l-576 287l-576-287v-762l576-287zm-576-144l-369 184l369 184l369-184zm-448 827l384 191v-539l-384-192zm896 0v-540l-384 192v539z"
                />
              </svg>
            </div>
          </div>
          <div className="flex w-[70%] flex-col gap-[10px] items-start">
            <p className="text-[14px] truncate w-full">ACTIVE FSCs</p>
            <div className="flex w-full items-center justify-between">
              <p className="text-[18px] font-bold">{summaries?.activeFsc}</p>
            </div>
            <p className="text-[14px] w-full truncate">
              Number of Farm service centers
            </p>
          </div>
        </div>
        <div className="h-[150px] w-[24%] sm:w-[250px] bg-white shadow-md flex items-center gap-[10px] p-[15px]">
          <div className="w-[30%]">
            <div className="h-[60px] w-[60px] rounded-[5px] bg-[#E8EFFB] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 2048 2048"
              >
                <path
                  fill="currentColor"
                  d="M128 1792q0 27 10 50t27 40t41 28t50 10h640l257 128H256q-53 0-99-20t-82-55t-55-81t-20-100V256q0-49 21-95t57-82t82-57t96-22h1408v681l-128-64V128H256q-23 0-46 11t-41 30t-29 41t-12 46v1316q29-17 61-26t67-10h512v128H256q-27 0-50 10t-40 27t-28 41t-10 50m1920-777v762l-576 287l-576-287v-762l576-287zm-576-144l-369 184l369 184l369-184zm-448 827l384 191v-539l-384-192zm896 0v-540l-384 192v539z"
                />
              </svg>
            </div>
          </div>
          <div className="flex w-[70%] flex-col gap-[10px] items-start">
            <p className="text-[14px] truncate w-full">TOTAL PRICE ENTRIES</p>
            <div className="flex w-full items-center justify-between">
              <p className="text-[18px] font-bold">
                {summaries?.marketPricesEntries}
              </p>
            </div>
            <p className="text-[14px] w-full truncate">
              Price entries collected
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex h-[600px] sm:h-full my-[20px] w-full flex justify-between sm:flex-col sm:gap-[20px]">
          <div className="w-[48%] sm:w-[100%] bg-white h-full p-[20px]">
            <p className="text-center text-[15px] font-bold my-[10px]">
              Daily product prices
            </p>
            <div className="flex items-center my-[20px] px-[30px] gap-[30px]">
              <input
                className="h-[40px] w-[49%] text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
                class="h-[40px] w-[49%] rounded text-gray-600 text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              >
                {priceCounties?.length > 0 &&
                  priceCounties?.map((county) => (
                    <option key={county.countyId} value={county.countyId}>
                      {county.countyName}
                    </option>
                  ))}
              </select>
            </div>
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
                {/* XAxis with label */}
                <XAxis dataKey="product">
                  <Label
                    value="Products"
                    offset={-5}
                    position="insideBottom"
                    style={{ fill: "blue" }}
                  />
                </XAxis>

                {/* YAxis with label */}
                <YAxis>
                  <Label
                    value="Price (KES)"
                    angle={-90}
                    position="insideLeft"
                    style={{ fill: "blue" }}
                  />
                </YAxis>
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="farmPrice" fill="#B9B436" />
                <Bar dataKey="marketPrice" fill="#94C9E2" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-[48%] sm:w-[100%] bg-white h-full p-[20px]">
            <p className="text-center text-[15px] font-bold my-[10px]">
              County price trends
            </p>
            <div className="flex items-center my-[20px] px-[30px] gap-[30px]">
              <input
                className="h-[40px] w-[24%] text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                type="date"
                name="pricedate"
                id="pricedate"
                value={countyStartDate}
                onChange={(e) => setCountyStartDate(e.target.value)}
              />
              <input
                className="h-[40px] w-[24%] text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                type="date"
                name="pricedate"
                id="pricedate"
                value={countyEndDate}
                onChange={(e) => setCountyEndDate(e.target.value)}
              />
              <select
                value={countyProduct}
                onChange={(e) => setCountyProduct(e.target.value)}
                placeholder="Enter county product"
                className="h-[40px] w-[24%] text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
              <select
                type="text"
                value={county}
                onChange={(e) => handleCountyChange(e.target.value)}
                placeholder="Enter your county"
                class="h-[40px] w-[24%] rounded text-gray-600 text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              >
                {priceCounties?.length > 0 &&
                  priceCounties?.map((county) => (
                    <option key={county.countyId} value={county.countyId}>
                      {county.countyName}
                    </option>
                  ))}
              </select>
            </div>
            <ResponsiveContainer width="100%" height="80%">
              <LineChart
                width={400}
                height={300}
                data={countyPriceTrends}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                {/* XAxis with label */}
                <XAxis dataKey="date">
                  <Label
                    value="Date"
                    offset={-5}
                    position="insideBottom"
                    style={{ fill: "blue" }}
                  />
                </XAxis>

                {/* YAxis with label */}
                <YAxis>
                  <Label
                    value="Price (KES)"
                    angle={-90}
                    position="insideLeft"
                    style={{ fill: "blue" }}
                  />
                </YAxis>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="farmPrice"
                  stroke="#B9B436"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="marketPrice" stroke="#94C9E2" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex h-[600px] sm:h-full my-[20px] w-full flex justify-between sm:flex-col sm:gap-[20px]">
          <div className="w-[48%] sm:w-[100%] bg-white h-full p-[20px]">
            <p className="text-center my-[10px] font-bold">
              County product price comparison
            </p>
            <div className="flex items-center my-[20px] justify-between px-[30px] gap-[10px]">
              <input
                className="h-[40px] w-[30%] text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                type="date"
                name="pricedate"
                id="pricedate"
                value={countyComparisonStartDate}
                onChange={(e) => setCountyComparisonStartDate(e.target.value)}
              />
              <input
                className="h-[40px] w-[30%] text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
                className="h-[40px] w-[30%] text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
                {/* XAxis with label */}
                <XAxis dataKey="county">
                  <Label
                    value="Counties"
                    offset={-5}
                    position="insideBottom"
                    style={{ fill: "blue" }}
                  />
                </XAxis>

                {/* YAxis with label */}
                <YAxis>
                  <Label
                    value="Price (KES)"
                    angle={-90}
                    position="insideLeft"
                    style={{ fill: "blue" }}
                  />
                </YAxis>
                <XAxis dataKey="county" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="farmPrice" fill="#B9B436" />
                <Bar dataKey="marketPrice" fill="#94C9E2" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-[48%] sm:w-[100%] bg-white h-full p-[20px]">
            <p className="text-center my-[10px] font-bold">
              Markets price comparison
            </p>
            <div className="flex items-center my-[20px] justify-between px-[30px] gap-[10px]">
              <input
                className="h-[40px] w-[30%] text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                type="date"
                name="pricedate"
                id="pricedate"
                value={marketPricesStartDate}
                onChange={(e) => setMarketPricesStartDate(e.target.value)}
              />
              <input
                className="h-[40px] w-[30%] text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                type="date"
                name="pricedate"
                id="pricedate"
                value={marketPricesEndDate}
                onChange={(e) => setMarketPricesEndDate(e.target.value)}
              />
              <select
                value={marketPricesProductId}
                onChange={(e) => setMarketPricesProductId(e.target.value)}
                placeholder="Enter county product"
                className="h-[40px] w-[30%] text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
              <select
                type="text"
                value={marketPricesCountyId}
                onChange={(e) => handleMarketCountyChange(e.target.value)}
                placeholder="Enter your county"
                class="h-[40px] w-[49%] rounded text-gray-600 text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              >
                {priceCounties?.length > 0 &&
                  priceCounties?.map((county) => (
                    <option key={county.countyId} value={county.countyId}>
                      {county.countyName}
                    </option>
                  ))}
              </select>
            </div>
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
                {/* XAxis with label */}
                <XAxis dataKey="marketName">
                  <Label
                    value="Markets"
                    offset={-5}
                    position="insideBottom"
                    style={{ fill: "blue" }}
                  />
                </XAxis>

                {/* YAxis with label */}
                <YAxis>
                  <Label
                    value="Price (KES)"
                    angle={-90}
                    position="insideLeft"
                    style={{ fill: "blue" }}
                  />
                </YAxis>
                <XAxis dataKey="marketName" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="marketPrice" fill="#B9B436" />
                <Bar dataKey="farmPrice" fill="#94C9E2" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex h-[600px] sm:h-full  my-[20px] w-full flex justify-between sm:flex-col sm:gap-[20px]">
          <div className="w-[48%] sm:w-[100%] bg-white h-full p-[20px]">
            <p className="text-center text-[15px] font-bold">
              Market price trends
            </p>
            <div className="flex items-center my-[20px] px-[30px] gap-[10px]">
              <input
                className="h-[40px] w-[19%] text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                type="date"
                name="pricedate"
                id="pricedate"
                value={marketPricesTrendsStartDate}
                onChange={(e) => setMarketPricesTrendsStartDate(e.target.value)}
              />
              <input
                className="h-[40px] w-[19%] text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                type="date"
                name="pricedate"
                id="pricedate"
                value={marketPricesTrendsEndDate}
                onChange={(e) => setMarketPricesTrendsEndDate(e.target.value)}
              />
              <select
                value={marketPricesTrendsProductId}
                onChange={(e) => setMarketPricesTrendsProductId(e.target.value)}
                placeholder="Enter county product"
                className="h-[40px] w-[19%] text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
              <select
                value={marketPricesTrendsCountyId}
                onChange={(e) => handleMarketTrendsCountyChange(e.target.value)}
                placeholder="Enter your county"
                class="h-[40px] w-[19%] rounded text-gray-600 text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
                class="h-[40px] w-[19%] rounded text-gray-600 text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              >
                {markets?.length > 0 &&
                  markets?.map((market) => (
                    <option key={market.marketId} value={market.marketId}>
                      {market.title}
                    </option>
                  ))}
              </select>
            </div>
            <ResponsiveContainer width="100%" height="80%">
              <LineChart
                width={400}
                height={300}
                data={marketPricesTrendsComparison}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                {/* XAxis with label */}
                <XAxis dataKey="priceDate">
                  <Label
                    value="Date"
                    offset={-5}
                    position="insideBottom"
                    style={{ fill: "blue" }}
                  />
                </XAxis>

                {/* YAxis with label */}
                <YAxis>
                  <Label
                    value="Price (KES)"
                    angle={-90}
                    position="insideLeft"
                    style={{ fill: "blue" }}
                  />
                </YAxis>
                <XAxis dataKey="priceDate" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="farmPrice"
                  stroke="#B9B436"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="marketPrice" stroke="#94C9E2" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
