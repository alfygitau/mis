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

export const createFsc = async (userId, marketId) => {
  try {
    const response = await client.post("fsc/create", {
      userId,
      marketId,
    });
    return response;
  } catch (error) {
    return new Error(error);
  }
};
