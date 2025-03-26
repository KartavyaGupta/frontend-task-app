import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const API = axios.create({
  baseURL: "https://backend-task-app-lime.vercel.app/",
  timeout: 20000, // 10 seconds
});

API.interceptors.request.use(async (config) => {
  // We'll store token in AuthContext or AsyncStorage
  const token = await getToken(); // Implement getToken() as needed
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
