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
              <label class="form-label">Billing</label>
              <select v-model="formData.olt_billing" class="form-control required" name="" id="">
                  <option value="" selected disabled hidden>Select</option>
                  <option v-for="(item,index) in olt_data" :key="index" :value="item.id">{{item.olt_pack}}</option>
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
            Add Olt <span v-if="loading" class="spinner-border spinner-border-sm mx-3"></span>
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
import addOlt from "../services/add-olt.service";
import oltCatListData from "../services/olt-cat-list.service";
import NewOltDataFormListData from "../services/get-newolt-get-data-form.service";
import showSwal from "../mixins/showSwal.js";
export default {
  data() {
    return {
      loading:false,
      cat_data : [],
      olt_data : [],
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
        login_user: "",
        olt_modes: "",
        olt_brands: "",
        olt_billing: ""
      }
    };
  },
  mounted(){
    this.getData();
    this.getNewOltDataForm();
    let user= JSON.parse(localStorage.getItem("user_data"));
    console.log(user.id)
    this.formData.login_user=user.id
  },
  methods: {
    async submitForm() {
      this.loading = true
      console.log("Form submitted with data:", this.formData);
      try {
          if(this.formData.olt_billing && this.formData.olt_billing != '' && this.formData.olt_billing != null){
            await addOlt.addData(this.formData);
            showSwal.methods.showSwal({
              type: "success",
                message: "Olt Created Successfully!",
            });
            this.$router.push("/olt-list");
          }else{
            showSwal.methods.showSwal({
            type: "error",
              message: "Please Provide Billing Information",
            }); 
            this.loading=false           
          }
        } catch (error) {        
        this.loading=false
        console.error("Error adding Olt:", error);
        showSwal.methods.showSwal({
          type: "error",
            message: "Failed to Create Olt!",
        });
        }
    },

    async getData() {
                const response = await oltCatListData.getCatListData();
                this.cat_data = response;
            },
    async getNewOltDataForm() {
                const response = await NewOltDataFormListData.getNewOltDataFormListData();
                this.olt_data = response;
            },
  }
};
</script>
