<template>
  <div id="login">
    <img src="../assets/logo_size.jpg" />
    <b-jumbotron>
      <template v-slot:header>Login</template>
      <template v-slot:lead>Please login or register a new account.</template>

      <!-- Login form -->
      <b-form @submit="login" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Email address:" label-for="input-1" required>
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Password:" label-for="input-2" required>
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            required
            :state="passwordState"
            aria-describedby="input-2-feedback"
            placeholder="Enter password"
          ></b-form-input>

          <!-- This will only be shown if the preceding input has an invalid state -->

          <b-form-invalid-feedback id="input-2-feedback">Please enter a valid password</b-form-invalid-feedback>
          <p>{{ error }}</p>
        </b-form-group>

        <b-button type="submit" id="btn">Login</b-button>
      </b-form>
    </b-jumbotron>
  </div>
</template>

<script>
import AuthenticationService from "../Services/AuthenticationService";

export default {
  name: "Login",
  computed: {
    // Check password length
    passwordState() {
      return this.form.password.length > 7 ? true : false;
    }
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      show: true,
      error: null
    };
  },
  methods: {
    async login() {
      try {
        // Authenticate user with database
        const response = await AuthenticationService.login({
          email: this.form.email,
          password: this.form.password
        });
        let token = response.data.token;
        let user = response.data.user;

        this.$store.dispatch("setToken", token);
        this.$store.dispatch("setUser", user);
        // Send user to homepage
        setTimeout(() => {
          this.$router.push("/home");
        }, 1000);
      } catch (err) {
        this.error = err.response.data.error;
        console.log(this.error);
        console.log("***** YOU MADE IT TO THE LOG IN CATCH ERROR *****");
      }
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";

      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style>
#login {
  max-width: 500px;
  height: 710px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 5vh;
  padding: 20px;
}
#btn {
  background-color: #f05742;
  border-color: #f05742;
}
</style>
