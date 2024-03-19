import axios from "axios";

const instance = axios.create({
  baseURL: "https://referral-ripple-application-backend.onrender.com/api",
});

export const loginCheck = async (values) => {
  try {
    const res = await instance.post("/login", values);
    return res.data;
  } catch (error) {
    console.error("LoginCheck::error", error);
    throw error;
  }
};

export const registerUser = async (values) => {
  try {
    const res = await instance.post(`/register`, values);
    return res.data;
  } catch (error) {
    console.error("Register::error", error);
    throw error;
  }
};
export const getuserInfo = async (username) => {
  try {
    const res = await instance.get(`/getInfo?username=${username}`);
    return res.data;
  } catch (error) {
    console.error("getInfo::error", error);
    throw error;
  }
};


