import { client } from "../client/client";

export const getPoints = async () => {
  try {
    const response = await client.get(
      "/market-points-redeem/list?pageNumber=1&pageSize=10"
    );
    return response;
  } catch (error) {
    return new Error(error);
  }
};
