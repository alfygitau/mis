import { client } from "../client/client";

export const getFscs = async (
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
    const response = await client.get(`/fsc/list?${params.toString()}`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const createFsc = async (payload) => {
  try {
    const response = await client.post("/fsc/create", payload);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const deleteFsc = async (userId) => {
  try {
    const response = await client.delete(`/user/${userId}/hard-delete`, {
      isActive: false,
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const updateFsc = async (userId, payload) => {
  try {
    const response = await client.put(`/user/${userId}/update`, payload);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
