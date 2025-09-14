import axios from "axios";

const baseUrl = "http://localhost:3001";
const api = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const postSubmissionData = async (submissionData) => {
  try {
    const res = await api.post("/artwork", submissionData);
    if (!res.data) {
      throw new Error(res.status);
    }
    console.log(res);
    return { status: res.status, data: res.data };
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
  }
};

const getSubmissionData = async () => {
  try {
    const res = await api.get("/artwork");
    if (!res.data) {
      throw new Error(res.status);
    }
    console.log("getting submission data", res.data);
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
  }
};

export { postSubmissionData, getSubmissionData };
