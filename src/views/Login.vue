<template>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-start">
                  <h3 class="font-weight-bolder text-success text-gradient">
                    Welcome back
                  </h3>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body">
                  <form
                    @submit.prevent="handleLogin"
                    role="form"
                    class="text-start"
                  >
                    <label>Email</label>
                    <input
                      id="username"
                      type="text"
                      placeholder="User Name"
                      name="username"
                      v-model="user.username"
                      class="form-control"
                    />
                    <label>Password</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="password"
                      name="password"
                      v-model="user.password"
                      class="form-control mb-3"
                    />
                    <soft-switch id="rememberMe" name="rememberMe" checked>
                      Remember me
                    </soft-switch>
                    <div class="text-center">
                      <soft-button
                        class="my-4 mb-2"
                        variant="gradient"
                        color="success"
                        full-width
                        >Sign in
                        <span
                          v-if="loading"
                          class="spinner-border spinner-border-sm mx-3"
                        ></span>
                      </soft-button>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <router-link
                      :to="{ name: 'Sign Up' }"
                      class="text-success text-gradient font-weight-bold"
                      >Sign up</router-link
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
/* import SoftInput from "@/components/SoftInput.vue"; */
import SoftSwitch from "@/components/SoftSwitch.vue";
import SoftButton from "@/components/SoftButton.vue";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";
import * as yup from "yup";
import showSwal from "/src/mixins/showSwal.js";

export default {
  name: "SignIn",
  components: {
    /* SoftInput, */
    SoftSwitch,
    SoftButton,
  },

  data() {
    const schema = yup.object().shape({
      email: yup
        .string()
        .required("Email is required!")
        .email("Must be a valid email! ex.: name@company.domain"),
      password: yup.string().required("Password is required!"),
    });
    const user = {
      username: "nuxt",
      password: "nuxt@12345",
    };
    return {
      loading: false,
      user,
      schema,
    };
  },

  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    async handleLogin() {
      this.loading = true;
      try {
        await this.$store.dispatch("auth/login", this.user);
        await this.$store.dispatch("profile/getProfile");
        this.$router.push("/dashboard");
      } catch (error) {
        showSwal.methods.showSwal({
          type: "error",
          message: "Invalid credentials!",
        });
        this.loading = false;
      }
    },
  },
};
</script>
