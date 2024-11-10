import React, { useEffect, useState } from "react";
import {
  getAllProductsPrices,
  getCountyProducts,
  getProductsPrices,
} from "../../sdk/products/products";
import { getCounties } from "../../sdk/market/market";
import { Modal, Select, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Pagination } from "antd";
import { getFscs } from "../../sdk/fsc/fsc";
import Arrow from "../../components/Arrow";

const ProductPrices = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [counties, setCounties] = useState([]);
  const [subcounties, setSubCounties] = useState([]);
  const [wards, setWards] = useState([]);
  const [county, setCounty] = useState("");
  const [subcounty, setSubCounty] = useState("");
  const [ward, setWard] = useState("");
  const [selectedWards, setSelectedWards] = useState([]);
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2025-09-01");
  const [productsPrices, setProductsPrices] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [fscs, setFscs] = useState([]);
  const [fsc, setFsc] = useState("");
  const [countyProducts, setCountyProducts] = useState([]);
  const [countyProduct, setCountyProduct] = useState("");
  const [farmPrice, setFarmPrice] = useState("");
  const [marketPrice, setMarketPrice] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

  const handleSubCountyChange = (value) => {
    setSubCounty(value);
    let filteredSubCounty = subcounties.find(
      (subcounty) => subcounty.subCountyId === Number(value)
    );
    setWards(filteredSubCounty.wards);
  };

  const fetchProductsPrices = async () => {
    try {
      const response = await getProductsPrices(
        pageNumber,
        pageSize,
        selectedWards,
        startDate,
        endDate,
        county,
        subcounty
      );
      if (response.status === 200) {
        setProductsPrices(response.data.data.productsPrices);
        setTotalCount(50);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const fetchAllProductsPrices = async () => {
    try {
      const response = await getAllProductsPrices();
      if (response.status === 200) {
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const getAllCounties = async () => {
    try {
      const response = await getCounties();
      if (response.status === 200) {
        setCounties(response.data.data.counties);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchProductsPrices();
  }, [
    pageNumber,
    pageSize,
    selectedWards,
    startDate,
    endDate,
    county,
    subcounty,
  ]);

  useEffect(() => {
    getAllCounties();
    fetchAllProductsPrices();
  }, []);

  const onPageChange = (page, size) => {
    setPageNumber(page);
    setPageSize(size);
  };

  const fetchProducts = async () => {
    try {
      const response = await getCountyProducts(
        pageNumber,
        pageSize,
        selectedWards,
        startDate,
        endDate,
        county,
        subcounty
      );
      if (response.status === 200) {
        setCountyProducts(response.data.data.countyProducts);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const fetchFscs = async () => {
    try {
      const response = await getFscs(
        pageNumber,
        pageSize,
        selectedWards,
        startDate,
        endDate,
        county,
        subcounty
      );
      if (response.status === 200) {
        setFscs(response.data.data.fsc);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    fetchProductsPrices();
    fetchProducts();
    fetchFscs();
  }, [pageNumber, pageSize, selectedWards, startDate, endDate]);

  useEffect(() => {
    getAllCounties();
  }, []);

  const handleCreateProductPrice = async () => {
    try {
      const response = await createProductPrice({
        countyProductId: Number(countyProduct),
        farmServiceCenterId: Number(fsc),
        farmPrice: Number(farmPrice),
        marketPrice: Number(marketPrice),
      });
      if (response.status === 201 || response.status === 200) {
        toast.success("Product price updated");
        setCountyProduct("");
        setFsc("");
        setFarmPrice("");
        setMarketPrice("");
        handleCancel();
        fetchProductsPrices();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const onShowSizeChange = (current, pageSize) => {};
  return (
    <div className="w-full">
      <Modal
        centered
        width={700}
        title="Add a Commodity Price"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="w-[100%] my-[20px] h-full">
          <div className="bg-white">
            <div className="flex items-center mb-[20px] justify-between">
              <div className="w-[48%] flex flex-col gap-[5px]">
                <label htmlFor="role">Farm service center (Fsc)</label>
                <select
                  value={fsc}
                  onChange={(e) => setFsc(e.target.value)}
                  placeholder="Enter your name"
                  className="h-[50px] w-full text-[14px] text-[#000] px-[10px] border border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                >
                  {fscs?.length > 0 &&
                    fscs?.map((fsc) => (
                      <option value={fsc?.farmServiceCenterId}>
                        {fsc?.firstName} {fsc?.lastName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-[48%] flex flex-col gap-[5px]">
                <label htmlFor="role">County commodity</label>
                <select
                  value={countyProduct}
                  onChange={(e) => setCountyProduct(e.target.value)}
                  placeholder="Enter county product"
                  className="h-[50px] w-full text-[14px] px-[10px] border border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                >
                  {countyProducts?.length > 0 &&
                    countyProducts.map((product) => (
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
            <div className="flex items-center mb-[20px] justify-between">
              <div className="w-[48%] flex flex-col gap-[5px]">
                <label htmlFor="farmprice">Farm price</label>
                <input
                  type="text"
                  value={farmPrice}
                  onChange={(e) => setFarmPrice(e.target.value)}
                  placeholder="Enter the farm price"
                  className="h-[50px] w-full text-[14px]  border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                />
              </div>
              <div className="w-[48%] flex flex-col gap-[5px]">
                <label htmlFor="marketprice">Market price</label>
                <input
                  type="text"
                  value={marketPrice}
                  onChange={(e) => setMarketPrice(e.target.value)}
                  placeholder="Enter the market price"
                  className="h-[50px] w-full text-[14px]  border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full my-[20px] flex items-center gap-[20px] justify-end">
          <button
            onClick={handleCancel}
            className="h-[35px] px-[20px] min-w-[120px] rounded bg-[#f00] text-[#fff] text-[12px]"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateProductPrice}
            className="h-[35px] border px-[20px] min-w-[120px] rounded border-gray-300 bg-white text-[#000] text-[12px]"
          >
            Ok
          </button>
        </div>
      </Modal>
      <div className="flex items-center my-[20px] text-[13px] justify-between">
        <p className="text-[15px] font-bold">Commodities Prices</p>
        <div className="flex items-center gap-[20px]">
          <button className="h-[40px] flex items-center font-bold justify-center gap-[10px] bg-oldGod min-w-[200px] text-white">
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
            Export Commodities prices
          </button>
          <button
            onClick={showModal}
            className="h-[40px] bg-[#00599A] flex items-center font-bold justify-center gap-[10px] min-w-[200px] text-white"
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
            Add Commodity Price
          </button>
        </div>
      </div>
      <div className="w-full h-[80px] my-[20px] bg-white px-[10px] flex items-center justify-between">
        <select
          type="text"
          value={county}
          onChange={(e) => handleCountyChange(e.target.value)}
          placeholder="Enter your phone number"
          className="h-[40px] w-[19%] text-[#000] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
          className="h-[40px] w-[19%] text-[#000] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
          style={{ width: "19%", height: "40px", borderRadius: "0px" }}
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
          className="h-[40px] w-[19%] text-[#000] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="Enter your first name"
          className="h-[40px] w-[19%] text-[#000] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
        />
      </div>
      <div className="w-full min-h-[550px] bg-white my-[20px] p-[20px]">
        <div className="flex font-bold border-b-2 h-[45px] text-[14px] items-center">
          <p className="w-[5%] truncate px-[10px]">Id</p>
          <p className="w-[10%] truncate px-[10px]">Name</p>
          <p className="w-[10%] truncate px-[10px]">Market</p>
          <p className="w-[10%] truncate px-[10px]">County</p>
          <p className="w-[10%] truncate px-[10px]">Ward</p>
          <p className="w-[10%] truncate px-[10px]">Farm price</p>
          <p className="w-[10%] truncate px-[10px]">Retail price</p>
          <p className="w-[10%] truncate px-[10px]">Wholesale price</p>
          <p className="w-[10%] truncate px-[10px]">Status</p>
          <p className="w-[15%] truncate px-[10px]">Action</p>
        </div>
        {productsPrices.length === 0 && (
          <div className="my-[20px] w-full">
            <p>No record of products prices</p>
          </div>
        )}
        {productsPrices.length > 0 &&
          productsPrices?.map((product) => (
            <div
              key={product?.productPriceId}
              className="flex text-[13px] border-b h-[45px] items-center"
            >
              <p className="w-[5%] truncate px-[10px]">
                {product?.productPriceId}
              </p>
              <p className="w-[10%] truncate px-[10px]">{product.product}</p>
              <p className="w-[10%] truncate px-[10px]">{product.market}</p>
              <p className="w-[10%] truncate px-[10px]">{product.county}</p>
              <p className="w-[10%] truncate px-[10px]">{product.ward}</p>
              <p className="w-[10%] font-bold truncate px-[10px]">
                {new Intl.NumberFormat("en-KE", {
                  style: "currency",
                  currency: "KES",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(product.farmPrice)}
              </p>
              <p className="w-[10%] font-bold truncate px-[10px]">
                {new Intl.NumberFormat("en-KE", {
                  style: "currency",
                  currency: "KES",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(product.retailPrice)}
              </p>
              <p className="w-[10%] font-bold truncate px-[10px]">
                {new Intl.NumberFormat("en-KE", {
                  style: "currency",
                  currency: "KES",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(product.wholesalePrice)}
              </p>
              <p className="w-[10%] truncate px-[10px]">
                {product?.valid == 1 ? (
                  <div className="bg-[#00b300] text-white rounded flex items-center justify-center text-[12px] w-[60px]">
                    Valid
                  </div>
                ) : (
                  <div className="bg-[#D22B2B] text-[#fff] rounded flex items-center justify-center text-[12px] w-[60px]">
                    Invalid
                  </div>
                )}
              </p>
              <div className="w-[15%] truncate px-[10px] flex items-center gap-[10px] truncate">
                <div className="flex items-center justify-center gap-[5px] py-[3px] text-[12px] bg-[#00599A] cursor-pointer px-[10px] text-white rounded">
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
                <div className="flex items-center justify-center gap-[5px] py-[3px] text-[12px] bg-[#D22B2B] cursor-pointer px-[10px] text-white rounded">
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
              </div>
            </div>
          ))}
        <div className="w-full flex items-center my-[10px] justify-end">
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
  );
};

export default ProductPrices;
