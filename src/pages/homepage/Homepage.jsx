import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
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
  Rectangle,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  getCountyPricesComparison,
  getCountyPriceTrends,
  getDailyPrices,
  getSummaries,
} from "../../sdk/summary/summary";
import { toast } from "react-toastify";
import { getCounties } from "../../sdk/market/market";
import { getCountyProducts } from "../../sdk/products/products";

const Homepage = () => {
  const [summaries, setSummaries] = useState({});
  const [priceCounties, setPriceCounties] = useState([]);
  const [county, setCounty] = useState("13");
  const today = new Date().toISOString().split("T")[0];
  const [priceDate, setPriceDate] = useState(today);
  const [dailyPrices, setDailyPrices] = useState([]);

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

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const prices = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const counties = [
    { name: "Siaya", value: 400 },
    { name: "Kakamega", value: 300 },
    { name: "Isiolo", value: 300 },
    { name: "Nakuru", value: 500 },
    { name: "Mombasa", value: 120 },
    { name: "Nairobi", value: 400 },
    { name: "Turkana", value: 280 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

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
      const response = await getCountyProducts(
        pageNumber,
        pageSize,
        selectedWards,
        startDate,
        endDate
      );
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

  useEffect(() => {
    fetchSummary();
    getAllCounties();
    fetchDailyPricesSummaries();
    fetchCountyProductPrices();
  }, []);

  useEffect(() => {
    fetchCountyComparisonProductPrices();
  }, [
    countyComparisonStartDate,
    countyComparisonProductId,
    countyComparisonEndDate,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [pageNumber, pageSize, startDate, endDate]);

  return (
    <div className="w-full">
      <div className="h-[60px] w-full flex justify-between items-center">
        <p className="text-[15px] font-bold">SUMMARY</p>
        <Breadcrumb
          separator=">"
          style={{ fontSize: "15px" }}
          items={[
            {
              title: "Home",
            },
            {
              title: "Summary",
            },
          ]}
        />
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
            <p className="text-[14px] truncate w-full">
              ACTIVE FSC(FARM SERVICE CENTER)
            </p>
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
      <div className="flex h-[600px] my-[20px] w-full flex justify-between sm:flex-col sm:gap-[20px]">
        <div className="w-[48%] sm:w-[100%] bg-white h-full p-[20px]">
          <p className="text-center text-[15px] font-bold my-[10px]">
            Daily price trends
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
              class="h-[40px] w-[49%] rounded text-gray-400 text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
              class="h-[40px] w-[24%] rounded text-gray-400 text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
      <div className="flex h-[600px] my-[20px] w-full flex justify-between sm:flex-col sm:gap-[20px]">
        <div className="w-[48%] sm:w-[100%] bg-white h-full p-[20px]">
          <p className="text-center my-[10px] font-bold">
            County product price comparison
          </p>
          <div className="flex items-center my-[20px] px-[30px] gap-[30px]">
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
              <XAxis dataKey="county" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="farmPrice" fill="#B9B436" />
              <Bar dataKey="marketPrice" fill="#94C9E2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-[48%] sm:w-[100%] bg-white h-full p-[20px]">
          <p className="text-center my-[10px] font-bold">Price variance</p>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              width={500}
              height={300}
              data={prices}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="pv"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="uv"
                fill="#82ca9d"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex h-[600px] my-[20px] w-full flex justify-between sm:flex-col sm:gap-[20px]">
        <div className="w-[48%] sm:w-[100%] bg-white h-full p-[20px]">
          <p className="text-center text-[15px] font-bold">
            Contributor participation
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Tooltip />
              <Pie
                data={counties}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={200}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
