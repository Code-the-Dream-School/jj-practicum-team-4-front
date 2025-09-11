import axios from "axios";

const baseUrl = "http://localhost:3001";
const api = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const postData = async (submissionData) => {
  try {
    const res = await api.post("/artwork", submissionData);
    if (!res.data) {
      throw new error(res.status);
    }
    return { status: res.status, data: res.data };
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
  }
};

export { postData };
