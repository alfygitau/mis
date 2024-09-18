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
      `/markets/list?pageNumber=${pageNumber}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&wardIds=${selectedWards}`
    );
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
