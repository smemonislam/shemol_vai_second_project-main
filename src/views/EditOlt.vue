<template>
  <div class="row justify-content-center">
    <div class="col-6">
      <div id="basic-info" class="card mt-4">
        <div class="card-body pt-0">
          <div class="row mb-3 p-3">
            <div class="col-6 mb-3">
              <label class="form-label">Mikrotik IP</label>
              <input
                v-model="formData.Mikrotik_ip"
                type="text"
                placeholder="Mikrotik IP"
                class="form-control"
              />
            </div>
            <div class="col-6 mb-3">
              <label class="form-label">Mikrotik Username</label>
              <input
                v-model="formData.m_username"
                type="text"
                placeholder="Mikrotik Username"
                class="form-control"
              />
            </div>
            <div class="col-6 mb-3">
              <label class="form-label">Mikrotik Password</label>
              <input
                v-model="formData.m_password"
                type="text"
                placeholder="Mikrotik Password"
                class="form-control"
              />
            </div>
            <div class="col-6 mb-3">
              <label class="form-label">Mikrotik Port</label>
              <input
                v-model="formData.m_port"
                type="text"
                placeholder="Mikrotik Port"
                class="form-control"
              />
            </div>
            <div class="col-6 mb-3">
              <label class="form-label">OLT Name</label>
              <input
                v-model="formData.olt_name"
                type="text"
                placeholder="OLT Name"
                class="form-control"
              />
            </div>
            <div class="col-6 mb-3">
              <label class="form-label">OLT IP</label>
              <input
                v-model="formData.olt_ip"
                type="text"
                placeholder="OLT IP"
                class="form-control"
              />
            </div>
            <div class="col-6 mb-3">
              <label class="form-label">OLT Username</label>
              <input
                v-model="formData.olt_username"
                type="text"
                placeholder="OLT Username"
                class="form-control"
              />
            </div>
            <div class="col-6 mb-3">
              <label class="form-label">OLT Password</label>
              <input
                v-model="formData.olt_password"
                type="text"
                placeholder="OLT Password"
                class="form-control"
              />
            </div>
            <div class="col-6 mb-3">
              <label class="form-label">OLT Port</label>
              <input
                v-model="formData.olt_port"
                type="text"
                placeholder="OLT Port"
                class="form-control"
              />
            </div>
            <div class="col-6 mb-3">
              <label class="form-label">Description</label>
              <input
                v-model="formData.description"
                type="text"
                placeholder="Description"
                class="form-control"
              />
            </div>

            <div class="col-6 mb-3">
              <label class="form-label">Olt Modes</label>
              <select v-model="formData.olt_modes" name="" id="" class="form-control">
                <option value="" selected disabled hidden>Select Olt Mode</option>
                <option v-for="(data,index ) in cat_data.olt_mode" :key="index" :value="data.id">{{data.olt_model}}</option>
              </select>
              
            </div>
            <div class="col-6 mb-3">
              <label class="form-label">Olt Brands</label>
              <select v-model="formData.olt_brands" name="" id="" class="form-control">
                <option value="" selected disabled hidden>Select Olt Brand</option>
                <option v-for="(data,index ) in cat_data.olt_brand" :key="index" :value="data.id">{{data.olt_brand_name}}</option>
              </select>
            </div>
            <div class="col-6 mb-3">
              <label class="form-label">Status</label>
              <select v-model="formData.show" class="form-control" name="" id="">
                  <option value="true">Show</option>
                  <option value="false">Hide</option>
              </select>
            </div>
          </div>
          
          <button
            class="float-end mb-0 btn btn-success"
            color="dark"
            variant="gradient"
            size="sm"
            @click="submitForm"
          >
            Update Olt
          </button>
            <router-link :to="{name:'OltList'}">
          <button
            class="float-end mx-3 mb-0 btn btn-secondary"
            color="dark"
            variant="gradient"
            size="sm"
          >
            Cancel
          </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataList from "../services/data_list.service";
import updateOlt from "../services/update-olt.service";
import oltCatListData from "../services/olt-cat-list.service";
import showSwal from "../mixins/showSwal.js";
export default {
  data() {
    return {
      cat_data : [],
      data : [],
      edit_id : this.$route.params.edit_id,
      formData: {
        Mikrotik_ip: "",
        m_username: "",
        m_password: "",
        m_port: "",
        olt_ip: "",
        olt_username: "",
        olt_password: "",
        olt_port: "",
        description: "",
        show: true,
        olt_name: "",
        olt_modes: "",
        olt_brands: ""
      }
    };
  },
  mounted(){
    this.getData();
    this.getCatData();
    let user= JSON.parse(localStorage.getItem("user_data"));
    console.log(user.id)
    this.formData.login_user=user.id
  },
  methods: {
            async getData() {
                const response = await dataList.getDataList();
                this.data = response.filter(item => item.id == this.$route.params.edit_id);
                if(this.data){
                    this.formData.Mikrotik_ip =this.data[0].Mikrotik_ip;
                    this.formData.m_username =this.data[0].m_username;
                    this.formData.m_password =this.data[0].m_password;
                    this.formData.m_port =this.data[0].m_port;
                    this.formData.olt_ip =this.data[0].olt_ip;
                    this.formData.olt_username =this.data[0].olt_username;
                    this.formData.olt_password =this.data[0].olt_password;
                    this.formData.olt_port =this.data[0].olt_port;
                    this.formData.description =this.data[0].description;
                    this.formData.olt_name =this.data[0].olt_name;
                    this.formData.olt_modes =this.data[0].olt_modes;
                    this.formData.olt_brands =this.data[0].olt_brands;
                }
            },
            async getCatData() {
                const response = await oltCatListData.getCatListData();
                this.cat_data = response;
            },
    async submitForm() {
      console.log("Form submitted with data:", this.formData);
      try {
        await updateOlt.updateData(this.formData,this.edit_id);
        showSwal.methods.showSwal({
          type: "success",
            message: "Olt Updated Successfully!",
        });
        this.$router.push("/olt-list");
        } catch (error) {
        console.error("Error adding Olt:", error);
        showSwal.methods.showSwal({
          type: "error",
            message: "Failed to Create Olt!",
        });
        }
    },

    
  }
};
</script>
