import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCounties } from "../../sdk/market/market";
import {
  createCountyProduct,
  editCountyProduct,
  getAllProducts,
  getCountyProducts,
} from "../../sdk/products/products";
import { Modal, Select, Space } from "antd";
import { Pagination } from "antd";
import Arrow from "../../components/Arrow";

const CountyProducts = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [counties, setCounties] = useState([]);
  const [myCounties, setMyCounties] = useState([]);
  const [subcounties, setSubCounties] = useState([]);
  const [wards, setWards] = useState([]);
  const [county, setCounty] = useState("");
  const [myCounty, setMyCounty] = useState("");
  const [subcounty, setSubCounty] = useState("");
  const [ward, setWard] = useState("");
  const [selectedWards, setSelectedWards] = useState([]);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-30");
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

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

  const fetchProducts = async () => {
    setIsLoading(true);
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
        setProducts(response.data.data.countyProducts);
        setTotalCount(response.data.data.totalCount);
        setIsLoading(false);
      } else {
        setProducts([]);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const getAllCounties = async () => {
    try {
      const response = await getCounties();
      if (response.status === 200) {
        setCounties(response.data.data.counties);
        setMyCounties(response.data.data.counties);
      } else {
        setCounties([]);
        setMyCounties([]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await getAllProducts();
      if (response.status === 200) {
        setAllProducts(response.data.data.products);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const handleCreateCountyProduct = async () => {
    setCreateLoading(true);
    try {
      const response = await createCountyProduct({
        countyId: myCounty,
        productId: productId,
      });
      if (response.status === 200 || response.status === 201) {
        setCreateLoading(false);
        toast.success("County product created successfully");
        handleCancel();
        fetchProducts();
      } else {
        setCreateLoading(false);
      }
    } catch (error) {
      setCreateLoading(false);
      toast.error(error?.response?.data?.message);
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
    getAllCounties();
    fetchAllProducts();
  }, []);

  const onPageChange = (page, size) => {
    setPageNumber(page);
    setPageSize(size);
  };

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [editProductId, setEditProductId] = useState("");
  const [editCountyId, setEditCountyId] = useState("");

  const handleEditCountyProduct = async () => {
    setEditLoading(true);
    try {
      const response = await editCountyProduct(
        selectedProduct?.countyProductId,
        {
          countyId: editCountyId,
          productId: editProductId,
        }
      );
      if (response.status === 200 || response.status === 201) {
        setEditLoading(false);
        toast.success("Product updated successfully");
        fetchProducts();
        setIsEditModalOpen(false);
      } else {
        setEditLoading(false);
      }
    } catch (error) {
      setEditLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  const showEditModal = (product) => {
    setSelectedProduct(product);
    setEditProductId(product?.countyProductId);
    setEditCountyId(product?.county);
    setIsEditModalOpen(true);
  };
  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
  };
  return (
    <div className="w-full">
      <Modal
        centered
        width={700}
        title="Edit a County Commodity"
        open={isEditModalOpen}
        footer={null}
        onCancel={handleCancelEdit}
      >
        <div className="w-full my-[20px] flex flex-col gap-[15px]">
          <div>
            <p className="text-[14px] mb-[5px] text-[#000]">
              Select a commodity
            </p>
            <select
              name="name"
              id="name"
              value={editProductId}
              onChange={(e) => setEditProductId(e.target.value)}
              className="h-[45px] w-[100%] text-[#000] text-[14px] border border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
            >
              <option value="">Select a commodity</option>
              {allProducts?.map((product) => (
                <option key={product?.productId} value={product?.productId}>
                  {product?.productName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-[14px] mb-[5px] text-[#000]">Select a county</p>
            <select
              name="county"
              id="county"
              value={editCountyId}
              onChange={(e) => setEditCountyId(e.target.value)}
              className="h-[45px] w-[100%] text-[#000] text-[14px] border border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
            >
              <option value="">Select a county</option>
              {counties?.map((county) => (
                <option key={county?.countyId} value={county?.countyName}>
                  {county?.countyName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full my-[20px] flex items-center gap-[20px] justify-end">
          <button
            onClick={handleCancelEdit}
            className="h-[35px] px-[20px] min-w-[120px] rounded bg-[#DD6D71] text-[#fff] text-[12px]"
          >
            Cancel
          </button>
          <button
            disabled={editLoading}
            onClick={handleEditCountyProduct}
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
            Submit
          </button>
        </div>
      </Modal>
      <Modal
        centered
        width={700}
        title="Add a County Commodity"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="w-full bg-white">
          <div className="flex flex-col mb-[30px]">
            <label className="text-[14px] text-[#000]" htmlFor="prodictId">
              Select a county
            </label>
            <select
              value={myCounty}
              onChange={(e) => setMyCounty(e.target.value)}
              placeholder="Enter county commodity"
              className="h-[50px] w-full text-[14px]  border border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
            >
              <option value="">Select a county</option>
              {myCounties?.length > 0 &&
                myCounties.map((county) => (
                  <option key={county?.countyId} value={county?.countyId}>
                    {county?.countyName}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col mb-[30px]">
            <label className="text-[14px] text-[#000]" htmlFor="prodictId">
              Select a commodity
            </label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter county product"
              className="h-[50px] w-full text-[14px] border border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
            >
              <option value="">Select a product</option>
              {allProducts?.length > 0 &&
                allProducts.map((product) => (
                  <option key={product?.productId} value={product?.productId}>
                    {product?.productName}
                  </option>
                ))}
            </select>
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
            onClick={handleCreateCountyProduct}
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
            Ok
          </button>
        </div>
      </Modal>
      <div className="flex items-center my-[20px] text-[13px] justify-between">
        <p className="text-[15px] font-bold">County Commodities</p>
        <div className="flex items-center gap-[20px]">
          <button className="h-[40px] px-[20px] flex items-center font-bold justify-center gap-[10px] bg-oldGod min-w-[200px] text-white">
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
            Export County Commodities
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
            Add a County Commodity
          </button>
        </div>
      </div>
      <div className="w-full h-[80px] shadow-md my-[20px] bg-white px-[10px] flex items-center gap-[20px]">
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
        {/* <select
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
      <div className="w-full bg-white my-[20px] p-[20px]">
        <div className="flex font-bold border-b-2 text-[13px] h-[45px] items-center">
          <p className="w-[10%] truncate px-[10px]">Id</p>
          <p className="w-[15%] truncate px-[10px]">Name</p>
          <p className="w-[15%] truncate px-[10px]">County</p>
          <p className="w-[15%] truncate px-[10px]">Date Created</p>
          <p className="w-[15%] truncate px-[10px]">Date Updated</p>
          <p className="w-[10%] truncate px-[10px]">Status</p>
          <p className="w-[20%] truncate px-[10px]">Action</p>
        </div>
        {isLoading ? (
          <div className="my-[20px] flex items-center justify-center min-h-[500px] w-full">
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
              key={product?.countyProductId}
              className="flex text-[13px] border-b h-[45px] items-center"
            >
              <p className="w-[10%] truncate px-[10px]">
                {product?.countyProductId}
              </p>
              <p className="w-[15%] truncate px-[10px]">{product.product}</p>
              <p className="w-[15%] truncate px-[10px]">{product.county}</p>
              <p className="w-[15%] truncate px-[10px]">{product.createdAt}</p>
              <p className="w-[15%] truncate px-[10px]">{product.updatedAt}</p>
              <div className="w-[10%] truncate px-[10px]">
                {product.countyProductIsActive === 1 ? (
                  <div className="bg-[#00b300] text-white rounded flex items-center justify-center text-[12px] w-[60px]">
                    Active
                  </div>
                ) : (
                  <div className="bg-[#FFEA00] text-[#000] rounded flex items-center justify-center text-[12px] w-[60px]">
                    Inactive
                  </div>
                )}
              </div>
              <div className="w-[20%] truncate px-[10px] flex items-center gap-[10px] truncate">
                <div
                  onClick={() => showEditModal(product)}
                  className="flex items-center justify-center gap-[5px] text-[13px] py-[3px] bg-[#00599A] cursor-pointer px-[10px] text-white rounded"
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
                <div className="flex items-center justify-center gap-[5px] text-[12px] py-[3px] bg-[#D22B2B] cursor-pointer px-[10px] text-white rounded">
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
          ))
        ) : (
          <div className="my-[20px] min-h-[500px] w-full">
            <p>No record of commodities</p>
          </div>
        )}
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

export default CountyProducts;
