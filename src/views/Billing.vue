<template>
  <div class="container-fluid mt-4">
    <div class="row align-items-center">
      <div class="col-lg-4 col-sm-8">
        Our Packages
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8">
        <ShowPackage/>
      </div>
      <div class="col-lg-4">
        <invoice-card />
      </div>
    </div>
  </div>
</template>

<script>
import setTooltip from "@/assets/js/tooltip.js";
import ShowPackage from "./components/ShowPackage.vue";
import InvoiceCard from "./components/InvoiceCard.vue";


export default {
  name: "Billing",
  components: {
    InvoiceCard,
    ShowPackage,
  },

  mounted() {
    setTooltip();
  },

  
};
</script>
