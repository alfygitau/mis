import React, { useEffect, useState } from "react";
import { getPoints } from "../../sdk/market-points/points";
import { toast } from "react-toastify";

const MarketPoints = () => {
  const [marketPoints, setMarketPoints] = useState([]);

  const fetchMarketPoints = async () => {
    try {
      const response = await getPoints();
      if (response.status === 200) {
        setMarketPoints(response.data.data.redeemRequests);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    fetchMarketPoints();
  }, []);
  return <div>MarketPoints</div>;
};

export default MarketPoints;
