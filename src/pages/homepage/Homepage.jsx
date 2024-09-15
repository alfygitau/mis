import React from "react";
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

const Homepage = () => {
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
              <p className="text-[18px] font-bold">825</p>
              <div className="h-[25px] w-[70px] bg-[#DCF6E9] rounded-[5px] flex items-center justify-center gap-[10px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                    d="M36 18L24 30L12 18"
                  />
                </svg>
                <p>10.0%</p>
              </div>
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
              <p className="text-[18px] font-bold">125</p>
              <div className="h-[25px] w-[70px] bg-[#DCF6E9] rounded-[5px] flex items-center justify-center gap-[10px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                    d="M36 18L24 30L12 18"
                  />
                </svg>
                <p>10.0%</p>
              </div>
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
              <p className="text-[18px] font-bold">300</p>
              <div className="h-[25px] w-[70px] bg-[#DCF6E9] rounded-[5px] flex items-center justify-center gap-[10px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                    d="M36 18L24 30L12 18"
                  />
                </svg>
                <p>10.0%</p>
              </div>
            </div>
            <p className="text-[14px] w-full truncate">
              Total number of Farm service centers
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
              <p className="text-[18px] font-bold">825</p>
              <div className="h-[25px] w-[70px] bg-[#DCF6E9] rounded-[5px] flex items-center justify-center gap-[10px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                    d="M36 18L24 30L12 18"
                  />
                </svg>
                <p>10.0%</p>
              </div>
            </div>
            <p className="text-[14px] w-full truncate">
              Number of price entries collected
            </p>
          </div>
        </div>
      </div>
      <div className="flex h-[600px] my-[20px] w-full flex justify-between sm:flex-col sm:gap-[20px]">
        <div className="w-[48%] sm:w-[100%] bg-white h-full p-[20px]">
          <p className="text-center text-[15px] font-bold my-[10px]">
            Daily price trends
          </p>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart
              width={400}
              height={300}
              data={data}
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
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="w-[48%] sm:w-[100%] bg-white h-full p-[20px]">
          <p className="text-center text-[15px] font-bold my-[10px]">
            Historical price trends
          </p>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart
              width={400}
              height={300}
              data={data}
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
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex h-[600px] my-[20px] w-full flex justify-between sm:flex-col sm:gap-[20px]">
        <div className="w-[48%] sm:w-[100%] bg-white h-full p-[20px]">
          <p className="text-center my-[10px] font-bold">
            Average prices comparison
          </p>
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
