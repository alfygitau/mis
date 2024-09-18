import { client } from "../client/client";

export const getProducts = async (
  pageNumber,
  pageSize,
  selectedWards,
  startDate,
  endDate
) => {
  try {
    const response = await client.get(
      `/products/list?pageNumber=${pageNumber}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&wardIds=${selectedWards}`
    );
    return response;
  } catch (error) {
    return new Error(error);
  }
};
export const getProductsPrices = async (
  pageNumber,
  pageSize,
  selectedWards,
  startDate,
  endDate
) => {
  try {
    const response = await client.get(
      `/products-prices/list?pageNumber=${pageNumber}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&wardIds=${selectedWards}`
    );
    return response;
  } catch (error) {
    return new Error(error);
  }
};

export const addProduct = async (productTitle) => {
  try {
    const response = await client.post("/product/create", {
      title: productTitle,
    });
    return response;
  } catch (error) {
    return new Error(error);
  }
};
