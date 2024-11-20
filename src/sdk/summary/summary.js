import { client } from "../client/client";

export const getSummaries = async () => {
  try {
    const response = await client.get("/report/summaries?date=2024-09-21'");
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getDailyPrices = async (date, county) => {
  try {
    const response = await client.get(
      `/report/daily-prices?date=${date}&countyId=${county}`
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getCountyPriceTrends = async (
  productId,
  countyId,
  startDate,
  endDate
) => {
  try {
    const response = await client.get(
      `/report/prices-trends?countyProductId=${productId}&countyId=${countyId}&startDate=${startDate}&endDate=${endDate}`
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getCountyPricesComparison = async (
  productId,
  startDate,
  endDate
) => {
  try {
    const response = await client.get(
      `/report/prices-comparison?productId=${productId}&startDate=${startDate}&endDate=${endDate}`
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getMarketPriceSummaries = async (
  countyId,
  productId,
  startDate,
  endDate
) => {
  try {
    const response = await client.get(
      `/report/market-prices?countyId=${countyId}&countyProductId=${productId}&startDate=${startDate}&endDate=${endDate}`
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getMarketPriceTrends = async (
  countyId,
  productId,
  marketId,
  startDate,
  endDate
) => {
  try {
    const response = await client.get(
      `/report/market-prices-trends?countyId=${countyId}&countyProductId=${productId}&marketId=${marketId}&startDate=${startDate}&endDate=${endDate}`
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
