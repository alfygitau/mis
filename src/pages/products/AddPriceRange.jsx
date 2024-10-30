import React, { useEffect, useState } from "react";
import {
  addCountyProductPriceRange,
  getAllCountyProducts,
  getCountyProductsPriceRanges,
} from "../../sdk/products/products";
import { toast } from "react-toastify";

const AddPriceRange = () => {
  const [priceRanges, setPriceRanges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countyProducts, setCountyProducts] = useState([]);
  const [countyProduct, setCountyProduct] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rewardPoints, setRewardPoints] = useState("");

  const createProductPriceRange = async () => {
    try {
      const response = await addCountyProductPriceRange(
        countyProduct,
        minPrice,
        maxPrice,
        rewardPoints
      );
      if (response.status === 200) {
        toast.success("Price range added");
        setCountyProduct("");
        setMinPrice("");
        setMaxPrice("");
        setRewardPoints("");
        fetchPriceRange();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchPriceRange = async () => {
    setLoading(true);
    try {
      const response = await getCountyProductsPriceRanges();
      if (response.status === 200) {
        setLoading(false);
        setPriceRanges(response.data.data.priceRangeData);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchCountyProducts = async () => {
    try {
      const response = await getAllCountyProducts();
      if (response.status === 200) {
        setCountyProducts(response.data.data.countyProducts);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchPriceRange();
    fetchCountyProducts();
  }, []);
  return (
    <div>
      <p className="text-[14px] my-[20px]">
        Add price range for a county product
      </p>
      <div className="bg-white py-[10px] w-full">
        <div className="flex p-[10px] items-center justify-between">
          <div className="w-[48%] flex flex-col gap-[5px]">
            <label htmlFor="msisdn">County Product</label>
            <select
              value={countyProduct}
              onChange={(e) => setCountyProduct(e.target.value)}
              placeholder="Select county product"
              className="h-[50px] w-[100%] text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
          <div className="w-[48%] flex flex-col gap-[5px]">
            <label htmlFor="msisdn">Minimum Price</label>
            <input
              type="text"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Enter the minimum price"
              className="h-[50px] w-full text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
            />
          </div>
        </div>
        <div className="flex p-[10px] items-center justify-between">
          <div className="w-[48%] flex flex-col gap-[5px]">
            <label htmlFor="msisdn">Maximum Price</label>
            <input
              type="text"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Enter the maximum price"
              className="h-[50px] w-full text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
            />
          </div>
          <div className="w-[48%] flex flex-col gap-[5px]">
            <label htmlFor="msisdn">Reward Points</label>
            <input
              type="text"
              value={rewardPoints}
              onChange={(e) => setRewardPoints(e.target.value)}
              placeholder="Enter reward points"
              className="h-[50px] w-full text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
            />
          </div>
        </div>
        <div className="my-[20px] px-[10px] flex items-end bg-white w-full">
          <button
            onClick={createProductPriceRange}
            className="h-[45px] text-white bg-[#12B981] w-full"
          >
            Add Price Range
          </button>
        </div>
      </div>
      <p className="my-[20px] text-[14px]">County products price ranges</p>
      <div className="w-full bg-white min-h-[600px] mt-[30px] px-[20px] py-[10px]">
        <div className="flex text-[13px] font-bold border-b-2 h-[55px] items-center">
          <p className="w-[5%]">Id</p>
          <p className="w-[15%]">Product Name</p>
          <p className="w-[15%]">Min. Price</p>
          <p className="w-[15%]">Miax. Price</p>
          <p className="w-[15%]">Created By</p>
          <p className="w-[15%]">Date Created</p>
          <p className="w-[10%]">Status</p>
          <p className="w-[10%]">Action</p>
        </div>
        {loading ? (
          <div className="my-[20px] flex items-center justify-center min-h-[500px] w-full">
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
            <div className="flex text-[14px] border-b h-[55px] items-center">
              <p className="w-[5%]">{product?.price_range_setting_id}</p>
              <p className="w-[15%]">{product.productName}</p>
              <p className="w-[15%]">{product.minPrice}</p>
              <p className="w-[15%]">{product.maxPrice}</p>
              <p className="w-[15%]">{product.createdBy}</p>
              <p className="w-[15%]">{product.createdAt}</p>
              <p className="w-[10%]">
                {product.countyProductIsActive === 1 ? "Active" : "Inactive"}
              </p>
              <div className="w-[10%] flex items-center gap-[10px] truncate">
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
          ))
        ) : (
          <div className="my-[20px] min-h-[500px] w-full">
            <p>No record of products</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPriceRange;
