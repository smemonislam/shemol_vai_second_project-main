import axios from "axios";
const API_URL = process.env.VUE_APP_API_BASE_URL;

export default {
  async getProfile() {
    let tokenPromise = new Promise((resolve, reject) => {
      let token = JSON.parse(localStorage.getItem("userF"));
      if (token) {
        resolve(token);
      } else {
        reject("Token not found in localStorage");
      }
    });

    try {
      const token = await tokenPromise;
      const response = await axios.get(API_URL+"/api/v1/sg-5/get_auth_user_info/", {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error retrieving token:", error);
      throw error; // Propagate the error to the caller
    }
  },
};
