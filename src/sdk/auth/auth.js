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
    return new Error(error);
  }
};

export const getRoles = async () => {
  try {
    const response = await client.get(
      "https://ftma.egroup.co.ke/market-information/v1/api/roles/list"
    );
    return response;
  } catch (error) {
    return new Error(error);
  }
};

export const getUsers = async () => {
  try {
    const response = await client.get("/users/list");
    return response;
  } catch (error) {
    return new Error(error);
  }
};

export const createAUser = async (payload) => {
  try {
    const response = await axios.post(
      "https://ftma.egroup.co.ke/market-information/v1/api/user/create",
      payload
    );
    return response;
  } catch (error) {
    return new Error(error);
  }
};
