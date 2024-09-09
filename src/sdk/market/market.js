import { client } from "../client/client";

export const getMarkets = async (
  pageNumber,
  pageSize,
  selectedWards,
  startDate,
  endDate
) => {
  try {
    const response = await client.post(
      `/markets/list?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        wardIds: selectedWards,
        startDate: startDate,
        endDate: endDate,
      }
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
