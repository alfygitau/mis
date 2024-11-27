import React, { useEffect, useState } from "react";
import {
  getAllProductsPrices,
  getCountyProducts,
  getProductsPrices,
  validateAPrice,
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
  const [pageSize, setPageSize] = useState(15);
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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
        setTotalCount(response.data.data.totalPricesEntries);
        setLoading(false);
      } else {
        setProductsPrices([]);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      setLoading(false);
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
      toast.error(error?.response?.data?.message || error?.message);
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
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const onShowSizeChange = (current, pageSize) => {};

  const [validateReason, setValidateReason] = useState("");
  const [isValidateModalOpen, setIsValidateModalOpen] = useState(false);
  const [confirmSelectedPrice, setConfirmSelectedPrice] = useState("");

  const handleValidateCancel = () => {
    setIsValidateModalOpen(false);
  };

  const showValidateModal = (product) => {
    if (product?.valid === 0) {
      setConfirmSelectedPrice(product?.productPriceId);
      setIsValidateModalOpen(true);
    } else {
      toast.info("Commodity price already valid");
    }
  };

  const handleValidateProduct = async () => {
    try {
      const response = await validateAPrice(confirmSelectedPrice, {
        valid: true,
        description: validateReason,
      });
      if (response.status === 200 || response.status === 201) {
        toast.success("Commodity price validated");
        setValidateReason("");
        fetchProductsPrices();
        setIsValidateModalOpen(false);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [selectedProductPrice, setSelectedProductPrice] = useState({});

  const handleCancelProductPrice = () => {
    setIsPriceModalOpen(false);
  };

  const showPrice = (productPrice) => {
    setSelectedProductPrice(productPrice);
    setIsPriceModalOpen(true);
  };

  const showTotal = (total) => `Total ${total} items`;

  return (
    <div className="w-full">
      <Modal
        centered
        width={700}
        title={`Product price for ${selectedProductPrice?.product} in ${selectedProductPrice?.county} county`}
        open={isPriceModalOpen}
        footer={null}
        onCancel={handleCancelProductPrice}
      >
        <div className="flex flex-col ga-[10px] my-[20px]">
          <div className="w-full flex items-center">
            <p className="text-[14px] w-[34%] text-[#000]">Product Name</p>
            <p className="text-[14px] w-[65%] text-[#000]">
              {selectedProductPrice?.product}
            </p>
          </div>
          <div className="w-full flex items-center">
            <p className="text-[14px] w-[34%] text-[#000]">County</p>
            <p className="text-[14px] w-[65%] text-[#000]">
              {selectedProductPrice?.county}
            </p>
          </div>
          <div className="w-full flex items-center">
            <p className="text-[14px] w-[34%] text-[#000]">County</p>
            <p className="text-[14px] w-[65%] text-[#000]">
              {selectedProductPrice?.subCounty}
            </p>
          </div>
          <div className="w-full flex items-center">
            <p className="text-[14px] w-[34%] text-[#000]">Market</p>
            <p className="text-[14px] w-[65%] text-[#000]">
              {selectedProductPrice?.market}
            </p>
          </div>
        </div>
        <div className="flex flex-col ga-[10px] mb-[20px]">
          <div className="w-full flex items-center">
            <p className="text-[14px] w-[34%] text-[#000]">
              Unit of measurement
            </p>
            <p className="text-[14px] w-[65%] text-[#000]">
              {selectedProductPrice?.measurementType}
            </p>
          </div>
          <div className="w-full flex items-center">
            <p className="text-[14px] w-[34%] text-[#000]">Quantity in KG</p>
            <p className="text-[14px] w-[65%] text-[#000]">
              {selectedProductPrice?.quantityInKgs}
            </p>
          </div>
          <div className="w-full flex items-center">
            <p className="text-[14px] w-[34%] text-[#000]">Farm Price</p>
            <p className="text-[14px] w-[65%] font-bold text-[#000]">
              {new Intl.NumberFormat("en-KE", {
                style: "currency",
                currency: "KES",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(selectedProductPrice?.farmPrice)}
            </p>
          </div>
          <div className="w-full flex items-center">
            <p className="text-[14px] w-[34%] text-[#000]">Retail Price</p>
            <p className="text-[14px] w-[65%] font-bold text-[#000]">
              {new Intl.NumberFormat("en-KE", {
                style: "currency",
                currency: "KES",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(selectedProductPrice?.retailPrice)}
            </p>
          </div>
          <div className="w-full flex items-center">
            <p className="text-[14px] w-[34%] text-[#000]">Wholesale Price</p>
            <p className="text-[14px] w-[65%] font-bold text-[#000]">
              {new Intl.NumberFormat("en-KE", {
                style: "currency",
                currency: "KES",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(selectedProductPrice?.wholesalePrice)}
            </p>
          </div>
        </div>
        <div className="flex flex-col ga-[10px] mb-[20px]">
          <div className="w-full flex items-center">
            <p className="text-[14px] w-[34%] text-[#000]">Farm Price Per Kg</p>
            <p className="text-[14px] w-[65%] font-bold text-[#000]">
              {new Intl.NumberFormat("en-KE", {
                style: "currency",
                currency: "KES",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(selectedProductPrice?.farmPricePerKg)}
            </p>
          </div>
          <div className="w-full flex items-center">
            <p className="text-[14px] w-[34%] text-[#000]">
              Retail Price Per Kg
            </p>
            <p className="text-[14px] w-[65%] font-bold text-[#000]">
              {new Intl.NumberFormat("en-KE", {
                style: "currency",
                currency: "KES",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(selectedProductPrice?.retailPricePerKg)}
            </p>
          </div>
          <div className="w-full flex items-center">
            <p className="text-[14px] w-[34%] text-[#000]">
              Wholesale Price Per Kg
            </p>
            <p className="text-[14px] w-[65%] font-bold text-[#000]">
              {new Intl.NumberFormat("en-KE", {
                style: "currency",
                currency: "KES",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(selectedProductPrice?.wholesalePricePerKg)}
            </p>
          </div>
        </div>
        <div className="flex flex-col ga-[10px] mb-[20px]">
          <div className="w-full flex items-center">
            <p className="text-[14px] w-[34%] text-[#000]">FSC Name</p>
            <p className="text-[14px] w-[65%] text-[#000]">
              {selectedProductPrice?.fscName}
            </p>
          </div>
          <div className="w-full flex items-center">
            <p className="text-[14px] w-[34%] text-[#000]">FSC Mobile</p>
            <p className="text-[14px] w-[65%] text-[#000]">
              {selectedProductPrice?.fscMsisdn}
            </p>
          </div>
          <div className="w-full flex items-center">
            <p className="text-[14px] w-[34%] text-[#000]">Date Created</p>
            <p className="text-[14px] w-[65%] text-[#000]">
              {selectedProductPrice?.createdAt}
            </p>
          </div>
        </div>
      </Modal>
      <Modal
        centered
        width={700}
        title="Validate a value chain price"
        open={isValidateModalOpen}
        footer={null}
        onCancel={handleValidateCancel}
      >
        <div className="my-[20px] w-full">
          <p className="mb-[20px] text-[14px] text-[#000]">
            Are you sure you want to validate a commodity price?
          </p>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[14px] text-[#000]" htmlFor="reason">
              Description
            </label>
            <textarea
              value={validateReason}
              onChange={(e) => setValidateReason(e.target.value)}
              className="h-[100px] w-[100%] text-[#000] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              name="reason"
              id="reason"
              placeholder="Reason for validating a commodity"
            />
          </div>
          <div className="w-full my-[20px] flex items-center gap-[20px] justify-end">
            <button
              onClick={handleValidateCancel}
              className="h-[35px] px-[20px] min-w-[120px] rounded bg-[#DD6D71] text-[#fff] text-[12px]"
            >
              Cancel
            </button>
            <button
              onClick={handleValidateProduct}
              className="h-[35px] border px-[20px] min-w-[120px] rounded border-gray-300 bg-[#A19E3B] text-[#fff] text-[12px]"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
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
                <label htmlFor="role">Select a county commodity</label>
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
            className="h-[35px] px-[20px] min-w-[120px] rounded bg-[#DD6D71] text-[#fff] text-[12px]"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateProductPrice}
            className="h-[35px] border px-[20px] min-w-[120px] rounded border-gray-300 bg-[#A19E3B] text-[#fff] text-[12px]"
          >
            Submit
          </button>
        </div>
      </Modal>
      <div className="flex items-center my-[10px] text-[13px] justify-between">
        <p className="text-[15px] font-bold">Value chain prices</p>
        <div className="flex items-center gap-[20px]">
          <button className="h-[40px] w-[40px] flex items-center font-bold justify-center gap-[10px] bg-oldGod text-white">
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
        </div>
      </div>
      <div className="w-full h-[60px] rounded shadow-md my-[10px] bg-white px-[10px] flex items-center justify-between">
        <select
          type="text"
          value={county}
          onChange={(e) => handleCountyChange(e.target.value)}
          placeholder="Enter your phone number"
          className="h-[40px] w-[19%] text-[#000] text-[12px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
          className="h-[40px] w-[19%] text-[#000] text-[12px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
            width: "19%",
            height: "40px",
            borderRadius: "0px",
            fontSize: "12px",
            color: "grey",
          }}
          placeholder="Select your ward"
          onChange={handleChange}
          options={wardOptions}
          optionRender={(option) => <Space>{option.label}</Space>}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Enter your first name"
          className="h-[40px] w-[19%] text-[#000] text-[12px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="Enter your first name"
          className="h-[40px] w-[19%] text-[#000] text-[12px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
        />
      </div>
      <div className="w-full bg-white rounded my-[10px] p-[20px]">
        <div className="flex font-bold border-b-2 h-[45px] text-[12px] items-center">
          <p className="w-[5%] truncate px-[10px]">Id</p>
          <p className="w-[10%] truncate px-[10px]">Value chain</p>
          <p className="w-[10%] truncate px-[10px]">Market</p>
          <p className="w-[8%] truncate px-[10px]">County</p>
          <p className="w-[10%] truncate px-[10px]">Fsc name</p>
          <p className="w-[10%] truncate px-[10px]">Unit</p>
          <p className="w-[10%] truncate px-[10px]">Farm price</p>
          <p className="w-[10%] truncate px-[10px]">Retail price</p>
          <p className="w-[10%] truncate px-[10px]">Wholesale price</p>
          <p className="w-[10%] truncate px-[10px]">Date created</p>
          <p className="w-[7%] truncate px-[10px]">Action</p>
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
        ) : productsPrices?.length > 0 ? (
          productsPrices?.map((product) => (
            <div
              key={product?.productPriceId}
              className="flex text-[12px] border-b h-[35px] items-center"
            >
              <p
                onClick={() => showPrice(product)}
                className="w-[5%] text-[#00599A] cursor-pointer truncate px-[10px]"
              >
                #{product?.productPriceId}
              </p>
              <p className="w-[10%] truncate px-[10px]">{product?.product}</p>
              <p className="w-[10%] truncate px-[10px]">{product?.market}</p>
              <p className="w-[8%] truncate px-[10px]">{product?.county}</p>
              <p className="w-[10%] truncate px-[10px]">{product?.fscName}</p>
              <p className="w-[10%] truncate px-[10px]">{product?.measurementType}</p>
              <p className="w-[10%] truncate px-[10px]">
                {new Intl.NumberFormat("en-KE", {
                  style: "currency",
                  currency: "KES",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(product?.farmPrice)}
              </p>
              <p className="w-[10%] truncate px-[10px]">
                {new Intl.NumberFormat("en-KE", {
                  style: "currency",
                  currency: "KES",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(product?.retailPrice)}
              </p>
              <p className="w-[10%] truncate px-[10px]">
                {new Intl.NumberFormat("en-KE", {
                  style: "currency",
                  currency: "KES",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(product?.wholesalePrice)}
              </p>
              <div className="w-[10%] truncate px-[10px]">
                {product?.createdAt}
              </div>
              <div className="w-[7%] truncate px-[10px] flex items-center gap-[10px] truncate">
                <div
                  onClick={() => showValidateModal(product)}
                  className="flex items-center justify-center gap-[5px] px-[5px] py-[2px] text-[9px] bg-[#00599A] cursor-pointer text-white rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                  >
                    <path
                      fill="currentColor"
                      d="M7.736 1.56a1.914 1.914 0 0 1 2.707 2.708l-.234.234l-2.707-2.707zm-.941.942L1.65 7.646a.5.5 0 0 0-.136.255l-.504 2.5a.5.5 0 0 0 .588.59l2.504-.5a.5.5 0 0 0 .255-.137l5.145-5.145z"
                    />
                  </svg>
                  Edit
                </div>
                {/* <div className="flex items-center justify-center gap-[5px] py-[3px] text-[12px] bg-[#DD6D71] cursor-pointer px-[10px] text-white rounded">
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
                </div> */}
              </div>
            </div>
          ))
        ) : (
          <div className="my-[20px] w-full">
            <p>No record of value chains prices</p>
          </div>
        )}
        <div className="w-full flex items-center mt-[10px] justify-end">
          <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
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

export default ProductPrices;
