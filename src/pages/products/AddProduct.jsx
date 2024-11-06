import React, { useEffect, useState } from "react";
import {
  addProduct,
  getProducts,
  getUnitsOfMeasurement,
} from "../../sdk/products/products";
import { toast } from "react-toastify";
import { Pagination } from "antd";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitOfMeasurement, setUnitOfMeasurement] = useState("");
  const [unitsOfMeasurement, setUnitsOfMeasurement] = useState([]);
  const [productDescription, setProductDescription] = useState("");
  const [selectedWards, setSelectedWards] = useState([]);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-09-01");
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchUnitsOfMeasurement = async () => {
    try {
      const response = await getUnitsOfMeasurement();
      if (response.status === 200) {
        setUnitsOfMeasurement(response.data.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getProducts(
        pageNumber,
        pageSize,
        selectedWards,
        startDate,
        endDate
      );
      if (response.status === 200) {
        setProducts(response.data.data.products);
        setTotalCount(response.data.data.totalCount);
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
    try {
      const response = await addProduct(
        productName,
        unitOfMeasurement,
        quantity
      );
      if (response.status === 201 || response.status === 200) {
        toast.success("Product added successfully");
        setProductName("");
        setProductDescription("");
        fetchProducts();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const onPageChange = (page, size) => {
    setPageNumber(page);
    setPageSize(size);
  };

  const onShowSizeChange = (current, pageSize) => {};
  return (
    <div className="w-full">
      <div className="my-[10px]">
        <p className="text-gray-700 text-[15px] font-bold">Add product</p>
      </div>
      <div className="w-full bg-white p-[20px]">
        <div className="my-[20px] pb-[20px] w-full">
          <div className="flex items-center justify-between">
            <div className="flex w-[45%] flex-col w-full mb-[20px]">
              <label htmlFor="name">Product name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter the product name"
                className="h-[50px] w-full text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              />
            </div>
            <div className="flex w-[45%] flex-col w-full mb-[20px]">
              <label htmlFor="quantity">Product Quantity</label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter the product name"
                className="h-[50px] w-full text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex w-[45%] flex-col w-full mb-[20px]">
              <label htmlFor="name">Product name</label>
              <select
                type="text"
                value={unitOfMeasurement}
                onChange={(e) => setUnitOfMeasurement(e.target.value)}
                placeholder="Enter the product name"
                className="h-[50px] w-full text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              >
                <option value="">Select unit of measurement</option>
                {unitsOfMeasurement &&
                  unitsOfMeasurement.map((unit) => (
                    <option value={unit?.abbreviation}>{unit?.full}</option>
                  ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col w-full mb-[20px]">
            <label htmlFor="name">Product Description</label>
            <textarea
              type="text"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Enter the product description"
              className="h-[100px] w-full text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
            />
          </div>
          <button
            onClick={handleCreateProduct}
            className="w-full bg-[#12B981] text-white h-[45px]"
          >
            Add product
          </button>
        </div>
        <div className="mt-[20px]">
          <p className="text-gray-700 text-[15px] font-bold">Recent products</p>
        </div>
        <div className="w-full h-[600px] bg-white p-[20px]">
          <div className="flex font-bold border-b-2 h-[45px] items-center">
            <p className="w-[5%] truncate px-[10px]">Id</p>
            <p className="w-[15%] truncate px-[10px]">Product Name</p>
            <p className="w-[15%] truncate px-[10px]">Created By</p>
            <p className="w-[15%] truncate px-[10px]">Date Created</p>
            <p className="w-[15%] truncate px-[10px]">Date Updated</p>
            <p className="w-[15%] truncate px-[10px]">Updated By</p>
            <p className="w-[10%] truncate px-[10px]">Status</p>
            <p className="w-[10%] truncate px-[10px]">Action</p>
          </div>
          {products.length === 0 && (
            <div className="my-[20px] w-full">
              <p>No record of products</p>
            </div>
          )}
          {products.length > 0 &&
            products?.map((product) => (
              <div
                key={product?.productId}
                className="flex text-[14px] border-b h-[45px] items-center"
              >
                <p className="w-[5%] truncate px-[10px]">
                  {product?.productId}
                </p>
                <p className="w-[15%] truncate px-[10px]">
                  {product.productName}
                </p>
                <p className="w-[15%] truncate px-[10px]">
                  {product.createdBy}
                </p>
                <p className="w-[15%] truncate px-[10px]">
                  {product.createdAt}
                </p>
                <p className="w-[15%] truncate px-[10px]">
                  {product.updatedAt}
                </p>
                <p className="w-[15%] truncate px-[10px]">
                  {product.updatedBy}
                </p>
                <p className="w-[10%] truncate px-[10px]">Active</p>
                <div className="w-[10%] truncate px-[10px] flex items-center gap-[10px] truncate">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="cursor-pointer"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m14.304 4.844l2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565l6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="cursor-pointer"
                  >
                    <g fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M20.188 10.934c.388.472.582.707.582 1.066c0 .359-.194.594-.582 1.066C18.768 14.79 15.636 18 12 18c-3.636 0-6.768-3.21-8.188-4.934c-.388-.472-.582-.707-.582-1.066c0-.359.194-.594.582-1.066C5.232 9.21 8.364 6 12 6c3.636 0 6.768 3.21 8.188 4.934Z" />
                    </g>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="m18.412 6.5l-.801 13.617A2 2 0 0 1 15.614 22H8.386a2 2 0 0 1-1.997-1.883L5.59 6.5H3.5v-1A.5.5 0 0 1 4 5h16a.5.5 0 0 1 .5.5v1zM10 2.5h4a.5.5 0 0 1 .5.5v1h-5V3a.5.5 0 0 1 .5-.5M9 9l.5 9H11l-.4-9zm4.5 0l-.5 9h1.5l.5-9z"
                    />
                  </svg>
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
    </div>
  );
};

export default AddProduct;
