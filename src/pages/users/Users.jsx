import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUsers } from "../../sdk/auth/auth";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      if (response.status === 200) {
        console.log(response.data);
        setUsers(response.data.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="w-full h-full">
      <p>All users</p>
      <div className="w-full min-h-[650px] bg-white mt-[20px] p-[20px]">
        <div className="flex font-bold border-b-2 h-[55px] items-center">
          <p className="w-[5%]">Id</p>
          <p className="w-[15%]">Name</p>
          <p className="w-[20%]">email</p>
          <p className="w-[10%]">Mobile</p>
          <p className="w-[10%]">Role</p>
          <p className="w-[10%]">Create at</p>
          <p className="w-[10%]">Status</p>
          <p className="w-[10%]">Action</p>
        </div>
        {users.length === 0 && (
          <div className="my-[20px] min-h-[500px] w-full">
            <p>No record of users</p>
          </div>
        )}
        {users.length > 0 &&
          users?.map((item) => (
            <div className="flex text-[14px] border-b h-[55px] items-center">
              <p className="w-[5%]">{item?.userId}</p>
              <p className="w-[15%]">
                {item.firstName} {item.lastName}
              </p>
              <p className="w-[20%]">{item.email}</p>
              <p className="w-[10%]">{item.msisdn}</p>
              <p className="w-[10%]">{item.role}</p>
              <p className="w-[10%]">{item.createdAt}</p>
              <p className="w-[10%]">
                {item.isActive ? "Active" : "Not Active"}
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
          ))}
      </div>
    </div>
  );
};

export default Users;
