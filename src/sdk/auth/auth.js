import axios from "axios";
import { client } from "../client/client";

export const authLogin = async (username, password) => {
  const credentials = btoa(`${username}:${password}`);
  try {
    const response = await axios.get(
      "https://ftma.egroup.co.ke/market-information/v1/api/authenticate",
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getRoles = async () => {
  try {
    const response = await client.get(
      "https://ftma.egroup.co.ke/market-information/v1/api/roles/list"
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getUsers = async (pageNumber, pageSize, startDate, endDate) => {
  try {
    const response = await client.get(
      `/users/list?pageNumber=${pageNumber}&pageSize=1000&startDate=${startDate}&endDate=${endDate}`
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const createAUser = async (payload) => {
  try {
    const response = await client.post("/user/create", payload);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const sendOtp = async (username) => {
  try {
    const response = await axios.get(
      `https://ftma.egroup.co.ke/market-information/v1/api/code/send?username=${username}`
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const verifyMyOtp = async (email, otp) => {
  try {
    const response = await axios.get(
      `https://ftma.egroup.co.ke/market-information/v1/api/code/verify?username=${email}&otp=${otp}`
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const updateMyPassword = async (email, password) => {
  try {
    const response = await axios.put(
      `https://ftma.egroup.co.ke/market-information/v1/api/password/reset`,
      {
        username: email,
        newPassword: password,
      }
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
