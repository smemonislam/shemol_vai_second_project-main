import axios from "axios";

const API_URL = process.env.VUE_APP_API_BASE_URL;

export default {
    async getPackageListData() {  
      try {
        const response = await axios.get(API_URL+"/api/v1/sg-5/olt-packges/");
        return response.data;
      } catch (error) {
        console.error("Error retrieving user:", error);
        throw error; 
      }
    },
  };
