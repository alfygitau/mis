import { client } from "../client/client";

export const getMarkets = async (
  pageNumber,
  pageSize,
  selectedWards,
  startDate,
  endDate,
  county,
  subcounty
) => {
  try {
    const params = new URLSearchParams({
      pageNumber,
      pageSize,
      startDate,
      endDate,
    });

    if (county) {
      params.append("countyIds", county);
    }
    if (subcounty) {
      params.append("subCountyIds", subcounty);
    }
    if (selectedWards.length > 0) {
      params.append("wardIds", selectedWards);
    }
    const response = await client.get(`/markets/list?${params.toString()}`);
    return response;
  } catch (error) {
    return new Error(error);
  }
};
export const getCountyMarkets = async (selectedCounties) => {
  try {
    const response = await client.get(
      `/markets/list?countyIds=${selectedCounties}`
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
