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
    <div className="w-full mb-[20px]">
      <div className="h-[50px] w-full flex justify-between items-center">
        <p className="text-[15px] font-semibold">SUMMARY</p>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex items-center w-[49%] justify-between">
          <div className="h-[80px] w-[30%] sm:w-[30%] bg-white shadow-md flex items-center gap-[10px] p-[15px]">
            <div className="w-[30%]">
              <div className="h-[60px] w-[60px]  bg-[#E8EFFB] flex items-center justify-center">
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
              <p className="text-[14px] text-center truncate w-full">
                COMMODITIES
              </p>
              <div className="flex w-full items-center justify-center">
                <p className="text-[20px] text-center text-oldGod font-semibold">
                  {summaries?.products}
                </p>
              </div>
            </div>
          </div>
          <div className="h-[80px] w-[30%] sm:w-[30%] bg-white shadow-md flex items-center gap-[10px] p-[15px]">
            <div className="w-[30%]">
              <div className="h-[60px] w-[60px]  bg-[#FCF5E5] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
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
            <div className="flex w-[70%] flex-col gap-[10px] items-start">
              <p className="text-[14px] text-center truncate w-full">MARKETS</p>
              <div className="flex w-full items-center justify-center">
                <p className="text-[18px] text-oldGod font-semibold">
                  {summaries?.markets}
                </p>
              </div>
            </div>
          </div>
          <div className="h-[80px] w-[30%] sm:w-[30%] bg-white shadow-md flex items-center gap-[10px] p-[15px]">
            <div className="w-[30%]">
              <div className="h-[60px] w-[60px]  bg-[#E5F6FB] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 20c0-1.742-1.67-3.223-4-3.773M15 20c0-2.21-2.686-4-6-4s-6 1.79-6 4m12-7a4 4 0 0 0 0-8m-6 8a4 4 0 1 1 0-8a4 4 0 0 1 0 8"
                  />
                </svg>
              </div>
            </div>
            <div className="flex w-[70%] flex-col gap-[10px] items-start">
              <p className="text-[14px] text-center truncate w-full">FSCs</p>
              <div className="flex w-full items-center justify-center">
                <p className="text-[18px] text-oldGod font-semibold">
                  {summaries?.activeFsc}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center w-[49%] justify-between">
          <div className="h-[80px] w-[30%] sm:w-[30%] bg-white shadow-md flex items-center gap-[10px] p-[15px]">
            <div className="w-[30%]">
              <div className="h-[60px] w-[60px]  bg-[#E8EFFB] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M19.388.405a.605.605 0 0 0-1.141.399c.929 2.67-.915 4.664-2.321 5.732l-.568-.814c-.191-.273-.618-.5-.95-.504l-3.188.014a2.16 2.16 0 0 0-1.097.338L.729 12.157a1.01 1.01 0 0 0-.247 1.404l4.269 6.108c.32.455.831.4 1.287.082l9.394-6.588c.27-.191.582-.603.692-.918l.998-3.145c.11-.314.043-.793-.148-1.066l-.346-.496c1.888-1.447 3.848-4.004 2.76-7.133m-4.371 9.358a1.61 1.61 0 0 1-2.24-.396a1.614 1.614 0 0 1 .395-2.246a1.61 1.61 0 0 1 1.868.017c-.272.164-.459.26-.494.275a.606.606 0 0 0 .259 1.153q.13 0 .257-.059q.292-.137.619-.33a1.62 1.62 0 0 1-.664 1.586"
                  />
                </svg>
              </div>
            </div>
            <div className="flex w-[70%] h-[60px] flex-col justify-center items-start">
              <p className="text-[13px] text-center w-full">
                FARM GATE PRICE ENTRIES
              </p>
              <div className="flex w-full items-center justify-center">
                <p className="text-[16px] text-oldGod font-semibold">
                  {summaries?.marketPricesEntries}
                </p>
              </div>
            </div>
          </div>
          <div className="h-[80px] w-[30%] sm:w-[30%] bg-white shadow-md flex items-center gap-[10px] p-[15px]">
            <div className="w-[30%]">
              <div className="h-[60px] w-[60px]  bg-[#E8EFFB] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M19.388.405a.605.605 0 0 0-1.141.399c.929 2.67-.915 4.664-2.321 5.732l-.568-.814c-.191-.273-.618-.5-.95-.504l-3.188.014a2.16 2.16 0 0 0-1.097.338L.729 12.157a1.01 1.01 0 0 0-.247 1.404l4.269 6.108c.32.455.831.4 1.287.082l9.394-6.588c.27-.191.582-.603.692-.918l.998-3.145c.11-.314.043-.793-.148-1.066l-.346-.496c1.888-1.447 3.848-4.004 2.76-7.133m-4.371 9.358a1.61 1.61 0 0 1-2.24-.396a1.614 1.614 0 0 1 .395-2.246a1.61 1.61 0 0 1 1.868.017c-.272.164-.459.26-.494.275a.606.606 0 0 0 .259 1.153q.13 0 .257-.059q.292-.137.619-.33a1.62 1.62 0 0 1-.664 1.586"
                  />
                </svg>
              </div>
            </div>
            <div className="flex w-[70%] h-[60px] flex-col justify-center items-start">
              <p className="text-[13px] text-center w-full">
                RETAIL PRICE ENTRIES
              </p>
              <div className="flex w-full items-center justify-center">
                <p className="text-[18px] text-oldGod font-semibold">
                  {summaries?.marketPricesEntries}
                </p>
              </div>
            </div>
          </div>
          <div className="h-[80px] w-[30%] sm:w-[30%] bg-white shadow-md flex items-center gap-[10px] p-[15px]">
            <div className="w-[30%]">
              <div className="h-[60px] w-[60px]  bg-[#E8EFFB] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M19.388.405a.605.605 0 0 0-1.141.399c.929 2.67-.915 4.664-2.321 5.732l-.568-.814c-.191-.273-.618-.5-.95-.504l-3.188.014a2.16 2.16 0 0 0-1.097.338L.729 12.157a1.01 1.01 0 0 0-.247 1.404l4.269 6.108c.32.455.831.4 1.287.082l9.394-6.588c.27-.191.582-.603.692-.918l.998-3.145c.11-.314.043-.793-.148-1.066l-.346-.496c1.888-1.447 3.848-4.004 2.76-7.133m-4.371 9.358a1.61 1.61 0 0 1-2.24-.396a1.614 1.614 0 0 1 .395-2.246a1.61 1.61 0 0 1 1.868.017c-.272.164-.459.26-.494.275a.606.606 0 0 0 .259 1.153q.13 0 .257-.059q.292-.137.619-.33a1.62 1.62 0 0 1-.664 1.586"
                  />
                </svg>
              </div>
            </div>
            <div className="flex w-[70%] h-[60px] flex-col justify-center items-start">
              <p className="text-[13px] text-center w-full">
                WHOLESALE PRICE ENTRIES
              </p>
              <div className="flex w-full items-center justify-center">
                <p className="text-[18px] text-oldGod font-semibold">
                  {summaries?.marketPricesEntries}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex h-[600px] sm:h-full my-[20px] w-full flex justify-between sm:flex-col sm:gap-[20px]">
          <div className="w-[49%] sm:w-[100%] bg-white h-full p-[20px]">
            <p className="text-center text-[15px] font-semibold my-[10px]">
              Daily product prices
            </p>
            <div className="flex items-center my-[20px] px-[30px] gap-[30px]">
              <input
                className="h-[50px] w-[49%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
                className="h-[50px] w-[49%] text-[#000] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
          <div className="w-[49%] sm:w-[100%] bg-white h-full p-[20px]">
            <p className="text-center my-[10px] font-semibold">
              Markets price comparison
            </p>
            <div className="flex items-center my-[20px] justify-between px-[30px] gap-[10px]">
              <input
                className="h-[50px] w-[30%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                type="date"
                name="pricedate"
                id="pricedate"
                value={marketPricesStartDate}
                onChange={(e) => setMarketPricesStartDate(e.target.value)}
              />
              <input
                className="h-[50px] w-[30%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
                className="h-[50px] w-[30%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
                className="h-[50px] w-[49%] text-[#000] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
        <div className="w-full h-[600px] my-[20px]">
          <div className="w-[100%] sm:w-[100%] bg-white h-full p-[20px]">
            <p className="text-center text-[15px] font-semibold my-[10px]">
              County price trends
            </p>
            <div className="flex items-center my-[20px] px-[30px] gap-[30px]">
              <input
                className="h-[50px] w-[24%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                type="date"
                name="pricedate"
                id="pricedate"
                value={countyStartDate}
                onChange={(e) => setCountyStartDate(e.target.value)}
              />
              <input
                className="h-[50px] w-[24%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
                className="h-[50px] w-[24%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
                className="h-[50px] w-[24%] text-[#000] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
        <div className="h-[600px] my-[20px] w-full">
          <div className="w-[100%] sm:w-[100%] bg-white h-full p-[20px]">
            <p className="text-center text-[15px] font-semibold">
              Market price trends
            </p>
            <div className="flex items-center my-[20px] px-[10px] gap-[10px]">
              <input
                className="h-[50px] w-[19%] text-[14px]  border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                type="date"
                name="pricedate"
                id="pricedate"
                value={marketPricesTrendsStartDate}
                onChange={(e) => setMarketPricesTrendsStartDate(e.target.value)}
              />
              <input
                className="h-[50px] w-[19%] text-[14px]  border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
                className="h-[50px] w-[19%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
                className="h-[50px] w-[19%] text-[#000] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
                className="h-[50px] w-[19%] text-[#000] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
        <div className="flex h-[600px] sm:h-full my-[20px] w-full flex justify-between sm:flex-col sm:gap-[20px]">
          <div className="w-[49%] sm:w-[100%] bg-white h-full p-[20px]">
            <p className="text-center my-[10px] font-semibold">
              County product price comparison
            </p>
            <div className="flex items-center my-[20px] justify-between px-[30px] gap-[10px]">
              <input
                className="h-[50px] w-[30%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                type="date"
                name="pricedate"
                id="pricedate"
                value={countyComparisonStartDate}
                onChange={(e) => setCountyComparisonStartDate(e.target.value)}
              />
              <input
                className="h-[50px] w-[30%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
                className="h-[50px] w-[30%] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
        </div>
      </div>
    </div>
  );
};

export default Homepage;
