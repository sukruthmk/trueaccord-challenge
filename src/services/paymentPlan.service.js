import axios from "axios";
import config from "../configs/api.json";

const getPaymentPlansFromAPI = async () => {
  let result = [];
  try {
    const response = await axios.get(config.GET_PAYMENT_PLANS_URL);
    if (response && response.data) {
      result = response.data;
    }
  } catch (e) {
    // TODO: throw error because API is down
  }
  return result;
};

export default {
  getPaymentPlansFromAPI,
};
