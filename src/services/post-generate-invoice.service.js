import axios from "axios";

const API_URL = process.env.VUE_APP_API_BASE_URL;

export default {
    async generateInvoiceData(form_data) {
      let userPromise = new Promise((resolve, reject) => {
        let user= JSON.parse(localStorage.getItem("user_data"));
        if (user) {
          resolve(user);
        } else {
          reject("User not found in localStorage");
        }
      });
  
      try {
        const user = await userPromise;
        const response = await axios.post(API_URL + `/api/v1/sg-5/billing/create/`, form_data, {
            headers: {
              'Authorization': user.id
            }
          });
        return response.data;
      } catch (err) {
        console.error("Error:", err);
        throw err; 
      }
    },
  };
