import { client } from "../client/client";

export const getMarkets = async (
  pageNumber,
  pageSize,
  selectedWards,
  startDate,
  endDate
) => {
  try {
    const response = await client.get(
      `/markets/list?pageNumber=${pageNumber}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`
    );
    return response;
  } catch (error) {
    return new Error(error);
  }
};

export const getAllMarkets = async () => {
  try {
    const response = await client.get(`/markets/list`);
    return response;
  } catch (error) {
    return new Error(error);
  }
};

export const getCounties = async () => {
  try {
    const response = await client.get("/location/list");
    return response;
  } catch (error) {
    return new Error(error);
  }
};

export const createMarket = async (payload) => {
  try {
    const response = await client.post("/markets/create", payload);
    return response;
  } catch (error) {
    return new Error(error);
  }
};
