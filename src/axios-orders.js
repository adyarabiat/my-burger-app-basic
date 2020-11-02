import axiosInstance from "axios";

const instance = axiosInstance.create({
  baseURL: "https://react-my-burger-65308.firebaseio.com/",
});

export default instance;
