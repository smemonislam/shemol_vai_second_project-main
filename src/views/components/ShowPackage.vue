<template>
  <div class="row mt-4">
    <!--Month List Popup -->
      <div v-if="showPopup" id="myModal" class="modal">
      <div class="modal-content">
        <span @click="popup_close" class="close">&times;</span>

        <div class="my-3 mx-12">
          <default-info-card @click="popup_open(selected_item)" class="cursor-pointer"
                  icon="text-white fas fa-shopping-cart"
                  :title="selected_item.name"
                  :port_count="selected_item.port_count"
                  :olt_modes="selected_item.olt_modes"
                  :value="'Tk '+(firstIntegerValue?firstIntegerValue*selected_item.price: selected_item.price)"
                  :expeire_at="firstIntegerValue?formatDate(new Date(new Date().setMonth(new Date().getMonth() + firstIntegerValue))):null"
                />
          <select v-model="selected_month" name="" id="" class="form-control mt-3 text-black font-bold text-center bg-white">
            <option value="" disabled selected hidden>Select Month</option>
            <option  v-for="(item,index) in month_data" :key="index" :value="index">{{item}}</option>
          </select>
        </div>
        <div class="flex text-center">
        <div class="grid grid-cols-2 gap-2">
          <button class="btn btn-secondary mx-3" @click="popup_close">Cancel</button>
          <button class="btn btn-success" @click="addToCart">Confirm <span v-if="loading" class="spinner-border spinner-border-sm mx-3"></span></button>
        </div>
        </div>
      </div>
    </div>



          <div class="col-xl-12">
            <div class="row">
              <div v-for="(item,index) in data" :key="index" class="col-md-4 py-3">
                <default-info-card @click="popup_open(item)" class="cursor-pointer"
                  icon="text-white fas fa-shopping-cart"
                  :title="item.name"
                  :port_count="item.port_count"
                  :olt_modes="item.olt_modes"
                  :value="'Tk '+item.price"
                />
              </div>
            </div>
          </div>
         <!-- <PaymentMethodsCard/> -->
        </div>
</template>
<script>

import DefaultInfoCard from "@/examples/Cards/DefaultInfoCard.vue";
//Service 
import packageList from "../../services/get-package-list.service";
import MonthList from "../../services/get-month-list.service";
import Invoice from "../../services/post-generate-invoice.service";

import showSwal from "../../mixins/showSwal.js";

export default {
  name: "ShowPAckage",
  components: {
    DefaultInfoCard,
  },

  mounted() {
    this.getData();
    this.getMonthData();
  },

  data() {
      return {
          sortKey: '',
          sortOrder: 'asc',
          data: [],
          month_data: [],
          filteredData: [],
          searchQuery: "",
          currentPage: 1,
          itemsPerPage: 20,
          showPopup:false,
          selected_month:'',
          selected_item:[],
          formData:{
            olt_pack:null,
            cycle_type:'',
            customer:'',
          },
          loading:false
      };
  },

  computed: {
    firstIntegerValue() {
      // Extracting the first integer value using regular expression
      const match = this.selected_month.match(/\d+/);
      return match ? parseInt(match[0]) : null;
    }
  },

  methods: {
      formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      },
      popup_open(item){
        this.formData.olt_pack =item.id
        let user= JSON.parse(localStorage.getItem("user_data"));
        this.formData.customer =user.id
        this.selected_item=item
        this.showPopup = true
      },
      popup_close(){
        this.showPopup = false
         this.formData.olt_pack =null
         this.formData.cycle_type =''
         this.selected_month=''
         this.selected_item=[]
         
      },
      async addToCart(){
        this.loading =true
        this.formData.cycle_type = this.selected_month
        try {
            await Invoice.generateInvoiceData(this.formData);
            showSwal.methods.showSwal({
                type: "success",
                message: "Invoice Generated Successfully!",
            });
            
            this.loading =false
            //location.reload()
            this.popup_close();
        } catch (err) {
          let errors = await err.response.data
          console.error("Error to Generate  Invoice:", errors.error);
          showSwal.methods.showSwal({
                type: "error",
                message: errors.error,
            });
          
          this.loading =false
          alert(errors.error)
        }
      },
      async getData() {
          const response = await packageList.getPackageListData();
          this.data = response;
          this.filteredData = response;
      },
      async getMonthData() {
          const response = await MonthList.getMonthListData();
          this.month_data = response;
      },
  }
};
</script>

<style scoped>
/* The Modal (background) */
.modal { 
  display: block;/* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1000000; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background: #aaaaaa;
   /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #ffffff; /* White background */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Shadow */
  max-width: 50%; /* Set max width */
  padding: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

/* Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

</style>




