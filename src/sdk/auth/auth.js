import axios from "axios";

export const authLogin = async (username, password) => {
  console.log(username, password);
  const credentials = btoa(`${username}:${password}`);
  try {
    const response = await axios.get(
      "https://ftma.egroup.co.ke/market-information/v1/api/authenticate",
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    return new Error(error);
  }
};
