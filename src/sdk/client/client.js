import axios from "axios";

function httpClient(baseURL) {
  const baseClient = axios.create({
    baseURL,
    timeout: 10000,
  });

  baseClient.interceptors.request.use(async (request) => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    const accessToken = user ? user.token : null;

    if (!accessToken) {
      throw new Error("No access token available");
    }

    return {
      ...request,
      headers: {
        ...request.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };
  });

  return baseClient;
}

export const client = httpClient(
  "https://ftma.egroup.co.ke/market-information/v1/api"
);
