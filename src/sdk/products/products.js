import { client } from "../client/client";

export const getProducts = async (
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
    const response = await client.get(`/products/list?${params.toString()}`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await client.get(`/products/list?pageSize=1000`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getCountyProducts = async (
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
    const response = await client.get(
      `/county-products/list?${params.toString()}`
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
export const getAllCountyProducts = async () => {
  try {
    const response = await client.get(`/county-products/list`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getMyOwnCountyProducts = async (countyId) => {
  try {
    const response = await client.get(
      `/county-products/list?countyIds=${countyId}&pageSize=1000`
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getMyCountyProducts = async (countyId) => {
  try {
    const response = await client.get(
      `/county-products/list?countyIds=${countyId}&pageSize=1000`
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
export const getProductsPrices = async (
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

    const response = await client.get(
      `/products-prices/list?${params.toString()}`
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
export const getAllProductsPrices = async () => {
  try {
    const response = await client.get(`/products-prices/list`);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const addProduct = async (
  productTitle,
  unitOfMeasurement,
  basicQuantity
) => {
  try {
    const response = await client.post("/product/create", {
      title: productTitle,
      unitOfMeasurement: unitOfMeasurement,
      basicQuantity: Number(basicQuantity),
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const createProductPrice = async (payload) => {
  try {
    const response = await client.post("/product/price/create", payload);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const createCountyProduct = async (payload) => {
  try {
    const response = await client.post("/county-product/create", payload);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getUnitsOfMeasurement = async () => {
  try {
    const response = await client.get("/products/unit-of-measurement/list");
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getCountyProductsPriceRanges = async (
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
    const response = await client.get(
      `/county-product-price-range/list?${params.toString()}`
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const editProduct = async (productId, payload) => {
  try {
    const response = await client.put(`/product/${productId}/edit`, payload);
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const editCountyProduct = async (productId, payload) => {
  try {
    const response = await client.put(
      `/county-product/${productId}/edit`,
      payload
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const addCountyProductPriceRange = async (
  productId,
  minPrice,
  maxPrice,
  rewardPoints,
  unitOfMeasurement
) => {
  try {
    const response = await client.post("/county-product-price-range/create", {
      countyProductId: productId,
      minPrice: minPrice,
      maxPrice: maxPrice,
      rewardPoints: rewardPoints,
      measurementUnitId: unitOfMeasurement,
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const validateAPrice = async (priceId, payload) => {
  try {
    const response = await client.put(
      `/product-price/${priceId}/verify`,
      payload
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getProductsAveragePrices = async (
  pageNumber,
  pageSize,
  startDate,
  endDate,
  county,
  subcounty,
  selectedWards
) => {
  try {
    const params = new URLSearchParams({
      pageNumber,
      pageSize,
      startDate,
      endDate,
      county,
      subcounty,
      selectedWards,
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
    const response = await client.get(
      `/products-average-prices/list?${params.toString()}`
    );
    return response;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
