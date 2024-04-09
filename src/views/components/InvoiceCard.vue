<template>
  <div class="card h-100 mt-4">
    <div class="card-header pb-0 p-3">
      <div class="row">
        <div class="col-6 d-flex align-items-center">
          <h6 class="mb-0">Invoices</h6>
        </div>
        <div class="col-6 text-end">
          <div v-if="showPaymentMethod" id="myModal" class="modal">
          <div class="modal-content">
            <span @click="popup_close" class="close">&times;</span>

            <h5 class="text-center">Please Select Payment Method</h5>

            <div class="my-3 mx-12 text-center">
            <p v-if="pay_loading">Loading ..</p>
            <span v-if="pay_loading" class="spinner-border spinner-border-sm mx-3"></span>
             <span v-else @click="getPay()" class="cursor-pointer"><img src="../../assets/img/logos/bkash.svg" style="width:200px" /></span>
            </div>
            <div class="flex text-center">
            
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    <div class="card-body p-3 pb-0 mb-0">
      <ul class="list-group">
        <li v-for="(item,index) in data" :key="index"
          class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
        >
          <div class="d-flex flex-column">
            <h6 class="mb-1 text-dark font-weight-bold text-sm">
              {{item.olt_pack}} 
              <sup>
              <soft-badge v-if="item.is_paid == true" color="success" variant="gradient" size="xl">
                Paid
              </soft-badge>
              <soft-badge v-else-if="item.is_paid == false" color="danger" variant="gradient" size="xl">
                Due
              </soft-badge>
            </sup>

            </h6>
            <span class="text-xs">#{{item.invoice_number}}</span>
          </div>
          <div class="d-flex align-items-center text-sm">
           <span> Tk {{item.total_amount}}</span>
              <soft-badge @click="Pay(item.invoice_number)" class="ms-3 cursor-pointer" v-if="item.is_paid == false" color="dark" variant="gradient">
              Pay
            </soft-badge>
            <button v-else class="btn btn-link text-dark text-sm mb-0 px-0 ms-4">
              <i class="fas fa-file-pdf text-lg me-1" aria-hidden="true"></i>
              PDF
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import SoftButton from "@/components/SoftButton.vue";
import SoftBadge from "@/components/SoftBadge.vue";
//Service 
import invoiceList from "../../services/get-user-invoice-list.service";
import pay from "../../services/get-pay-bill.service";

export default {
  name: "InvoiceCard",
  components: {
    // SoftButton,
    SoftBadge
  },

  mounted() {
    this.getData();
  },

  data() {
      return {
        pay_loading:false,
        showPaymentMethod:false,
        invoice:'',
          sortKey: '',
          sortOrder: 'asc',
          data: [],
          filteredData: [],
          searchQuery: "",
          currentPage: 1,
          itemsPerPage: 20
      };
  },

  methods: {

    popup_close(){
        this.showPopup = false
        this.invoice = null
        this.showPaymentMethod =false
         
      },

    async Pay(Invoice_id){
        this.invoice = Invoice_id
        this.showPaymentMethod =true
      },
    async getPay(){        
        this.pay_loading = true
        let response = await pay.getPayBill(this.invoice)
        if(response){
          window.open(response.bkashURL);
        }
        this.showPaymentMethod =false
        
        this.pay_loading = false
      },
      async getData() {
          const response = await invoiceList.getUserInvoiceDataList();
          this.data = response;
          this.filteredData = response;
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

