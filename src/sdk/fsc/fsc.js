import { client } from "../client/client";

export const getFscs = async (
    pageNumber,
    pageSize,
    selectedWards,
    startDate,
    endDate
  ) => {
    try {
      const response = await client.post(
        `/fsc/list?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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