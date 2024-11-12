import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getRoles, getUsers } from "../../sdk/auth/auth";
import { Modal, Pagination } from "antd";
import {
  getCounties,
  getCountyMarkets,
  getMarkets,
} from "../../sdk/market/market";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-30");
  const [usersCount, setUsersCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [msisdn, setMsisdn] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [market, setMarket] = useState("");
  const [roles, setRoles] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [countyMarkets, setCountyMarkets] = useState([]);
  // const [pageNumber, setPageNumber] = useState(1);
  // const [pageSize, setPageSize] = useState(10);
  const [counties, setCounties] = useState([]);
  const [subcounties, setSubCounties] = useState([]);
  const [wards, setWards] = useState([]);
  const [county, setCounty] = useState("41");
  const [subcounty, setSubCounty] = useState("");
  const [ward, setWard] = useState("");
  const [selectedWards, setSelectedWards] = useState([]);
  // const [startDate, setStartDate] = useState("2024-01-01");
  // const [endDate, setEndDate] = useState("2024-12-30");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      if (response.status === 200) {
        setRoles(response.data.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
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

  const fetchMarkets = async () => {
    try {
      const response = await getMarkets(
        pageNumber,
        pageSize,
        selectedWards,
        startDate,
        endDate
      );
      if (response.status === 200) {
        console.log(response.data.data.markets);
        setMarkets(response.data.data.markets);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
  const fetchCountyMarkets = async () => {
    try {
      const response = await getCountyMarkets(
        pageNumber,
        pageSize,
        county,
        startDate,
        endDate
      );
      if (response.status === 200) {
        console.log(response.data.data.markets);
        setCountyMarkets(response.data.data.markets);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const handleCreateFsc = async () => {
    try {
      const payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        msisdn: `254${msisdn.substring(1)}`,
        username: `254${msisdn.substring(1)}`,
        roleId: Number(role),
        marketId: Number(market),
        fsc: Number(role) === 4 ? true : false,
      };
      const response = await createAUser(payload);
      if (response.status === 201 || response.status === 200) {
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setMsisdn("");
      }
      toast.success("User created successfully");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const handleCountyChange = (value) => {
    setCounty(value);
  };

  useEffect(() => {
    fetchRoles();
    fetchMarkets();
  }, []);

  useEffect(() => {
    fetchCountyMarkets();
  }, [county, startDate, endDate, pageNumber, pageSize]);

  useEffect(() => {
    getAllCounties();
  }, [county, startDate, endDate, pageNumber, pageSize]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getUsers(pageNumber, pageSize, startDate, endDate);
      if (response.status === 200) {
        setUsers(response.data.data);
        setUsersCount(50);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onPageChange = (page, size) => {
    setPageNumber(page);
    setPageSize(size);
  };

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };
  return (
    <div className="w-full mb-[20px] h-full">
      <Modal
        centered
        width={700}
        title="Add farm service centers or user"
        open={isModalOpen}
        footer={null}
      >
        <div className="w-full">
          <div className="bg-white">
            <div className="w-full flex justify-between h-full">
              <div className="w-[49%]">
                <div className="w-full flex flex-col gap-[5px] mb-[20px]">
                  <label htmlFor="msisdn">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="h-[50px] w-full text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                  />
                </div>
                <div className="w-full flex flex-col gap-[5px] mb-[20px]">
                  <label htmlFor="msisdn">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="h-[50px] w-full text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                  />
                </div>
                <div className="w-full flex flex-col gap-[5px] mb-[20px]">
                  <label htmlFor="msisdn">Phone number</label>
                  <input
                    type="text"
                    value={msisdn}
                    onChange={(e) => setMsisdn(e.target.value)}
                    placeholder="Enter your username"
                    className="h-[50px] w-full text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                  />
                </div>
                <div className="w-full flex flex-col gap-[5px] mb-[20px]">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your username"
                    className="h-[50px] w-full text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                  />
                </div>
              </div>
              <div className="w-[49%]">
                <div className="w-full flex flex-col gap-[5px] mb-[20px]">
                  <label htmlFor="msisdn">County</label>
                  <select
                    type="text"
                    value={county}
                    onChange={(e) => handleCountyChange(e.target.value)}
                    placeholder="Enter your phone number"
                    className="h-[50px] w-[100%] rounded text-[#000] text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                  >
                    <option value="">Select your county</option>
                    {counties?.length > 0 &&
                      counties?.map((county) => (
                        <option key={county.countyId} value={county.countyId}>
                          {county.countyName}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="w-full flex flex-col gap-[5px] mb-[20px]">
                  <label htmlFor="role">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Enter your username"
                    className="h-[50px] w-full text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                  >
                    {roles?.length > 0 &&
                      roles.map((role) => (
                        <option key={role?.roleId} value={role?.roleId}>
                          {role?.title}
                        </option>
                      ))}
                  </select>
                </div>
                {Number(role) === 4 && (
                  <div className="w-full flex flex-col gap-[5px] mb-[20px]">
                    <label htmlFor="market">Markets</label>
                    <select
                      value={market}
                      onChange={(e) => {
                        setMarket(e.target.value);
                      }}
                      placeholder="Select your market"
                      className="h-[50px] w-full text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                    >
                      <option value="">Select market</option>
                      {countyMarkets?.map((market) => (
                        <option id={market?.marketId} value={market?.marketId}>
                          {market?.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
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
            onClick={handleCreateFsc}
            className="h-[35px] border px-[20px] min-w-[120px] rounded border-gray-300 bg-[#A19E3B] text-[#fff] text-[12px]"
          >
            Submit
          </button>
        </div>
      </Modal>
      <div className="flex items-center my-[20px] text-[13px] justify-between">
        <p className="text-[15px] font-bold">All Users</p>
        <div>
          <button
            onClick={showModal}
            className="h-[40px] bg-[#00599A] min-w-[200px] px-[20px] text-white"
          >
            Add a User
          </button>
        </div>
      </div>
      <div className="w-full min-h-[600px] bg-white mt-[20px] p-[20px]">
        <div className="flex text-[13px] font-bold border-b-2 h-[45px] items-center">
          <p className="w-[5%] truncate px-[10px]">Id</p>
          <p className="w-[15%] truncate px-[10px]">Name</p>
          <p className="w-[15%] truncate px-[10px]">email</p>
          <p className="w-[10%] truncate px-[10px]">Username</p>
          <p className="w-[10%] truncate px-[10px]">Mobile</p>
          <p className="w-[10%] truncate px-[10px]">Created at</p>
          <p className="w-[10%] truncate px-[10px]">Updated at</p>
          <p className="w-[10%] truncate px-[10px]">Status</p>
          <p className="w-[15%] truncate px-[10px]">Action</p>
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
        ) : users.length > 0 ? (
          users?.map((item) => (
            <div
              key={item?.userId}
              className="flex text-[13px] border-b h-[45px] items-center"
            >
              <p className="w-[5%] truncate px-[10px]">{item?.userId}</p>
              <p className="w-[15%] truncate px-[10px]">
                {item.firstName} {item.lastName}
              </p>
              <p className="w-[15%] truncate px-[10px]">{item.email}</p>
              <p className="w-[10%] truncate px-[10px]">{item.username}</p>
              <p className="w-[10%] truncate px-[10px]">{item.msisdn}</p>
              <p className="w-[10%] truncate px-[10px]">{item.createdAt}</p>
              <p className="w-[10%] truncate px-[10px]">{item.updatedAt}</p>
              <p className="w-[10%] truncate px-[10px]">
                {item.isActive ? "Active" : "Not Active"}
              </p>
              <div className="w-[15%] flex items-center gap-[10px] truncate">
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
          ))
        ) : (
          <div className="my-[20px] w-full">
            <p>No record of users</p>
          </div>
        )}
        <div className="w-full flex items-center my-[10px] justify-end">
          <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            total={usersCount}
            onChange={onPageChange}
            current={pageNumber}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
