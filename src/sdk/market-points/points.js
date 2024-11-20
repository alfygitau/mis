import { client } from "../client/client";

export const getPoints = async (
  county,
  startDate,
  endDate,
  pageNumber,
  pageSize
) => {
  try {
    const params = new URLSearchParams({});

    if (county) {
      params.append("countyIds", county);
    }
    if (startDate) {
      params.append("startDate", startDate);
    }
    if (endDate) {
      params.append("endDate", endDate);
    }
    if (pageNumber) {
      params.append("pageNumber", pageNumber);
    }
    if (pageSize) {
      params.append("pageSize", pageSize);
    }
    const response = await client.get(
      `/market-points-redeem/list?${params.toString()}`
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const allowRedeemPoints = async (id) => {
  try {
    const response = await client.put(`/market-points-redeem/${id}/update`, {
      status: "COMPLETED",
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
