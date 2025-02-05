import axios from 'axios';

interface AnalyticsParams {
  startDate?: string;
  endDate?: string;
}

export const getAnalytics = async (params: AnalyticsParams) => {
  return await axios({
    method: "GET",
    url: "/api/v1/analytics",
    params
  });
};
