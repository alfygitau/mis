import React, { useEffect, useState } from "react";
import { deleteFsc, getFscs, updateFsc } from "../../sdk/fsc/fsc";
import { getCounties } from "../../sdk/market/market";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Select, Space, Modal, Pagination } from "antd";

const Contributors = () => {
  const navigate = useNavigate();
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
  const [fscs, setFscs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [msisdn, setMsisdn] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [totalFscCount, setTotalFscCount] = useState(0);

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

  const fetchFscs = async () => {
    setIsLoading(true);
    try {
      const response = await getFscs(
        pageNumber,
        pageSize,
        selectedWards,
        startDate,
        endDate
      );
      if (response.status === 200) {
        setFscs(response.data.data.fsc);
        setTotalFscCount(response.data.data.totalRecords);
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
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchFscs();
  }, [pageNumber, pageSize, selectedWards, startDate, endDate]);

  useEffect(() => {
    getAllCounties();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedEditUser, setSelectedEditUser] = useState("");

  const showModal = (id) => {
    setSelectedUser(id);
    setIsModalOpen(true);
  };
  const showEditModal = (user) => {
    setSelectedEditUser(user);
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setMsisdn(user?.msisdn);
    setEmail(user?.email);
    setIsEditModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const response = await deleteFsc(selectedUser);
      if (response.status === 200) {
        toast.success("User deleted from the list");
        setIsModalOpen(false);
      }
    } catch (error) {
      setIsModalOpen(false);
    }
  };

  const handleEditOk = async () => {
    try {
      const response = await updateFsc(selectedEditUser.farmServiceCenterId, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        msisdn: msisdn,
        username: msisdn,
      });
      if (response.status === 200 || response.status === 201) {
        toast.success("User updated successfully");
        setIsEditModalOpen(false);
      }
      setIsEditModalOpen(false);
    } catch (error) {
      setIsEditModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  const onPageChange = (page, size) => {
    setPageNumber(page);
    setPageSize(size);
  };

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  return (
    <div className="w-full mb-[20px]">
      <Modal
        centered
        width={700}
        title="Delete a user"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete the Farm Service Center (FSC) ?</p>
      </Modal>
      <Modal
        centered
        width={700}
        title="Edit a user"
        open={isEditModalOpen}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <div className="w-full flex flex-col gap-[5px] mb-[20px]">
          <label htmlFor="msisdn">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            className="h-[50px] w-full text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
          />
        </div>
        <div className="w-full flex flex-col gap-[5px] mb-[20px]">
          <label htmlFor="msisdn">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
            className="h-[50px] w-full text-[14px]  border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
          />
        </div>
        <div className="w-full flex flex-col gap-[5px] mb-[20px]">
          <label htmlFor="msisdn">Phone number</label>
          <input
            type="text"
            value={msisdn}
            onChange={(e) => setMsisdn(e.target.value)}
            placeholder="Enter your username"
            className="h-[50px] w-full text-[14px]  border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
          />
        </div>
        <div className="w-full flex flex-col gap-[5px] mb-[20px]">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your username"
            className="h-[50px] w-full text-[14px]  border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
          />
        </div>
      </Modal>
      <div className="w-full h-[120px] mt-[20px] px-[20px] bg-white flex lg:justify-between flex-wrap items-center gap-[10px]">
        <select
          type="text"
          value={county}
          onChange={(e) => handleCountyChange(e.target.value)}
          placeholder="Enter your phone number"
          className="h-[50px] w-[19%] text-gray-600 text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
          className="h-[50px] w-[19%] text-gray-600 text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
        >
          <option value="">Select your subcounty</option>
          {subcounties?.map((subcounty) => (
            <option key={subcounty?.subCountyId} value={subcounty?.subCountyId}>
              {subcounty?.subCountyName}
            </option>
          ))}
        </select>
        <Select
          mode="multiple"
          maxTagCount="responsive"
          style={{
            width: "19%",
            height: "50px",
            borderRadius: "0px",
            color: "#000",
          }}
          placeholder="Select your ward"
          onChange={handleChange}
          options={wardOptions}
          dropdownStyle={{ color: "#000" }}
          optionRender={(option) => (
            <Space style={{ color: "#000" }}>{option.label}</Space>
          )}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setFirstDate(e.target.value)}
          placeholder="Enter your first name"
          className="h-[50px] w-[19%] text-gray-600 text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="Enter your first name"
          className="h-[50px] w-[19%] text-gray-600 text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
        />
      </div>
      <div className="w-full bg-white min-h-[500px] mt-[20px] p-[20px]">
        <div className="flex text-[13px] font-bold border-b-2 h-[55px] items-center">
          <p className="w-[5%]">Id</p>
          <p className="w-[10%] truncate px-[10px]">Name</p>
          <p className="w-[15%] truncate px-[10px]">email</p>
          <p className="w-[10%] truncate px-[10px]">Phone number</p>
          <p className="w-[10%] truncate px-[10px]">Market</p>
          <p className="w-[10%] truncate px-[10px]">County</p>
          <p className="w-[10%] truncate px-[10px]">Subcounty</p>
          <p className="w-[10%] truncate px-[10px]">Ward</p>
          <p className="w-[10%] truncate px-[10px]">Points</p>
          <p className="w-[10%] truncate px-[10px]">Action</p>
        </div>
        {isLoading && (
          <div className="my-[20px] flex items-center justify-center min-h-[500px] w-full">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
        )}
        {fscs.length > 0 &&
          fscs?.map((item) => (
            <div
              key={item?.farmServiceCenterId}
              className="flex text-[13px] border-b h-[55px] items-center"
            >
              <p className="w-[5%] truncate px-[10px]">
                {item?.farmServiceCenterId}
              </p>
              <p className="w-[10%] truncate px-[10px]">
                {item.firstName} {item.lastName}
              </p>
              <p className="w-[15%] truncate px-[10px]">{item.email}</p>
              <p className="w-[10%] truncate px-[10px]">{item.msisdn}</p>
              <p className="w-[10%] truncate px-[10px]">{item.market}</p>
              <p className="w-[10%] truncate px-[10px]">{item.county}</p>
              <p className="w-[10%] truncate px-[10px]">{item.subCounty}</p>
              <p className="w-[10%] truncate px-[10px]">{item.ward}</p>
              <p className="w-[10%] truncate px-[10px]">
                {item.marketPointsBalance}
              </p>
              <div className="w-[10%] flex items-center gap-[10px] truncate">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="cursor-pointer"
                  onClick={() => showEditModal(item)}
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
                  className="cursor-pointer"
                  onClick={() => showModal(item?.farmServiceCenterId)}
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
        {fscs.length === 0 && (
          <div className="my-[20px] min-h-[500px] w-full">
            <p>No record of market fscs</p>
          </div>
        )}
        <div className="w-full flex items-center my-[10px] justify-center">
          <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            total={totalFscCount}
            onChange={onPageChange}
            current={pageNumber}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
};

export default Contributors;
