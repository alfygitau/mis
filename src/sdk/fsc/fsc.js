import { client } from "../client/client";

export const getFscs = async (
  pageNumber,
  pageSize,
  selectedWards,
  startDate,
  endDate
) => {
  try {
    const response = await client.get(
      `/fsc/list?pageNumber=${pageNumber}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&wardIds=${selectedWards}`
    );
    return response;
  } catch (error) {
    return new Error(error);
  }
};

export const createFsc = async (payload) => {
  try {
    const response = await client.post("/fsc/create", payload);
    return response;
  } catch (error) {
    return new Error(error);
  }
};

export const deleteFsc = async (userId) => {
  try {
    const response = await client.delete(`/user/${userId}/soft-delete`, {
      isActive: false,
    });
    return response;
  } catch (error) {
    return new Error(error);
  }
};

export const updateFsc = async (userId, payload) => {
  try {
    const response = await client.put(`/user/${userId}/update`, payload);
    return response;
  } catch (error) {
    return new Error(error);
  }
};
