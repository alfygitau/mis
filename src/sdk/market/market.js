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
export const getCountyMarkets = async (
  pageNumber,
  pageSize,
  selectedCounties = [41],
  startDate,
  endDate
) => {
  try {
    const response = await client.get(
      `/markets/list?pageNumber=${pageNumber}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&countyIds=${selectedCounties}`
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

export const deleteMarket = async (marketId) => {
  try {
    const response = await client.delete(`/market/${marketId}/soft-delete`);
    return response;
  } catch (error) {
    return new Error(error);
  }
};

export const updateMarket = async (marketId, payload) => {
  try {
    const response = await client.put(`/market/${marketId}/edit`, payload);
    return response;
  } catch (error) {
    return new Error(error);
  }
};
