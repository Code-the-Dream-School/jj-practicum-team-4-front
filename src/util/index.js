import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;
// note: not used, but could be used with GET with params
const getData = async (url, params) => {
  try {
    let res = await axios.get(url, params);
    let data = await res.data;
    if (!res.ok) {
      throw new Error(res.status);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.log(error, `error - getData in ${url} route`);
  }
};

const getAllData = async (url) => {
  try {
    const token = localStorage.getItem("token");

    let res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    let data = await res.data;
    return data;
  } catch (error) {
    console.log(error, `error - getAllData in ${url} route`);
    console.log(`Error in getAllData for ${url}`, error.message);
    return null;
  }
};

const isEmpty = (value) => {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "")
  );
};

export { getData, getAllData, isEmpty };
