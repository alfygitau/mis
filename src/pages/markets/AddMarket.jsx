import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMarket, getCounties, getMarkets } from "../../sdk/market/market";
import { toast } from "react-toastify";
import { Select, Space, Pagination } from "antd";

const AddMarket = () => {
  const navigate = useNavigate();
  const [counties, setCounties] = useState([]);
  const [subcounties, setSubCounties] = useState([]);
  const [counties1, setCounties1] = useState([]);
  const [subcounties1, setSubCounties1] = useState([]);

  const [wards, setWards] = useState([]);
  const [county, setCounty] = useState("");
  const [subcounty, setSubCounty] = useState("");

  const [wards1, setWards1] = useState([]);
  const [county1, setCounty1] = useState("");
  const [subcounty1, setSubCounty1] = useState("");

  const [marketTitle, setMarketTitle] = useState("");
  const [selectedWards, setSelectedWards] = useState([]);
  const [selectedWards1, setSelectedWards1] = useState([]);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-30");
  const [markets, setMarkets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const handleChange = (value) => {
    setSelectedWards(value);
  };
  const handleChange1 = (value) => {
    setSelectedWards1(value);
  };

  const wardOptions = wards.map((ward) => ({
    value: ward.wardId,
    label: ward.wardName,
  }));

  const wardOptions1 = wards1.map((ward) => ({
    value: ward.wardId,
    label: ward.wardName,
  }));

  const handleCountyChange = (value) => {
    setCounty(value);
    let filteredCounty = counties.find(
      (county) => county.countyId === Number(value)
    );
    setSubCounties(filteredCounty.subCounties);
  };

  const handleCountyChange1 = (value) => {
    setCounty1(value);
    let filteredCounty = counties1.find(
      (county) => county.countyId === Number(value)
    );
    setSubCounties1(filteredCounty.subCounties);
  };

  const handleSubCountyChange1 = (value) => {
    setSubCounty1(value);
    let filteredSubCounty = subcounties1.find(
      (subcounty) => subcounty.subCountyId === Number(value)
    );
    setWards1(filteredSubCounty.wards);
  };

  const handleSubCountyChange = (value) => {
    setSubCounty(value);
    let filteredSubCounty = subcounties.find(
      (subcounty) => subcounty.subCountyId === Number(value)
    );
    setWards(filteredSubCounty.wards);
  };

  const getAllCounties = async () => {
    try {
      const response = await getCounties();
      if (response.status === 200) {
        setCounties(response.data.data.counties);
        setCounties1(response.data.data.counties);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchMarkets = async () => {
    setIsLoading(true);
    try {
      const response = await getMarkets(
        pageNumber,
        pageSize,
        selectedWards,
        startDate,
        endDate
      );
      if (response.status === 200) {
        setMarkets(response.data.data.markets);
        setTotalCount(response.data.data.totalRecords);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      setIsLoading(false);
    }
  };

  const handleCreateMarket = async () => {
    try {
      const response = await createMarket({
        wardId: selectedWards1,
        title: marketTitle,
      });
      if (response.status === 201 || response.status === 200) {
        toast.success("Market created successfully");
        setMarketTitle("");
        setSelectedWards1([]);
        setCounty1("");
        setSubCounty1("");
        setSelectedWards1("");
        fetchMarkets();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    fetchMarkets();
  }, [pageNumber, pageSize, selectedWards, startDate, endDate]);

  useEffect(() => {
    getAllCounties();
  }, []);

  const onPageChange = (page, size) => {
    setPageNumber(page);
    setPageSize(size);
  };

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };
  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-[20px] min-h-[600px]">
        <p className="text-white mt-[20px] text-[14px]">Create a market</p>
        <div className="bg-white p-[20px]">
          <div className="w-[100%] flex justify-between mb-[20px] gap-[20px]">
            <div className="w-[49%] flex flex-col gap-[20px]">
              <select
                type="text"
                value={county1}
                onChange={(e) => handleCountyChange1(e.target.value)}
                placeholder="Enter your phone number"
                className="h-[50px] w-[100%] text-white text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              >
                <option value="">Select your county</option>
                {counties1?.length > 0 &&
                  counties1?.map((county) => (
                    <option key={county.countyId} value={county.countyId}>
                      {county.countyName}
                    </option>
                  ))}
              </select>
              <select
                type="text"
                value={subcounty1}
                onChange={(e) => handleSubCountyChange1(e.target.value)}
                placeholder="Enter your phone number"
                className="h-[50px] w-[100%] text-white text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              >
                <option value="">Select your subcounty</option>
                {subcounties1?.map((subcounty) => (
                  <option
                    key={subcounty?.subCountyId}
                    value={subcounty?.subCountyId}
                  >
                    {subcounty?.subCountyName}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[49%] flex flex-col gap-[20px]">
              <Select
                maxTagCount="responsive"
                style={{ width: "100%", height: "50px", borderRadius: "0px" }}
                placeholder="Select your ward"
                onChange={handleChange1}
                options={wardOptions1}
                optionRender={(option) => <Space>{option.label}</Space>}
              />
              <input
                type="text"
                value={marketTitle}
                onChange={(e) => setMarketTitle(e.target.value)}
                placeholder="Enter the market title"
                className="h-[50px] w-[100%] text-white text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button
              onClick={handleCreateMarket}
              className="bg-[#12B981] text-white px-[20px] h-[45px]"
            >
              Add Market
            </button>
          </div>
        </div>
        <div className="w-[100%] mt-[10px]">
          <p className="text-white mb-[10px] text-[14px]">All Markets</p>
          <div className="w-full h-[90px] bg-white p-[10px] flex lg:justify-between flex-wrap items-center gap-[10px]">
            <select
              type="text"
              value={county}
              onChange={(e) => handleCountyChange(e.target.value)}
              placeholder="Enter your phone number"
              className="h-[50px] w-[19%] text-[#000] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
            >
              <option value="">Select your county</option>
              {counties?.length > 0 &&
                counties?.map((county) => (
                  <option key={county.countyId} value={county.countyId}>
                    {county.countyName}
                  </option>
                ))}
            </select>
            <select
              type="text"
              value={subcounty}
              onChange={(e) => handleSubCountyChange(e.target.value)}
              placeholder="Enter your phone number"
              className="h-[50px] w-[19%] text-[#000] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
            >
              <option value="">Select your subcounty</option>
              {subcounties?.map((subcounty) => (
                <option
                  key={subcounty?.subCountyId}
                  value={subcounty?.subCountyId}
                >
                  {subcounty?.subCountyName}
                </option>
              ))}
            </select>
            <Select
              mode="multiple"
              maxTagCount="responsive"
              style={{ width: "19%", height: "50px", borderRadius: "0px" }}
              placeholder="Select your ward"
              onChange={handleChange}
              options={wardOptions}
              optionRender={(option) => <Space>{option.label}</Space>}
            />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setFirstDate(e.target.value)}
              placeholder="Enter your first name"
              className="h-[50px] w-[19%] text-[#000] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="Enter your first name"
              className="h-[50px] w-[19%] text-[#000] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
            />
          </div>
          <div className="w-full bg-white p-[20px]">
            <div className="flex font-bold border-b-2 text-[13px] h-[45px] items-center">
              <p className="w-[5%] truncate px-[10px]">Id</p>
              <p className="w-[10%] truncate px-[10px]">Market Title</p>
              <p className="w-[15%] truncate px-[10px]">County</p>
              <p className="w-[15%] truncate px-[10px]">Subcounty</p>
              <p className="w-[20%] truncate px-[10px]">Ward</p>
              <p className="w-[15%] truncate px-[10px]">Status</p>
              <p className="w-[15%] truncate px-[10px]">CreatedAt</p>
            </div>
            {markets.length > 0 &&
              markets?.map((market) => (
                <div
                  key={market?.marketId}
                  className="flex text-[13px] border-b h-[45px] items-center"
                >
                  <p className="w-[5%] truncate px-[10px]">
                    {market?.marketId}
                  </p>
                  <p className="w-[10%] truncate px-[10px]">{market.title}</p>
                  <p className="w-[15%] truncate px-[10px]">{market.county}</p>
                  <p className="w-[15%] truncate px-[10px]">
                    {market.subCounty}
                  </p>
                  <p className="w-[20%] truncate px-[10px]">{market.ward}</p>
                  <p className="w-[15%] truncate px-[10px]">Active</p>
                  <p className="w-[15%] truncate px-[10px]">
                    {market.createdAt}
                  </p>
                </div>
              ))}
            {markets.length === 0 && (
              <div className="my-[20px] w-full">
                <p>No record of markets</p>
              </div>
            )}
          </div>
          <div className="w-full flex items-center my-[10px] justify-center">
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              total={totalCount}
              onChange={onPageChange}
              current={pageNumber}
              pageSize={pageSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMarket;
