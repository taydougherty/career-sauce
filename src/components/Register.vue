<template>
  <div id="register">
    <b-jumbotron>
      <template v-slot:header>Register</template>
      <template v-slot:lead>Please enter your information to register a new account.</template>

      <!-- Registration form -->
      <b-form @submit="handleSubmit" v-if="show">
        <b-form-group id="input-group-1" label="First Name:" label-for="input-1" required>
          <b-form-input
            id="input-1"
            v-model="form.firstname"
            type="text"
            required
            placeholder="Enter first name"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Last Name:" label-for="input-2" required>
          <b-form-input
            id="input-2"
            v-model="form.lastname"
            type="text"
            required
            placeholder="Enter last name"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3" label="Email address:" label-for="input-3" required>
          <b-form-input
            id="input-3"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-4" label="Password:" label-for="input-4" required>
          <b-form-input
            id="input-4"
            v-model="form.password"
            type="password"
            required
            :state="passwordState"
            aria-describedby="input-4-feedback"
            placeholder="Enter password"
          ></b-form-input>

          <!-- This will only be shown if the preceding input has an invalid state -->
          <b-form-invalid-feedback id="input-4-feedback">Please enter a valid password</b-form-invalid-feedback>
        </b-form-group>

        <b-button id="btn" type="submit">Register</b-button>
      </b-form>
    </b-jumbotron>
  </div>
</template>

<script>
import AuthenticationService from "../Services/AuthenticationService";

export default {
  name: "Register",
  computed: {
    // Check password length
    passwordState() {
      return this.form.password.length > 7 ? true : false;
    }
  },
  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        email: "",
        password: ""
      },
      show: true,
      error: null
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // Add user info to the database
        const response = await AuthenticationService.register({
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          email: this.form.email,
          password: this.form.password
        });

        let token = response.data.token;
        let user = response.data.user;

        this.$store.dispatch("setToken", token);
        this.$store.dispatch("setUser", user);
        // Wait until database receives info and send user to home page
        setTimeout(() => {
          this.$router.push("/home");
        }, 1000);
      } catch (response) {
        this.error = `${response.message}. Please input valid email & password`;
      }
    }
  }
};
</script>
<style>
#btn {
  background-color: #f05742;
  border-color: #f05742;
}
#register {
  width: 500px;
  height: 745px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 5vh;
  padding: 20px;
}
</style>
