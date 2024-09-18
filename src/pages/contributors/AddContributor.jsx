import React, { useEffect, useState } from "react";
import { createAUser, getRoles } from "../../sdk/auth/auth";
import { getMarkets } from "../../sdk/market/market";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { createFsc } from "../../sdk/fsc/fsc";

const AddContributor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [msisdn, setMsisdn] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [market, setMarket] = useState("");
  const [roles, setRoles] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [counties, setCounties] = useState([]);
  const [subcounties, setSubCounties] = useState([]);
  const [wards, setWards] = useState([]);
  const [county, setCounty] = useState("");
  const [subcounty, setSubCounty] = useState("");
  const [ward, setWard] = useState("");
  const [selectedWards, setSelectedWards] = useState([]);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-09-01");
  const [userId, setUserId] = useState("");

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

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        msisdn: msisdn,
        username: username,
        roleId: Number(role),
      };
      const response = await createAUser(payload);
      if (response.status === 201 || response.status === 200) {
        toast.success("User created");
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setMsisdn("");
      }
    } catch (error) {
      toast.error(error.response.data.message);
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

  const handleCreateFsc = async () => {
    try {
      const payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        msisdn: msisdn,
        username: username,
        roleId: Number(role),
      };
      const response = await createAUser(payload);
      if (response.status === 201 || response.status === 200) {
        setUserId(response.data.data.userId);
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setMsisdn("");
        setModalOpen(true);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const handleCreateFarmServiceCenter = async () => {
    try {
      const response = await createFsc(userId, market);
      if (response.status === 201 || response.status === 200) {
        toast.success("Fsc created successfully");
        setModalOpen(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchMarkets();
  }, []);
  return (
    <div className="w-full">
      <p className="text-[14px] my-[20px]">Add Farm service center</p>
      <div className="bg-white min-h-[600px] p-[20px]">
        <div className="w-full flex justify-between h-full">
          <div className="w-[49%]">
            <div className="w-full flex flex-col gap-[5px] mb-[20px]">
              <label htmlFor="msisdn">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="h-[50px] w-full text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              />
            </div>
            <div className="w-full flex flex-col gap-[5px] mb-[20px]">
              <label htmlFor="msisdn">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="h-[50px] w-full text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              />
            </div>
            <div className="w-full flex flex-col gap-[5px] mb-[20px]">
              <label htmlFor="email">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="h-[50px] w-full text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              />
            </div>
          </div>
          <div className="w-[49%]">
            <div className="w-full flex flex-col gap-[5px] mb-[20px]">
              <label htmlFor="msisdn">Phone number</label>
              <input
                type="text"
                value={msisdn}
                onChange={(e) => setMsisdn(e.target.value)}
                placeholder="Enter your username"
                className="h-[50px] w-full text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              />
            </div>
            <div className="w-full flex flex-col gap-[5px] mb-[20px]">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your username"
                className="h-[50px] w-full text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              />
            </div>
            <div className="w-full flex flex-col gap-[5px] mb-[20px]">
              <label htmlFor="role">Role</label>
              <select
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Enter your username"
                className="h-[50px] w-full text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              >
                {roles?.length > 0 &&
                  roles.map((role) => (
                    <option value={role?.roleId}>{role?.title}</option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className="w-[49%] my-[20px]">
          <button
            onClick={createUser}
            className="h-[50px] text-[14px] w-full mb-[20px] rounded-[5px] text-white bg-skyBlue"
          >
            Create User
          </button>
          <button
            onClick={handleCreateFsc}
            className="h-[50px] text-[14px] w-full rounded-[5px] text-white bg-oldGod"
          >
            Create farm sevice center
          </button>
        </div>
      </div>

      <Modal
        title="Create farm service center"
        centered
        open={modalOpen}
        onOk={handleCreateFarmServiceCenter}
        onCancel={() => setModalOpen(false)}
      >
        <div className="w-[50%] flex flex-col gap-[5px] mb-[20px]">
          <label htmlFor="role">Market</label>
          <select
            type="text"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            placeholder="Enter your username"
            className="h-[50px] w-full text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
          >
            {markets?.length > 0 &&
              markets.map((market) => (
                <option value={market?.marketId}>{market?.title}</option>
              ))}
          </select>
        </div>
      </Modal>
    </div>
  );
};

export default AddContributor;
