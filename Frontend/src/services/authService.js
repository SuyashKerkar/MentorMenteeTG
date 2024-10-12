// src/services/authService.js
import axios from "axios";
import Sdashboard from "../components/StudentSide/Sdashboard";
import HodDashboard from "../components/HodSide/HodDashboard";

const API_URL = "http://localhost:3001";

const register = (email, password) => {
  return axios.post(`${API_URL}/register`, { email, password });
};

const login = (email, password) => {
  return axios
    .post(`${API_URL}/login`, { email, password })
    .then((response) => {
      const { token, user } = response.data;
      const { uid, type } = user;
      if (token) {
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify({ uid, type }));
        localStorage.setItem("loggedInUser", JSON.stringify({ email: email }));
      }
      return { uid, type };
    });
};

// const login = async (email, password) => {
//     const val = await axios.post(`${API_URL}/login`, { email, password })

//         const { token, user } = val.data;
//         const { uid, type } = user[0];
//         if (token) {
//             localStorage.setItem("token", JSON.stringify(token));
//             localStorage.setItem("user", JSON.stringify({ uid, type }));
//         }
//         // console.log({ uid, type });
//         return { uid, type };

// };

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    return token != null;
  } catch (error) {
    console.error("Error parsing token:", error);
    return false;
  }
};

const getUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.uid == "1" && user.type == "1") {
      return 1;
    } else if (user.uid == "2") {
      console.log("hehehehe");
      return 2;
    } else if (user.uid == "3") {
      return 3;
    }
  } catch (error) {
    console.error("Error parsing token:", error);
    return false;
  }
};

const setData = async () => {
  let personalInfo = JSON.parse(localStorage.getItem("personalInfo"));
  let semesters = JSON.parse(localStorage.getItem("semesters"));
  let internshipInfo = JSON.parse(localStorage.getItem("internshipInfo"));
  let achievements = JSON.parse(localStorage.getItem("achievements"));
  const response = await axios.post(`${API_URL}/setData`, {
    personalInfo,
    semesters,
    internshipInfo,
    achievements,
  });
  console.log("sent");
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getUser,
  setData,
};
