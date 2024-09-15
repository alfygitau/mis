import React, { useEffect, useState } from "react";
import { getFscs } from "../../sdk/fsc/fsc";
import { getCounties } from "../../sdk/market/market";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Select, Space } from "antd";

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
  const [endDate, setEndDate] = useState("2024-09-01");
  const [fscs, setFscs] = useState([]);

  const handleChange = (value) => {
    console.log(value);
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
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
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

  return (
    <div className="w-full">
      <div className="my-[10px] flex items-center justify-between w-full">
        <p className="text-[16px] text-gray-700">FSC(Farm service center)</p>
        <div className="flex items-center gap-[20px]">
          <button
            onClick={() => navigate("/dashboard/contributors/add-fsc")}
            className="bg-[#F77E18] w-[200px] h-[40px] px-[20px] text-white"
          >
            Add Fsc
          </button>
        </div>
      </div>
      <div className="w-full h-[120px] px-[20px] bg-white flex flex-wrap items-center gap-[10px]">
        <select
          type="text"
          value={county}
          onChange={(e) => handleCountyChange(e.target.value)}
          placeholder="Enter your phone number"
          class="h-[50px] w-[19%] rounded text-gray-400 text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
          class="h-[50px] w-[19%] text-gray-400 rounded text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
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
          style={{ width: "19%", height: "50px", borderRadius: "0px" }}
          placeholder="Select your ward"
          onChange={handleChange}
          options={wardOptions}
          optionRender={(option) => <Space>{option.label}</Space>}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setFirstDate(e.target.value)}
          placeholder="Enter your first name"
          class="h-[50px] w-[19%] rounded text-gray-400 text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="Enter your first name"
          class="h-[50px] w-[19%] rounded text-gray-400 text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
        />
      </div>
      <div className="w-full bg-white mt-[20px] p-[20px]">
        <div className="flex font-bold border-b-2 h-[55px] items-center">
          <p className="w-[5%]">Id</p>
          <p className="w-[15%]">Name</p>
          <p className="w-[20%]">email</p>
          <p className="w-[10%]">Market</p>
          <p className="w-[10%]">County</p>
          <p className="w-[10%]">Subcounty</p>
          <p className="w-[10%]">Ward</p>
          <p className="w-[10%]">Phone number</p>
          <p className="w-[10%]">Action</p>
        </div>
        {fscs.length === 0 && (
          <div className="my-[20px] min-h-[500px] w-full">
            <p>No record of market fscs</p>
          </div>
        )}
        {fscs.length > 0 &&
          fscs?.map((item) => (
            <div className="flex text-[14px] border-b h-[55px] items-center">
              <p className="w-[5%]">{item?.farmServiceCenterId}</p>
              <p className="w-[15%]">
                {item.firstName} {item.lastName}
              </p>
              <p className="w-[20%]">{item.email}</p>
              <p className="w-[10%]">{item.market}</p>
              <p className="w-[10%]">{item.county}</p>
              <p className="w-[10%]">{item.subCounty}</p>
              <p className="w-[10%]">{item.ward}</p>
              <p className="w-[10%]">{item.msisdn}</p>
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
          ))}
      </div>
    </div>
  );
};

export default Contributors;
