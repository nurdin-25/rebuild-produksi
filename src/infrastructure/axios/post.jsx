import axios from "axios";

const AxiosPost = async ({ url, data }) => {
  const token =
    JSON.parse(localStorage.getItem("userInfo"))?.access_token || "-";
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        language: "id-ID",
        "ngrok-skip-browser-warning": 1,
      },
      // timeout: 4000,
    };
    const response = await axios.post(url, data, config);
    // const response = await axios.post(url, data);
    return { value: response.data, error: null };
  } catch (error) {
    return { value: null, error: error.response };
  }
};

const AxiosPostLogin = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return { value: response.data, error: null };
  } catch (error) {
    if (error.response === undefined) {
      return {
        value: null,
        error: null,
      };
    } else {
      return {
        value: null,
        error: error.response,
      };
    }
  }
};
const listExport = { AxiosPost, AxiosPostLogin };

export default listExport;
