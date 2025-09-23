import axios from "axios";

// note: not used, but could be used with GET with params
const getData = async (url, data, config = {}) => {
  try {
    let res = await axios.get(url, data, {
      ...config,
      withCredentials: true,
    });

    // let data = await res.data;
    // return data;
    return res.data;
  } catch (error) {
    console.log(error, `error - getData in ${url} route`);
    throw error;
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
    throw error;
  }
};

const postData = async (url, data, config = {}) => {
  try {
    const res = await axios.post(url, data, {
      ...config,
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error, `error - postData in ${url} route`);
    throw error;
  }
};

const patchData = async (url, data, config = {}) => {
  try {
    let res = await axios.patch(url, data, {
      ...config,
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error, `error - patchData in ${url} route`);
    throw error;
  }
};

const putData = async (url, data, config = {}) => {
  try {
    const res = await axios.put(url, data, {
      ...config,
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error, `error - putData in ${url} route`);
    throw error;
  }
};

const deleteData = async (url, params = {}, headers = {}) => {
  const user = JSON.parse(localStorage.getItem("user"))
  if (user) {
    const config = {
      params,
      headers: {
        'Authorization': `Bearer ${user.token}`,
        ...headers,
      },
    }; const res = await axios.delete(url, config);
    const data = res.data;
    return data;
  } else {
    throw new Error("User not logged in");
  }
};


const isEmpty = (value) => {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "")
  );
};

const isFileValid = (file) => {
  if (!file.type.startsWith("image/")) {
    return { error: "please select an image file" };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { error: "File is too large! Must not exceed 5MB" };
  }
  return { valid: true };
};

export {
  getData,
  getAllData,
  postData,
  patchData,
  putData,
  deleteData,
  isEmpty,
  isFileValid,
};
