import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.VUE_APP_API_BASE_URL;

export default {
  async login(user) {
    const response = await fetch(API_URL+"/api/v1/sg-5/login/v1/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCookie('csrftoken')
      },
      body: JSON.stringify(user)
    });
    const data = await response.json(); 

    if (data.token) {
      localStorage.setItem("userF", JSON.stringify(data.token));
      localStorage.setItem("user_data", JSON.stringify(data));
    }
  },

  async logout() {
    try {
      await axios.post("logout", {}, { headers: authHeader() });
    } finally {
      localStorage.removeItem("userF");
      localStorage.removeItem("user_data");
    }
  },

  async register(user) {
    const response = await axios.post(API_URL + "/api/v1/sg-5/singup/v1/", user);
    if (response.data.token) {
      localStorage.setItem("userF", JSON.stringify(response.data.token));
      localStorage.setItem("user_data", JSON.stringify(response.data));
    }
  },

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
};
