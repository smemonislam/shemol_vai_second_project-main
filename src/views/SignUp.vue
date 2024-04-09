<template>
  <div class="container">
    <div class="row justify-content-center mt-6">
      <div class="mx-auto col-xl-4 col-lg-5 col-md-7">
        <div class="card z-index-0">
          <div class="pt-4 text-center card-header">
            <h5>Register Form</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleRegister" role="form" class="text-start">
              <div class="mb-3">
                <input
                  id="username"
                  type="text"
                  placeholder="User Name"
                  aria-label="Name"
                  class="form-control"
                  v-model="user.username"
                />
              </div>
              <div class="mb-3">
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  class="form-control"
                  v-model="user.email"
                />
              </div>
              <div class="mb-3">
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  class="form-control"
                  v-model="user.password"
                />
              </div>
              <soft-checkbox
                id="flexCheckDefault"
                name="flexCheckDefault"
                class="font-weight-light"
                checked
              >
                I agree the
                <a href="javascript:;" class="text-dark font-weight-bolder"
                  >Terms and Conditions</a
                >
              </soft-checkbox>

              <div class="text-center">
                <soft-button
                  color="dark"
                  full-width
                  variant="gradient"
                  class="my-4"
                  >Sign up 
                  <span v-if="loading" class="spinner-border spinner-border-sm mx-3"></span>
                    </soft-button
                >
              </div>
              <p class="text-sm mt-3 mb-0">
                Already have an account?
                <router-link
                  :to="{ name: 'Sign In' }"
                  class="text-dark font-weight-bolder"
                >
                  Sign in
                </router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SoftCheckbox from "@/components/SoftCheckbox.vue";
import SoftButton from "@/components/SoftButton.vue";
import showSwal from "/src/mixins/showSwal.js";

import { mapMutations } from "vuex";

export default {
  name: "SignupBasic",
  components: {
    SoftCheckbox,
    SoftButton,
  },
  data(){
      const user = {
      username: "",
      email: "",
      password: "",
    };

    return {
      user,
      loading: false,
    };
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    async handleRegister() {
      this.loading = true;
        try {
          await this.$store.dispatch("auth/register", this.user);
          this.loading = false;
          showSwal.methods.showSwal({
            type: "success",
            message:
              "Successfully registered. You have been automatically logged in.",
            width: 600,
          });
          this.$router.push("/dashboard");
        } catch (error) {
          showSwal.methods.showSwal({
            type: "error",
            message: "Opps Something is Wrong.",
            width: 500,
          });
        }
        this.loading = false;
      }
  }
};
</script>
