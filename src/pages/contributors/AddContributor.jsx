import React, { useEffect, useState } from "react";
import { createAUser, getRoles } from "../../sdk/auth/auth";
import { getCountyMarkets, getMarkets } from "../../sdk/market/market";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Select, Space } from "antd";

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
  const [endDate, setEndDate] = useState("2024-12-30");
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
    console.log(market);
    try {
      const payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        msisdn: `254${msisdn.substring(1)}`,
        username: `254${msisdn.substring(1)}`,
        roleId: Number(role),
        marketId: market,
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
      navigate("/dashboard/contributors");
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
          </div>
          <div className="w-[49%]">
            <div className="w-full flex flex-col gap-[5px] mb-[20px]">
              <label htmlFor="msisdn">County</label>
              <select
                type="text"
                value={county}
                onChange={(e) => handleCountyChange(e.target.value)}
                placeholder="Enter your phone number"
                class="h-[50px] w-[100%] rounded text-gray-600 text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
                className="h-[50px] w-full text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              >
                {roles?.length > 0 &&
                  roles.map((role) => (
                    <option value={role?.roleId}>{role?.title}</option>
                  ))}
              </select>
            </div>
            {Number(role) === 4 && (
              <div className="w-full flex flex-col gap-[5px] mb-[20px]">
                <label htmlFor="role">Market</label>
                <select
                  value={market}
                  onChange={(e) => {
                    console.log("Selected market value:", e.target.value);
                    setMarket(e.target.value);
                  }}
                  placeholder="Select your market"
                  className="h-[50px] w-full text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                >
                  {markets?.map((market) => (
                    <option id={market?.marketId} value={market?.marketId}>
                      {market?.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
        <div className="w-[100%] flex justify-end my-[20px]">
          <button
            onClick={handleCreateFsc}
            className="h-[45px] text-[14px] px-[20px] mb-[20px] rounded-[5px] text-white bg-skyBlue"
          >
            Create User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContributor;
