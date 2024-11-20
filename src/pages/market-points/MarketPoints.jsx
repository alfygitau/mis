import React, { useEffect, useState } from "react";
import { allowRedeemPoints, getPoints } from "../../sdk/market-points/points";
import { toast } from "react-toastify";
import { getCounties } from "../../sdk/market/market";
import { Modal, Pagination } from "antd";

const MarketPoints = () => {
  const [marketPoints, setMarketPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [counties, setCounties] = useState([]);
  const [county, setCounty] = useState("");
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-30");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handleCountyChange = (value) => {
    setCounty(value);
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

  const fetchMarketPoints = async () => {
    try {
      setLoading(true);
      const response = await getPoints(
        county,
        startDate,
        endDate,
        pageNumber,
        pageSize
      );
      if (response.status === 200) {
        setLoading(false);
        setMarketPoints(response.data.data);
      } else {
        setLoading(false);
        setMarketPoints([]);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    getAllCounties();
  }, []);

  useEffect(() => {
    fetchMarketPoints();
  }, [county, startDate, endDate, pageNumber, pageSize]);

  const onPageChange = (page, size) => {
    setPageNumber(page);
    setPageSize(size);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const showModal = async (point) => {
    setIsModalOpen(true);
    setSelectedUser(point);
  };

  const confirmRedeemPoints = async () => {
    try {
      const response = await allowRedeemPoints(
        selectedUser?.marketPointsClaimId
      );
      if (response?.status === 200 || response?.status === 201) {
        setIsModalOpen(false);
        toast.success("User awarded the points successfully");
        fetchMarketPoints();
      }
    } catch (error) {
      setIsModalOpen(false);
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
  return (
    <div>
      <Modal
        centered
        width={700}
        title="Comfirm reedem points"
        open={isModalOpen}
        footer={null}
        onCancel={handleCloseModal}
      >
        <div className="my-[20px] w-full">
          <p className="mb-[20px] w-full text-[14px] text-[#000]">
            Are you sure you want to allow the user to redeem points?
          </p>
          <div className="w-full my-[20px] flex items-center gap-[20px] justify-end">
            <button
              onClick={handleCloseModal}
              className="h-[35px] px-[20px] min-w-[120px] rounded bg-[#DD6D71] text-[#fff] text-[12px]"
            >
              Cancel
            </button>
            <button
              onClick={confirmRedeemPoints}
              className="h-[35px] border px-[20px] min-w-[120px] rounded border-gray-300 bg-[#A19E3B] text-[#fff] text-[12px]"
            >
              Ok
            </button>
          </div>
        </div>
      </Modal>
      <div className="my-[20px]">
        <p className="text-[14px] text-[#000] font-bold">Market Points</p>
      </div>
      <div className="w-full h-[80px] shadow-md mt-[20px] px-[20px] bg-white flex flex-wrap lg:gap-[20px] items-center gap-[10px]">
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
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
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
      <div className="w-full bg-white min-h-[500px] mt-[20px] p-[20px]">
        <div className="flex text-[13px] font-bold border-b-2 h-[45px] items-center">
          <p className="w-[10%] truncate px-[10px]">User</p>
          <p className="w-[10%] truncate px-[10px]">County</p>
          <p className="w-[10%] truncate px-[10px]">Market</p>
          <p className="w-[10%] truncate px-[10px]">Mobile</p>
          <p className="w-[10%] truncate px-[10px]">Points</p>
          <p className="w-[10%] truncate px-[10px]">Equivalent Amount</p>
          <p className="w-[10%] truncate px-[10px]">Reward</p>
          <p className="w-[10%] truncate px-[10px]">Status</p>
          <p className="w-[10%] truncate px-[10px]">Date</p>
          <p className="w-[10%] truncate px-[10px]">Action</p>
        </div>
        {loading ? (
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
        ) : marketPoints?.length > 0 ? (
          marketPoints?.map((point) => (
            <div
              key={point?.marketPointsClaimId}
              className="flex text-[13px] border-b h-[45px] items-center"
            >
              <p className="w-[10%] truncate px-[10px]">{point?.user}</p>
              <p className="w-[10%] truncate px-[10px]">{point?.county}</p>
              <p className="w-[10%] truncate px-[10px]">{point?.market}</p>
              <p className="w-[10%] truncate px-[10px]">{point?.msisdn}</p>
              <p className="w-[10%] truncate px-[10px]">{point?.points}</p>
              <p className="w-[10%] truncate px-[10px] font-bold">
                {new Intl.NumberFormat("en-KE", {
                  style: "currency",
                  currency: "KES",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(point?.equivalentAmount)}
              </p>
              <p className="w-[10%] truncate px-[10px]">{point?.reward}</p>
              <div className="w-[10%] truncate px-[10px]">
                {point.status === "ACTIVE" ? (
                  <div className="bg-[#00b300] px-[5px] py-[3px] w-[80%] text-white rounded flex items-center justify-center text-[10px]">
                    {point?.status}
                  </div>
                ) : (
                  <div className="bg-[#C3B00A] px-[5px] py-[3px] w-[80%] text-[#fff] rounded flex items-center justify-center text-[10px]">
                    {point?.status}
                  </div>
                )}
              </div>
              <p className="w-[10%] truncate px-[10px]">{point?.createdAt}</p>
              <div className="w-[10%] truncate px-[10px]">
                <div
                  onClick={() => showModal(point)}
                  className="flex items-center justify-center gap-[5px] py-[3px] text-[12px] bg-[#00599A] cursor-pointer px-[10px] text-white rounded"
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
              </div>
            </div>
          ))
        ) : (
          <div className="my-[20px] w-full">
            <p>No record of market points</p>
          </div>
        )}
        <div className="w-full flex items-center my-[10px] justify-end">
          <Pagination
            showSizeChanger
            total={50}
            onChange={onPageChange}
            current={pageNumber}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
};

export default MarketPoints;
