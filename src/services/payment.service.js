import axios from "axios";
import config from "../configs/api.json";

const getPaymentsFromAPI = async () => {
  let result = [];
  try {
    const response = await axios.get(config.GET_PAYMENTS_URL);
    if (response && response.data) {
      result = response.data;
    }
  } catch (e) {
    // TODO: throw error because API is down
  }
  return result;
};

export default {
  getPaymentsFromAPI,
};
