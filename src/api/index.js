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
  baseURL: "http://192.168.1.21:3000",
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
