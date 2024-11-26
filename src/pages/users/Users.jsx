import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createAUser, getRoles, getUsers } from "../../sdk/auth/auth";
import { Modal, Pagination, Switch } from "antd";
import {
  getCounties,
  getCountyMarkets,
  getMarkets,
} from "../../sdk/market/market";
import { useNavigate } from "react-router-dom";
import { deleteFsc, updateFsc } from "../../sdk/fsc/fsc";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(17);
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
  // const [pageNumber, setPageNumber] = useState(0);
  // const [pageSize, setPageSize] = useState(10);
  const [counties, setCounties] = useState([]);
  const [subcounties, setSubCounties] = useState([]);
  const [wards, setWards] = useState([]);
  const [county, setCounty] = useState("");
  const [subcounty, setSubCounty] = useState("");
  const [ward, setWard] = useState("");
  const [selectedWards, setSelectedWards] = useState([]);
  // const [startDate, setStartDate] = useState("2024-01-01");
  // const [endDate, setEndDate] = useState("2024-12-30");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const [createLoading, setCreateLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedEditUser, setSelectedEditUser] = useState("");
  const [allowRedeem, setAllowRedeem] = useState(0);
  const [selectedDeletedItem, setSelectedDeleteItem] = useState("");
  const [gender, setGender] = useState("");
  const [editGender, setEditGender] = useState("");

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
      toast.error(error?.response?.data?.message || error?.message);
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
        setMarkets(response.data.data.markets);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
  const fetchCountyMarkets = async (county) => {
    try {
      const response = await getCountyMarkets(county);
      if (response.status === 200) {
        setCountyMarkets(response.data.data.markets);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const showEditModal = (user) => {
    setAllowRedeem(user?.canRedeemPoints);
    setSelectedEditUser(user);
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setMsisdn(user?.msisdn);
    setEmail(user?.email);
    setEditGender(user?.gender);
    setIsEditModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };
  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  const handleOk = async () => {
    setDeleteLoading(true);
    try {
      const response = await deleteFsc(selectedDeletedItem);
      if (response.status === 200) {
        setDeleteLoading(false);
        toast.success("User deleted from the list");
        fetchUsers();
        setIsDeleteModalOpen(false);
      } else {
        setDeleteLoading(false);
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      setDeleteLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  const onChange = (checked) => {
    setAllowRedeem(checked ? 1 : 0);
  };

  const handleEditOk = async () => {
    setEditLoading(true);
    try {
      const response = await updateFsc(selectedEditUser.userId, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        msisdn: msisdn,
        username: msisdn,
        gender: editGender,
      });
      if (response.status === 200 || response.status === 201) {
        setEditLoading(false);
        toast.success("User updated successfully");
        fetchUsers();
        setIsEditModalOpen(false);
      } else {
        setEditLoading(false);
        toast.error(response.message);
      }
    } catch (error) {
      setEditLoading(false);
      toast.error(error?.response?.data?.message || error?.message);
      setIsEditModalOpen(false);
    }
  };

  const handleCreateFsc = async () => {
    setCreateLoading(true);
    try {
      const payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        msisdn: `254${msisdn.substring(1)}`,
        username: `254${msisdn.substring(1)}`,
        roleId: Number(role),
        marketId: Number(market),
        fsc: Number(role) === 4,
        ac: Number(role) === 3,
        ...(Number(role) === 3 && { countyId: Number(county) }),
      };
      const response = await createAUser(payload);
      if (response.status === 201 || response.status === 200) {
        setCreateLoading(false);
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setMsisdn("");
        toast.success("User created successfully");
        setIsModalOpen(false);
        fetchUsers();
      } else {
        setCreateLoading(false);
      }
    } catch (error) {
      setCreateLoading(false);
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const handleCountyChange = (value) => {
    setCounty(value);
    fetchCountyMarkets(value);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    getAllCounties();
  }, [county, startDate, endDate, pageNumber, pageSize]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showDeleteModal = (id) => {
    setSelectedDeleteItem(id);
    setIsDeleteModalOpen(true);
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
        setUsersCount(90);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setUsers([]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [pageNumber, pageSize, startDate, endDate]);

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
        title="Delete a user"
        open={isDeleteModalOpen}
        footer={null}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to delete the user ?</p>
        <div className="w-full my-[20px] flex items-center gap-[20px] justify-end">
          <button
            onClick={handleDeleteCancel}
            className="h-[35px] px-[20px] min-w-[120px] rounded bg-[#DD6D71] text-[#fff] text-[12px]"
          >
            Cancel
          </button>
          <button
            disabled={deleteLoading}
            onClick={handleOk}
            className="h-[35px] flex items-center justify-center gap-[10px] border px-[20px] min-w-[120px] rounded border-gray-300 bg-[#A19E3B] text-[#fff] text-[12px]"
          >
            {deleteLoading && (
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
        title="Edit a user"
        open={isEditModalOpen}
        footer={null}
        onCancel={handleEditCancel}
      >
        <div className="w-full flex flex-col gap-[5px] my-[20px] mb-[20px]">
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
            className="h-[50px] w-full text-[14px]  border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
          />
        </div>
        <div className="w-full flex flex-col gap-[5px] mb-[20px]">
          <label htmlFor="msisdn">Phone number</label>
          <input
            type="text"
            value={msisdn}
            onChange={(e) => setMsisdn(e.target.value)}
            placeholder="Enter your username"
            className="h-[50px] w-full text-[14px]  border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
          />
        </div>
        <div className="w-full flex flex-col gap-[5px] mb-[20px]">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your username"
            className="h-[50px] w-full text-[14px]  border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
          />
        </div>
        <div className="w-full flex flex-col gap-[5px] mb-[20px]">
          <label htmlFor="gender">Gender</label>
          <select
            value={editGender}
            onChange={(e) => setEditGender(e.target.value)}
            placeholder="Select your gender"
            className="h-[44px] w-full text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="w-full my-[20px] flex items-center gap-[20px] justify-end">
          <button
            onClick={handleEditCancel}
            className="h-[35px] px-[20px] min-w-[120px] rounded bg-[#DD6D71] text-[#fff] text-[12px]"
          >
            Cancel
          </button>
          <button
            disabled={editLoading}
            onClick={handleEditOk}
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
        title="Add a user"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="w-full">
          <div className="bg-white my-[30px]">
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
                  <label htmlFor="gender">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    placeholder="Select your gender"
                    className="h-[44px] w-full text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
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
                    <option value="">Select a role</option>
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
                      <option value="">Select a market</option>
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
            disabled={createLoading}
            onClick={handleCreateFsc}
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
        <p className="text-[15px] font-bold">All Users</p>
        <div>
          <button
            onClick={showModal}
            className="h-[40px] w-[40px] bg-[#00599A] flex items-center justify-center text-white"
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
      <div className="w-full min-h-[600px] bg-white mt-[10px] p-[10px]">
        <div className="flex text-[13px] font-bold border-b-2 h-[45px] items-center">
          <p className="w-[5%] truncate px-[10px]">Id</p>
          <p className="w-[10%] truncate px-[10px]">Name</p>
          <p className="w-[15%] truncate px-[10px]">email</p>
          <p className="w-[10%] truncate px-[10px]">Username</p>
          <p className="w-[10%] truncate px-[10px]">Mobile</p>
          <p className="w-[12%] truncate px-[10px]">Created at</p>
          <p className="w-[13%] truncate px-[10px]">Updated at</p>
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
        ) : users?.length > 0 ? (
          users?.map((item) => (
            <div
              key={item?.userId}
              className="flex text-[12px] border-b h-[35px] items-center"
            >
              <p className="w-[5%] text-[#00599A] cursor-pointer truncate px-[10px]">
                #{item?.userId}
              </p>
              <p className="w-[10%] truncate px-[10px]">
                {item?.firstName} {item?.lastName}
              </p>
              <p className="w-[15%] truncate px-[10px]">{item?.email}</p>
              <p className="w-[10%] truncate px-[10px]">{item?.username}</p>
              <p className="w-[10%] truncate px-[10px]">{item?.msisdn}</p>
              <p className="w-[12%] truncate px-[10px]">{item?.createdAt}</p>
              <p className="w-[13%] truncate px-[10px]">{item?.updatedAt}</p>
              <div className="w-[10%] truncate px-[10px]">
                {item?.active ? (
                  <div className="bg-[#DEF8DD] text-[#000] rounded flex items-center justify-center text-[12px] w-[60px]">
                    Active
                  </div>
                ) : (
                  <div className="bg-[#DD6D71] text-[#fff] rounded flex items-center justify-center text-[12px] w-[60px]">
                    Inactive
                  </div>
                )}
              </div>
              <div className="w-[15%] flex items-center gap-[10px] truncate">
                <div
                  onClick={() => showEditModal(item)}
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
                <div
                  onClick={() => showDeleteModal(item?.userId)}
                  className="flex items-center justify-center gap-[5px] py-[3px] text-[12px] bg-[#DD6D71] cursor-pointer px-[10px] text-white rounded"
                >
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
        <div className="w-full flex items-center mt-[10px] justify-end">
          <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            total={usersCount}
            onChange={onPageChange}
            current={pageNumber}
            pageSize={pageSize}
            pageSizeOptions={[15, 20, 25, 30]}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
