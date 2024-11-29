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

const PricesPerGram = () => {
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

  const showTotal = (total) => `Total ${total} items`;

  const showPrice = (productPrice) => {
    setSelectedProductPrice(productPrice);
    setIsPriceModalOpen(true);
  };
  return (
    <div className="w-full">
      <div className="flex items-center my-[10px] text-[13px] justify-between">
        <p className="text-[13px] uppercase font-bold">Market prices per KG</p>
      </div>
      <div className="w-full h-[60px] rounded shadow-md my-[10px] bg-white px-[10px] flex items-center justify-between">
        <select
          type="text"
          value={county}
          onChange={(e) => handleCountyChange(e.target.value)}
          placeholder="Enter your phone number"
          className="h-[40px] w-[18%] text-[#000] text-[12px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
          className="h-[40px] w-[18%] text-[#000] text-[12px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
          style={{ width: "18%", height: "40px", borderRadius: "0px" }}
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
          className="h-[40px] w-[18%] text-[#000] text-[12px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="Enter your first name"
          className="h-[40px] w-[18%] text-[#000] text-[12px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
        />
        <div className="flex  w-[5%] items-center  justify-center gap-[20px]">
          <button className="h-[40px] w-[40px] rounded flex items-center font-bold justify-center gap-[10px] bg-oldGod text-white">
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
      <div className="w-full bg-white rounded my-[10px] p-[20px]">
        <div className="flex font-bold border-b-2 h-[45px] text-[13px] items-center">
          <p className="w-[5%] truncate px-[10px]">Id</p>
          <p className="w-[10%] truncate px-[10px]">Value chain</p>
          <p className="w-[10%] truncate px-[10px]">Quantity (kg)</p>
          <p className="w-[10%] truncate px-[10px]">Market</p>
          <p className="w-[10%] truncate px-[10px]">County</p>
          <p className="w-[10%] truncate px-[10px]">Fsc name</p>
          <p className="w-[10%] truncate px-[10px]">Farm price</p>
          <p className="w-[10%] truncate px-[10px]">Retail price</p>
          <p className="w-[10%] truncate px-[10px]">Wholesale price</p>
          <p className="w-[15%] truncate px-[10px]">Date created</p>
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
              <div className="w-[10%] truncate px-[10px] flex items-center gap-[10px] truncate">
                {product?.quantityInKgs}
              </div>
              <p className="w-[10%] truncate px-[10px]">{product?.market}</p>
              <p className="w-[10%] truncate px-[10px]">{product?.county}</p>
              <p className="w-[10%] truncate px-[10px]">{product?.fscName}</p>
              <p className="w-[10%] truncate px-[10px]">
                {new Intl.NumberFormat("en-KE", {
                  style: "currency",
                  currency: "KES",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(product?.farmPricePerKg)}
              </p>
              <p className="w-[10%] truncate px-[10px]">
                {new Intl.NumberFormat("en-KE", {
                  style: "currency",
                  currency: "KES",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(product?.retailPricePerKg)}
              </p>
              <p className="w-[10%] truncate px-[10px]">
                {new Intl.NumberFormat("en-KE", {
                  style: "currency",
                  currency: "KES",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(product?.wholesalePricePerKg)}
              </p>
              <div className="w-[15%] truncate px-[10px]">
                {product?.createdAt}
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

export default PricesPerGram;
