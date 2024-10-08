import { client } from "../client/client";

export const getSummaries = async () => {
  try {
    const response = await client.get("/report/summaries?date=2024-09-21'");
    return response;
  } catch (error) {
    return new Error(error);
  }
};

export const getDailyPrices = async (date, county) => {
  try {
    const response = await client.get(
      `/report/daily-prices?date=${date}&countyId=${county}`
    );
    return response;
  } catch (error) {
    return new Error(error);
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
      `/report/prices-trends?productId=${productId}&countyId=${countyId}&startDate=${startDate}&endDate=${endDate}`
    );
    return response;
  } catch (error) {
    return new Error(error);
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
    return new Error(error);
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
      `/report/market-prices?countyId=${countyId}&productId=${productId}&startDate=${startDate}&endDate=${endDate}`
    );
    return response;
  } catch (error) {
    return new Error(error);
  }
};

export const getMarketPriceTrends = async (countyId, productId, marketId, startDate, endDate) => {
  try {
    const response = await client.get(
      `/report/market-prices-trends?countyId=${countyId}&productId=${productId}&marketId=${marketId}&startDate=${startDate}&endDate=${endDate}`
    );
    return response;
  } catch (error) {
    return new Error(error);
  }
};
