import React, { useEffect, useState } from "react";
import { getCounties } from "../../sdk/market/market";
import {
  addProduct,
  editProduct,
  getCountyProducts,
  getProducts,
  getUnitsOfMeasurement,
} from "../../sdk/products/products";
import { toast } from "react-toastify";
import { Modal, Select, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import Arrow from "../../components/Arrow";
import { useAuth } from "../../contexts/AuthContext";

const Products = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [countyPageNumber, setCountyPageNumber] = useState(1);
  const [countyPageSize, setCountyPageSize] = useState(15);
  const [counties, setCounties] = useState([]);
  const [myCounties, setMyCounties] = useState([]);
  const [subcounties, setSubCounties] = useState([]);
  const [mySubCounties, setMySubCounties] = useState([]);
  const [wards, setWards] = useState([]);
  const [myWards, setMyWards] = useState([]);
  const [county, setCounty] = useState("");
  const [subcounty, setSubCounty] = useState("");
  const [myCounty, setMyCounty] = useState("");
  const [mySubCounty, setMySubCounty] = useState("");
  const [ward, setWard] = useState("");
  const [selectedWards, setSelectedWards] = useState([]);
  const [countySelectedWards, setCountySelectedWards] = useState([]);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-30");
  const [countyStartDate, setCountyStartDate] = useState("2024-01-01");
  const [countyEndDate, setCountyEndDate] = useState("2024-12-30");
  const [products, setProducts] = useState([]);
  const [countyProducts, setCountyProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [CountyTotalCount, setCountyTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const { user } = useAuth();
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

  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitOfMeasurement, setUnitOfMeasurement] = useState("");
  const [unitsOfMeasurement, setUnitsOfMeasurement] = useState([]);
  const [productDescription, setProductDescription] = useState("");

  const fetchUnitsOfMeasurement = async () => {
    try {
      const response = await getUnitsOfMeasurement();
      if (response.status === 200) {
        console.log(response.data.data);
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

  useEffect(() => {
    fetchProducts();
  }, [startDate, endDate, pageNumber, pageSize]);

  const handleCreateProduct = async () => {
    setCreateLoading(true);
    try {
      const response = await addProduct(productName);
      if (response.status === 201 || response.status === 200) {
        setCreateLoading(false);
        toast.success("Product added successfully");
        setProductName("");
        // setProductDescription("");
        fetchProducts();
        handleCancel();
      } else {
        setCreateLoading(false);
      }
    } catch (error) {
      setCreateLoading(false);
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const handleChange = (value) => {
    setSelectedWards(value);
  };
  const handleMyChange = (value) => {
    setCountySelectedWards(value);
  };

  const wardOptions = wards.map((ward) => ({
    value: ward.wardId,
    label: ward.wardName,
  }));
  const countyWardOptions = myWards.map((ward) => ({
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
  const handleMyCountyChange = (value) => {
    setMyCounty(value);
    let filteredCounty = myCounties.find(
      (county) => county.countyId === Number(value)
    );
    setMySubCounties(filteredCounty.subCounties);
  };

  const handleSubCountyChange = (value) => {
    setSubCounty(value);
    let filteredSubCounty = subcounties.find(
      (subcounty) => subcounty.subCountyId === Number(value)
    );
    setWards(filteredSubCounty.wards);
  };
  const handleMySubCountyChange = (value) => {
    setMySubCounty(value);
    let filteredSubCounty = mySubCounties.find(
      (subcounty) => subcounty.subCountyId === Number(value)
    );
    setMyWards(filteredSubCounty.wards);
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getProducts(
        pageNumber,
        pageSize,
        selectedWards,
        startDate,
        endDate,
        county,
        subcounty
      );
      if (response.status === 200) {
        setProducts(response.data.data.products);
        setTotalCount(response.data.data.totalCount);
        setIsLoading(false);
      } else {
        setProducts([]);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      setIsLoading(false);
    }
  };
  const fetchCountyProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getCountyProducts(
        countyPageNumber,
        countyPageSize,
        countySelectedWards,
        countyStartDate,
        countyEndDate
      );
      if (response.status === 200) {
        setCountyProducts(response.data.data.countyProducts);
        setCountyTotalCount(response.data.data.totalCount);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      setIsLoading(false);
    }
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

  useEffect(() => {
    fetchProducts();
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
    fetchCountyProducts();
  }, [
    countyPageNumber,
    countyPageSize,
    countySelectedWards,
    countyStartDate,
    countyEndDate,
  ]);

  useEffect(() => {
    getAllCounties();
  }, []);

  const onPageChange = (page, size) => {
    setPageNumber(page);
    setPageSize(size);
  };

  const onCountyPageChange = (page, size) => {
    setCountyPageNumber(page);
    setCountyPageSize(size);
  };

  const onShowSizeChange = (current, pageSize) => {};
  const [editProductName, setEditProductName] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleEditProduct = async () => {
    setEditLoading(true);
    try {
      const response = await editProduct(selectedProduct?.productId, {
        title: editProductName,
      });
      if (response.status === 201 || response.status === 200) {
        setEditLoading(false);
        toast.success("Product updated successfully");
        fetchProducts();
        setIsEditModalOpen(false);
      } else {
        setEditLoading(false);
      }
    } catch (error) {
      setEditLoading(false);
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
  const showEditModal = (product) => {
    setEditProductName(product?.productName);
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };
  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
  };
  const showTotal = (total) => `Total ${total} items`;
  return (
    <div className="w-full">
      <Modal
        centered
        width={700}
        title="Edit a Commodity"
        open={isEditModalOpen}
        footer={null}
        onCancel={handleCancelEdit}
      >
        <div className="my-[10px] w-full">
          <input
            type="text"
            value={editProductName}
            onChange={(e) => setEditProductName(e.target.value)}
            className="h-[45px] w-[100%] text-[#000] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
          />
        </div>
        <div className="w-full my-[20px] flex items-center gap-[20px] justify-end">
          <button
            onClick={handleCancelEdit}
            className="h-[35px] px-[20px] min-w-[120px] rounded bg-[#DD6D71] text-[#fff] text-[12px]"
          >
            Cancel
          </button>
          <button
            disabled={createLoading}
            onClick={handleEditProduct}
            className="h-[35px] flex items-center justify-center gap-[10px] border px-[20px] min-w-[120px] rounded border-gray-300 bg-[#A19E3B] text-[#fff] text-[12px]"
          >
            {editLoading && (
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
            Ok
          </button>
        </div>
      </Modal>
      <Modal
        centered
        width={700}
        title="Add a value chain"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="w-full my-[20px]">
          <div className="w-full flex mb-[20px] items-center justify-between">
            <div className="flex w-[100%] flex-col">
              <label htmlFor="name">Commodity Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter the name"
                className="h-[45px] w-full text-[12px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
            onClick={handleCreateProduct}
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
      <div className="flex items-center my-[10px] text-[13px] justify-between">
        <p className="text-[15px] font-bold">Value chains</p>
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
          <button
            onClick={showModal}
            className="h-[40px] bg-[#00599A] w-[40px] flex items-center font-bold justify-center gap-[10px] text-white"
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
      <div className="w-full h-[60px] rounded shadow-md my-[10px] bg-white px-[10px] flex items-center gap-[20px]">
        {/* <select
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
        /> */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setFirstDate(e.target.value)}
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
        {/* <div class="flex items-center w-[60%] border border-gray-300">
          <input
            type="text"
            placeholder="Search a value chain..."
            class="flex-grow px-4 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
          />
          <button class="px-4 py-2 text-[#000] text-[14px] font-bold border-l focus:outline-none focus:ring-2 focus:ring-gray-400">
            Search
          </button>
        </div> */}
      </div>
      <div className="w-full bg-white rounded my-[10px] p-[10px]">
        <div className="flex text-[13px] font-bold border-b-2 h-[45px] items-center">
          <p className="w-[8%] truncate px-[10px]">Id</p>
          <p className="w-[15%] truncate px-[10px]">Name</p>
          <p className="w-[15%] truncate px-[10px]">Created By</p>
          <p className="w-[15%] truncate px-[10px]">Created At</p>
          <p className="w-[20%] truncate px-[10px]">Update At</p>
          <p className="w-[15%] truncate px-[10px]">Updated By</p>
          <p className="w-[12%] truncate px-[10px]">Status</p>
          {/* <p className="w-[15%] truncate px-[10px]">Action</p> */}
        </div>
        {isLoading ? (
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
        ) : products?.length > 0 ? (
          products?.map((product) => (
            <div
              key={product?.productId}
              className="flex text-[13px] border-b h-[35px] items-center"
            >
              <p className="w-[8%] text-[#00599A] cursor-pointer truncate px-[10px]">
                #{product?.productId}
              </p>
              <p className="w-[15%] truncate px-[10px]">
                {product?.productName}
              </p>
              <p className="w-[15%] truncate px-[10px]">{user?.name}</p>
              <p className="w-[15%] truncate px-[10px]">{product?.createdAt}</p>
              <p className="w-[20%] truncate px-[10px]">{product?.updatedAt}</p>
              <p className="w-[15%] truncate px-[10px]">{user?.name}</p>
              <div className="w-[12%] truncate px-[10px]">
                <div className="bg-[#DEF8DD] text-[#000] rounded flex items-center justify-center text-[12px] w-[60px]">
                  Active
                </div>
              </div>
              {/* <div className="w-[15%] truncate px-[10px] flex items-center gap-[10px] truncate">
                <div
                  onClick={() => showEditModal(product)}
                  className="flex items-center justify-center gap-[5px] text-[12px] py-[3px] bg-[#00599A] cursor-pointer px-[10px] text-white rounded"
                >
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
                <div className="flex items-center justify-center gap-[5px] py-[3px] text-[12px] bg-[#DD6D71] cursor-pointer px-[10px] text-white rounded">
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
          <div className="my-[20px] flex w-full">
            <p>No record of value chains</p>
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

export default Products;
