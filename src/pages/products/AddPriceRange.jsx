import React, { useEffect, useState } from "react";
import {
  addCountyProductPriceRange,
  getAllCountyProducts,
  getCountyProductsPriceRanges,
  getMyCountyProducts,
  getUnitsOfMeasurement,
} from "../../sdk/products/products";
import { toast } from "react-toastify";
import { Modal, Pagination, Select, Space } from "antd";
import { getCounties } from "../../sdk/market/market";
import Arrow from "../../components/Arrow";
import { useAuth } from "../../contexts/AuthContext";

const AddPriceRange = () => {
  const [priceRanges, setPriceRanges] = useState([]);
  const [exportedPriceRanges, setExportedPriceRanges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countyProducts, setCountyProducts] = useState([]);
  const [countyProduct, setCountyProduct] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rewardPoints, setRewardPoints] = useState("");
  const [counties, setCounties] = useState([]);
  const [myCounties, setMyCounties] = useState([]);
  const [subcounties, setSubCounties] = useState([]);
  const [wards, setWards] = useState([]);
  const [county, setCounty] = useState("");
  const [myCounty, setMyCounty] = useState("");
  const [subcounty, setSubCounty] = useState("");
  const [ward, setWard] = useState("");
  const [selectedWards, setSelectedWards] = useState([]);
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2025-09-01");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [createLoading, setCreateLoading] = useState(false);
  const [unitOfMeasurement, setUnitOfMeasurement] = useState("");
  const [unitsOfMeasurement, setUnitsOfMeasurement] = useState([]);
  const { user } = useAuth();

  const handleChange = (value) => {
    setSelectedWards(value);
  };

  const wardOptions = wards.map((ward) => ({
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

  const fetchUnitsOfMeasurement = async () => {
    try {
      const response = await getUnitsOfMeasurement();
      if (response.status === 200) {
        setUnitsOfMeasurement(response.data.data);
      } else {
        setUnitOfMeasurement([]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    fetchUnitsOfMeasurement();
  }, []);

  const handleSubCountyChange = (value) => {
    setSubCounty(value);
    let filteredSubCounty = subcounties.find(
      (subcounty) => subcounty.subCountyId === Number(value)
    );
    setWards(filteredSubCounty.wards);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const createProductPriceRange = async () => {
    setCreateLoading(true);
    try {
      const response = await addCountyProductPriceRange(
        countyProduct,
        Number(minPrice),
        Number(maxPrice),
        Number(rewardPoints),
        Number(unitOfMeasurement)
      );
      if (response.status === 200) {
        setCreateLoading(false);
        toast.success("Price range added");
        setCountyProduct("");
        setMinPrice("");
        setMaxPrice("");
        setRewardPoints("");
        handleOk();
        fetchPriceRange();
      } else {
        toast.error(response?.message);
        setCreateLoading(false);
      }
    } catch (error) {
      setCreateLoading(false);
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const fetchPriceRange = async () => {
    setLoading(true);
    try {
      const response = await getCountyProductsPriceRanges(
        pageNumber,
        pageSize,
        selectedWards,
        startDate,
        endDate,
        county,
        subcounty
      );
      if (response.status === 200) {
        setPriceRanges(response.data.data.priceRangeData);
        setTotalCount(response.data.data.totalCount);
        setLoading(false);
      } else {
        setPriceRanges([]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
  const fetchExportedPriceRange = async () => {
    try {
      const response = await getCountyProductsPriceRanges(
        pageNumber,
        100000,
        selectedWards,
        startDate,
        endDate,
        county,
        subcounty
      );
      if (response.status === 200) {
        setExportedPriceRanges(response.data.data.priceRangeData);
      } else {
        setExportedPriceRanges([]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const fetchCountyProducts = async (county) => {
    try {
      const response = await getMyCountyProducts(county);
      if (response.status === 200) {
        setCountyProducts(response.data.data.countyProducts);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const handleMyCounty = (e) => {
    setMyCounty(e.target.value);
    fetchCountyProducts(e.target.value);
  };

  const getAllCounties = async () => {
    try {
      const response = await getCounties();
      if (response.status === 200) {
        setCounties(response.data.data.counties);
        setMyCounties(response.data.data.counties);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const onPageChange = (page, size) => {
    setPageNumber(page);
    setPageSize(size);
  };

  useEffect(() => {
    getAllCounties();
  }, []);

  useEffect(() => {
    fetchPriceRange();
    fetchExportedPriceRange();
  }, [
    pageNumber,
    pageSize,
    selectedWards,
    startDate,
    endDate,
    county,
    subcounty,
  ]);

  const showTotal = (total) => `Total ${total} items`;

  const jsonToCsv = (data) => {
    const headers = Object.keys(data[0]).join(",") + "\n";
    const rows = data.map((row) => Object.values(row).join(",")).join("\n");
    return headers + rows;
  };

  const downloadCsv = (myData) => {
    const csv = jsonToCsv(myData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Price ranges.csv";
    link.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div>
      <Modal
        centered
        width={700}
        title="Add a county value chain price range"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="bg-white my-[20px] w-full">
          <div className="flex w-full mb-[15px] items-center justify-between">
            <div className="w-[48%] flex flex-col">
              <label htmlFor="msisdn">County</label>
              <select
                type="text"
                value={myCounty}
                onChange={handleMyCounty}
                placeholder="Enter your county"
                className="h-[45px] w-[100%] text-[#000] text-[14px] border border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              >
                <option value="">Select county</option>
                {myCounties?.length > 0 &&
                  myCounties?.map((county) => (
                    <option key={county.countyId} value={county.countyId}>
                      {county.countyName}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-[48%] flex flex-col">
              <label htmlFor="msisdn">County Commodity</label>
              <select
                value={countyProduct}
                onChange={(e) => setCountyProduct(e.target.value)}
                placeholder="Select county product"
                className="h-[45px] w-[100%] text-[14px] border border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              >
                <option value="">Select county commodity</option>
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
          </div>
          <div className="w-full mb-[15px]">
            <div className="flex w-[100%] flex-col">
              <label htmlFor="name">Select a unit of measurement</label>
              <select
                type="text"
                value={unitOfMeasurement}
                onChange={(e) => setUnitOfMeasurement(e.target.value)}
                placeholder="Enter the product name"
                className="h-[50px] text-[#000] w-full text-[14px] border border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              >
                <option value="">Select unit of measurement</option>
                {unitsOfMeasurement &&
                  unitsOfMeasurement?.map((unit) => (
                    <option
                      key={unit?.measurementUnitId}
                      value={unit?.measurementUnitId}
                    >
                      {unit?.title}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="flex items-center mb-[15px] justify-between">
            <div className="w-[48%] flex flex-col">
              <label htmlFor="msisdn">Minimum Price</label>
              <input
                type="text"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Enter the minimum price"
                className="h-[45px] w-full text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              />
            </div>
            <div className="w-[48%] flex flex-col">
              <label htmlFor="msisdn">Maximum Price</label>
              <input
                type="text"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Enter the maximum price"
                className="h-[45px] w-full text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-[48%] flex flex-col">
              <label htmlFor="msisdn">Reward Points</label>
              <input
                type="text"
                value={rewardPoints}
                onChange={(e) => setRewardPoints(e.target.value)}
                placeholder="Enter reward points"
                className="h-[45px] w-full text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              />
            </div>
          </div>
        </div>
        <div className="w-full my-[20px] flex items-center gap-[20px] justify-end">
          <button
            onClick={handleCancel}
            className="h-[35px] px-[20px] min-w-[120px] rounded bg-[#DD6D71] text-[#fff] text-[12px]"
          >
            Cancel
          </button>
          <button
            disabled={createLoading}
            onClick={createProductPriceRange}
            className="h-[35px] flex items-center justify-center gap-[10px] border px-[20px] min-w-[120px] rounded border-gray-300 bg-[#A19E3B] text-[#fff] text-[12px]"
          >
            {createLoading && (
              <svg
                aria-hidden="true"
                class="w-[16px] h-[16px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            )}
            Submit
          </button>
        </div>
      </Modal>
      <div className="flex items-center mt-[10px] text-[13px] justify-between">
        <p className="text-[13px] uppercase font-bold">Price ranges</p>
      </div>
      <div className="w-full h-[60px] rounded shadow-md mt-[10px] bg-white px-[10px] flex items-center justify-between">
        <select
          type="text"
          value={county}
          onChange={(e) => handleCountyChange(e.target.value)}
          placeholder="Enter your phone number"
          className="h-[40px] w-[17%] text-[#000] text-[12px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
          className="h-[40px] w-[17%] text-[#000] text-[12px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
        >
          <option value="">Select your subcounty</option>
          {subcounties?.map((subcounty) => (
            <option key={subcounty?.subCountyId} value={subcounty?.subCountyId}>
              {subcounty?.subCountyName}
            </option>
          ))}
        </select>
        <Select
          suffixIcon={<Arrow />}
          mode="multiple"
          maxTagCount="responsive"
          style={{
            width: "17%",
            height: "40px",
            borderRadius: "0px",
            fontSize: "12px",
          }}
          placeholder="Select your ward"
          onChange={handleChange}
          options={wardOptions}
          optionRender={(option) => <Space>{option.label}</Space>}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setFirstDate(e.target.value)}
          placeholder="Enter your start date"
          className="h-[40px] w-[17%] text-[#000] text-[12px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="Enter your end date"
          className="h-[40px] w-[17%] text-[#000] text-[12px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
        />
        <div className="flex w-[7%] items-center gap-[20px]">
          <button
            onClick={() => downloadCsv(exportedPriceRanges)}
            className="h-[40px] w-[40px] rounded flex items-center font-bold justify-center gap-[10px] bg-oldGod text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M6 20h12M12 4v12m0 0l3.5-3.5M12 16l-3.5-3.5"
              />
            </svg>
          </button>
          <button
            onClick={showModal}
            className="h-[40px] w-[40px] bg-[#00599A] rounded flex items-center font-bold justify-center gap-[10px] text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M18 10h-4V6a2 2 0 0 0-4 0l.071 4H6a2 2 0 0 0 0 4l4.071-.071L10 18a2 2 0 0 0 4 0v-4.071L18 14a2 2 0 0 0 0-4"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="w-full bg-white rounded my-[10px] px-[20px] py-[10px]">
        <div className="flex text-[13px] font-bold border-b-2 h-[45px] items-center">
          <p className="w-[8%] truncate px-[10px]">Id</p>
          <p className="w-[10%] truncate px-[10px]">Name</p>
          <p className="w-[15%] truncate px-[10px]">Unit of measure</p>
          <p className="w-[15%] truncate px-[10px]">Min. Price</p>
          <p className="w-[15%] truncate px-[10px]">Max. Price</p>
          <p className="w-[10%] truncate px-[10px]">Created By</p>
          <p className="w-[15%] truncate px-[10px]">Date Created</p>
          <p className="w-[12%] truncate px-[10px]">Status</p>
        </div>
        {loading ? (
          <div className="my-[20px] flex items-center justify-center min-h-[600px] w-full">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-white fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : priceRanges?.length > 0 ? (
          priceRanges?.map((product) => (
            <div
              key={product?.priceRangeSettingId}
              className="flex text-[13px] border-b h-[35px] items-center"
            >
              <p className="w-[8%] text-[#00599A] cursor-pointer truncate px-[10px]">
                #{product?.priceRangeSettingId}
              </p>
              <p className="w-[10%] truncate px-[10px]">
                {product.productName}
              </p>
              <p className="w-[15%] truncate px-[10px]">
                {product.measurementUnit}
              </p>
              <p className="w-[15%] truncate px-[10px]">
                {new Intl.NumberFormat("en-KE", {
                  style: "currency",
                  currency: "KES",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(product.minPrice)}
              </p>
              <p className="w-[15%] truncate px-[10px]">
                {new Intl.NumberFormat("en-KE", {
                  style: "currency",
                  currency: "KES",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(product.maxPrice)}
              </p>
              <p className="w-[10%] truncate px-[10px]">{product.createdBy}</p>
              <p className="w-[15%] truncate px-[10px]">{product.createdAt}</p>
              <p className="w-[12%] truncate px-[10px]">
                {product.isActive === 1 ? (
                  <div className="bg-[#DEF8DD] text-[#000] rounded flex items-center justify-center text-[12px] w-[60px]">
                    Active
                  </div>
                ) : (
                  <div className="bg-[#DD6D71] text-[#fff] rounded flex items-center justify-center text-[12px] w-[60px]">
                    Inactive
                  </div>
                )}
              </p>
              {/* <div className="w-[15%] flex items-center gap-[10px] px-[10px] truncate">
                <div className="flex items-center justify-center gap-[5px] text-[13px] bg-[#00599A] py-[2px] cursor-pointer px-[10px] text-white rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 12 12"
                  >
                    <path
                      fill="currentColor"
                      d="M7.736 1.56a1.914 1.914 0 0 1 2.707 2.708l-.234.234l-2.707-2.707zm-.941.942L1.65 7.646a.5.5 0 0 0-.136.255l-.504 2.5a.5.5 0 0 0 .588.59l2.504-.5a.5.5 0 0 0 .255-.137l5.145-5.145z"
                    />
                  </svg>
                  Edit
                </div>
                <div className="flex items-center justify-center gap-[5px] py-[3px] text-[13px] bg-[#DD6D71] cursor-pointer px-[10px] text-white rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1"
                    />
                  </svg>
                  Delete
                </div>
              </div> */}
            </div>
          ))
        ) : (
          <div className="my-[20px] w-full">
            <p>No record of value chains price ranges</p>
          </div>
        )}
        <div className="w-full flex items-center mt-[10px] justify-end">
          <Pagination
            showSizeChanger
            defaultPageSize={15}
            total={totalCount}
            onChange={onPageChange}
            current={pageNumber}
            pageSize={pageSize}
            pageSizeOptions={[15, 20, 25, 30]}
            showTotal={showTotal}
            showQuickJumper
            size="small"
          />
        </div>
      </div>
    </div>
  );
};

export default AddPriceRange;
