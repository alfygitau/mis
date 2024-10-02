import axios from "axios";
import { jwtDecode } from "jwt-decode";

function httpClient(baseURL) {
  const baseClient = axios.create({
    baseURL,
    timeout: 10000,
  });

  baseClient.interceptors.request.use(async (request) => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    const accessToken = user ? user.token : null;

    if (!accessToken) {
      window.location.href = "/";
      throw new Error("No access token available");
    }
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("authUser");
      window.location.href = "/";
      throw new Error("Token expired");
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
