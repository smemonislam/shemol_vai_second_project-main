<template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <!-- <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          EXAMPLES (API)
        </h6>
      </li> -->
      <!-- <li class="nav-item">
        <sidenav-collapse navText="Login" :to="{ name: 'Login' }">
          <template #icon>
            <document />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Register" :to="{ name: 'Register' }">
          <template #icon>
            <spaceship />
          </template>
        </sidenav-collapse>
      </li> -->
      <li class="nav-item">
        <sidenav-collapse navText="Dashboard" :to="{ name: 'Dashboard' }">
          <template #icon>
            <shop />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="User Profile" :to="{ name: 'Profile' }">
          <template #icon>
            <customer-support />
          </template>
        </sidenav-collapse>
      </li>
      <!-- <li class="nav-item">
        <sidenav-collapse navText="User Management" :to="{ name: 'Users' }">
          <template #icon>
            <switches />
          </template>
        </sidenav-collapse>
      </li> -->
      <li class="nav-item">
        <sidenav-collapse
          navText="Olt Data Port List"
          :to="{ name: 'OltDataPort' }"
        >
          <template #icon>
            <switches />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Olt List" :to="{ name: 'OltList' }">
          <template #icon>
            <office />
          </template>
        </sidenav-collapse>
      </li>
      <!-- <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          TEMPLATES
        </h6>
      </li> -->

      <!-- <li class="nav-item">
        <sidenav-collapse navText="Tables" :to="{ name: 'Tables' }">
          <template #icon>
            <office />
          </template>
        </sidenav-collapse>
      </li> -->
      <li class="nav-item">
        <sidenav-collapse navText="Package List" :to="{ name: 'Package List' }">
          <template #icon>
            <credit-card />
          </template>
        </sidenav-collapse>
      </li>

      <!-- <li class="nav-item">
        <sidenav-collapse
          navText="Virtual Reality"
          :to="{ name: 'Virtual Reality' }"
        >
          <template #icon>
            <box3d />
          </template>
        </sidenav-collapse>
      </li> -->
      <!-- <li class="nav-item">
        <sidenav-collapse navText="RTL" :to="{ name: 'Rtl' }">
          <template #icon>
            <settings />
          </template>
        </sidenav-collapse>
      </li> -->
      <!-- <li class="nav-item">
        <sidenav-collapse navText="Profile" :to="{ name: 'ProfileTemplate' }">
          <template #icon>
            <customer-support />
          </template>
        </sidenav-collapse>
      </li> -->
      <!-- <li class="nav-item">
        <sidenav-collapse navText="Sign In" :to="{ name: 'Sign In' }">
          <template #icon>
            <document />
          </template>
        </sidenav-collapse>
      </li> -->
      <!-- <li class="nav-item">
        <sidenav-collapse navText="Logout" :to="{ name: 'Sign In' }">
          <template #icon>
            <spaceship />
          </template>
        </sidenav-collapse>
      </li> -->
    </ul>
  </div>
  <!-- <div class="pt-3 mx-3 mt-3 sidenav-footer">
    <sidenav-card
      :class="cardBg"
      textPrimary="Need Help?"
      textSecondary="Please check our docs"
      route="https://vue-soft-ui-dashboard-laravel-docs.creative-tim.com/vue/overview/soft-ui-dashboard"
      label="Documentation"
      icon="ni ni-diamond"
    />
    <a
      class="btn bg-gradient-success mt-4 w-100"
      href="https://www.creative-tim.com/product/vue-soft-ui-dashboard-laravel-pro?ref=vsud"
      type="button"
      >Upgrade to pro</a
    >
  </div> -->
  <div class="pt-3 mx-3 mt-3 sidenav-footer">
    <button
      @click="logoutUser"
      class="btn bg-gradient-success mt-4 w-100"
      type="button"
    >
      Sign Out
      <span v-if="loading" class="spinner-border spinner-border-sm mx-3"></span>
    </button>
  </div>
</template>
<script>
import SidenavCollapse from "./SidenavCollapse.vue";
/* import SidenavCard from "./SidenavCard.vue"; */
import Shop from "../../components/Icon/Shop.vue";
import Office from "../../components/Icon/Office.vue";
import CreditCard from "../../components/Icon/CreditCard.vue";
/* import Box3d from "../../components/Icon/Box3d.vue"; */
import CustomerSupport from "../../components/Icon/CustomerSupport.vue";
import Switches from "../../components/Icon/Switches.vue";
/* import Document from "../../components/Icon/Document.vue"; */
/* import Spaceship from "../../components/Icon/Spaceship.vue"; */
/* import Settings from "../../components/Icon/Settings.vue"; */

export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      loading: false,
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active",
    };
  },
  components: {
    SidenavCollapse,
    /* SidenavCard, */
    Shop,
    Office,
    CreditCard,
    /* Box3d, */
    CustomerSupport,
    Switches,
    /* Document, */
    /* Spaceship, */
    /* Settings, */
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
    logoutUser() {
      this.loading = true;
      this.$store.dispatch("auth/logout");
      this.loading = false;
    },
  },
};
</script>
